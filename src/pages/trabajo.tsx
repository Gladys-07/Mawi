import React from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [nombreOrganizacion, setNombreOrganizacion] = React.useState("");
  const [descripcionOrganizacion, setDescripcionOrganizacion] = React.useState("");
  const [error, setError] = React.useState("");

  const handleRegister = async () => {
    // Validación: Verificar que todos los campos estén llenos
    if (!nombreOrganizacion || !descripcionOrganizacion) {
      setError("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    // Limpiar el mensaje de error si todo está correcto
    setError("");

    // Guardar datos en sessionStorage
    sessionStorage.setItem("nombreOrganizacion", nombreOrganizacion);
    sessionStorage.setItem("descripcionOrganizacion", descripcionOrganizacion);

    // Obtener datos de sessionStorage
    const nombre = sessionStorage.getItem("nombre");
    const apellidos = sessionStorage.getItem("apellidos");
    const numeroContacto = sessionStorage.getItem("telefono");
    const pais = sessionStorage.getItem("pais");
    const region = sessionStorage.getItem("provincia");
    const ciudad = sessionStorage.getItem("ciudad");

    // Crear objeto para enviar al backend
    const usuario_perfil = {
      nombre,
      apellidos,
      numeroContacto,
      pais,
      region,
      ciudad,
      nombreOrganizacion,
      descripcionOrganizacion,
    };

    try {
      const response = await fetch("http://localhost:3000/CSoftware/api/newUserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario_perfil),
      });

      if (response.ok) {
        
        //sessionStorage.clear(); // Limpiar sessionStorage si es necesario
        // Navegar a la siguiente página si la petición es exitosa
        navigate("/success");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al guardar la información.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Card className="mx-auto w-full max-w-md bg-zinc-900 text-white">
        <CardBody className="flex flex-col gap-4 p-6">
          <div className="mb-2 flex items-center justify-center">
            <Icon icon="lucide:eye" className="mr-3 h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Mawi</h1>
          </div>

          <h2 className="text-center text-xl font-semibold">¿Con quién trabajas?</h2>
          <h4 className="text-center text-xl font-semibold">
            Completa tu usuario agregando esta información
          </h4>

          <Input
            label="Nombre de la organización"
            placeholder=""
            value={nombreOrganizacion}
            onValueChange={setNombreOrganizacion}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400",
            }}
          />

          <Input
            label="Descripción de la organización"
            placeholder=""
            value={descripcionOrganizacion}
            onValueChange={setDescripcionOrganizacion}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400",
            }}
          />

          {/* Mostrar mensaje de error si hay campos vacíos */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button color="success" className="mt-2 w-full" onPress={handleRegister}>
            Guardar
          </Button>

          <p className="mt-2 text-center text-sm text-gray-500">
            <span
              className="cursor-pointer hover:text-success-500"
              onClick={() => navigate("/soporte")}
            >
              ¿Necesitas ayuda? Contacta con nosotros
            </span>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
