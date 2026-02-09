import { 
  Send, BookOpen, Brain, Target, FlaskConical, 
  Lightbulb, Paperclip, X, Image as ImageIcon 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// --- BASE DE CONOCIMIENTO (Enfoque en las 6 Materias Clave) ---
const knowledgeBase = {
  fisica: {
    temas: {
      "newton": {
        pregunta_filtro: "¿Quieres analizar fuerzas en reposo (Estática) o en movimiento (Dinámica)?",
        concepto_digerible: "Las leyes de Newton son las reglas del juego del universo: nada se mueve sin un 'empujón' y toda acción tiene una reacción igual.",
        temas_previos: ["Vectores", "Masa y Peso", "Aceleración"],
        guia_paso_a_paso: "Dibuja un diagrama de cuerpo libre para ver todas las fuerzas. ¿Qué fuerzas están actuando ahora mismo?"
      },
      "cinematica": {
        pregunta_filtro: "¿Es un problema de velocidad constante o estamos incluyendo aceleración?",
        concepto_digerible: "Es el estudio del movimiento puro. Imagina trazar la línea que deja un avión en el cielo.",
        temas_previos: ["Unidades de medida", "Desplazamiento"],
        guia_paso_a_paso: "Identifica qué datos tienes: ¿Distancia, tiempo o velocidad? Empecemos por la fórmula base."
      }
    }
  },
  matematicas: {
    temas: {
      "calculo": {
        pregunta_filtro: "¿Te refieres a integrales (áreas) o derivadas (cambios instantáneos)?",
        concepto_digerible: "El cálculo es como ver una película: las derivadas son fotos fijas del movimiento, y las integrales son la suma de todas esas fotos.",
        temas_previos: ["Límites", "Funciones", "Álgebra"],
        guia_paso_a_paso: "Identifica si necesitas encontrar una razón de cambio o un acumulado. ¿Cuál es la función principal?"
      },
      "algebra": {
        pregunta_filtro: "¿Es una ecuación lineal o estamos buscando una incógnita al cuadrado?",
        concepto_digerible: "Es como una balanza: lo que quitas de un lado, debes quitarlo del otro para que el signo '=' siga siendo verdad.",
        temas_previos: ["Aritmética", "Leyes de signos"],
        guia_paso_a_paso: "Agrupa las 'X' de un lado y los números del otro. ¿Qué operación está estorbando a tu variable?"
      }
    }
  },
  quimica: {
    temas: {
      "reacciones": {
        pregunta_filtro: "¿Es una reacción de combustión o un balanceo por tanteo?",
        concepto_digerible: "Las reacciones son como recetas: los átomos se separan y se vuelven a unir para crear algo nuevo.",
        temas_previos: ["Tabla periódica", "Enlaces moleculares"],
        guia_paso_a_paso: "Cuenta cuántos átomos hay de cada lado. ¡Nada se crea ni se destruye, solo se transforma!"
      }
    }
  },
  literatura: {
    temas: {
      "analisis": {
        pregunta_filtro: "¿Estamos analizando la estructura de un poema o el contexto de una novela?",
        concepto_digerible: "Analizar literatura es como ser un detective: buscamos pistas (recursos) para entender qué sentía el autor.",
        temas_previos: ["Figuras retóricas", "Géneros literarios"],
        guia_paso_a_paso: "Lee el texto y busca las palabras que más se repiten. ¿Qué emoción te generan?"
      }
    }
  },
  historia: {
    temas: {
      "procesos": {
        pregunta_filtro: "¿Quieres entender las causas políticas o las consecuencias sociales de este evento?",
        concepto_digerible: "La historia no es una lista de fechas, es un hilo de sucesos donde uno empuja al siguiente.",
        temas_previos: ["Cronología", "Geografía política"],
        guia_paso_a_paso: "Ubiquémonos: ¿Qué estaba pasando en el mundo justo antes de este suceso?"
      }
    }
  },
  programacion: {
    temas: {
      "react": {
        pregunta_filtro: "¿Estás trabajando con el estado (useState) o con el ciclo de vida (useEffect)?",
        concepto_digerible: "React es como construir con LEGOs: haces piezas pequeñas (componentes) que se arman para crear algo grande.",
        temas_previos: ["JavaScript ES6", "DOM", "Funciones"],
        guia_paso_a_paso: "Antes del código, piensa: ¿Qué parte de la pantalla debe cambiar cuando el usuario haga algo?"
      }
    }
  }
};

export function ChatTutor() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "¡Hola! Soy tu tutor IA. Me especializo en Física, Matemáticas, Literatura, Historia, Química y Programación. ¿Qué materia exploramos hoy?",
      mode: "simple",
      modeName: "Estándar (Prepa/Uni)",
      prerequisites: []
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentMode, setCurrentMode] = useState("simple");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const modes = [
    { id: "simple", label: "Explícamelo simple", icon: BookOpen, color: "blue", bg: "bg-blue-600", hover: "hover:bg-blue-700", border: "border-blue-500", text: "text-blue-400", lightBg: "bg-blue-500/20" },
    { id: "logical", label: "Explícamelo lógico", icon: Brain, color: "purple", bg: "bg-purple-600", hover: "hover:bg-purple-700", border: "border-purple-500", text: "text-purple-400", lightBg: "bg-purple-500/20" },
    { id: "hints", label: "Dame pistas", icon: Target, color: "green", bg: "bg-green-600", hover: "hover:bg-green-700", border: "border-green-500", text: "text-green-400", lightBg: "bg-green-500/20" },
    { id: "practical", label: "Ejemplo práctico", icon: FlaskConical, color: "orange", bg: "bg-orange-600", hover: "hover:bg-orange-700", border: "border-orange-500", text: "text-orange-400", lightBg: "bg-orange-500/20" },
  ];

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePrerequisiteClick = (topic) => {
    const prompt = `No tengo muy claro el tema de ${topic}, ¿podemos revisarlo para no tener lagunas?`;
    handleSend(prompt);
  };

  const handleSend = async (customInput) => {
    const messageText = customInput || input;
    if (!messageText.trim() && !selectedImage) return;

    setMessages((prev) => [...prev, { role: "user", content: messageText, imagePreview: previewUrl }]);
    setInput("");
    removeImage();
    setIsTyping(true);

    setTimeout(() => {
      let responseContent = "";
      let responsePrerequisites = [];
      const query = messageText.toLowerCase();
      let foundTopic = null;

      // BUSCADOR EN LAS 6 MATERIAS
      for (const cat in knowledgeBase) {
        for (const key in knowledgeBase[cat].temas) {
          if (query.includes(key) || query.includes(cat)) {
            foundTopic = knowledgeBase[cat].temas[key];
            break;
          }
        }
      }

      if (foundTopic) {
        if (query.includes("ejercicio") || query.includes("resolver") || query.includes("resultado")) {
          // REGLA: No dar respuestas, dar recursos y proceso
          responseContent = `Veo que quieres resolver un ejercicio. Mi prioridad es tu aprendizaje, así que no te daré el resultado directo. ${foundTopic.guia_paso_a_paso} ¿Cuál sería tu primer paso?`;
          responsePrerequisites = foundTopic.temas_previos;
        } else {
          // REGLA: Verificar método y explicar digerible
          responseContent = `¡Excelente! Para ayudarte mejor con este tema: ${foundTopic.pregunta_filtro} \n\n Concepto clave: ${foundTopic.concepto_digerible}`;
          responsePrerequisites = foundTopic.temas_previos;
        }
      } 
      else if (query.includes("grafica") || query.includes("laboratorio") || query.includes("comportamiento")) {
        // REGLA: Explicar comportamiento de gráficas/laboratorio
        responseContent = "El comportamiento que observas es fascinante. En el laboratorio, esto suele indicar que el sistema está alcanzando un equilibrio o un límite de saturación. ¿Cómo cambia la gráfica si modificas una de las variables?";
        responsePrerequisites = ["Variables", "Interpretación de datos"];
      }
      else {
        responseContent = "Para asegurar que no queden lagunas, ¿este tema lo estás viendo en alguna de nuestras 6 materias (Física, Matemáticas, Literatura, Historia, Química o Programación)? Dime cuál es para darte el mejor método.";
        responsePrerequisites = ["Ver materias"];
      }

      setMessages((prev) => [...prev, {
        role: "assistant",
        content: responseContent,
        mode: currentMode,
        modeName: modes.find(m => m.id === currentMode).label,
        prerequisites: responsePrerequisites
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const getCurrentMode = () => modes.find(m => m.id === currentMode);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between bg-[#11162d]/50 p-4 rounded-2xl border border-white/5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${getCurrentMode().bg} shadow-lg shadow-blue-500/10`}>
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight italic uppercase">Tec Mentor IA</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-emerald-400 uppercase font-black tracking-[0.2em]">6 Materias Clave</p>
            </div>
          </div>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getCurrentMode().lightBg} ${getCurrentMode().text} ${getCurrentMode().border}`}>
           {getCurrentMode().label}
        </span>
      </div>

      {/* Selector de Modos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setCurrentMode(mode.id)}
              disabled={isTyping}
              className={`rounded-xl p-3 transition-all text-left border flex items-center gap-3 group ${
                isActive 
                ? `${mode.bg} ${mode.border} text-white shadow-xl shadow-${mode.color}-900/30 scale-[1.02]` 
                : "bg-[#0d1121] border-white/5 text-gray-500 hover:border-white/20"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : mode.text}`} />
              <p className="text-[9px] font-black uppercase tracking-tight">{mode.label}</p>
            </button>
          );
        })}
      </div>

      {/* Área de Mensajes con Burbujas de Lagunas */}
      <div className="flex-1 bg-[#0d1121]/50 rounded-[2.5rem] border border-white/5 p-6 overflow-y-auto mb-4 no-scrollbar shadow-inner">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-[2rem] p-6 shadow-2xl ${
                message.role === "user" 
                ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none" 
                : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none backdrop-blur-sm"
              }`}>
                {message.imagePreview && <img src={message.imagePreview} alt="Upload" className="rounded-2xl mb-4 max-w-full h-48 object-cover border border-white/10" />}
                {message.role === "assistant" && <div className="text-[9px] opacity-40 font-black uppercase tracking-[0.3em] mb-2">{message.modeName}</div>}
                <p className="text-sm leading-relaxed font-medium tracking-wide">{message.content}</p>

                {message.prerequisites?.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-[10px] font-black text-blue-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2"><Brain size={14} /> Temas anteriores para evitar lagunas:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.prerequisites.map((topic, i) => (
                        <button key={i} onClick={() => handlePrerequisiteClick(topic)} className="bg-blue-500/5 text-blue-300 text-[10px] px-5 py-2.5 rounded-full border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all font-black uppercase tracking-tighter">{topic}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-3 px-6 text-blue-400/50">
               <div className="flex gap-1 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest italic">Verificando conocimientos previos...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input de Chat */}
      <div className="relative px-2">
        {previewUrl && (
          <div className="absolute -top-24 left-4 bg-[#11162d] p-3 rounded-2xl border border-blue-500/50 flex items-center gap-3 shadow-2xl">
            <img src={previewUrl} alt="Preview" className="w-16 h-16 object-cover rounded-xl" />
            <button onClick={removeImage} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"><X size={16}/></button>
          </div>
        )}
        <div className="flex gap-4 bg-[#0d1121] p-2.5 rounded-[2rem] border border-white/5 shadow-2xl">
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
          <button onClick={() => fileInputRef.current.click()} className="text-gray-500 p-4 rounded-full hover:bg-white/5"><Paperclip className="w-6 h-6" /></button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Duda de Química, Historia, Programación..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-white px-2 py-4 text-sm outline-none font-bold"
          />
          <button onClick={() => handleSend()} disabled={(!input.trim() && !selectedImage) || isTyping} className={`w-14 h-14 ${getCurrentMode().bg} text-white rounded-full flex items-center justify-center disabled:opacity-20`}>
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}