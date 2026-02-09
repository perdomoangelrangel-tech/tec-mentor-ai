import React, { useState } from "react";
import { 
  Search, Video, Book, Clock, Star, 
  Code, Atom, Beaker, Calculator, History, Target 
} from "lucide-react";

export function AdaptiveChallenges({ initialFilter = "Matemáticas" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMateria, setFilterMateria] = useState(initialFilter);

  const materias = ["Recién Visto", "Matemáticas", "Física", "Química", "Programación", "Literatura", "Historia"];

  const recursos = [
    // HISTORIA (Nuevo)
    {
      id: 1,
      title: "La Revolución Industrial: Impacto Global",
      materia: "Historia",
      type: "Lectura",
      difficulty: "Medio",
      time: "25 min",
      progress: 0, // Todo en 0
      icon: History,
      bg: "bg-[#1a1410]",
      border: "border-orange-500/20",
      accent: "bg-orange-600",
      text: "text-orange-400"
    },
    // LITERATURA
    {
      id: 2,
      title: "Análisis Literario: El Quijote",
      materia: "Literatura",
      type: "Lectura",
      difficulty: "Medio",
      time: "20 min",
      progress: 0,
      icon: Book,
      bg: "bg-[#1a1016]",
      border: "border-rose-500/20",
      accent: "bg-rose-600",
      text: "text-rose-400"
    },
    // FÍSICA
    {
      id: 3,
      title: "Dominar la 2ª Ley de Newton",
      materia: "Física",
      type: "Interactivo",
      difficulty: "Medio",
      time: "15 min",
      progress: 0,
      icon: Atom,
      bg: "bg-[#0f172a]",
      border: "border-blue-500/20",
      accent: "bg-blue-600",
      text: "text-blue-400"
    },
    // MATEMÁTICAS
    {
      id: 4,
      title: "Ecuaciones Cuadráticas",
      materia: "Matemáticas",
      type: "Práctica",
      difficulty: "Alto",
      time: "25 min",
      progress: 0,
      icon: Calculator,
      bg: "bg-[#1e1b4b]",
      border: "border-purple-500/20",
      accent: "bg-purple-600",
      text: "text-purple-400"
    },
    // PROGRAMACIÓN
    {
      id: 5,
      title: "Introducción a React Hooks",
      materia: "Programación",
      type: "Code",
      difficulty: "Medio",
      time: "30 min",
      progress: 0,
      icon: Code,
      bg: "bg-[#061a1a]",
      border: "border-emerald-500/20",
      accent: "bg-emerald-600",
      text: "text-emerald-400"
    },
    // QUÍMICA
    {
      id: 6,
      title: "Enlaces Covalentes y Estructuras",
      materia: "Química",
      type: "Video",
      difficulty: "Bajo",
      time: "12 min",
      progress: 0,
      icon: Beaker,
      bg: "bg-[#1a1a06]",
      border: "border-yellow-500/20",
      accent: "bg-yellow-600",
      text: "text-yellow-400"
    }
  ];

  const recursosFiltrados = recursos.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterMateria === "Recién Visto") {
        // Solo muestra si ya empezó (progreso > 0)
        return r.progress > 0 && matchesSearch;
    }
    
    return r.materia === filterMateria && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Banner Reto del Día */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1e1b4b] to-[#312e81] rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
        <div className="absolute top-6 right-10 opacity-10">
            <Target className="w-32 h-32 text-white" />
        </div>
        <div className="relative z-10">
          <span className="inline-block px-4 py-1 bg-blue-600/30 border border-blue-400/30 text-blue-300 text-[10px] font-black rounded-full mb-6 uppercase tracking-widest">
            Personalizado para ti
          </span>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Reto Inicial</h2>
          <p className="text-blue-200/60 mb-8 font-medium italic">Selecciona un tema para comenzar tu viaje de aprendizaje.</p>
          
          <button className="px-10 py-4 bg-white text-indigo-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            Comenzar Evaluación
          </button>
        </div>
      </div>

      {/* Controles: Título y Buscador */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h3 className="text-2xl font-black text-white">Biblioteca de Retos</h3>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Buscar reto..."
            className="w-full bg-[#0d1121] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Selector de Materias */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {materias.map(m => (
          <button
            key={m}
            onClick={() => setFilterMateria(m)}
            className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap border ${
              filterMateria === m 
              ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40' 
              : 'bg-[#0d1121] border-white/5 text-gray-500 hover:text-gray-300'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Grid de Retos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recursosFiltrados.length > 0 ? (
          recursosFiltrados.map((recurso) => (
            <div key={recurso.id} className={`${recurso.bg} border ${recurso.border} rounded-[2.5rem] p-8 transition-all hover:bg-opacity-80 group`}>
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-[1.5rem] bg-black/40 flex items-center justify-center shrink-0 border border-white/5">
                    <recurso.icon className={`${recurso.text} w-10 h-10`} />
                </div>

                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${recurso.text}`}>
                            {recurso.materia}
                        </span>
                        <div className="flex items-center gap-4 text-gray-500 text-[11px] font-bold">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {recurso.time}</span>
                            <span className="flex items-center gap-1"><Star className={`w-3.5 h-3.5 ${recurso.text} fill-current`}/> {recurso.difficulty}</span>
                        </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-6 tracking-tight">
                        {recurso.title}
                    </h4>

                    {/* Barra de Progreso */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase text-gray-500">
                            <span>Progreso del recurso</span>
                            <span className={recurso.text}>{recurso.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                            <div 
                                className={`h-full ${recurso.accent} transition-all duration-1000`} 
                                style={{ width: `${recurso.progress}%` }}
                            />
                        </div>
                    </div>

                    <button className={`w-full mt-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white transition-all ${recurso.accent} hover:brightness-125 shadow-xl`}>
                        {recurso.progress > 0 ? 'Continuar Aprendizaje' : 'Comenzar Ahora'}
                    </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-[#0d1121] rounded-[3rem] border border-dashed border-white/5">
            <div className="max-w-xs mx-auto space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-gray-500 font-medium">No se encontraron retos en "{filterMateria}". Comienza uno nuevo en las materias disponibles.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}