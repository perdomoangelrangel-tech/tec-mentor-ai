// src/data/knowledgeBase.js
export const knowledgeBase = {
  matematicas: {
    temas: {
      "calculo_integral": {
        pregunta_filtro: "¿Te refieres a integrales definidas o indefinidas?",
        concepto_digerible: "Imagina que una integral es como una máquina que suma infinitos pedacitos de algo para hallar el total de un área.",
        temas_previos: ["Derivadas", "Límites", "Áreas básicas"],
        guia_paso_a_paso: "Primero identifica los límites; luego, busca una primitiva..."
      }
    }
  },
  programacion: {
    temas: {
      "react_hooks": {
        pregunta_filtro: "¿Estás trabajando con componentes funcionales o de clase?",
        concepto_digerible: "Los Hooks son como 'superpoderes' que le dan memoria a funciones que normalmente no recordaban nada.",
        temas_previos: ["Funciones JavaScript", "Scope", "Arreglos"],
        guia_paso_a_paso: "Importa el hook, inicializa el estado y define cómo cambiará..."
      }
    }
  },
  fisica: {
    temas: {
      "leyes_newton": {
        pregunta_filtro: "¿Quieres analizar equilibrio de fuerzas (Estática) o movimiento (Dinámica)?",
        concepto_digerible: "Son las reglas del juego del universo: por qué las cosas se mueven o se quedan quietas.",
        temas_previos: ["Vectores", "Masa y Peso", "Aceleración"],
        guia_paso_a_paso: "Dibuja un diagrama de cuerpo libre, suma las fuerzas e iguala a masa por aceleración."
      }
    }
  }
};