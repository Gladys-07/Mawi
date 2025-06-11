import React from "react";
import { Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isAdmin?: boolean;
  isOpen: boolean; // 👈 Solo recibimos el estado, no lo modificamos desde aquí
  menuItems: menuItem[]
}

interface menuItem {
  title : string,
  icon : string,
  path : string
}

export default function Sidebar({ isOpen, menuItems}: SidebarProps ): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate(); 
  const userId = sessionStorage.getItem("userId");
  
  return (
    <div className={`flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}>
      <div className="flex items-center gap-2 p-4 border-b border-zinc-800">
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Icon icon="lucide:eye" className="text-zinc-900 w-4 h-4" />
        </div>
        <span className="font-medium">Mawi</span>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item, idx) => (
          <Link to={item.path} key={idx}>
            <Button
              variant="flat"
              color={location.pathname === item.path ? "success" : "default"}
              className={`justify-start w-full mb-1 ${location.pathname === item.path ? "bg-success-900/20 text-success" : "bg-transparent text-white"}`}
              startContent={<Icon icon={item.icon} width={18} height={18} />}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
      <div className="mt-auto border-t border-zinc-800 p-3">
        <Button
          variant="flat"
          color="default"
          className="justify-start w-full text-zinc-400"
          startContent={<Icon icon="lucide:help-circle" width={18} height={18} />}
          onPress={() => navigate("/soporte")} 
        >
          Contacta con el soporte
        </Button>
      </div>
    </div>
  );
};
  
