import React from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function RecuperarContrasenia() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");

  
    // Aquí iría tu lógica para enviar correo
   // navigate("/success");
 
const handleRecuperar = () => {
  sessionStorage.setItem("name", userName);
  navigate("/cambio_contrasenia");
};



  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Card className="mx-auto w-full max-w-md bg-zinc-900 text-white">
        <CardBody className="flex flex-col gap-4 p-6">
          <div className="mb-2 flex items-center justify-center">
            <Icon icon="lucide:eye" className="mr-3 h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Mawi</h1>
          </div>

          <h2 className="text-center text-xl font-semibold">Recuperar contraseña</h2>

          <Input
            label="Nombre de usuario"
            placeholder=""
            type="text"
            value={userName}
            onValueChange={setUserName}
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

          <Button 
            color="success" 
            className="mt-2 w-full"
            onPress={handleRecuperar}
          >
            Enviar correo
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
