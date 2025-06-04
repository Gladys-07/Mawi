import React from "react";
import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [sitio, setSitio] = React.useState("");

  const handleRegister = () => {
    navigate("/cards");
  };

  const handleCancel = () => {
    // acción alternativa, por ejemplo limpiar campos o volver atrás
    setNombre("");
    setFecha("");
    setSitio("");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-800 text-white">
      {/* Header */}
      <header className="bg-black p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <Icon icon="lucide:eye" className="text-zinc-900 w-4 h-4" />
          </div>
          <span className="font-medium">Mawi</span>
        </div>
        <Button size="sm" variant="ghost" className="text-white">
          <Icon icon="lucide:user" className="text-zinc-900 w-4 h-4" />
          EcoRanger
        </Button>
      </header>

      {/* Formulario */}
      <div className="flex flex-col gap-4 max-w-md ml-[5vw] mr-[5vw] sm:ml-[10vw] sm:mr-[10vw] md:ml-[15vw] md:mr-[15vw] lg:ml-[20vw] lg:mr-[20vw] mt-6 sm:mt-10 md:mt-16 lg:mt-24">
        <h1 className="text-2xl font-bold">Asistente de Nuevas Convocatorias</h1>

        {/* Nombre del anteproyecto */}
        <p className="text-sm text-gray-100 font-bold">Nombre del anteproyecto</p>
        <Input
          label="Ej. Desarrollo Sostenible"
          type="text"
          value={nombre}
          onValueChange={setNombre}
          variant="bordered"
          classNames={{
            inputWrapper: "bg-zinc-800 border-zinc-700",
            input: "text-white",
            label: "text-gray-400"
          }}
        />

        {/* Fecha de cierre */}
        <p className="text-sm text-gray-100 font-bold">Fecha de cierre</p>
        <Input
          label="00/00/0000"
          type="text"
          value={fecha}
          onValueChange={setFecha}
          variant="bordered"
          classNames={{
            inputWrapper: "bg-zinc-800 border-zinc-700",
            input: "text-white",
            label: "text-gray-400"
          }}
        />

        {/* Sitio Web */}
        <p className="text-sm text-gray-100 font-bold">Sitio Web</p>
        <Input
          label="www.ejemplo.com"
          type="text"
          value={sitio}
          onValueChange={setSitio}
          variant="bordered"
          classNames={{
            inputWrapper: "bg-zinc-800 border-zinc-700",
            input: "text-white",
            label: "text-gray-400"
          }}
        />

        {/* Botones */}
        <div className="flex gap-2 justify-between">
          <Button size="md" className="w-full" color="success" onPress={handleRegister}>
            Siguiente
          </Button>
          <Button size="md" className="w-full" color="success" onPress={handleCancel}>
            Subir Datos
          </Button>
        </div>
      </div>
    </div>
  );
}
