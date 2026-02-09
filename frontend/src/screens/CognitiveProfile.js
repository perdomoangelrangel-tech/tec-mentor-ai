import { Brain, TrendingUp, Lightbulb, Activity, CheckCircle, AlertCircle, Zap, Eye, MousePointer2, Info } from "lucide-react";
import { useState, useEffect } from "react";

// CORRECCIÓN DE RUTA: Subimos un nivel (..) para entrar a components
import CognitiveRadar from "../components/custom/CognitiveRadar";

export function CognitiveProfile() {
  // 1. Iniciamos TODO en 0 para el efecto de carga
  const [metrics, setMetrics] = useState({
    logica: 0,
    comprension: 0,
    abstraccion: 0, 
    memoria: 0,
    resolucion: 0,
    errores: 0,
    intentos: 0
  });

  const [estiloReal, setEstiloReal] = useState({
    nombre: "Analizando...",
    tipo: "Pendiente de datos",
    descripcion: "Completa actividades para que la IA determine tu perfil basado en tipologías cognitivas."
  });

  useEffect(() => {
    const loadData = () => {
      // Extraemos datos reales del almacenamiento
      const xp = parseInt(localStorage.getItem("user_xp") || "0");
      const err = parseInt(localStorage.getItem("user_errors") || "0");
      const correctas = parseInt(localStorage.getItem("user_correct") || "0");

      // Lógica de crecimiento proporcional
      const nuevasMetrics = {
        logica: Math.min(Math.floor(xp / 5), 100),
        comprension: Math.min(Math.floor(xp / 6), 100),
        abstraccion: Math.min(Math.floor(xp / 10), 100),
        memoria: Math.min(Math.floor(xp / 4), 100),
        resolucion: Math.min(Math.floor(xp / 8), 100),
        errores: err,
        intentos: correctas + err
      };

      setMetrics(nuevasMetrics);
      determinarEstilo(nuevasMetrics);
    };

    loadData();
    // Escuchamos cambios globales para actualizar en tiempo real
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // 2. Lógica de Estilos Cognitivos basada en el estudio
  const determinarEstilo = (m) => {
    if (m.intentos === 0) return;

    if (m.errores > m.intentos * 0.4) {
      setEstiloReal({
        nombre: "Impulsivo",
        tipo: "Reflexividad vs Impulsividad",
        descripcion: "Respondes rápido pero con margen de error. Trabajaremos en la pausa analítica."
      });
    } 
    else if (m.logica > m.comprension + 20) {
      setEstiloReal({
        nombre: "Independiente de Campo",
        tipo: "Dependencia vs Independencia",
        descripcion: "Capacidad alta de abstraer elementos fuera de su contexto global."
      });
    }
    else if (m.logica > 50 && m.memoria > 50) {
      setEstiloReal({
        nombre: "Convergente",
        tipo: "Convergente vs Divergente",
        descripcion: "Buscas soluciones concretas basadas en datos y lógica existente."
      });
    }
    else {
      setEstiloReal({
        nombre: "Global / Holístico",
        tipo: "Global vs Analítico",
        descripcion: "Percibes la información como un todo antes de desglosar los detalles."
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 p-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Perfil Cognitivo</h1>
          <p className="text-gray-400 text-sm">Análisis adaptativo de procesamiento neuronal</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl hidden md:block">
           <span className="text-blue-400 text-xs font-mono font-bold uppercase tracking-widest">Estado: Activo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA 1: MÉTRICAS (Barras) */}
        <div className="bg-slate-900/40 border border-white/5 backdrop-blur-md rounded-3xl p-6">
          <h2 className="text-sm font-bold text-gray-500 mb-6 flex items-center gap-2 uppercase tracking-tighter">
            <Activity className="w-4 h-4 text-blue-400" />
            Capacidades Base
          </h2>
          <div className="space-y-5">
            {[
              { label: "Lógica", val: metrics.logica, color: "bg-blue-500" },
              { label: "Comprensión", val: metrics.comprension, color: "bg-emerald-500" },
              { label: "Abstracción", val: metrics.abstraccion, color: "bg-purple-500" },
              { label: "Memoria", val: metrics.memoria, color: "bg-amber-500" },
              { label: "Resolución", val: metrics.resolucion, color: "bg-rose-500" }
            ].map((item) => (
              <div key={item.label} className="group">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-400 group-hover:text-white transition-colors">{item.label}</span>
                  <span className="text-white font-mono">{item.val}%</span>
                </div>
                <div className="w-full bg-gray-800/30 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${item.val}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA 2: RADAR CHART (Visualización Pro) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           {/* El componente importado con la ruta corregida */}
           <CognitiveRadar data={metrics} />
           
           <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Brain className="w-24 h-24 text-white" />
              </div>
              <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{estiloReal.tipo}</p>
              <h3 className="text-2xl font-bold text-white mb-2">{estiloReal.nombre}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{estiloReal.descripcion}</p>
           </div>
        </div>

        {/* COLUMNA 3: INSIGHTS Y RECOMENDACIONES */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex-1">
            <h2 className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2 uppercase tracking-tighter">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Recomendación IA
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl border-l-2 border-l-yellow-500">
                <p className="text-xs text-gray-300 italic leading-relaxed">
                  "Basado en tu nivel de <strong>{metrics.logica > metrics.comprension ? 'Lógica' : 'Comprensión'}</strong>, 
                  tu cerebro procesa mejor los datos estructurados. Intenta los retos de nivel Plata."
                </p>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Siguiente Hito</h4>
                  <p className="text-[10px] text-gray-500">Llegar a 150 XP para desbloquear Pensamiento Crítico.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-rose-500/5 border border-rose-500/10 rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <div className="bg-rose-500/20 p-2 rounded-lg">
                <AlertCircle className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <span className="block text-xs font-bold text-rose-400 uppercase tracking-tighter">Análisis de Errores</span>
                <span className="text-[10px] text-gray-500">{metrics.errores} fallos detectados en total.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}