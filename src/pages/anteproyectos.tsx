import React, { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import Sidebar from "../components/sidebar";
import { userItems, adminItems } from "../constants";

type Convocatoria = {
  ID_convocatoria: number;
  nombreConvocatoria: string;
  fechaCierre: string;
  sitioWeb: string;
  region: string;
  pais: string;
  organizacion: string;
  descripcion: string;
  status: string;
  creadoPor: number;
  fechaCreacion: string;
};

//used for project preview in front
type anteView = {
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  fechaLimite: string
}

// carta de anteproyectos
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

/**
 * saca los anterpoyectos de la BD para que no desaparescan en cada logout
 * sacalos segun su userId, que en anteproyectos es creadosPor
 */
export default function Mawi() {
  const [isOpen, setIsOpen] = useState(true);
  const [nombreConvocatoria, setNombreConvocatoria] = useState("");
  //list to save all the convocatorias name fetch for a certain user
  const [convNamesList, setConvNamesList] = useState<string[]>([]); 
  const [chosenConv, setChosenConv] = useState("");

  useEffect(() => {
    const getUserConvs = async () => {
      try {
        const userConvs = await fetch(`http://localhost:3000/CSoftware/api/getConvocatoriasByUser/${sessionStorage.getItem("userId")}`, {
          method: "GET",
          headers: {
            "Content-Type" : "application/json",
            "authorization" : `Bearer ${sessionStorage.getItem("token")}`
          }
        });
        const convsJson = await userConvs.json();
        const convsData : Convocatoria[] = convsJson.records;
        const convoNames : string[] = convsData
          .map((conv) => conv.nombreConvocatoria)
        setConvNamesList(convoNames);
      } catch(error) {
        console.error("Error al cargar convocatorias disponibles:", error);
      }
    }

    getUserConvs();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const menuThings = isAdmin ? adminItems : userItems;

  // Datos de ejemplo basados en la imagen
  const anteproyectos = [
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
  const userRole = sessionStorage.getItem("isAdmin") === "true" ? "Admin" : "EcoRanger";
  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} menuItems={menuThings} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-auto">
        {/* Header */}
        <div className={`fixed top-0 left-0 right-0 z-30 h-16 flex items-center border-b border-zinc-800 bg-zinc-900 px-6 gap-4 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-0'}`}>
          <Button isIconOnly variant="light" className="text-white ml-2" onPress={() => setIsOpen(!isOpen)}>
            <Icon icon={isOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={20} height={20} />
          </Button>
          <h1 className="text-lg font-medium">Explorador de anteproyectos</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm">
              {`${userRole} ${sessionStorage.getItem("name") ? `: ${sessionStorage.getItem("name")}` : ""}`}
            </span>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <Icon icon="lucide:user" width={20} height={20} />
            </div>
          </div>
        </div>


        {/* Filtro y título */}
        <div className="p-4 border-b border-zinc-800 mt-16">
          <h2 className="text-xl font-semibold mb-4">Selección de Convocatoria</h2>
          <div className="flex flex-col gap-1 w-full">
            <div className="relative">
              <select
                value={chosenConv}
                onChange={(e) => setChosenConv(e.target.value)}
                className="appearance-none w-full md:w-1/4 bg-zinc-800 text-white text-sm border-2 border-zinc-700 hover:border-white px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white transition duration-150"
              >
                <option value="">Elija una convocatoria</option>
                {convNamesList.map((conv) => (
                  <option key={conv} value={conv}>{conv}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <Icon icon="lucide:chevron-down" width={18} height={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Cards de convocatorias */}
        <div className="flex-1 overflow-auto p-4">
          {anteproyectos.map((ante, idx) => (
            <ConvocatoriaCard key={idx} {...ante} /> //no se si esto estaría bien para ubicarlas
          ))}
        </div>

        
      </div>
    </div>
  );
}