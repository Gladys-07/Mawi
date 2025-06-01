import React from "react";
import { Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isAdmin?: boolean;
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
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
    <div className="flex h-full w-64 flex-col bg-zinc-900 p-4">
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
    </div>
  );
}