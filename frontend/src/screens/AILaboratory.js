import React, { useState } from 'react';
import { Beaker, Zap, Pi, Box, Wind, Orbit, MessageSquareCode } from 'lucide-react';
// Importamos el simulador desde la nueva carpeta labs
import { ParabolicSim } from '../components/labs/ParabolicSim';

export const AILaboratory = () => {
    const [activeLab, setActiveLab] = useState(null);

    const categories = [
        {
            id: 'physics',
            name: 'Física Avanzada',
            icon: <Zap className="text-blue-400" />,
            sims: [
                { id: 'parabolic', name: 'Tiro Parabólico', icon: <Wind size={16}/> },
                { id: 'forces', name: 'Simulador de Fuerzas', icon: <Box size={16}/> },
                { id: 'gravity', name: 'Gravedad Universal', icon: <Orbit size={16}/> }
            ],
            color: 'from-blue-600/20 to-cyan-500/20'
        },
        {
            id: 'math',
            name: 'Matemáticas Visuales',
            icon: <Pi className="text-purple-400" />,
            sims: [
                { id: 'functions', name: 'Explorador de Funciones', icon: <Pi size={16}/> },
                { id: 'calculus', name: 'Cálculo e Integrales', icon: <Pi size={16}/> }
            ],
            color: 'from-purple-600/20 to-pink-500/20'
        },
        {
            id: 'chemistry',
            name: 'Química Molecular',
            icon: <Beaker className="text-emerald-400" />,
            sims: [
                { id: 'atoms', name: 'Estructura Atómica', icon: <Beaker size={16}/> },
                { id: 'reactions', name: 'Reacciones Químicas', icon: <Zap size={16}/> }
            ],
            color: 'from-emerald-600/20 to-teal-500/20'
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* Header del Laboratorio */}
            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Beaker size={120} />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter">LABORATORIO <span className="text-blue-500">IA</span></h1>
                <p className="text-slate-400 max-w-lg mt-2">Experimenta con leyes universales en tiempo real. Cambia variables, observa comportamientos y pide explicaciones al Mentor.</p>
            </div>

            {!activeLab ? (
                /* Selección de Categoría */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className={`p-1 rounded-[2.5rem] bg-gradient-to-br ${cat.color} border border-white/10`}>
                            <div className="bg-[#0a0e1f] p-8 rounded-[2.4rem] h-full flex flex-col">
                                <div className="mb-6">{React.cloneElement(cat.icon, { size: 40 })}</div>
                                <h3 className="text-xl font-bold text-white mb-4">{cat.name}</h3>
                                <div className="space-y-2 flex-1">
                                    {cat.sims.map(sim => (
                                        <button 
                                            key={sim.id}
                                            onClick={() => setActiveLab(sim.id)}
                                            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-sm group"
                                        >
                                            <span className="flex items-center gap-2">{sim.icon} {sim.name}</span>
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Contenedor del Simulador Activo */
                <div className="bg-slate-900 border border-blue-500/20 rounded-[2.5rem] overflow-hidden min-h-[600px] flex flex-col">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
                        <button onClick={() => setActiveLab(null)} className="text-xs text-slate-500 hover:text-white font-bold uppercase tracking-widest">← Volver al Hub</button>
                        <span className="text-xs font-black text-blue-400 uppercase tracking-[0.2em]">{activeLab.replace('_', ' ')} Simulator</span>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
                            <MessageSquareCode size={14} /> EXPLICACIÓN IA
                        </button>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center bg-black/40 relative">
                        {/* LÓGICA DE RENDERIZADO DE SIMULADORES */}
                        {activeLab === 'parabolic' ? (
                            <ParabolicSim />
                        ) : (
                            <div className="text-center">
                                <p className="text-slate-600 font-mono text-sm animate-pulse uppercase tracking-widest">
                                    El simulador de {activeLab} está en desarrollo...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const ArrowRight = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14m-7-7 7 7-7 7"/>
    </svg>
);