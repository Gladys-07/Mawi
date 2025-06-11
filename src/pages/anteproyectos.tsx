import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import Sidebar from "../components/sidebar";
import { userItems, adminItems } from "../constants";

const ConvocatoriaCard = ({ titulo, fechaCreacion, fechaLimite }: any) => (
  <div className="bg-zinc-800 rounded-lg p-4 mb-4 border border-zinc-700">
    <div className="font-semibold text-lg mb-2">{titulo}</div>
    <div className="text-sm text-zinc-300 mb-1">Fecha de cuestión: {fechaCreacion}</div>
    <div className="text-sm text-zinc-300">Fecha límite: {fechaLimite}</div>
    <div className="mt-3 pt-3 border-t border-zinc-700 flex justify-end">
      <Button color="primary" className="min-w-24">
        Contactar
      </Button>
    </div>
  </div>
);

export default function Mawi() {
  const [isOpen, setIsOpen] = useState(true);
  const [nombreConvocatoria, setNombreConvocatoria] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const menuThings = isAdmin ? adminItems : userItems;

  // Datos de ejemplo basados en la imagen
  const convocatorias = [
    {
      titulo: "Título Descripción",
      fechaCreacion: "00/01/2020",
      fechaLimite: "00/10/2020"
    },
    {
      titulo: "Título Descripción",
      fechaCreacion: "00/02/2020",
      fechaLimite: "00/10/2020"
    }
  ];

  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} menuItems={menuThings} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900 px-4 py-3 gap-2">
          <Button isIconOnly variant="light" className="text-white" onPress={toggleSidebar}>
            {isOpen ? (
              <Icon icon="lucide:chevron-left" width={20} height={20} />
            ) : (
              <Icon icon="lucide:chevron-right" width={20} height={20} />
            )}
          </Button>
          <div>
            <h1 className="text-lg font-medium">Mawi</h1>
          </div>
        </div>

        {/* Sección de navegación */}
        <div className="flex border-b border-zinc-800 px-4 py-2">
          <nav className="flex space-x-6">
            <a href="#" className="text-green-400 border-b-2 border-green-400 pb-2">Inicio</a>
            <a href="#" className="text-zinc-400 hover:text-white pb-2">Adistente de Mi Bienzo</a>
            <a href="#" className="text-zinc-400 hover:text-white pb-2">Adistente de Nuevos Convocatorios</a>
            <a href="#" className="text-zinc-400 hover:text-white pb-2">Adistente Explorador de Anteproyectos</a>
            <a href="#" className="text-zinc-400 hover:text-white pb-2">Informes, Métricas y Análisis</a>
          </nav>
        </div>

        {/* Filtro y título */}
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Nombre del Convocatoria</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Bueno..."
              variant="bordered"
              value={nombreConvocatoria}
              onChange={(e) => setNombreConvocatoria(e.target.value)}
              classNames={{
                base: "bg-zinc-800 rounded-md w-64",
                inputWrapper: "bg-zinc-800 border-zinc-700 hover:border-zinc-600 focus-within:border-zinc-500",
              }}
            />
          </div>
        </div>

        {/* Cards de convocatorias */}
        <div className="flex-1 overflow-auto p-4">
          {convocatorias.map((convocatoria, idx) => (
            <ConvocatoriaCard key={idx} {...convocatoria} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-4 text-center text-sm text-zinc-400">
          <p>Contacta con el agente.</p>
          <p className="text-white mt-1">Cesar Nuevo Anteproyecto</p>
        </div>
      </div>
    </div>
  );
}