import React, { useState, useEffect } from 'react';
import { 
  Check, Lock, Play, Star, ChevronRight, 
  Calculator, Beaker, Atom, Code, Book, History 
} from "lucide-react";
import { ACADEMIC_DATA } from '../data/academicData';

export function LearningRoutes({ initialMateria, onNavigate }) { // Añadimos onNavigate
  const [materiaActive, setMateriaActive] = useState(initialMateria || 'matematicas');

  const materiaConfig = {
    matematicas: { label: "Matemáticas", icon: Calculator, color: "#a855f7" },
    quimica: { label: "Química", icon: Beaker, color: "#10b981" },
    fisica: { label: "Física", icon: Atom, color: "#06b6d4" },
    programacion: { label: "Programación", icon: Code, color: "#3b82f6" },
    literatura: { label: "Literatura", icon: Book, color: "#ec4899" },
    historia: { label: "Historia", icon: History, color: "#f97316" }
  };

  useEffect(() => {
    if (initialMateria) {
      setMateriaActive(initialMateria);
    }
  }, [initialMateria]);

  // Función para manejar el salto a Retos
  const handleStartLearning = (materia) => {
    if (onNavigate) {
      // Navegamos a la pantalla de retos/challenges
      onNavigate('challenges', materia);
    }
  };

  if (!ACADEMIC_DATA) return <div className="text-white p-10 text-center">Cargando base de datos...</div>;
  
  const data = ACADEMIC_DATA[materiaActive];
  
  if (!data) return (
    <div className="text-red-500 p-10 text-center bg-red-500/10 rounded-xl border border-red-500/20">
      Error: La materia "{materiaActive}" no está definida.
    </div>
  );

  return (
    <div className="space-y-6 p-4 md:p-8 animate-in fade-in duration-500">
      {/* Header y Selector de Materias */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Rutas de <span style={{ color: materiaConfig[materiaActive]?.color || '#fff' }}>
              {materiaConfig[materiaActive]?.label || materiaActive}
            </span>
          </h1>
          <p className="text-gray-500 text-sm">Sigue el camino diseñado por la IA para dominar esta materia.</p>
        </div>
        
        <div className="flex bg-gray-900/80 p-1.5 rounded-2xl border border-white/10 flex-wrap gap-1 shadow-2xl">
          {Object.keys(materiaConfig).map((m) => (
            <button
              key={m}
              onClick={() => setMateriaActive(m)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase transition-all duration-300 ${
                materiaActive === m 
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {materiaConfig[m].label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor de la Ruta */}
      <div className="bg-[#11162d] rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -mr-20 -mt-20" />
        
        <div className="space-y-16 relative z-10">
          {data.ruta.map((topic, index) => (
            <div key={topic.id} className="relative">
              {/* Línea conectora */}
              {index < data.ruta.length - 1 && (
                <div className={`absolute left-10 top-24 w-1 h-20 rounded-full ${
                  topic.estado === 'completado' ? 'bg-blue-600' : 'bg-gray-800'
                }`} />
              )}

              <div className="flex flex-col md:flex-row md:items-center gap-8 group">
                {/* Círculo de Estado */}
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border-4 shadow-2xl transition-all duration-500 ${
                  topic.estado === "completado" ? "bg-blue-600 border-blue-400/50" :
                  topic.estado === "actual" ? "bg-yellow-500 border-yellow-300 animate-pulse" :
                  "bg-gray-800 border-gray-700 opacity-40"
                }`}>
                  {topic.estado === "completado" ? <Check className="w-10 h-10 text-white" strokeWidth={3} /> :
                   topic.estado === "actual" ? <Play className="w-10 h-10 text-black fill-black" /> :
                   <Lock className="w-8 h-8 text-gray-500" />}
                </div>

                {/* Información */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`text-2xl font-black tracking-tight ${
                      topic.estado === 'bloqueado' ? 'text-gray-600' : 'text-white'
                    }`}>
                      {topic.titulo}
                    </h3>
                    {topic.estado === 'completado' && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                    topic.estado === 'actual' ? 'text-yellow-500' : 'text-gray-500'
                  }`}>
                    {topic.estado === 'actual' ? '● En curso ahora' : topic.estado}
                  </p>
                </div>

                {/* BOTÓN CONECTADO A RETOS */}
                {topic.estado !== 'bloqueado' && (
                  <button 
                    onClick={() => handleStartLearning(materiaActive)}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all ${
                      topic.estado === 'actual' 
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/40' 
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {topic.estado === 'completado' ? 'Repasar Recursos' : 'Ver Retos'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}