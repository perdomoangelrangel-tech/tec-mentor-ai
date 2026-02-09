import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, Beaker, Atom, Code, Book, History, 
  Brain, Target, Zap, Lightbulb 
} from "lucide-react";

// --- COMPONENTE DE LA MASCOTA INTERACTIVA ---
const TecMentorMascot = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calcular posición relativa al centro del contenedor
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Limitar el movimiento de las pupilas (max 4px de desplazamiento)
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = Math.min(4, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 10);
        
        setMousePos({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-32 h-32 flex items-center justify-center animate-bounce-slow">
      {/* Cuerpo del Robot (puedes reemplazar el SVG por tu diseño oficial) */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        {/* Antena */}
        <line x1="50" y1="20" x2="50" y2="10" stroke="#3b82f6" strokeWidth="4" />
        <circle cx="50" cy="8" r="4" fill="#60a5fa" />
        
        {/* Cabeza/Cuerpo Principal */}
        <rect x="20" y="20" width="60" height="60" rx="15" fill="#2d335a" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Pantalla de la cara */}
        <rect x="28" y="35" width="44" height="25" rx="8" fill="#0f172a" />
        
        {/* Ojos (Contenedor Blanco) */}
        <circle cx="40" cy="47" r="6" fill="white" />
        <circle cx="60" cy="47" r="6" fill="white" />
        
        {/* PUPILAS (Las que se mueven) */}
        <circle 
          cx={40 + mousePos.x} 
          cy={47 + mousePos.y} 
          r="3" 
          fill="#3b82f6" 
        />
        <circle 
          cx={60 + mousePos.x} 
          cy={47 + mousePos.y} 
          r="3" 
          fill="#3b82f6" 
        />
        
        {/* Boca/Detalle inferior */}
        <rect x="42" y="68" width="16" height="4" rx="2" fill="#3b82f6" opacity="0.5" />
      </svg>
    </div>
  );
};

export default function Dashboard({ onNavigate }) {
  const materias = [
    { id: 'matematicas', nombre: 'Matemáticas', pregunta: '¿PARA QUÉ ME SIRVE?', desc: 'Aprende cómo usar derivadas para optimizar tiempo, dinero y recursos en la vida real.', icon: Calculator, color: 'bg-purple-600' },
    { id: 'quimica', nombre: 'Química', pregunta: '¿PARA QUÉ ME SIRVE?', desc: 'Comprende la composición de la materia y las reacciones que crean el mundo moderno.', icon: Beaker, color: 'bg-emerald-600' },
    { id: 'fisica', nombre: 'Física', pregunta: '¿PARA QUÉ ME SIRVE?', desc: 'Entiende las leyes del universo, desde el movimiento hasta la energía cuántica.', icon: Atom, color: 'bg-amber-500' },
    { id: 'programacion', nombre: 'Programación', pregunta: '¿PARA QUÉ ME SIRVE?', desc: 'Desarrolla soluciones tecnológicas para automatizar tareas y resolver problemas reales.', icon: Code, color: 'bg-blue-600' },
    { id: 'literatura', nombre: 'Literatura', pregunta: '¿PARA QUÉ ME SIRVE?', desc: 'Mejora tu comunicación, empatía y pensamiento crítico a través de historias.', icon: Book, color: 'bg-pink-600' },
    { id: 'historia', nombre: 'Historia', pregunta: '¿PARA QUÉ ME SIRVE?', desc: 'Aprende de eventos pasados para entender el presente y tomar mejores decisiones.', icon: History, color: 'bg-orange-600' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Banner de Bienvenida con Mascota Interactiva */}
      <div className="bg-[#1a1f37] rounded-3xl p-8 flex justify-between items-center border border-white/5 relative overflow-hidden group">
        {/* Lado Izquierdo: Texto */}
        <div className="z-10">
          <h1 className="text-5xl font-extrabold mb-2 tracking-tight">¡Bienvenido!</h1>
          <p className="text-slate-400 text-lg">Aprende y aplica tus conocimientos con IA</p>
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20 text-blue-400 text-sm font-bold">
              <Zap className="w-4 h-4" /> 0 XP
            </div>
            <div className="flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/20 text-orange-400 text-sm font-bold">
              <Target className="w-4 h-4" /> 0 Retos
            </div>
          </div>
        </div>

        {/* Lado Derecho: Mascota Animada */}
        <div className="hidden md:block">
          <TecMentorMascot />
        </div>

        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </div>

      {/* 2. Grid de Cursos (Estructura de 3 columnas de tu imagen) */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          Mis Cursos Actuales 
          <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-500">6 TOTAL</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materias.map((m) => (
            <div key={m.id} className="bg-[#11162d] border border-white/5 rounded-3xl p-6 flex flex-col h-full hover:border-blue-500/30 transition-all group">
              <div className={`w-12 h-12 ${m.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <m.icon className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-1">{m.nombre}</h3>
              <p className="text-[10px] font-black text-slate-500 tracking-widest mb-2 uppercase">{m.pregunta}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{m.desc}</p>
              <button 
                onClick={() => onNavigate('rutas', m.id)}
                className="w-full bg-[#1e4ed8] hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20"
              >
                Comenzar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Fila Inferior: Widgets de Progreso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="bg-[#11162d] border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-purple-400 w-6 h-6" />
            <h3 className="text-xl font-bold">Progreso Cognitivo</h3>
            <span className="ml-auto text-purple-400 font-bold text-sm text-[10px] bg-purple-400/10 px-2 py-1 rounded">0%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full w-full mb-8 overflow-hidden">
             <div className="h-full bg-purple-500 w-0 transition-all duration-1000"></div>
          </div>
          <div className="flex justify-between text-center">
            <div><p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Dominados</p><p className="text-xl font-bold">0</p></div>
            <div><p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Racha</p><p className="text-xl font-bold">0 días</p></div>
            <div><p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Puntos</p><p className="text-xl font-bold">0</p></div>
          </div>
        </div>

        <div className="bg-[#11162d] border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-orange-400 w-6 h-6" />
            <h3 className="text-xl font-bold">Tomar Evaluación</h3>
          </div>
          <p className="text-slate-400 text-sm mb-6">Demuestra lo que has aprendido para aumentar tu nivel cognitivo.</p>
          <button 
            onClick={() => onNavigate('exam')}
            className="w-full bg-[#e65100] hover:bg-orange-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-900/20"
          >
            Comenzar Evaluación
          </button>
        </div>

        {/* Banner Inferior */}
        <div className="lg:col-span-2 bg-[#16a34a] rounded-3xl p-8 flex items-center justify-between group cursor-pointer overflow-hidden relative">
          <div className="z-10">
            <h3 className="text-2xl font-bold text-white mb-1">Aprendizaje Aplicado</h3>
            <p className="text-green-100 opacity-90">Aplica en la vida real lo aprendido</p>
          </div>
          <div className="bg-white/20 p-4 rounded-2xl border border-white/10 group-hover:rotate-12 transition-transform z-10">
            <Lightbulb className="text-white w-8 h-8" />
          </div>
          <div className="absolute top-0 right-0 w-32 h-full bg-white/5 -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </div>
      </div>
    </div>
  );
}