import openai
import os
import base64
import re
from typing import Dict, List
from enum import Enum

class ComplexityLevel(Enum):
    BASIC = "basic"
    STANDARD = "standard"
    TECHNICAL = "technical"

class SocraticLLM_Adaptive:
    def __init__(self, api_key: str = None):
        openai.api_key = api_key or os.getenv("OPENAI_API_KEY")
        # ACTUALIZACIÓN: Usamos gpt-4o para soporte de visión
        self.model = "gpt-4o" 
        self.student_levels = {}

    def get_system_prompt(self, level: ComplexityLevel) -> str:
        base = """Eres Tec Mentor AI, un mentor educativo de élite. 
REGLA CRÍTICA: NUNCA des respuestas directas, resultados finales o soluciones completas.
Tu rol es guiar al estudiante para que descubra la respuesta mediante preguntas socráticas.

Si el alumno sube una imagen de sus apuntes, analízala para entender qué método está intentando usar y guíalo desde ahí.

ESTRUCTURA DE RESPUESTA:
1. Tu guía o pregunta socrática.
2. Al final, añade SIEMPRE esta sección si detectas temas base que el alumno debe reforzar:
REQUISITOS: [Tema A, Tema B]"""

        prompts = {
            ComplexityLevel.BASIC: base + "\nNivel Básico: Usa analogías simples (deportes, cocina).",
            ComplexityLevel.STANDARD: base + "\nNivel Estándar: Lenguaje académico claro y profesional.",
            ComplexityLevel.TECHNICAL: base + "\nNivel Técnico: Usa terminología formal y rigor matemático."
        }
        return prompts.get(level, prompts[ComplexityLevel.STANDARD])

    def get_response_with_vision(self, student_id: str, message: str, topic: str, image_bytes=None):
        # Detectar nivel actual del estudiante
        level = self.student_levels.get(student_id, ComplexityLevel.STANDARD)
        system_prompt = self.get_system_prompt(level)
        
        # Preparar el contenido (Texto + Imagen si existe)
        user_content = [{"type": "text", "text": f"Materia: {topic}\nPregunta: {message}"}]
        
        if image_bytes:
            base64_image = base64.b64encode(image_bytes).decode('utf-8')
            user_content.append({
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}
            })

        try:
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_content}
                ],
                temperature=0.7,
                max_tokens=700
            )
            
            full_text = response.choices[0].message.content
            
            # Aplicar Guardrail para evitar que se filtren respuestas
            full_text = self._guardrail_check(full_text)
            
            # Separar los requisitos del cuerpo del mensaje
            parts = full_text.split("REQUISITOS:")
            clean_response = parts[0].strip()
            prereqs = []
            
            if len(parts) > 1:
                # Extraer temas de los corchetes
                prereqs = [p.strip().replace("[", "").replace("]", "") for p in parts[1].split(",")]

            return {
                "response": clean_response,
                "prerequisites": prereqs,
                "level": level.value
            }
        except Exception as e:
            print(f"Error en AI Engine: {e}")
            return {"response": "Lo siento, tuve un problema al procesar la imagen. ¿Podrías describirme el problema?", "prerequisites": []}

    def _guardrail_check(self, text: str) -> str:
        """Asegura que no se filtren respuestas directas"""
        bad_patterns = [r"(?i)(la respuesta es|resultado:|x\s*=\s*)[\d\-\.]+"]
        for pattern in bad_patterns:
            if re.search(pattern, text):
                text = re.sub(pattern, "[valor a descubrir]", text)
        return text

class TecMentorAI_Complete:
    def __init__(self, api_key: str = None):
        self.llm = SocraticLLM_Adaptive(api_key)
    
    def chat_vision(self, student_id: str, message: str, topic: str, image_bytes=None):
        return self.llm.chat_vision(student_id, message, topic, image_bytes)
    
    # Mantener compatibilidad con el chat de solo texto si es necesario
    def chat(self, student_id: str, message: str, topic: str):
        return self.llm.get_response_with_vision(student_id, message, topic)