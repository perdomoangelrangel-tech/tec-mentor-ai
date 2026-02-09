import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const CognitiveRadar = ({ data }) => {
  // Mapeamos los datos de las métricas al formato que necesita Recharts
  const chartData = [
    { subject: 'Lógica', A: data.logica, fullMark: 100 },
    { subject: 'Comprensión', A: data.comprension, fullMark: 100 },
    { subject: 'Abstracción', A: data.abstraccion, fullMark: 100 },
    { subject: 'Memoria', A: data.memoria, fullMark: 100 },
    { subject: 'Resolución', A: data.resolucion, fullMark: 100 },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-3xl p-4">
      <h2 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Espectro Cognitivo</h2>
      
      {/* Ajustamos el tamaño a 300px para evitar errores de ResponsiveContainer */}
      <RadarChart cx={150} cy={150} outerRadius={100} width={300} height={300} data={chartData}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 'bold' }} 
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="Perfil"
          dataKey="A"
          stroke="#6366f1"
          strokeWidth={3}
          fill="#6366f1"
          fillOpacity={0.5}
        />
      </RadarChart>
    </div>
  );
};

export default CognitiveRadar;