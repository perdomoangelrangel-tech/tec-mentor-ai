import { TrendingUp, Clock, Award, Zap, Calculator, Beaker, Atom, Code, Book, Globe, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import SkillTree from "../components/custom/SkillTree"; 

export function ProgressBoard() {
  const [stats, setStats] = useState({
    total_points: 0,
    level: 1,
    bar_percentage: 0,
    rank: "Cargando...",
    streak_days: 1,
    time_study: "0h", 
    concepts_mastered: 0,
    subjects_progress: null 
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:8000/stats/temp-student`);
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error al conectar con el servidor de progreso:", error);
      }
    };
    fetchStats();
  }, []);

  // Definición de las 6 materias actuales
  const subjects = [
    {
      id: "matematicas",
      name: "Matemáticas",
      icon: Calculator,
      bgGradient: "from-purple-900/30 to-purple-800/20",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-600",
      progressColor: "bg-purple-500",
      textColor: "text-purple-400",
      total: stats.subjects_progress?.Matemáticas?.total || 0,
    },
    {
      id: "quimica",
      name: "Química",
      icon: Beaker,
      bgGradient: "from-emerald-900/30 to-emerald-800/20",
      borderColor: "border-emerald-500/30",
      iconBg: "bg-emerald-600",
      progressColor: "bg-emerald-500",
      textColor: "text-emerald-400",
      total: stats.subjects_progress?.Quimica?.total || 0,
    },
    {
      id: "fisica",
      name: "Física",
      icon: Atom,
      bgGradient: "from-cyan-900/30 to-cyan-800/20",
      borderColor: "border-cyan-500/30",
      iconBg: "bg-cyan-600",
      progressColor: "bg-cyan-500",
      textColor: "text-cyan-400",
      total: stats.subjects_progress?.Fisica?.total || 0,
    },
    {
      id: "programacion",
      name: "Programación",
      icon: Code,
      bgGradient: "from-blue-900/30 to-blue-800/20",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-600",
      progressColor: "bg-blue-500",
      textColor: "text-blue-400",
      total: stats.subjects_progress?.Programacion?.total || 0,
    },
    {
      id: "literatura",
      name: "Literatura",
      icon: Book,
      bgGradient: "from-pink-900/30 to-pink-800/20",
      borderColor: "border-pink-500/30",
      iconBg: "bg-pink-600",
      progressColor: "bg-pink-500",
      textColor: "text-pink-400",
      total: stats.subjects_progress?.Literatura?.total || 0,
    },
    {
      id: "historia",
      name: "Historia",
      icon: Book,
      bgGradient: "from-orange-900/30 to-orange-800/20",
      borderColor: "border-orange-500/30",
      iconBg: "bg-orange-600",
      progressColor: "bg-orange-500",
      textColor: "text-orange-400",
      total: stats.subjects_progress?.Historia?.total || 0,
    }
  ];

  // LÓGICA DE DETECCIÓN DE REZAGO: Encuentra la materia con el % más bajo
  const criticalSubject = [...subjects].sort((a, b) => a.total - b.total)[0];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tablero de Progreso Inteligente</h1>
          <p className="text-gray-400">Rango actual: <span className="text-blue-400 font-mono">{stats.rank}</span></p>
        </div>
        <div className="flex flex-col items-end px-4 py-2 bg-gray-900/80 rounded-xl border border-blue-500/20">
          <span className="text-[10px] text-gray-500 uppercase font-bold">Total XP</span>
          <span className="text-xl font-bold text-blue-400">{stats.total_points} XP</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/50 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600/20 rounded-lg"><TrendingUp className="w-5 h-5 text-blue-400" /></div>
            <span className="text-gray-400 text-sm">Nivel {stats.level}</span>
          </div>
          <p className="text-3xl font-bold text-white">{Math.round(stats.bar_percentage)}%</p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
             <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${stats.bar_percentage}%` }} />
          </div>
        </div>

        <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600/20 rounded-lg"><Clock className="w-5 h-5 text-purple-400" /></div>
            <span className="text-gray-400 text-sm">Estudio total</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.time_study}</p>
        </div>

        <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600/20 rounded-lg"><Award className="w-5 h-5 text-green-400" /></div>
            <span className="text-gray-400 text-sm">Habilidades</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.concepts_mastered}</p>
        </div>

        <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-600/20 rounded-lg"><Zap className="w-5 h-5 text-orange-400" /></div>
            <span className="text-gray-400 text-sm">Racha</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.streak_days} días</p>
        </div>
      </div>

      {/* Área Crítica - Detección Automática de Rezago (Basada en Imagen 3) */}
      <div className="bg-orange-500/10 rounded-[2rem] p-6 border border-orange-500/30 shadow-lg shadow-orange-900/10">
        <div className="flex gap-6 items-center">
          <div className="bg-orange-500 p-4 rounded-2xl shadow-lg">
            <AlertTriangle className="text-white w-8 h-8" />
          </div>
          <div>
            <h4 className="text-orange-400 font-black text-xl uppercase tracking-tighter">Análisis de IA: Rezago Detectado</h4>
            <p className="text-slate-300">
              Tu progreso en <span className="text-white font-bold">{criticalSubject?.name}</span> es de solo <span className="text-white font-bold">{criticalSubject?.total}%</span>. 
              Te recomendamos iniciar un reto aplicado para mejorar tu comprensión en esta área.
            </p>
          </div>
        </div>
      </div>

      {/* Skill Tree Map */}
      <div className="bg-gray-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-8">
        <h3 className="text-xl font-bold text-white mb-1 italic tracking-tight">MAPA DE CONOCIMIENTO ADAPTATIVO</h3>
        <p className="text-gray-500 text-sm mb-6 uppercase font-black tracking-widest">Sincronización con Red Neuronal IA</p>
        <SkillTree studentId="temp-student" />
      </div>

      {/* Subject Cards (6 Materias) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <div key={subject.name} className={`bg-gradient-to-br ${subject.bgGradient} rounded-[2rem] p-6 border ${subject.borderColor} backdrop-blur-sm shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${subject.iconBg} rounded-xl shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{subject.name}</h3>
                    <div className="w-24 bg-black/40 rounded-full h-1.5 mt-2">
                      <div className={`${subject.progressColor} h-full rounded-full transition-all duration-1000`} style={{ width: `${subject.total}%` }} />
                    </div>
                  </div>
                </div>
                <span className={`text-2xl font-black ${subject.textColor}`}>{subject.total}%</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Progreso Materia</span>
                <span className={subject.textColor}>Nivel Actual</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}