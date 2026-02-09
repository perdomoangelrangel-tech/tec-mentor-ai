import React, { useState, useEffect, useCallback } from 'react';
// Importamos la lógica de la API que acabamos de actualizar
import { analyzeCognitiveProfile } from '../../api'; 

const ExamenPanel = ({ studentId, materia, tema, dificultad, numPreguntas }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalTimeForExam, setTotalTimeForExam] = useState(0);

    // 1. Simular carga de preguntas
    useEffect(() => {
        const generarPreguntas = () => {
            setLoading(true);
            setTimeout(() => {
                const nuevasPreguntas = Array.from({ length: numPreguntas }, (_, i) => ({
                    id: i,
                    pregunta: `Pregunta ${i + 1} sobre ${tema}: ¿Cuál es el concepto clave en nivel ${dificultad}?`,
                    opciones: ["Opción A (Correcta)", "Opción B", "Opción C", "Opción D"],
                    correcta: 0
                }));
                const baseTime = numPreguntas * (dificultad === 'avanzado' ? 90 : 60);
                setQuestions(nuevasPreguntas);
                setTimeLeft(baseTime);
                setTotalTimeForExam(baseTime); // Guardamos el tiempo inicial para calcular cuánto tardó
                setLoading(false);
            }, 1500);
        };
        generarPreguntas();
    }, [tema, dificultad, numPreguntas]);

    // 2. Lógica de Finalización con Actualización de Perfil
    const finalizarExamen = useCallback(async () => {
        if (isFinished) return;
        setIsFinished(true);

        // Calcular puntaje
        let aciertos = 0;
        questions.forEach((q, index) => {
            if (userAnswers[index] === q.correcta) aciertos++;
        });
        const finalScore = Math.round((aciertos / questions.length) * 100);
        
        // Calcular tiempo invertido en segundos
        const timeSpent = totalTimeForExam - timeLeft;

        // --- ACTUALIZACIÓN DEL PERFIL COGNITIVO ---
        // Creamos la "interacción" que la IA procesará
        const examInteraction = {
            // Mapeamos la materia al tipo de métrica
            type: (materia === 'Física' || materia === 'Matemáticas') ? 'math' : 'reading',
            success: finalScore >= 70, // Se considera éxito arriba de 70
            timeSpent: timeSpent
        };

        // Obtenemos el perfil anterior (si existe) para ir sumando experiencia
        const rawSavedProfile = localStorage.getItem('user_cognitive_profile');
        const currentInteractions = rawSavedProfile ? JSON.parse(localStorage.getItem('raw_interactions') || "[]") : [];
        
        // Añadimos la nueva interacción a la lista y recalculamos
        const updatedInteractions = [...currentInteractions, examInteraction];
        const nuevoPerfil = analyzeCognitiveProfile(updatedInteractions);
        
        // Guardamos los datos para que el Radar y otros componentes los usen
        localStorage.setItem('user_cognitive_profile', JSON.stringify(nuevoPerfil));
        localStorage.setItem('raw_interactions', JSON.stringify(updatedInteractions));

        // Feedback al usuario
        console.log("Perfil Cognitivo Evolucionado:", nuevoPerfil);
        alert(`Examen enviado. Puntaje: ${finalScore}% \n¡Tu Espectro Cognitivo ha sido actualizado!`);

        // Simulación de envío al backend real
        const formData = new FormData();
        formData.append("student_id", studentId || "temp-student");
        formData.append("score", finalScore);
        formData.append("materia", materia);
        
        try {
            await fetch("http://localhost:8000/evaluacion/resultado", { method: "POST", body: formData });
        } catch (e) { console.warn("Modo offline: No se pudo conectar al servidor 8000, pero los datos se guardaron localmente."); }
        
    }, [isFinished, questions, userAnswers, studentId, materia, timeLeft, totalTimeForExam]);

    // Timer
    useEffect(() => {
        if (timeLeft > 0 && !isFinished && !loading) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !isFinished && !loading) {
            finalizarExamen();
        }
    }, [timeLeft, isFinished, loading, finalizarExamen]);

    // --- RENDERIZADO (Se mantiene tu estilo visual) ---
    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-blue-400 animate-pulse font-mono">Generando reactivos para {tema}...</p>
        </div>
    );

    if (isFinished) return (
        <div className="text-center p-10 bg-slate-800 rounded-xl border border-green-500/50">
            <h2 className="text-3xl font-bold text-green-400 mb-4">¡Examen Completado!</h2>
            <p className="text-slate-300">Tu esfuerzo en {materia} ha sido registrado en tu Perfil Cognitivo.</p>
            <button onClick={() => window.location.reload()} className="mt-6 px-8 py-2 bg-blue-600 rounded-full hover:bg-blue-500">Volver al Inicio</button>
        </div>
    );

    return (
        <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-white">{tema}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{materia} • {dificultad}</p>
                </div>
                <div className="text-2xl font-mono text-blue-400 bg-blue-500/10 px-4 py-1 rounded-lg border border-blue-500/20">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
            </div>

            <div className="mb-8">
                <span className="text-blue-500 font-bold text-sm">PREGUNTA {currentQuestionIndex + 1} DE {questions.length}</span>
                <p className="text-lg text-slate-200 mt-2">{questions[currentQuestionIndex].pregunta}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-8">
                {questions[currentQuestionIndex].opciones.map((opcion, idx) => (
                    <button
                        key={idx}
                        onClick={() => setUserAnswers({ ...userAnswers, [currentQuestionIndex]: idx })}
                        className={`p-4 rounded-xl border transition-all text-left ${
                            userAnswers[currentQuestionIndex] === idx 
                            ? 'bg-blue-600 border-blue-400 text-white' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                    >
                        {opcion}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center">
                <button 
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="text-slate-500 hover:text-white disabled:opacity-30"
                >
                    Anterior
                </button>
                
                {currentQuestionIndex === questions.length - 1 ? (
                    <button onClick={finalizarExamen} className="bg-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-500 shadow-lg shadow-green-900/20">
                        FINALIZAR EXAMEN
                    </button>
                ) : (
                    <button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-500">
                        Siguiente
                    </button>
                )}
            </div>
        </div>
    );
};

export default ExamenPanel;