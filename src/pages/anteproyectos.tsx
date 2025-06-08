import React, { useState } from "react";
import { Button, Input, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const menuItems = [
    { title: "Inicio", icon: "lucide:home", path: "/cards" },
    { title: "Asistente de Mi Biomo", icon: "lucide:activity", path: "/asistentebiomo" },
    { title: "Nuevas Convocatorias", icon: "lucide:bell", path: "/AsNewConv" },
    { title: "Explorador de Anteproyectos", icon: "lucide:search", path: "/anteproyectos", active: true },
    { title: "Informes, Métricas y Análisis", icon: "lucide:bar-chart-2", path: "/informes" },
  ];  
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

const AnteproyectoCard = ({ titulo, descripcion, fechaInicio, fechaFin }: any) => (
  <div className="bg-zinc-700 rounded-lg p-4 flex items-center justify-between mb-4">
    <div>
      <div className="font-semibold">{titulo}</div>
      <div className="text-sm text-zinc-300">{descripcion}</div>
      <div className="text-xs text-zinc-400 mt-2">
        Fecha de creación: {fechaInicio} &nbsp; | &nbsp; Fecha límite: {fechaFin}
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

  // Estado para el formulario
  const [showForm, setShowForm] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Anteproyectos creados
  const [anteproyectos, setAnteproyectos] = useState<any[]>([]);

  const handleCrear = () => {
    const nuevo = {
      titulo,
      descripcion,
      fechaInicio,
      fechaFin,
    };
    setAnteproyectos([...anteproyectos, nuevo]);

    // Limpiar formulario
    setShowForm(false);
    setTitulo("");
    setDescripcion("");
    setFechaInicio("");
    setFechaFin("");
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
          <Button color="success" className="ml-2" onClick={() => setShowForm(true)}>
            Crear Anteproyecto
          </Button>
        </div>

        <div className="px-4">
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
          {anteproyectos.map((a, idx) => (
            <AnteproyectoCard key={idx} {...a} />
          ))}
        </div>

       

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">Crear Anteproyecto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white mb-1">Título</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white mb-1">Descripción</label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm text-white mb-1">Fecha de Inicio</label>
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-white mb-1">Fecha Final</label>
                    <input
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-2">
                <Button color="default" onPress={() => setShowForm(false)}>
                  Cancelar
                </Button>
                <Button color="success" onPress={handleCrear}>
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
