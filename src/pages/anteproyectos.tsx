import React, { useState } from "react";
import { Button, Input, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import Sidebar from "../components/sidebar";
import { userItems, adminItems } from "../constants";

const AnteproyectoCard = ({ titulo, descripcion, fechaInicio, fechaFin, onUpload }: any) => (
  <div className="bg-zinc-700 rounded-lg p-4 flex items-center justify-between mb-4">
    <div>
      <div className="font-semibold">{titulo}</div>
      <div className="text-sm text-zinc-300">{descripcion}</div>
      <div className="text-xs text-zinc-400 mt-2">
        Fecha de creación: {fechaInicio} &nbsp; | &nbsp; Fecha límite: {fechaFin}
      </div>
    </div>
    <Button isIconOnly color="success" className="min-w-12 h-12" onPress={onUpload}>
      <Icon icon="lucide:file" width={24} height={24} />
    </Button>
  </div>
);

export default function Anteproyectos() {
  const [isOpen, setIsOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [archivosSubidos, setArchivosSubidos] = useState<{ file: File; url: string | null }[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
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

  const handleArchivos = (files: File[]) => {
    const validFiles = files.filter((file) =>
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    );
    if (validFiles.length) {
      const nuevos = validFiles.map((file) => ({
        file,
        url: file.type === "application/pdf" ? URL.createObjectURL(file) : null,
      }));
      setArchivosSubidos((prev) => [...prev, ...nuevos]);
    } else {
      alert("Solo se permiten archivos PDF o Word.");
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const menuThings = isAdmin ? adminItems : userItems;

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

        {/* Cards */}
        <div className="flex-1 overflow-auto px-4">
          {anteproyectos.map((a, idx) => (
            <AnteproyectoCard key={idx} {...a} onUpload={() => setShowFileModal(true)} />
          ))}
        </div>

        {/* Modal for creating anteproyecto */}
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

        {/* Modal for file upload */}
        {showFileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-zinc-900 p-6 rounded-xl shadow-2xl w-full max-w-2xl text-white relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setShowFileModal(false)}
              >
                <Icon icon="lucide:x" width={24} height={24} />
              </button>
              <h2 className="text-2xl font-bold mb-2">Sube tus documentos</h2>
              <p className="mb-4 text-sm text-gray-400">
                Acepta archivos PDF y Word. Puedes arrastrarlos o hacer clic para seleccionarlos.
              </p>
              <div
                className="border-2 border-dashed border-gray-500 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition-all"
                onClick={() => document.getElementById("multiFileUpload")?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  handleArchivos(files);
                }}
              >
                <Icon icon="lucide:upload-cloud" width={40} height={40} className="mx-auto mb-2 text-green-400" />
                <p className="text-gray-300">
                  Arrastra aquí tus archivos o haz clic para seleccionarlos
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  id="multiFileUpload"
                  style={{ display: "none" }}
                  onChange={(e) => handleArchivos(Array.from(e.target.files || []))}
                />
              </div>
              {archivosSubidos.length > 0 && (
                <div className="mt-6 space-y-4 max-h-64 overflow-y-auto pr-2">
                  {archivosSubidos.map((archivo, idx) => (
                    <div key={idx} className="border border-zinc-700 p-4 rounded-lg relative bg-zinc-800">
                      <p className="text-sm font-semibold text-green-400">{archivo.file.name}</p>
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                        onClick={() =>
                          setArchivosSubidos((prev) => prev.filter((_, i) => i !== idx))
                        }
                      >
                        <Icon icon="lucide:trash" width={18} height={18} />
                      </button>
                      {archivo.file.type === "application/pdf" && archivo.url && (
                        <iframe src={archivo.url} title={`Vista previa PDF ${idx}`} className="w-full h-40 mt-2 rounded-md" />
                      )}
                      {archivo.file.type.includes("word") && (
                        <p className="text-sm text-gray-300 mt-2">
                          📄 Documento Word (no se puede previsualizar)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end gap-2 mt-6">
                <Button color="default" onPress={() => setShowFileModal(false)}>
                  Cancelar
                </Button>
                <Button color="success" onPress={() => setShowFileModal(false)}>
                  Subir Archivos
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
