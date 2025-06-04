import React, { useState } from "react";
import { Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isAdmin?: boolean;
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const [open, setOpen] = useState(true); //used for menu animations
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    {
      label: "Dashboard",
      icon: "lucide:layout-dashboard",
      path: "/dashboard",
    },
    {
      label: "Acciones",
      icon: "lucide:list-checks",
      path: "/actions",
    },
    {
      label: "Estadísticas",
      icon: "lucide:bar-chart-2",
      path: "/stats",
    },
    {
      label: "Comunidad",
      icon: "lucide:users",
      path: "/community",
    },
    {
      label: "Configuración",
      icon: "lucide:settings",
      path: "/settings",
    },
  ];
  
  const adminItems = [
    {
      label: "Panel Admin",
      icon: "lucide:shield",
      path: "/admin",
    },
    {
      label: "Usuarios",
      icon: "lucide:users",
      path: "/admin/users",
    },
    {
      label: "Reportes",
      icon: "lucide:file-text",
      path: "/admin/reports",
    },
  ];

  return (
    <>
    {/* Button to open sidebar */}
    {!open && (
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-zinc-800 text-white shadow-lg hover:bg-zinc-700 transition-colors"
        onClick={() => setOpen(true)}
      >
        <Icon icon="lucide:chevron-right" className="w-6 h-6"/>
      </button>
    )}
    {/* Slideable sidebar */}
    <div className={`fixed top-0 left-0 h-full z-40 bg-zinc-900 ttransition-transform duration-300 ease-in-out w-64 flex flex-col p-4  ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Retractable button */}
        <button className="absolute  -right-4 top-4 z-50 p-2 rounded-full bg-zinc-800 text-white shadow-lg hover:bg-zinc-700 transition-colors"
        onClick={() => setOpen(false)}>
          <Icon icon="lucide:chevron-left" className="w-6 h-6"/>
        </button>
        <div className="mb-6 flex items-center">
          <Icon icon="lucide:eye" className="mr-2 h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">Mawi</h1>
        </div>
        
        <div className="mb-6 flex items-center gap-3 rounded-lg bg-zinc-800 p-3">
          <Avatar
            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
            size="sm"
          />
          <div>
            <p className="text-sm font-medium text-white">Ana García</p>
            <p className="text-xs text-gray-400">ana@example.com</p>
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          {(isAdmin ? [...adminItems, ...menuItems] : menuItems).map((item) => (
            <Button
              key={item.path}
              variant="flat"
              color={isActive(item.path) ? "success" : "default"}
              className={`justify-start w-full ${isActive(item.path) ? 'bg-success-500/10' : ''}`}
              startContent={<Icon icon={item.icon} className="h-5 w-5" />}
              onPress={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <Button
          variant="flat"
          color="danger"
          className="mt-6 justify-start w-full"
          startContent={<Icon icon="lucide:log-out" className="h-5 w-5" />}
          onPress={() => navigate("/login")}
        >
          Cerrar sesión
        </Button>
        <p className="mt-2 text-center text-sm text-gray-500 pb-2">
          <span 
            className="cursor-pointer hover:text-success-500"
            onClick={() => navigate("/ayuda")}>
              ¿Necesitas ayuda? Contacta con nosotros
          </span>
        </p>
      </div>
    </>
  );
}