from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

# --- MOTOR DE IA ---
try:
    from llm_integration_adaptive import TecMentorAI_Complete
    ai_engine = TecMentorAI_Complete(api_key=os.getenv("OPENAI_API_KEY"))
    AI_MODE = "openai" if os.getenv("OPENAI_API_KEY") else "mock"
except Exception as e:
    print(f"AI Engine no disponible: {e}")
    ai_engine = None
    AI_MODE = "mock"

app = FastAPI(title="Tec Mentor AI API", version="1.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- BASE DE DATOS TEMPORAL ---
user_stats = {}
XP_PER_LEVEL = 1000

def update_user_xp(student_id: str, amount: int, topic_related: str = None, is_exam: bool = False):
    """Actualiza estadísticas. is_exam define si el impacto en progreso es mayor."""
    if student_id not in user_stats:
        user_stats[student_id] = {
            "total_points": 0,
            "level": 1,
            "bar_percentage": 0,
            "streak_days": 1,
            "unlocked_skills": ["introduccion"],
            "rank": "Novato",
            "time_study": "0h",
            "concepts_mastered": 0,
            "subjects_progress": {
                "Matemáticas": {"total": 0, "Algebra": 0, "Trigonometria": 0, "Calculo": 0},
                "Ciencias": {"total": 0, "Mecanica": 0, "Energia": 0, "Ondas": 0}
            }
        }
    
    stats = user_stats[student_id]
    stats["total_points"] += amount
    
    # Niveles
    stats["level"] = (stats["total_points"] // XP_PER_LEVEL) + 1
    stats["bar_percentage"] = (stats["total_points"] % XP_PER_LEVEL) / 10
    
    if stats["level"] > 5: stats["rank"] = "Explorador"
    if stats["level"] > 10: stats["rank"] = "Maestro Socrático"

    # Lógica de Progreso por Materia
    if topic_related:
        impacto = 10 if is_exam else 2 # Los exámenes suben mucho más el progreso
        
        topic_key = topic_related.capitalize()
        # Mapeo simple de temas a categorías principales
        if topic_key in ["Algebra", "Trigonometria", "Calculo"]:
            stats["subjects_progress"]["Matemáticas"][topic_key] = min(100, stats["subjects_progress"]["Matemáticas"][topic_key] + impacto)
            # El total es el promedio de sus hijos
            m = stats["subjects_progress"]["Matemáticas"]
            stats["subjects_progress"]["Matemáticas"]["total"] = int((m["Algebra"] + m["Trigonometria"] + m["Calculo"]) / 3)
            
        elif topic_key in ["Mecanica", "Energia", "Ondas"]:
            stats["subjects_progress"]["Ciencias"][topic_key] = min(100, stats["subjects_progress"]["Ciencias"][topic_key] + impacto)
            c = stats["subjects_progress"]["Ciencias"]
            stats["subjects_progress"]["Ciencias"]["total"] = int((c["Mecanica"] + c["Energia"] + c["Ondas"]) / 3)
    
    return stats

# --- NUEVO ENDPOINT: RESULTADO DE EVALUACIÓN ---
@app.post("/evaluacion/resultado")
async def procesar_evaluacion(
    student_id: str = Form(...),
    score: int = Form(...),        # 0 a 100
    materia: str = Form(...),      # Matemáticas o Ciencias
    tema: str = Form(...),         # Algebra, Mecanica, etc.
    tiempo_segundos: int = Form(...)
):
    # XP Base por examen: puntos x 10 (ej: 80 puntos = 800 XP)
    xp_ganada = score * 10
    
    # Bono por rapidez (si termina en menos de 5 min y sacó más de 70)
    if score >= 70 and tiempo_segundos < 300:
        xp_ganada += 200

    updated_stats = update_user_xp(student_id, xp_ganada, topic_related=tema, is_exam=True)
    
    # Actualizar conceptos dominados si la nota es alta
    if score >= 90:
        updated_stats["concepts_mastered"] += 1

    return {
        "status": "success",
        "xp_earned": xp_ganada,
        "new_level": updated_stats["level"],
        "total_xp": updated_stats["total_points"]
    }

# --- CHAT IA (XP reducida para que el examen sea lo importante) ---
@app.post("/chat/vision")
async def chat_vision(
    message: str = Form(...),
    topic: str = Form(...),
    student_id: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    if not student_id: student_id = "temp-student"
    
    image_bytes = await file.read() if file else None
    
    if AI_MODE == "openai" and ai_engine:
        result = ai_engine.chat_vision(student_id, message, topic, image_bytes)
    else:
        result = {"response": f"Respuesta sobre {topic}", "level": "standard"}
    
    # Solo 20 XP por chatear, la carne está en los exámenes
    xp_to_add = 20 
    update_user_xp(student_id, xp_to_add, topic, is_exam=False)
    
    return result

@app.get("/stats/{student_id}")
def get_stats(student_id: str):
    if student_id not in user_stats:
        update_user_xp(student_id, 0)
    return user_stats[student_id]

@app.get("/skill-tree/{student_id}")
def get_skill_tree(student_id: str):
    nodes = [
        {"id": "introduccion", "label": "Inicio", "completed": True, "pos": {"x": 0, "y": 0}},
        {"id": "mate_1", "label": "Álgebra Básica", "completed": False, "pos": {"x": -100, "y": 100}},
        {"id": "prog_1", "label": "Lógica", "completed": False, "pos": {"x": 100, "y": 100}},
        {"id": "ciencia_1", "label": "Método Científico", "completed": False, "pos": {"x": 0, "y": 200}},
    ]
    return {"nodes": nodes}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)