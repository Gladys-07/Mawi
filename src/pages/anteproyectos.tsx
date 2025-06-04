import React, { useState } from "react";
import { Button, Input, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();
  const menuItems = [
    { title: "Inicio", icon: "lucide:home", path: "/" },
    { title: "Asistente de Mi Biomo", icon: "lucide:activity", path: "/asistentebiomo" },
    { title: "Nuevas Convocatorias", icon: "lucide:bell", path: "/convocatorias" },
    { title: "Explorador de Anteproyectos", icon: "lucide:search", path: "/anteproyectos", active: true },
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

const AnteproyectoCard = () => (
  <div className="bg-zinc-700 rounded-lg p-4 flex items-center justify-between mb-4">
    <div>
      <div className="font-semibold">Título</div>
      <div className="text-sm text-zinc-300">Descripción</div>
      <div className="text-xs text-zinc-400 mt-2">
        Fecha de creación: 00/00/0000 &nbsp; | &nbsp; Fecha límite: 00/00/0000
      </div>
    </div>
    <Button isIconOnly color="success" className="min-w-12 h-12">
      <Icon icon="lucide:file" width={24} height={24} />
    </Button>
  </div>
);

export default function Anteproyectos() {
  const [isOpen, setIsOpen] = useState(true);
  const [tab, setTab] = useState("abiertos");

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
            <h1 className="text-lg font-medium">Explorador de Anteproyectos</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm">EcoRanger</span>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <Icon icon="lucide:user" width={20} height={20} />
            </div>
          </div>
        </div>

        {/* Filtros y botón */}
        <div className="flex items-center gap-2 p-4">
          <Input
            placeholder="Nombre del Convocatoria"
            variant="bordered"
            classNames={{
              base: "bg-zinc-800 rounded-md",
              inputWrapper: "bg-zinc-800 border-zinc-700 hover:border-zinc-600 focus-within:border-zinc-500",
            }}
          />
          <Button color="success" className="ml-2">
            Crear Nuevo Anteproyecto
          </Button>
        </div>

        <div className="px-4">
          {/* Tabs */}
          <Tabs
            selectedKey={tab}
            onSelectionChange={(key) => setTab(String(key))}
            variant="underlined"
            className="mb-4"
          >
            <Tab key="abiertos" title="Abiertos" />
            <Tab key="cerrados" title="Cerrados" />
          </Tabs>
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-auto px-4">
          <AnteproyectoCard />
          <AnteproyectoCard />
        </div>

        {/* Botón flotante */}
        <div className="fixed bottom-6 right-6">
          <Button color="success" className="shadow-lg px-6 py-3 text-base font-semibold">
            Crear Nuevo Anteproyecto
          </Button>
        </div>
      </div>
    </div>
  );
}