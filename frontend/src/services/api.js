export const api = {
  get: async (url) => ({ data: {} }),
  post: async (url, data) => ({ data: {} })
};

export const sendChatMessage = async (message, level) => {
  await new Promise(r => setTimeout(r, 1000));
  return {
    content: "Entiendo tu pregunta. ¿Qué has intentado hasta ahora?",
    level: level,
    suggestions: ["Dame una pista", "Explícame paso a paso"]
  };
};

export default api;
