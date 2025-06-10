import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editConvocatoria, setEditConvocatoria] = useState<Convocatoria | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [originalConvocatoria, setOriginalConvocatoria] = useState<Convocatoria | null>(null);
  const [listaPaises, setListaPaises] = useState<string[]>([]);

  useEffect(() => {
    const fetchConvocatorias = async () => {
      console.log(sessionStorage.getItem("token"));
      const token = sessionStorage.getItem("token");
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return;
        const res = await fetch(`http://localhost:3000/CSoftware/api/getConvocatoriasByUser/${userId}`);
        const data = await res.json();
        setConvocatorias(data.records);
      } catch (error) {
        console.error("Error al cargar convocatorias:", error);
      }
    };
    fetchConvocatorias();
  }, []);

  useEffect(() => {
  const obtenerPaises = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data = await res.json();
      const nombres = data
        .map((pais: any) => pais.name.common)
        .sort((a: string, b: string) => a.localeCompare(b));
      setListaPaises(nombres);
    } catch (error) {
      console.error("Error al cargar países:", error);
    }
  };

  obtenerPaises();
}, []);


  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditConvocatoria(null);
        setDeleteId(null);
        setOriginalConvocatoria(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`http://localhost:3000/CSoftware/api/deleteConvocatoria/${deleteId}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.status === "success") {
        setConvocatorias((prev) => prev.filter((c) => c.ID_convocatoria !== deleteId));
        setDeleteId(null);
      } else {
        alert("Error al eliminar la convocatoria.");
      }
    } catch (error) {
      console.error("Error al eliminar convocatoria:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  const hasChanges = editConvocatoria && originalConvocatoria &&
    Object.keys(editConvocatoria).some((key) => {
      const k = key as keyof Convocatoria;
      return editConvocatoria[k] !== originalConvocatoria[k];
    });

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-black text-white overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col md:flex-row h-screen w-full bg-black text-white overflow-hidden">
        {/* Encabezado */}
        <div className={`fixed top-0 left-0 right-0 z-30 h-16 flex items-center border-b border-zinc-800 bg-zinc-900 px-6 gap-4 transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-0'}`}>
          <Button isIconOnly variant="light" className="text-white ml-2" onPress={() => setSidebarOpen(!sidebarOpen)}>
            <Icon icon={sidebarOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={20} height={20} />
          </Button>
          <h1 className="text-lg font-medium">Convocatorias registradas</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm">
              {`EcoRanger${sessionStorage.getItem("name") ? `: ${sessionStorage.getItem("name")}` : ""}`}
              </span>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <Icon icon="lucide:user" width={20} height={20} />
            </div>
          </div>
        </div>

        <main className={`transition-all duration-300 pt-24 pb-20 px-6 ${sidebarOpen ? 'ml-64' : 'ml-0'} w-full overflow-x-hidden`}>

          {/* Modal eliminar */}
          <AnimatePresence>
            {deleteId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-md border border-zinc-700 mx-4 max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-center mb-4">
                    <Icon icon="lucide:trash" width={48} height={48} className="text-red-500" />
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2">¿Eliminar convocatoria?</h2>
                  <p className="text-zinc-300 mb-6">Esta acción no se puede deshacer.</p>
                  <div className="flex justify-center gap-4">
                    <Button className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl" onClick={() => setDeleteId(null)}>
                      Cancelar
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 rounded-xl" onClick={handleDelete}>
                      <Icon icon="lucide:trash" width={18} />
                      Eliminar
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal editar */}
          <AnimatePresence>
            {editConvocatoria && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-md border border-zinc-700 mx-4 max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-lg font-bold mb-4">Editar convocatoria</h2>
                  <form
                    onSubmit={async (e) => {
  e.preventDefault();

  if (!editConvocatoria || !originalConvocatoria) return;

  const updatedFields: Partial<Convocatoria> = {};

  for (const key of Object.keys(editConvocatoria) as (keyof Convocatoria)[]) {
  const newValue = editConvocatoria[key];
  const oldValue = originalConvocatoria[key];

  if (newValue !== oldValue) {
    (updatedFields as any)[key] = newValue; // ✅ TypeScript feliz, funcional sin error
  }
}





  if (Object.keys(updatedFields).length === 0) {
    alert("No hay cambios para guardar.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/CSoftware/api/updateConvocatoria/${editConvocatoria.ID_convocatoria}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    const result = await res.json();
    if (result.status === "success") {
      setConvocatorias((prev) =>
        prev.map((c) =>
          c.ID_convocatoria === editConvocatoria.ID_convocatoria
            ? { ...c, ...updatedFields }
            : c
        )
      );
      setEditConvocatoria(null);
      setOriginalConvocatoria(null);
    } else {
      alert("Error al actualizar.");
    }
  } catch (err) {
    alert("Fallo en conexión.");
  }
}}

                  >
                    {[
  "nombreConvocatoria",
  "organizacion",
  "descripcion",
  "region",
  "sitioWeb",
].map((key) => {
  const value = (editConvocatoria as any)[key];
  const originalValue = (originalConvocatoria as any)?.[key];
  const wasEdited = value !== originalValue;

  return (
    <input
      key={key}
      className={`mb-3 w-full px-4 py-2 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 transition duration-150 ${
        wasEdited
          ? "bg-zinc-800 text-white focus:ring-blue-500"
          : "bg-zinc-900 text-zinc-500 focus:ring-zinc-500"
      }`}
      placeholder={key}
      value={value}
      onChange={(e) =>
        setEditConvocatoria({
          ...editConvocatoria!,
          [key]: e.target.value,
        })
      }
    />
  );
})}

{/* País */}
<label className="text-sm text-zinc-400 mt-2 mb-1 block">País</label>
<select
  value={editConvocatoria?.pais}
  onChange={(e) =>
    setEditConvocatoria({
      ...editConvocatoria!,
      pais: e.target.value,
    })
  }
  className={`appearance-none mb-3 w-full px-4 py-2 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 transition duration-150 ${
    editConvocatoria?.pais !== originalConvocatoria?.pais
      ? "bg-zinc-800 text-white focus:ring-blue-500"
      : "bg-zinc-900 text-zinc-500 focus:ring-zinc-500"
  }`}
>
  <option value="">Selecciona un país</option>
  {listaPaises.map((pais) => (
    <option key={pais} value={pais}>
      {pais}
    </option>
  ))}
</select>

{/* Fecha cierre */}
<label className="text-sm text-zinc-400 mt-2 mb-1 block">Fecha de cierre</label>
<input
  type="date"
  className={`appearance-none mb-3 w-full px-4 py-2 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 ${
    editConvocatoria?.fechaCierre !== originalConvocatoria?.fechaCierre
      ? "bg-zinc-800 text-white focus:ring-blue-500"
      : "bg-zinc-900 text-zinc-500 focus:ring-zinc-500"
  }`}
  value={editConvocatoria?.fechaCierre.slice(0, 10)}
  onChange={(e) =>
    setEditConvocatoria({
      ...editConvocatoria!,
      fechaCierre: e.target.value,
    })
  }
/>


{/* Status */}
<label className="text-sm text-zinc-400 mt-2 mb-1 block">Estado</label>
<select
  className={`appearance-none pr-10 mb-3 w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    editConvocatoria?.status !== originalConvocatoria?.status
      ? "bg-zinc-800 text-white focus:ring-blue-500"
      : "bg-zinc-900 text-zinc-500 focus:ring-zinc-500"
  }`}
  value={editConvocatoria?.status}
  onChange={(e) =>
    setEditConvocatoria({
      ...editConvocatoria!,
      status: e.target.value,
    })
  }
>

  <option value="activo">Activo</option>
  <option value="inactivo">Inactivo</option>
</select>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        type="button"
                        onClick={() => setDeleteId(editConvocatoria?.ID_convocatoria || null)}
                        className="text-red-500 hover:text-red-400 flex items-center gap-1"
                        title="Eliminar convocatoria"
                      >
                        <Icon icon="lucide:trash" width={20} height={20} />
                        <span className="text-sm">Eliminar</span>
                      </button>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl"
                          onClick={() => {
                            setEditConvocatoria(null);
                            setOriginalConvocatoria(null);
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={!hasChanges}
                          className={`rounded-xl ${
                            hasChanges ? "bg-green-600 hover:bg-green-700" : "bg-zinc-700 cursor-not-allowed"
                          }`}
                        >
                          Guardar cambios
                        </Button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {convocatorias.map((convocatoria) => (
              <div key={convocatoria.ID_convocatoria} className="relative bg-zinc-800 p-6 rounded-xl shadow-lg">
                <div className="absolute top-7 right-5">
  <button
    onClick={() => {
      setEditConvocatoria(convocatoria);
      setOriginalConvocatoria(convocatoria);
    }}
    className="text-zinc-500 hover:text-blue-400"
  >
    <Icon icon="lucide:pencil" width={14} height={15} />
  </button>
</div>


                <h2 className="text-xl font-semibold mb-2">{convocatoria.nombreConvocatoria}</h2>
                <p className="text-sm text-zinc-400 mb-1">Organización: {convocatoria.organizacion}</p>
                <p className="text-sm text-zinc-400 mb-1">Cierre: {new Date(convocatoria.fechaCierre).toLocaleDateString()}</p>
                <p className="text-sm text-zinc-400 mb-1">Región: {convocatoria.region} ({convocatoria.pais})</p>
                <p className="text-sm text-zinc-400 mb-2"> Status:{" "}
                  <span className={convocatoria.status === "activo" ? "text-green-400" : "text-red-400"}>
                    {convocatoria.status}
                    </span>
                    </p>
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
