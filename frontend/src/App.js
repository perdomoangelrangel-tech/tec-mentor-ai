import { useState } from "react";
import { Navigation } from "./components/custom/Navigation";
import Dashboard from "./screens/Dashboard"; 
import { ChatTutor } from "./screens/ChatTutor";
import { CognitiveProfile } from "./screens/CognitiveProfile";
import { ProgressBoard } from "./screens/ProgressBoard";
import { AdaptiveChallenges } from "./screens/AdaptiveChallenges";
import { AILaboratory } from "./screens/AILaboratory";
import { LearningRoutes } from "./screens/LearningRoutes";
import { TeacherPanel } from "./screens/TeacherPanel";
import { Login } from "./screens/Login"; 
import ExamenConfig from "./components/custom/ExamenConfig";

function App() {
  const [user, setUser] = useState(null); 
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [selectedMateria, setSelectedMateria] = useState("matematicas");

  const handleNavigate = (screen, data) => {
    // 🛡️ Guardia de Seguridad: Evita que el estudiante acceda al panel docente
    if (screen === 'teacher' && user?.role !== 'teacher') {
      setCurrentScreen('dashboard');
      return;
    }

    setCurrentScreen(screen);
    if (typeof data === 'string') {
        setSelectedMateria(data);
    } 
    else if (data && data.materia) {
        setSelectedMateria(data.materia);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    // Redirección inicial basada en rol
    if (userData.role === 'teacher') {
      setCurrentScreen('teacher');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard": 
        return <Dashboard onNavigate={handleNavigate} />;
      case "chat": 
        return <ChatTutor />;
      case "perfil": 
      case "cognitive": 
        return <CognitiveProfile />;
      case "progress": 
        return <ProgressBoard />;
      case "challenges": 
        return <AdaptiveChallenges initialFilter={selectedMateria} />;
      case "laboratory": 
        return <AILaboratory />;
      case "rutas": 
      case "routes": 
        return <LearningRoutes initialMateria={selectedMateria} onNavigate={handleNavigate} />;
      case "exam": 
        return <ExamenConfig />;
      case "teacher": 
        // 🔐 Verificación doble en el renderizado
        return user.role === 'teacher' ? <TeacherPanel /> : <Dashboard onNavigate={handleNavigate} />;
      default: 
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1f] text-white">
      {/* Navigation ahora sabe el rol para ocultar botones prohibidos */}
      <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} userRole={user.role} />
      
      <main className="lg:ml-64 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-4">
              <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider border ${
                user.role === 'teacher' 
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {user.role === 'teacher' ? '👨‍🏫 Panel Docente' : '👨‍🎓 Sesión Estudiante'}
              </span>
          </div>
          
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {renderScreen()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;