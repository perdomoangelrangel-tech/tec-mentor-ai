import React, { useState, useEffect } from 'react';

export function ProgressIndicator({ studentId = "temp-student" }) {
  const [stats, setStats] = useState({
    level: 1,
    bar_percentage: 0,
    total_points: 0,
    rank: "Novato"
  });

  // Función para obtener los datos del servidor
  const fetchProgress = async () => {
    try {
      const response = await fetch(`http://localhost:8000/stats/${studentId}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error cargando progreso:", error);
    }
  };

  useEffect(() => {
    fetchProgress();
    // Opcional: Actualizar cada 5 segundos por si el usuario está chateando en otra pestaña
    const interval = setInterval(fetchProgress, 5000);
    return () => clearInterval(interval);
  }, [studentId]);

  return (
    <div className="bg-blue-900/30 rounded-xl p-5 border border-blue-500/20 shadow-lg shadow-blue-500/5">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">Nivel {stats.level}</p>
          <p className="text-white font-bold text-2xl">{stats.rank}</p>
        </div>
        <p className="text-gray-400 text-xs">{stats.total_points} XP Totales</p>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-3 mt-2 overflow-hidden border border-gray-700">
        <div 
          className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${stats.bar_percentage}%` }} 
        />
      </div>
      
      <p className="text-right text-[10px] text-gray-500 mt-1 font-mono">
        {Math.round(stats.bar_percentage)}% para nivel {stats.level + 1}
      </p>
    </div>
  );
}