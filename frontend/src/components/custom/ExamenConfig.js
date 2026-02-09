import React, { useState } from 'react';
import ExamenPanel from './ExamenPanel';
import { Zap, Brain, Beaker, Code, ScrollText, Languages, Target, settings } from 'lucide-react';

const ExamenConfig = () => {
    const [configurado, setConfigurado] = useState(false);
    const [config, setConfig] = useState({
        materia: 'Física',
        tema: 'Mecánica Clásica',
        dificultad: 'intermedio',
        numPreguntas: 10
    });

    const materias = {
        'Física': { icon: <Zap />, color: 'from-blue-600 to-cyan-500', bg: 'hover:bg-blue-500/10', glow: 'bg-blue-500/5', temas: ['Mecánica Clásica', 'Termodinámica', 'Óptica'] },
        'Matemáticas': { icon: <Brain />, color: 'from-purple-600 to-pink-500', bg: 'hover:bg-purple-500/10', glow: 'bg-purple-500/5', temas: ['Álgebra', 'Cálculo', 'Estadística'] },
        'Química': { icon: <Beaker />, color: 'from-emerald-600 to-teal-500', bg: 'hover:bg-emerald-500/10', glow: 'bg-emerald-500/5', temas: ['Orgánica', 'Estequiometría', 'Enlaces'] },
        'Programación': { icon: <Code />, color: 'from-orange-600 to-yellow-500', bg: 'hover:bg-orange-500/10', glow: 'bg-orange-500/5', temas: ['Algoritmos', 'React', 'Estructuras'] },
        'Historia': { icon: <ScrollText />, color: 'from-amber-700 to-yellow-600', bg: 'hover:bg-amber-500/10', glow: 'bg-amber-500/5', temas: ['Universal', 'México', 'Revoluciones'] },
        'Español': { icon: <Languages />, color: 'from-rose-600 to-red-400', bg: 'hover:bg-rose-500/10', glow: 'bg-rose-500/5', temas: ['Gramática', 'Literatura', 'Ortografía'] }
    };

    const current = materias[config.materia];

    if (configurado) return <ExamenPanel {...config} studentId="user_demo" />;

    return (
        <div className={`relative w-full min-h-[85vh] rounded-[2rem] transition-all duration-1000 overflow-hidden border border-white/5 ${current.glow}`}>
            {/* Fondo dinámico sutil */}
            <div className={`absolute inset-0 opacity-20 transition-all duration-1000 bg-gradient-to-br ${current.color}`}></div>

            <div className="relative z-10 p-6 h-full flex flex-col gap-6">
                {/* Header Compacto */}
                <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                    <div>
                        <h2 className="text-2xl font-black text-white leading-none">MODO EXAMEN</h2>
                        <p className="text-slate-400 text-xs mt-1 uppercase tracking-tighter">Simulación de evaluación real con IA adaptativa</p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${current.color} text-white font-bold text-xs shadow-lg`}>
                        MATERIA: {config.materia.toUpperCase()}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
                    {/* Grid de Materias (Lado Izquierdo) */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            {Object.keys(materias).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => setConfig({ ...config, materia: m, tema: materias[m].temas[0] })}
                                    className={`group relative p-4 rounded-2xl border transition-all duration-300 ${
                                        config.materia === m 
                                        ? `bg-gradient-to-br ${materias[m].color} border-transparent shadow-xl scale-[1.02]` 
                                        : `bg-slate-900/80 border-white/5 ${materias[m].bg}`
                                    }`}
                                >
                                    <div className={`mb-2 transition-transform ${config.materia === m ? 'text-white' : 'text-slate-500 group-hover:scale-110'}`}>
                                        {React.cloneElement(materias[m].icon, { size: 24 })}
                                    </div>
                                    <div className={`font-bold text-sm ${config.materia === m ? 'text-white' : 'text-slate-400'}`}>{m}</div>
                                </button>
                            ))}
                        </div>

                        {/* Temas (Compacto) */}
                        <div className="bg-slate-900/60 backdrop-blur-sm border border-white/5 p-5 rounded-2xl">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Enfoque del examen</span>
                            <div className="flex flex-wrap gap-2">
                                {current.temas.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setConfig({...config, tema: t})}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                            config.tema === t ? 'bg-white text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Controles (Lado Derecho) */}
                    <div className="lg:col-span-4 bg-slate-900/80 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] flex flex-col justify-between shadow-2xl">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-white/80 text-xs font-bold mb-4">
                                <Target size={14} className="text-blue-400" /> AJUSTES DE SESIÓN
                            </div>
                            
                            {/* Dificultad Vertical Compacta */}
                            <div className="space-y-2">
                                {['principiante', 'intermedio', 'avanzado'].map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setConfig({...config, dificultad: d})}
                                        className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                            config.dificultad === d 
                                            ? `bg-gradient-to-r ${current.color} border-transparent text-white` 
                                            : 'bg-black/20 border-white/5 text-slate-500 hover:text-slate-300'
                                        }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>

                            {/* Slider Compacto */}
                            <div className="pt-4">
                                <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
                                    <span>Reactivos</span>
                                    <span className="text-white">{config.numPreguntas}</span>
                                </div>
                                <input 
                                    type="range" min="5" max="30" step="5"
                                    className="w-full h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-white"
                                    value={config.numPreguntas}
                                    onChange={(e) => setConfig({...config, numPreguntas: parseInt(e.target.value)})}
                                />
                            </div>
                        </div>

                        <button 
                            onClick={() => setConfigurado(true)}
                            className={`w-full py-4 mt-6 rounded-xl font-black text-white uppercase tracking-widest text-sm transition-all hover:brightness-110 active:scale-95 bg-gradient-to-r ${current.color} shadow-lg`}
                        >
                            GENERAR EVALUACIÓN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamenConfig;