import React, { useState } from 'react';
import ExamenPanel from './ExamenPanel';

const EvaluationSection = () => {
    // Estados para el flujo del examen
    const [step, setStep] = useState(1); // 1: Materia, 2: Configuración, 3: Examen
    const [config, setConfig] = useState({
        materia: '',
        tema: '',
        numPreguntas: 10,
        dificultad: 'intermedio'
    });

    const materias = [
        { id: 'math', name: 'Mathematics', icon: '🔢', color: 'bg-purple-600' },
        { id: 'sci', name: 'Science', icon: '🧪', color: 'bg-green-600' },
        { id: 'hist', name: 'History', icon: '📖', color: 'bg-orange-600' },
        { id: 'prog', name: 'Programming', icon: '💻', color: 'bg-blue-600' },
        { id: 'lit', name: 'Literature', icon: '📕', color: 'bg-pink-600' },
        { id: 'gen', name: 'General', icon: '💡', color: 'bg-yellow-600' },
    ];

    const seleccionarMateria = (materiaNombre) => {
        setConfig({ ...config, materia: materiaNombre });
        setStep(2);
    };

    const iniciarExamen = (e) => {
        e.preventDefault();
        setStep(3);
    };

    return (
        <div className="p-8 min-h-screen bg-slate-950 text-white">
            {/* Paso 1: Selección de Materia */}
            {step === 1 && (
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-center">Selecciona una Materia</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {materias.map((m) => (
                            <div 
                                key={m.id}
                                onClick={() => seleccionarMateria(m.name)}
                                className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-blue-500 cursor-pointer transition-all group"
                            >
                                <div className={`${m.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                                    {m.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400">{m.name}</h3>
                                <p className="text-slate-400 text-sm">Haz clic para configurar tu evaluación de {m.name}.</p>
                                <button className="mt-4 w-full py-2 bg-blue-600/20 text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    Comenzar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Paso 2: Configuración de Tema y Preguntas */}
            {step === 2 && (
                <div className="max-w-md mx-auto bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
                    <button onClick={() => setStep(1)} className="text-slate-500 hover:text-white mb-4 flex items-center">
                        ← Volver a materias
                    </button>
                    <h2 className="text-2xl font-bold mb-6 italic text-blue-400">Configurando {config.materia}</h2>
                    
                    <form onSubmit={iniciarExamen} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">¿Qué tema quieres evaluar?</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Ej: Álgebra Lineal, Newton, Python..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setConfig({...config, tema: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">Número de preguntas</label>
                            <select 
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none"
                                value={config.numPreguntas}
                                onChange={(e) => setConfig({...config, numPreguntas: e.target.value})}
                            >
                                <option value="5">5 Preguntas (Rápido)</option>
                                <option value="10">10 Preguntas (Estándar)</option>
                                <option value="20">20 Preguntas (Intenso)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">Dificultad</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['básico', 'intermedio', 'avanzado'].map((d) => (
                                    <button
                                        key={d}
                                        type="button"
                                        onClick={() => setConfig({...config, dificultad: d})}
                                        className={`py-2 rounded-lg text-xs capitalize transition-colors ${config.dificultad === d ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 rounded-xl font-bold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg"
                        >
                            ¡GENERAR EXAMEN CON IA!
                        </button>
                    </form>
                </div>
            )}

            {/* Paso 3: El componente ExamenPanel */}
            {step === 3 && (
                <div className="max-w-4xl mx-auto">
                    <ExamenPanel 
                        studentId="legma-user" 
                        materia={config.materia} 
                        tema={config.tema} 
                        dificultad={config.dificultad}
                        numPreguntas={config.numPreguntas}
                    />
                    <div className="text-center mt-6">
                        <button 
                            onClick={() => { if(window.confirm("¿Seguro que quieres salir? Perderás el progreso.")) setStep(1)}} 
                            className="text-red-500 text-sm hover:underline"
                        >
                            Abandonar examen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EvaluationSection;