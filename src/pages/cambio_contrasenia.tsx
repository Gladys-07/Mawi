import React from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function RecuperarContrasenia() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  

  const handleRecuperar = () => {
    // Aquí iría tu lógica para enviar correo
    navigate("/success");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Card className="mx-auto w-full max-w-md bg-zinc-900 text-white">
        <CardBody className="flex flex-col gap-4 p-6">
          <div className="mb-2 flex items-center justify-center">
            <Icon icon="lucide:eye" className="mr-3 h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Mawi</h1>
          </div>

          <h2 className="text-center text-xl font-semibold">Cambio de contraseña</h2>

          <Input
            label="Código de verificación"
            placeholder="Ingresa tu código "
            type="text "
            value={codigo}
            onValueChange={setCodigo}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

           <Input
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña "
            type="password"
            value={newPassword}
            onValueChange={setNewPassword}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

           <Input
            label="Confirmar nueva contraseña"
            placeholder="Confirma tu nueva contraseña "
            type="password"
            value={confirmPassword}
            onValueChange={setConfirmPassword}
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
            Guardar
          </Button>

          <p className="mt-2 text-center text-sm text-gray-500">
            <span 
              className="cursor-pointer hover:text-success-500"
              onClick={() => navigate("/ayuda")} //hacer apartado de soporte "ayuda"
            >
              ¿Necesitas ayuda? Contacta con nosotros
            </span>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
// mensaje de se ha actualizado tu contraseña 