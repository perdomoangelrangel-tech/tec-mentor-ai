import { Home, Brain, TrendingUp, FlaskConical, Target, Map, FileCheck, MessageSquare, GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { id: "dashboard", label: "Inicio", icon: Home },
  { id: "cognitive", label: "Perfil Cognitivo", icon: Brain },
  { id: "progress", label: "Progreso", icon: TrendingUp },
  { id: "laboratory", label: "Laboratorio AI", icon: FlaskConical },
  { id: "challenges", label: "Retos", icon: Target },
  { id: "routes", label: "Rutas", icon: Map },
  { id: "exam", label: "Examen", icon: FileCheck },
  { id: "chat", label: "Chat IA", icon: MessageSquare },
  { id: "teacher", label: "Docente", icon: GraduationCap },
];

export function Navigation({ currentScreen, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-4 left-4 z-50 bg-[#11162d] text-white p-2 rounded-lg border border-white/10">
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside className={`fixed left-0 top-0 h-full bg-[#0a0e1f] border-r border-white/5 z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-64`}>
        
        {/* BRANDING DE TEXTO RESTAURADO */}
        <div className="p-8 mb-2">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white tracking-tighter leading-none">
              TEC MENTOR
            </span>
            <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] mt-1">
              AI PLATFORM
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40 font-bold" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {isOpen && <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30" />}
    </>
  );
}