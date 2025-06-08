import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

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

export default function ConvocatoriasDashboard() {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);  // Controla si el sidebar está abierto o cerrado

  useEffect(() => {
    const fetchConvocatorias = async () => {
      try {
        const res = await fetch("http://localhost:3000/CSoftware/api/getConvocatorias");
        const data = await res.json();
        setConvocatorias(data.records);
      } catch (error) {
        console.error("Error al cargar convocatorias:", error);
      }
    };
    fetchConvocatorias();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-black text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} /> {/* ya no se pasa setSidebarOpen aquí */}

      <div className="flex flex-col md:flex-row h-screen w-full bg-black text-white overflow-hidden">
        {/* HEADER superior */}
        <div className={`fixed top-0 left-0 right-0 z-30 h-16 flex items-center border-b border-zinc-800 bg-zinc-900 px-6 gap-4 transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-0'}`}>


          {/* Botón para abrir/cerrar el sidebar */}
          <Button isIconOnly variant="light" className="text-white" onPress={() => setSidebarOpen(!sidebarOpen)}>
            <Icon icon={sidebarOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={20} height={20} />
          </Button>

          <h1 className="text-lg font-medium">Convocatorias registradas</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm">{sessionStorage.getItem("name") || "EcoRanger"}</span>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <Icon icon="lucide:user" width={20} height={20} />
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <main className={`transition-all duration-300 pt-24 pb-20 px-6 ${ sidebarOpen ? 'ml-64' : 'ml-0'} w-full overflow-x-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {convocatorias.map((convocatoria) => (
              <div key={convocatoria.ID_convocatoria} className="bg-zinc-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-2">{convocatoria.nombreConvocatoria}</h2>
                <p className="text-sm text-zinc-400 mb-1">Organización: {convocatoria.organizacion}</p>
                <p className="text-sm text-zinc-400 mb-1">Cierre: {new Date(convocatoria.fechaCierre).toLocaleDateString()}</p>
                <p className="text-sm text-zinc-400 mb-1">Región: {convocatoria.region} ({convocatoria.pais})</p>
                <p className="text-sm text-zinc-400 mb-2">Status: <span className="text-green-400">{convocatoria.status}</span></p>
                <p className="text-sm text-zinc-300 mb-2">{convocatoria.descripcion}</p>
                <a
                  href={convocatoria.sitioWeb.startsWith("http") ? convocatoria.sitioWeb : "https://" + convocatoria.sitioWeb}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-blue-400 hover:underline"
                >
                  Ir al sitio →
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
