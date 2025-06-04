import React from "react";
import { Navbar, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

// Sidebar Component
interface SidebarProps {
  isOpen: boolean;
}

const SidebarBiomo: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const menuItems = [
    { title: "Inicio", icon: "lucide:home", path: "/" },
    { title: "Asistente de Mi Biomo", icon: "lucide:activity", path: "/asistentebiomo" },
    { title: "Asistente de Nuevas Convocatorias", icon: "lucide:bell", path: "/convocatorias" },
    { title: "Asistente Explorador de Anteproyectos", icon: "lucide:search", path: "/anteproyectos" },
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
              className={`justify-start w-full mb-1 ${
                location.pathname === item.path ? "bg-success-900/20 text-success" : "bg-transparent text-white"
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
              <p className="text-xs text-zinc-400">Biomb0.ID: 1234</p>
            </div>
          </div>
        </Navbar>
        
        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4">
          {/* Chat messages would go here */}
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
            />
            <Button 
              isIconOnly 
              color="success" 
              className="min-w-12 h-12"
              aria-label="Send"
            >
              <Icon icon="lucide:arrow-up" width={20} height={20} />
            </Button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end border-t border-zinc-800 p-2">
          <Button 
            color="success" 
            variant="flat" 
            size="sm"
            startContent={<Icon icon="lucide:download" width={16} height={16} />}
          >
            Salvar Datos
          </Button>
        </div>
      </div>
    </div>
  );
}