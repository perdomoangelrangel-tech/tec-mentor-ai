import React, { useState } from 'react';
import { User, GraduationCap, Lightbulb, ArrowRight, LockKeyhole } from 'lucide-react';

export const Login = ({ onLogin }) => {
    const [role, setRole] = useState('student');

    const rolesInfo = {
        student: {
            title: "Soy Estudiante",
            desc: "APRENDE CON IA ADAPTATIVA",
            color: "from-blue-600 to-cyan-500",
            shadow: "shadow-blue-500/20",
            icon: <User size={20}/>
        },
        teacher: {
            title: "Soy Docente",
            desc: "GESTIONA TU CLASE Y GRUPOS",
            color: "from-indigo-600 to-purple-500",
            shadow: "shadow-indigo-500/20",
            icon: <GraduationCap size={20}/>
        },
        guest: {
            title: "Aprendiz Libre",
            desc: "EXPLORA Y DESCUBRE TEMAS",
            color: "from-emerald-600 to-teal-500",
            shadow: "shadow-emerald-500/20",
            icon: <Lightbulb size={20}/>
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Efectos de fondo dinámicos según el rol seleccionado */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br ${rolesInfo[role].color} opacity-10 blur-[120px] transition-all duration-1000 rounded-full`}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-800 opacity-20 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className={`w-14 h-14 bg-gradient-to-tr ${rolesInfo[role].color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transition-all duration-500`}>
                            <span className="text-3xl text-white">🤖</span>
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tighter mb-2">TEC MENTOR AI</h1>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black">Plataforma de Educación Neuronal</p>
                    </div>

                    {/* Selector de Perfil (Registro) */}
                    <div className="space-y-3 mb-10">
                        {Object.entries(rolesInfo).map(([key, info]) => (
                            <button 
                                key={key}
                                onClick={() => setRole(key)}
                                className={`w-full p-5 rounded-[2rem] border transition-all duration-300 flex items-center gap-5 group ${
                                    role === key 
                                    ? `bg-gradient-to-r ${info.color} border-transparent text-white shadow-xl ${info.shadow} scale-[1.02]` 
                                    : 'bg-slate-800/30 border-white/5 text-slate-400 hover:bg-slate-800/60 hover:border-white/20'
                                }`}
                            >
                                <div className={`p-3 rounded-2xl transition-colors ${role === key ? 'bg-white/20' : 'bg-slate-700'}`}>
                                    {info.icon}
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-sm uppercase tracking-tight">{info.title}</p>
                                    <p className={`text-[9px] font-bold transition-opacity ${role === key ? 'opacity-100 text-white/80' : 'opacity-40'}`}>
                                        {info.desc}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Botón de Acción Principal */}
                    <button 
                        onClick={() => onLogin({ role, name: "Usuario Nuevo" })}
                        className={`w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group shadow-xl`}
                    >
                        Comenzar Experiencia <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </button>

                    {/* Sección Inferior: Login para cuentas existentes */}
                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-xs font-bold mb-4 uppercase tracking-tighter">¿Ya eres parte de la red?</p>
                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 border border-white/5 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-colors">
                            <LockKeyhole size={14} /> Acceder a mi cuenta
                        </button>
                    </div>
                </div>

                {/* Footer Decorativo */}
                <p className="text-center text-slate-600 text-[9px] mt-8 uppercase tracking-[0.2em] font-bold">
                    Powered by Google Gemini 2.0 & Custom AI Models
                </p>
            </div>
        </div>
    );
};