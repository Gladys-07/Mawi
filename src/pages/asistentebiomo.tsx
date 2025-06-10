import React, {useState} from "react";
import { Navbar, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {getChatCompletion} from "../api/chat"

// Sidebar Component
interface SidebarProps {
  isOpen: boolean;
}

const SidebarBiomo: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { title: "Inicio", icon: "lucide:home", path: "/cards" },
    { title: "Asistente de Mi Biomo", icon: "lucide:activity", path: "/asistentebiomo" },
    { title: "Nuevas Convocatorias", icon: "lucide:bell", path: "/AsNewConv" },
    { title: "Explorador de Anteproyectos", icon: "lucide:search", path: "/anteproyectos" },
    { title: "Informes, Métricas y Análisis", icon: "lucide:bar-chart-2", path: "/informes" },
  ];

  return (
    <div 
      className={`flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      {/* Logo Area */}
      <div className="flex items-center gap-2 p-4 border-b border-zinc-800">
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Icon icon="lucide:eye" className="text-zinc-900 w-4 h-4" />
        </div>
        <span className="font-medium">Mawi</span>
      </div>
      
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <Button
              variant="flat"
              color={location.pathname === item.path ? "success" : "default"}
              className={`justify-start w-full mb-1 ${location.pathname === item.path ? "bg-success-900/20 text-success" : "bg-transparent text-white"
              }`}
              startContent={<Icon icon={item.icon} width={18} height={18} />}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-auto border-t border-zinc-800 p-3">
        <Button
          variant="flat"
          color="default"
          className="justify-start w-full text-zinc-400"
          startContent={<Icon icon="lucide:help-circle" width={18} height={18} />}
          onPress={() => navigate("/soporte")} 
        >
          Contacto con el soporte
        </Button>
      </div>
    </div>
  );
};

// Main Application
export default function AsistenteBiomo() {
  const [isOpen, setIsOpen] = React.useState(true);
  //<>state type (an array of objects in this case) ([]) initial state value, an empty array.
  const [chatHistory, setChatHistory] = useState<{sender: "user" | "AI", message: string}[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  //API USE ---------------------------------------
  async function sendMessage() {
    if(!userInput.trim()) return;
    setChatHistory(prev => [...prev, {sender: "user", message: userInput}]);
    setLoading(true);
    try {
      const aiResponse = await getChatCompletion(userInput);
      //prev => nueva versión, es la función de actualización de un estado
      //lo que haces en estas lineas es decir, a lo anterior, concatena este nuevo estado.
      setChatHistory(prev => [...prev, {sender: "AI", message: aiResponse}]);
    } catch {
      setChatHistory(prev => [...prev, {sender: "AI", message: "Sorry, I encountered an error."}]);
    }
    setUserInput("");
    setLoading(false);
  }
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Sidebar */}
      <SidebarBiomo isOpen={isOpen} />
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Navbar className="border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-2">
            <Button 
              isIconOnly 
              variant="light" 
              className="text-white" 
              onPress={toggleSidebar}
            >
              {isOpen ? (
                <Icon icon="lucide:chevron-left" width={20} height={20} />
              ) : (
                <Icon icon="lucide:chevron-right" width={20} height={20} />
              )}
            </Button>
            <div>
              <h1 className="text-lg font-medium">Asistente de Mi Biomo</h1>
              <p className="text-xs text-zinc-400">Biomo.ID: 1234</p>
            </div>
          </div>
        </Navbar>
        
        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4">
          {/* CHAT MESSAGES GO HERE*/}
          <div className="flex flex-col gap-2" style={{ maxHeight: "100%", overflowY: "auto" }}>
            {/* Va mapenado cada mensaje en el historial del chat y acomoda el div segun si es de AI o de user */}
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[70%] ${msg.sender === "user" ? "bg-success-900 self-end text-right" : "bg-zinc-800 self-start text-left"}`}
              >
                {msg.message}
              </div>
            ))}
            {/* Si aun esta pensando, solo muestra este div de lado de la AI */}
            {loading && (
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 max-w-[70%] self-start">Pensando...</div>
            )}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="border-t border-zinc-800 p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Escribe..."
              variant="bordered"
              classNames={{
                base: "bg-zinc-800 rounded-md",
                inputWrapper: "bg-zinc-800 border-zinc-700 hover:border-zinc-600 focus-within:border-zinc-500",
              }}
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <Button 
              isIconOnly 
              color="success" 
              className="min-w-12 h-12"
              aria-label="Send"
              onPress={sendMessage}
              // deshablita el uso del boton si loading es true
              disabled={loading}
            >
              <Icon icon="lucide:arrow-up" width={20} height={20} />
            </Button>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}