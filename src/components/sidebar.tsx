import React from "react";
import { Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  isAdmin?: boolean;
  isOpen: boolean; // 👈 Solo recibimos el estado, no lo modificamos desde aquí
}

export default function Sidebar({ isAdmin = false, isOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { label: "Dashboard", icon: "lucide:layout-dashboard", path: "/dashboard" },
    { label: "Acciones", icon: "lucide:list-checks", path: "/actions" },
    { label: "Estadísticas", icon: "lucide:bar-chart-2", path: "/stats" },
    { label: "Comunidad", icon: "lucide:users", path: "/community" },
    { label: "Convocatorias", icon: "lucide:layout-dashboard", path: "/convoDash" },
    { label: "Nueva Convocatoria", icon: "lucide:plus-square", path: "/AsNewConv" },
    { label: "Configuración", icon: "lucide:settings", path: "/settings" },
  ];

  const adminItems = [
    { label: "Panel Admin", icon: "lucide:shield", path: "/admin" },
    { label: "Usuarios", icon: "lucide:users", path: "/admin/users" },
    { label: "Reportes", icon: "lucide:file-text", path: "/admin/reports" },
  ];

  console.log("Name: ", sessionStorage.getItem("name"));
  console.log("Email: ", sessionStorage.getItem("userEmail"));

  return (
    <div className={`fixed top-0 left-0 h-full z-40 bg-zinc-900 transition-transform duration-300 ease-in-out w-64 flex flex-col p-4 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-6 flex items-center">
        <Icon icon="lucide:eye" className="mr-2 h-6 w-6 text-white" />
        <h1 className="text-xl font-bold text-white">Mawi</h1>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-lg bg-zinc-800 p-3">
        <Icon icon="lucide:user" className="text-white w-6 h-6" />
        <div>
          <p className="text-sm font-medium text-white">{sessionStorage.getItem("name")}</p>
          <p className="text-xs text-gray-400">{sessionStorage.getItem("userEmail")}</p>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        {(isAdmin ? [...adminItems, ...menuItems] : menuItems).map((item) => (
          <Button
            key={item.path}
            variant="flat"
            color={isActive(item.path) ? "success" : "default"}
            className={`justify-start w-full text-white text-left whitespace-normal ${isActive(item.path) ? 'bg-zinc-100/20' : ''}`}
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
          onClick={() => navigate("/soporte")}
        >
          ¿Necesitas ayuda? Contacta con nosotros
        </span>
      </p>
    </div>
  );
}
