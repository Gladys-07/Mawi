import React from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = React.useState("");
  const [apellidos, setApellido] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setContrasena] = React.useState("");
  const [confirmContrasena, setConfirmedContrasena] = React.useState("");
  const [error, setError] = React.useState("");

  const handleRegister = async () => {
    if (!nombre || !apellidos || !email || !password || !confirmContrasena) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");

    sessionStorage.setItem("nombre", nombre);
    sessionStorage.setItem("apellidos", apellidos);

    const username = nombre.toLowerCase().replace(/\s+/g, "");
    const usuario = {
      username,
      email,
      password,
      statusUsuario: 1,
    };

    try {
      const response = await fetch("http://localhost:3000/CSoftware/api/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      // Manejo de códigos de estado HTTP
      if (response.status === 201) {
        // Usuario creado exitosamente
        navigate("/donde");
      } else if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.message || "Faltan campos obligatorios.");
      } else if (response.status === 409) {
        const errorData = await response.json();
        setError(errorData.message || "El nombre de usuario o correo ya está en uso.");
      } else if (response.status === 500) {
        setError("Error interno del servidor. Por favor, inténtalo más tarde.");
      } else {
        setError("Error desconocido. Por favor, inténtalo más tarde.");
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
          
          <h2 className="text-center text-xl font-semibold">Crear una cuenta</h2>
          
          <Input
            label="Nombre "
            placeholder=""
            value={nombre}
            onValueChange={setNombre}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

          <Input
            label="Apellidos"
            placeholder=""
            value={apellidos}
            onValueChange={setApellido}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />
          
          <Input
            label="Correo electrónico"
            placeholder=""
            type="email"
            value={email}
            onValueChange={setEmail}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />
          
          <Input
            label="Ingresa tu contraseña"
            placeholder=""
            type="password"
            value={password}
            onValueChange={setContrasena}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

          <Input
            label="Confirmar Contraseña"
            placeholder=""
            type="password"
            value={confirmContrasena}
            onValueChange={setConfirmedContrasena}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          
          <Button 
            color="success" 
            className="mt-2 w-full"
            onPress={handleRegister}
          >
            Registrarse
          </Button>
          
          <p className="mt-2 text-center text-sm text-gray-500">
            <span 
              className="cursor-pointer hover:text-success-500"
              onClick={() => navigate("/login")}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </span>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
