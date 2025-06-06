import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();
  const menuItems = [
    { title: "Inicio", icon: "lucide:home", path: "/cards" },
    { title: "Asistente de Mi Biomo", icon: "lucide:activity", path: "/asistentebiomo" },
    { title: "Nuevas Convocatorias", icon: "lucide:bell", path: "/AsNewConv" },
    { title: "Explorador de Anteproyectos", icon: "lucide:search", path: "/anteproyectos" },
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
        >
          Contacta con el soporte
        </Button>
      </div>
    </div>
  );
};

export default function AsistenteNuevasConv() {
  const navigate = useNavigate();
  const [archivosSubidos, setArchivosSubidos] = useState<{ file: File; url: string | null }[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [paso, setPaso] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarPopupGuardar, setMostrarPopupGuardar] = useState(false);

  const [nombreConvocatoria, setNombre] = useState("");
  const [fechaCierre, setFecha] = useState("");
  const [sitioWeb, setSitio] = useState("");
  const [region, setRegion] = useState("");
  const [organizacion, setOrganizacion] = useState("");
  const [pais, setPais] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSiguiente = () => setPaso(2);
  const handleAnterior = () => setPaso(1);

  const handleGuardar = () => {
  const datosConvocatoria = {
    nombreConvocatoria,
    fechaCierre,
    sitioWeb,
    region,
    organizacion,
    pais,
    descripcion,
    archivos: archivosSubidos.map((archivo) => ({
      nombre: archivo.file.name,
      tipo: archivo.file.type,
    })),
  };

  console.log(JSON.stringify(datosConvocatoria, null, 2));
  
  setPaso(3);
  setMostrarPopupGuardar(true);
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

  return (
    <div className="flex h-screen w-full bg-black text-white">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-1 flex-col">
        {/* Encabezado */}
        <div className="flex items-center border-b border-zinc-800 bg-zinc-900 px-4 py-3 gap-2">
          <Button isIconOnly variant="light" className="text-white" onPress={() => setIsOpen(!isOpen)}>
            <Icon icon={isOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={20} height={20} />
          </Button>
          <h1 className="text-lg font-medium">Asistente de Nuevas Convocatorias</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm">EcoRanger</span>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <Icon icon="lucide:user" width={20} height={20} />
            </div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="px-8 mt-4">
          <div className="h-3 w-full rounded-full bg-zinc-700 overflow-hidden">
            <div className={`h-full transition-all duration-500 rounded-full ${paso === 1 ? "w-0" : paso === 2 ? "w-1/2 bg-green-500" : "w-full bg-green-500"}`} />
          </div>
        </div>

        {/* Formulario */}
        <div className="flex flex-col gap-4 max-w-md mx-auto mt-8">
          <h1 className="text-2xl font-bold mt-12">Asistente de Nuevas Convocatorias</h1>

          {paso === 1 ? (
            <>
              <p className="text-sm text-gray-100 font-bold">Nombre del anteproyecto</p>
              <Input label="Ej. Desarrollo Sostenible" type="text" value={nombreConvocatoria} onValueChange={setNombre} variant="bordered"
                classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white", label: "text-gray-400" }} />
              <p className="text-sm text-gray-100 font-bold">Fecha de cierre</p>
              <Input
                label="Selecciona una fecha"
                type="date"
                value={fechaCierre}
                onValueChange={setFecha}
                variant="bordered"
                classNames={{
                inputWrapper: "bg-zinc-800 border-zinc-700",
                input: "text-white",
                label: "text-gray-400"
          }}
        />

              <p className="text-sm text-gray-100 font-bold">Sitio Web</p>
              <Input label="www.ejemplo.com" type="text" value={sitioWeb} onValueChange={setSitio} variant="bordered"
                classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white", label: "text-gray-400" }} />
            </>
          ) : (
            <>
              <p className="text-sm text-gray-100 font-bold">Región</p>
              <Input label="Escribe..." value={region} onValueChange={setRegion} variant="bordered"
                classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white", label: "text-gray-400" }} />
              <p className="text-sm text-gray-100 font-bold">Organización</p>
              <Input label="Escribe..." value={organizacion} onValueChange={setOrganizacion} variant="bordered"
                classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white", label: "text-gray-400" }} />
              <p className="text-sm text-gray-100 font-bold">País</p>
              <Input label="Escribe..." value={pais} onValueChange={setPais} variant="bordered"
                classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white", label: "text-gray-400" }} />
              <p className="text-sm text-gray-100 font-bold">Descripción</p>
              <Input label="Escribe..." value={descripcion} onValueChange={setDescripcion} variant="bordered"
                classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white", label: "text-gray-400" }} />
            </>
          )}

          <div className="flex gap-2 justify-between">
            {paso === 1 ? (
              <>
                <Button size="md" className="w-full" color="success" onPress={handleSiguiente}>Siguiente</Button>
                <Button size="md" className="w-full" color="success" onPress={() => setMostrarModal(true)}>Subir Datos</Button>
              </>
            ) : (
              <>
                <Button size="md" className="w-full" color="default" onPress={handleAnterior}>Anterior</Button>
                <Button size="md" className="w-full" color="success" onPress={handleGuardar}>Guardar</Button>
              </>
            )}
          </div>
        </div>

        {/* Modal de carga de archivos */}
        {mostrarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-zinc-900 p-6 rounded-xl shadow-2xl w-full max-w-2xl text-white relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setMostrarModal(false)}>
                <Icon icon="lucide:x" width={24} height={24} />
              </button>
              <h2 className="text-2xl font-bold mb-2">Sube tus documentos</h2>
              <p className="mb-4 text-sm text-gray-400">Acepta archivos PDF y Word. Puedes arrastrarlos o hacer clic para seleccionarlos.</p>
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
                <p className="text-gray-300">Arrastra aquí tus archivos o haz clic para seleccionarlos</p>
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
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-400" onClick={() => setArchivosSubidos((prev) => prev.filter((_, i) => i !== idx))}>
                        <Icon icon="lucide:trash" width={18} height={18} />
                      </button>
                      {archivo.file.type === "application/pdf" && archivo.url && (
                        <iframe src={archivo.url} title={`Vista previa PDF ${idx}`} className="w-full h-40 mt-2 rounded-md" />
                      )}
                      {archivo.file.type.includes("word") && (
                        <p className="text-sm text-gray-300 mt-2">📄 Documento Word (no se puede previsualizar)</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end gap-2 mt-6">
                <Button color="default" onPress={() => {
                  setArchivosSubidos([]);
                  setMostrarModal(false);
                }}>Cancelar</Button>
                <Button color="success" onPress={() => {
                  console.log("Archivos cargados:", archivosSubidos);
                  setMostrarModal(false);
                }}>Subir Archivos</Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de éxito */}
        {mostrarPopupGuardar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-zinc-800 p-8 rounded-xl shadow-xl w-full max-w-lg text-white text-center">
              <h2 className="text-2xl font-bold mb-4">¡Datos guardados exitosamente!</h2>
              <p className="text-sm text-gray-300 mb-6">Gracias por registrar la convocatoria. Puedes revisar la convocatoria en la siguiente pestaña.</p>
              <Button color="success" onPress={() => navigate("/convoDash")}> VIEW ON DASHBOARD </Button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
