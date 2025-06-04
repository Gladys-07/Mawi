import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Sidebar reutilizable
const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();
  const menuItems = [
    { title: "Inicio", icon: "lucide:home", path: "/" },
    { title: "Asistente de Mi Biomo", icon: "lucide:activity", path: "/asistentebiomo" },
    { title: "Nuevas Convocatorias", icon: "lucide:bell", path: "/AsNewConv" },
    { title: "Explorador de Anteproyectos", icon: "lucide:search", path: "/anteproyectos" },
    { title: "Informes, Métricas y Análisis", icon: "lucide:bar-chart-2", path: "/informes" },
  ];
  return (
    <div className={`flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}>
      {/* Logo */}
      <div className="flex items-center gap-2 p-4 border-b border-zinc-800">
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Icon icon="lucide:eye" className="text-zinc-900 w-4 h-4" />
        </div>
        <span className="font-medium">Mawi</span>
      </div>
      {/* Menu */}
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
      {/* Footer */}
      <div className="mt-auto border-t border-zinc-800 p-3">
        <Button
          variant="flat"
          color="default"
          className="justify-start w-full text-zinc-400"
          startContent={<Icon icon="lucide:help-circle" width={18} height={18} />}
        >
          Contacta con el soporte
        </Button>
      </div>
    </div>
  );
};

export default function AsistenteNuevasConv() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [sitio, setSitio] = useState("");

  const handleRegister = () => {
    navigate("/cards");
  };

  const handleCancel = () => {
    setNombre("");
    setFecha("");
    setSitio("");
  };

  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900 px-4 py-3 gap-2">
          <Button isIconOnly variant="light" className="text-white" onPress={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <Icon icon="lucide:chevron-left" width={20} height={20} />
            ) : (
              <Icon icon="lucide:chevron-right" width={20} height={20} />
            )}
          </Button>
          <div>
            <h1 className="text-lg font-medium">Asistente de Nuevas Convocatorias</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm">EcoRanger</span>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <Icon icon="lucide:user" width={20} height={20} />
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="flex flex-col gap-4 max-w-md mx-auto mt-8">
          <h1 className="text-2xl font-bold">Asistente de Nuevas Convocatorias</h1>

          {/* Nombre del anteproyecto */}
          <p className="text-sm text-gray-100 font-bold">Nombre del anteproyecto</p>
          <Input
            label="Ej. Desarrollo Sostenible"
            type="text"
            value={nombre}
            onValueChange={setNombre}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

          {/* Fecha de cierre */}
          <p className="text-sm text-gray-100 font-bold">Fecha de cierre</p>
          <Input
            label="00/00/0000"
            type="text"
            value={fecha}
            onValueChange={setFecha}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

          {/* Sitio Web */}
          <p className="text-sm text-gray-100 font-bold">Sitio Web</p>
          <Input
            label="www.ejemplo.com"
            type="text"
            value={sitio}
            onValueChange={setSitio}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

          {/* Botones */}
          <div className="flex gap-2 justify-between">
            <Button size="md" className="w-full" color="success" onPress={handleRegister}>
              Siguiente
            </Button>
            <Button size="md" className="w-full" color="success" onPress={handleCancel}>
              Subir Datos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
