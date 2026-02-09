import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Se agregó TrendingUp a las importaciones para corregir el error [eslint]
import { Brain, Lock, CheckCircle, Star, Zap, TrendingUp } from 'lucide-react';

function SkillTree() {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    // Función para sincronizar la XP desde el almacenamiento local
    const updateXp = () => {
      const savedXp = localStorage.getItem("user_xp");
      setXp(savedXp ? parseInt(savedXp) : 0);
    };

    updateXp();
    
    // Escuchar cambios en otras pestañas/componentes
    window.addEventListener('storage', updateXp);
    return () => window.removeEventListener('storage', updateXp);
  }, []);

  // Definición de los nodos del árbol basados en el progreso real
  const nodes = [
    { id: 1, label: "Fundamentos", requiredXp: 0, icon: Brain },
    { id: 2, label: "Análisis Lógico", requiredXp: 50, icon: Zap },
    { id: 3, label: "Pensamiento Crítico", requiredXp: 150, icon: Star },
    { id: 4, label: "Maestría Aplicada", requiredXp: 300, icon: CheckCircle },
  ];

  return (
    <div className="relative p-10 bg-gray-900/40 rounded-3xl border border-white/5 overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-white font-bold flex items-center gap-2">
          <TrendingUp className="text-blue-400 w-5 h-5" /> 
          Árbol de Habilidades Evolutivo
        </h3>
        <span className="text-blue-400 text-xs font-mono bg-blue-400/10 px-3 py-1 rounded-full">
          {xp} XP TOTAL
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
        {/* Línea de progreso de fondo (decorativa) */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 hidden md:block z-0" />

        {nodes.map((node) => {
          const isUnlocked = xp >= node.requiredXp;
          const Icon = node.icon;

          return (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: node.id * 0.1 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Contenedor del Icono */}
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 ${
                isUnlocked 
                ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.4)]" 
                : "bg-gray-800 border-gray-700 opacity-40"
              }`}>
                {isUnlocked ? (
                  <Icon className="text-white w-10 h-10" />
                ) : (
                  <Lock className="text-gray-500 w-8 h-8" />
                )}
              </div>

              {/* Etiquetas */}
              <div className="text-center mt-4">
                <span className={`block text-sm font-bold ${isUnlocked ? "text-blue-300" : "text-gray-600"}`}>
                  {node.label}
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                  {isUnlocked ? "Completado" : `Bloqueado (${node.requiredXp} XP)`}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillTree;