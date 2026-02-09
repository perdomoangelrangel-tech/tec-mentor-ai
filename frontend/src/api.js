// frontend/src/api.js

const USE_MOCK = true; 

// 1. ROLES DE USUARIO: Para controlar qué ve cada quién
export const USER_ROLES = {
    STUDENT: 'estudiante',
    TEACHER: 'profesor',
    LEARNER: 'aprendiz'
};

const MODE_PROMPTS = {
  simple: `Eres Tec Mentor AI. Explica conceptos de forma ultra simple usando analogías cotidianas (cocina, deportes, música). Máximo 3 puntos clave. NO resuelvas el problema, guía al estudiante.`,
  logical: `Eres Tec Mentor AI. Estructura tu respuesta: 1) PREMISA (reglas), 2) ANÁLISIS (pasos lógicos), 3) CONEXIÓN (principios). Usa lenguaje preciso.`,
  hints: `Eres Tec Mentor AI. Da EXACTAMENTE 3 pistas estratégicas: 🔍 Pista 1 (concepto a revisar), 🔍 Pista 2 (método), 🔍 Pista 3 (pregunta guía). NUNCA des la respuesta.`,
  practical: `Eres Tec Mentor AI. Conecta con aplicaciones reales: industria tecnológica, finanzas personales, o apps que use el estudiante. Incluye ejercicio práctico inmediato.`
};

export const sendChatMessage = async (message, mode = 'simple', userContext = {}) => {
  console.log('Sending message:', message, 'Mode:', mode);

  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResponses = {
      simple: `¡Entiendo tu pregunta sobre "${message}"! \n\n🎯 **Concepto simple**: Es como aprender a andar en bici. Primero necesitas estabilizadores (conceptos básicos), luego practicas equilibrio (ejercicios), y finalmente andas solo (maestría).\n\n🤔 **Para que lo entiendas mejor**: Piensa en un ejemplo de tu vida cotidiana donde uses esto.\n\n¿Qué parte te gustaría practicar primero?`,

      logical: `Analicemos "${message}" paso a paso:\n\n📋 **Premisa 1**: Todo sistema sigue reglas fundamentales\n📋 **Premisa 2**: Este problema tiene patrones reconocibles \n📋 **Conclusión**: Podemos resolverlo identificando esos patrones lógicamente\n\n🔍 **Siguiente paso**: ¿Puedes identificar qué patrones reconoces aquí antes de calcular?`,

      hints: `Aquí van tus pistas para resolverlo sin darte la respuesta:\n\n🔍 **Pista 1**: Revisa el ejemplo 3 de tu libro de texto, tiene un patrón idéntico\n🔍 **Pista 2**: Este problema requiere el método de "dividir y conquistar" - separa en partes\n🔍 **Pista 3**: ¿Qué pasaría si simplificaras los números a algo más pequeño primero?\n\nIntenta con estas pistas y dime qué descubres.`,

      practical: `Aplicación práctica de "${message}":\n\n📱 **En tu celular**: Cuando usas Google Maps para calcular la ruta más corta, usa estos principios para optimizar\n💰 **En tus finanzas**: Ayuda a calcular el mejor momento para invertir o ahorrar  \n🎮 **En videojuegos**: Los personajes controlados por computadora usan esto para tomar decisiones\n\n💡 **Ejercicio ahora**: Piensa en una app que uses diariamente. ¿Cómo crees que usa este concepto?\n\n¿En qué área de tu vida cotidiana crees que más te serviría dominar esto?`
    };

    return {
      content: mockResponses[mode] || mockResponses.simple,
      mode: mode,
      timestamp: new Date().toISOString(),
      suggestions: mode === 'hints' ? [] : ["Dame otra pista", "Explícame diferente", "Ejemplo más específico"]
    };
  }
};

// ==========================================
// NUEVAS FUNCIONES PARA EL PERFIL COGNITIVO
// ==========================================

export const analyzeCognitiveProfile = (userInteractions) => {
  const calculateMetric = (interactions, metricType) => {
    const relevant = interactions.filter(i => {
      if (metricType === 'logica') return ['math', 'algorithm', 'logic', 'physics'].includes(i.type);
      if (metricType === 'comprension') return ['reading', 'text', 'theory'].includes(i.type);
      if (metricType === 'abstraccion') return ['pattern', 'concept', 'abstract'].includes(i.type); // Sincronizado con Radar
      if (metricType === 'memoria') return ['recall', 'review'].includes(i.type);
      if (metricType === 'resolucion') return ['problem', 'exercise'].includes(i.type);
      return false;
    });

    if (relevant.length === 0) return 50; 

    const avgSuccess = relevant.reduce((acc, curr) => acc + (curr.success ? 1 : 0), 0) / relevant.length;
    const avgTime = relevant.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0) / relevant.length;
    
    let score = 40 + (avgSuccess * 40); 
    if (avgTime > 300) score += 10; 
    
    return Math.min(100, Math.round(score));
  };

  return {
    logica: calculateMetric(userInteractions, 'logica'),
    comprension: calculateMetric(userInteractions, 'comprension'),
    abstraccion: calculateMetric(userInteractions, 'abstraccion'), // Nombre corregido para el Radar
    memoria: calculateMetric(userInteractions, 'memoria'),
    resolucion: calculateMetric(userInteractions, 'resolucion'),
    lastUpdated: new Date().toLocaleString('es-ES')
  };
};

// ==========================================
// LÓGICA DE ROLES Y SESIÓN (Simulada)
// ==========================================

export const loginUser = async (email, password) => {
    await new Promise(r => setTimeout(r, 800));
    return {
        id: "user_123",
        name: "Usuario Demo",
        role: USER_ROLES.STUDENT, 
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    };
};

// ... Mantenemos tus funciones de detectDominantStyle, checkRouteUnlock, generateQuestion, etc. igual que antes