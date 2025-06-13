import React, { useState, useEffect } from "react"; 
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { userItems, adminItems } from "../constants";


interface PaisAPI {
  name: {
    common: string;
  };
}

export default function AsistenteNuevasConv() {
  const navigate = useNavigate();
  const [listaPaises, setListaPaises] = useState<string[]>([]); 
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
  const creadoPor = parseInt(sessionStorage.getItem("userId") || "0", 10);

  const handleSiguiente = () => setPaso(2);
  const handleAnterior = () => setPaso(1);

  const toggleSidebar = () => { 
    setIsOpen(!isOpen);
  };

  // Sidebar Component
  interface SidebarProps {
    isOpen: boolean;
  }

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const menuThings = isAdmin ? adminItems : userItems;
  console.log(`Is admin? ${sessionStorage.getItem("isAdmin")}`);
  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data: PaisAPI[] = await res.json();
        const nombres = data
          .map((pais) => pais.name.common)
          .sort((a, b) => a.localeCompare(b));
        setListaPaises(nombres);
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };

    obtenerPaises();
  }, []);

  const handleGuardar = async () => {
    const datosConvocatoria = {
      nombreConvocatoria,
      fechaCierre,
      sitioWeb,
      region,
      organizacion,
      pais,
      descripcion,
      creadoPor,
      archivos: archivosSubidos.map((archivo) => ({
        nombre: archivo.file.name,
        tipo: archivo.file.type,
      })),
    };

    console.log(JSON.stringify(datosConvocatoria, null, 2));
    console.log("token: ", sessionStorage.getItem("token"));
    const token = sessionStorage.getItem("token");
    try {
    const response = await fetch("http://localhost:3000/CSoftware/api/newConvocatoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":"Bearer " + token
      },
      body: JSON.stringify(datosConvocatoria),
    });

    const resultado = await response.json();
    console.log("Respuesta del servidor:", resultado);

    if (response.ok) {
      setPaso(3);
      setMostrarPopupGuardar(true);
    } else {
      alert("Error al guardar la convocatoria.");
    }
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    alert("Error de conexión con el servidor.");
  }
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

  const handleSubirDocumentos = async () => {
    const id_convocatoria = sessionStorage.getItem("id_convocatoria");
    if (!id_convocatoria) {
      alert("Primero debes guardar la convocatoria antes de subir documentos.");
      return;
    }

    const token = sessionStorage.getItem("token");

    for (const archivo of archivosSubidos) {
      const formData = new FormData();
      formData.append("file", archivo.file);
      formData.append("subidoPor", sessionStorage.getItem("userId") || "0");

      try {
        const response = await fetch(
          `http://localhost:3000/CSoftware/api/uploadDocumentoConvocatoria/${id_convocatoria}`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const resultado = await response.json();
          console.log("Documento subido exitosamente:", resultado);
          alert(`Documento "${archivo.file.name}" subido correctamente.`);
        } else {
          alert(`Error al subir el documento "${archivo.file.name}".`);
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
        alert("Error de conexión al subir el documento.");
      }
    }

    // Limpiar archivos subidos después de la subida
    setArchivosSubidos([]);
  };

  const userRole = sessionStorage.getItem("isAdmin") === "true" ? "Admin" : "EcoRanger";
  console.log("Role ", userRole);
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-black text-white overflow-hidden">
      <Sidebar isOpen={isOpen} menuItems={menuThings}/>
      <div className="flex flex-1 flex-col overflow-auto">
        <div className={`fixed top-0 left-0 right-0 z-30 h-16 flex items-center border-b border-zinc-800 bg-zinc-900 px-6 gap-4 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-0'}`}>
          <Button isIconOnly variant="light" className="text-white ml-2" onPress={() => setIsOpen(!isOpen)}>
            <Icon icon={isOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={20} height={20} />
          </Button>
          <h1 className="text-lg font-medium">Asistente de Nuevas Convocatorias</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm">
              {`${userRole} ${sessionStorage.getItem("name") ? `: ${sessionStorage.getItem("name")}` : ""}`}
            </span>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <Icon icon="lucide:user" width={20} height={20} />
            </div>
          </div>
        </div>


        <div className="px-4 sm:px-8 mt-20">
          <div className="h-3 w-full rounded-full bg-zinc-700 overflow-hidden">
            <div className={`h-full transition-all duration-500 rounded-full ${paso === 1 ? "w-0" : paso === 2 ? "w-1/2 bg-green-500" : "w-full bg-green-500"}`} />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-2xl px-4 sm:px-6 md:px-8 mx-auto mt-8 pb-8">
          <h1 className="text-2xl font-bold mt-4 text-center md:text-left">Asistente de Nuevas Convocatorias</h1>

          {paso === 1 ? (
            <>
              <Input label="Nombre del anteproyecto" type="text" value={nombreConvocatoria} onValueChange={setNombre} variant="bordered" className="w-full" classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white" }} />
              <Input label="Fecha de cierre" type="date" value={fechaCierre} onValueChange={setFecha} variant="bordered" className="w-full" classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white" }} />
              <Input label="Sitio Web" type="text" value={sitioWeb} onValueChange={setSitio} variant="bordered" className="w-full" classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white" }} />
            </>
          ) : (
            <>
              <Input label="Región" value={region} onValueChange={setRegion} variant="bordered" className="w-full" classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white" }} />
              <Input label="Organización" value={organizacion} onValueChange={setOrganizacion} variant="bordered" className="w-full" classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white" }} />
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm text-gray-400 font-medium">País</label>
                <div className="relative">
                  <select
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    className="appearance-none w-full bg-zinc-800 text-white text-sm border-2 border-zinc-700 hover:border-white px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white transition duration-150"
                  >
                    <option value="">Selecciona un país</option>
                    {listaPaises.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <Icon icon="lucide:chevron-down" width={18} height={18} />
                  </div>
                </div>
              </div>




              <Input label="Descripción" value={descripcion} onValueChange={setDescripcion} variant="bordered" className="w-full" classNames={{ inputWrapper: "bg-zinc-800 border-zinc-700", input: "text-white" }} />
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-2 justify-between mt-4">
  {paso === 1 ? (
    <>
      <Button
        size="md"
        className="w-full sm:w-1/2"
        color="default"
        onPress={() => setMostrarModal(true)}
      >
        Subir Datos
      </Button>
      <Button
        size="md"
        className="w-full sm:w-1/2"
        color="success"
        onPress={handleSiguiente}
      >
        Siguiente
      </Button>
    </>
  ) : (
    <>
      <Button
        size="md"
        className="w-full sm:w-1/2"
        color="default"
        onPress={handleAnterior}
      >
        Anterior
      </Button>
      <Button
        size="md"
        className="w-full sm:w-1/2"
        color="success"
        onPress={handleGuardar}
      >
        Guardar
      </Button>
    </>
  )}
</div>
{mostrarModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-zinc-900 p-6 rounded-xl shadow-2xl w-full max-w-2xl text-white relative">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={() => setMostrarModal(false)}
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
        <Icon
          icon="lucide:upload-cloud"
          width={40}
          height={40}
          className="mx-auto mb-2 text-green-400"
        />
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
            <div
              key={idx}
              className="border border-zinc-700 p-4 rounded-lg relative bg-zinc-800"
            >
              <p className="text-sm font-semibold text-green-400">
                {archivo.file.name}
              </p>
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                onClick={() =>
                  setArchivosSubidos((prev) =>
                    prev.filter((_, i) => i !== idx)
                  )
                }
              >
                <Icon icon="lucide:trash" width={18} height={18} />
              </button>
              {archivo.file.type === "application/pdf" && archivo.url && (
                <iframe
                  src={archivo.url}
                  title={`Vista previa PDF ${idx}`}
                  className="w-full h-40 mt-2 rounded-md"
                />
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
        <Button
          color="default"
          onPress={() => {
            setArchivosSubidos([]);
            setMostrarModal(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          color="success"
          onPress={handleSubirDocumentos}
        >
          Subir Archivos
        </Button>
      </div>
    </div>
  </div>
)}

{/* Segundo Modal: Confirmación Guardado */}
{mostrarPopupGuardar && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-zinc-800 p-8 rounded-xl shadow-xl w-full max-w-lg text-white text-center">
      <h2 className="text-2xl font-bold mb-4">¡Datos guardados exitosamente!</h2>
      <p className="text-sm text-gray-300 mb-6">Gracias por registrar la convocatoria. Puedes revisar la convocatoria en la siguiente pestaña.</p>
      <Button color="success" onPress={() => navigate("/convoDash")}>VIEW ON DASHBOARD</Button>
    </div>
  </div>
)}


        </div>
      </div>
    </div>
  );
}
