import { Clock, TrendingUp, Trophy, AlertCircle, FileCheck } from "lucide-react";
import { useState } from "react";

export function ExamMode() {
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (showResults) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Resultados del Examen</h1>
          <p className="text-gray-400">Análisis predictivo de tu desempeño</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/30 rounded-2xl p-8 border border-green-500/30">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-600 rounded-full p-6 mb-4">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-white mb-2">87%</h2>
            <p className="text-green-300 text-xl">Probabilidad de Aprobar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-1">Respuestas Correctas</p>
              <p className="text-white font-bold text-2xl">18/20</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-1">Tiempo Promedio</p>
              <p className="text-white font-bold text-2xl">45 seg</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-1">Precisión</p>
              <p className="text-white font-bold text-2xl">90%</p>
            </div>
          </div>
        </div>

        <button onClick={() => { setShowResults(false); setExamStarted(false); }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold">
          Volver al Inicio
        </button>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Modo Examen</h1>
          <p className="text-gray-400">Simulación de evaluación real con IA adaptativa</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-600 rounded-xl p-4 mb-4">
              <FileCheck className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Examen de Física</h2>
            <p className="text-gray-300">Mecánica y Leyes de Newton</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm mb-1">Duración</p>
              <p className="text-white font-bold">30 minutos</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50 text-center">
              <p className="text-gray-400 text-sm mb-1">Preguntas</p>
              <p className="text-white font-bold text-2xl">20</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50 text-center">
              <p className="text-gray-400 text-sm mb-1">Tipo</p>
              <p className="text-white font-bold">Adaptativo</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/50 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm mb-1">Puntos</p>
              <p className="text-white font-bold">500 XP</p>
            </div>
          </div>

          <div className="bg-blue-900/40 rounded-lg p-4 border border-blue-500/30 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <p className="text-white font-semibold mb-1">Examen Adaptativo</p>
                <p className="text-gray-300 text-sm">La dificultad se ajusta automáticamente según tus respuestas.</p>
              </div>
            </div>
          </div>

          <button onClick={() => setExamStarted(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg">
            Comenzar Examen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 rounded-lg px-4 py-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-lg">24:15</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Pregunta 5 de 20</p>
            <div className="flex gap-1 mt-1">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? "bg-blue-600" : "bg-gray-700"}`} />
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => setShowResults(true)} className="text-red-400 hover:text-red-300">
          Finalizar
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-500/20">
        <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
          DIFICULTAD MEDIA
        </span>
        <h3 className="text-2xl font-bold text-white mb-4">
          Un objeto de 5 kg se mueve con una velocidad inicial de 10 m/s. Si se le aplica una fuerza
          de fricción de 15 N, ¿cuánto tiempo tarda en detenerse?
        </h3>

        <div className="space-y-3">
          {["3.33 segundos", "5.00 segundos", "7.50 segundos", "10.00 segundos"].map((option, index) => (
            <button key={index}
              className="w-full bg-gray-900/60 hover:bg-blue-900/40 border-2 border-gray-700 hover:border-blue-500 text-white p-4 rounded-lg text-left transition-all">
              <span className="inline-block w-8 h-8 rounded-full bg-gray-700 text-center leading-8 mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}