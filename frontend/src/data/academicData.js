// src/data/academicData.js
export const ACADEMIC_DATA = {
  matematicas: {
    color: "#a855f7",
    ruta: [
      { id: "m1", titulo: "Aritmética Básica", estado: "completado" },
      { id: "m2", titulo: "Álgebra Lineal", estado: "actual" },
      { id: "m3", titulo: "Derivadas e Integrales", estado: "bloqueado" },
      { id: "m4", titulo: "Ecuaciones Diferenciales", estado: "bloqueado" },
    ]
  },
  quimica: {
    color: "#10b981",
    ruta: [
      { id: "q1", titulo: "Estructura Atómica", estado: "actual" },
      { id: "q2", titulo: "Enlaces Químicos", estado: "bloqueado" },
      { id: "q3", titulo: "Estequiometría", estado: "bloqueado" },
      { id: "q4", titulo: "Química Orgánica", estado: "bloqueado" },
    ]
  },
  fisica: {
    color: "#06b6d4",
    ruta: [
      { id: "f1", titulo: "Cinemática y Movimiento", estado: "actual" },
      { id: "f2", titulo: "Leyes de Newton", estado: "bloqueado" },
      { id: "f3", titulo: "Energía y Trabajo", estado: "bloqueado" },
      { id: "f4", titulo: "Termodinámica", estado: "bloqueado" },
    ]
  },
  programacion: {
    color: "#3b82f6",
    ruta: [
      { id: "p1", titulo: "Lógica de Programación", estado: "completado" },
      { id: "p2", titulo: "Estructuras de Datos", estado: "actual" },
      { id: "p3", titulo: "Desarrollo Frontend", estado: "bloqueado" },
      { id: "p4", titulo: "Arquitectura Backend", estado: "bloqueado" },
    ]
  },
  literatura: {
    color: "#ec4899",
    ruta: [
      { id: "l1", titulo: "Análisis Literario", estado: "actual" },
      { id: "l2", titulo: "Géneros Narrativos", estado: "bloqueado" },
      { id: "l3", titulo: "Poesía y Dramaturgia", estado: "bloqueado" },
    ]
  },
  historia: {
    color: "#f97316",
    ruta: [
      { id: "h1", titulo: "Civilizaciones Antiguas", estado: "actual" },
      { id: "h2", titulo: "Edad Media y Renacimiento", estado: "bloqueado" },
      { id: "h3", titulo: "Revoluciones Industriales", estado: "bloqueado" },
      { id: "h4", titulo: "Historia Contemporánea", estado: "bloqueado" },
    ]
  }
};