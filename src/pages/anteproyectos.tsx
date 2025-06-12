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
      <Button color="success" className="min-w-24">
        <Icon icon="mdi:file-document-outline" width={18} />
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
      fechaCreacion: "00/01/2025",
      fechaLimite: "00/10/2025"
    },
    {
      titulo: "Título Descripción",
      fechaCreacion: "00/02/2025",
      fechaLimite: "00/10/2025"
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
            <h1 className="text-lg font-medium">Explorador de Anteproyectos</h1>
          </div>
        </div>


        {/* Filtro y título */}
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Nombre de la Convocatoria</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Escribe..."
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
            <ConvocatoriaCard key={idx} {...convocatoria} /> //no se si esto estaría bien para ubicarlas
          ))}
        </div>

        
      </div>
    </div>
  );
}