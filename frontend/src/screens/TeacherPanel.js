import { Users, TrendingDown, AlertTriangle, Award } from "lucide-react";

export function TeacherPanel() {
  const students = [
    { name: "Ana García", progress: 78, weakAreas: ["Pensamiento abstracto"], alerts: 0, streak: 12 },
    { name: "Carlos Ruiz", progress: 45, weakAreas: ["Álgebra", "Cálculo"], alerts: 2, streak: 3 },
    { name: "María López", progress: 92, weakAreas: [], alerts: 0, streak: 25 },
    { name: "Juan Pérez", progress: 34, weakAreas: ["Mecánica", "Energía", "Trigonometría"], alerts: 3, streak: 1 },
  ];

  const commonErrors = [
    { topic: "Signos en ecuaciones", frequency: 45 },
    { topic: "Conversión de unidades", frequency: 38 },
    { topic: "Aplicación de fórmulas", frequency: 32 },
    { topic: "Interpretación de gráficas", frequency: 28 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Panel Docente</h1>
        <p className="text-gray-400">Monitoreo avanzado del progreso estudiantil</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-900/30 rounded-xl p-5 border border-blue-500/20">
          <Users className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-gray-300 text-sm">Total Estudiantes</p>
          <p className="text-white font-bold text-3xl">24</p>
        </div>
        <div className="bg-green-900/30 rounded-xl p-5 border border-green-500/20">
          <Award className="w-6 h-6 text-green-400 mb-2" />
          <p className="text-gray-300 text-sm">Promedio Clase</p>
          <p className="text-white font-bold text-3xl">73%</p>
        </div>
        <div className="bg-red-900/30 rounded-xl p-5 border border-red-500/20">
          <AlertTriangle className="w-6 h-6 text-red-400 mb-2" />
          <p className="text-gray-300 text-sm">Alertas Activas</p>
          <p className="text-white font-bold text-3xl">5</p>
        </div>
        <div className="bg-purple-900/30 rounded-xl p-5 border border-purple-500/20">
          <TrendingDown className="w-6 h-6 text-purple-400 mb-2" />
          <p className="text-gray-300 text-sm">En Riesgo</p>
          <p className="text-white font-bold text-3xl">2</p>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-gray-900/60 rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h3 className="text-xl font-bold text-white">Progreso por Estudiante</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estudiante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Progreso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Áreas Débiles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-gray-800/30">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{student.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-800 rounded-full h-2">
                        <div className={`h-full rounded-full ${
                          student.progress >= 70 ? "bg-green-500" : student.progress >= 50 ? "bg-yellow-500" : "bg-red-500"
                        }`} style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className="text-white font-medium">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {student.weakAreas.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {student.weakAreas.map((area, i) => (
                          <span key={i} className="bg-red-900/30 border border-red-500/30 text-red-300 text-xs px-2 py-1 rounded">
                            {area}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-green-400 text-sm">Sin áreas débiles</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {student.alerts > 0 ? (
                      <span className="inline-flex items-center gap-1 bg-red-900/30 border border-red-500/30 text-red-300 text-xs font-medium px-3 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        {student.alerts} alertas
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-green-900/30 border border-green-500/30 text-green-300 text-xs font-medium px-3 py-1 rounded-full">
                        ✓ Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}