import React from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [telefono, setTelefono] = React.useState("");
  const [pais, setPais] = React.useState("");
  const [provincia, setProvincia] = React.useState("");
  const [ciudad, setCiudad] = React.useState("");

  const handleRegister = () => {
    navigate("/trabajo");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Card className="mx-auto w-full max-w-md bg-zinc-900 text-white">
        <CardBody className="flex flex-col gap-4 p-6">
          <div className="mb-2 flex items-center justify-center">
            <Icon icon="lucide:eye" className="mr-3 h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Mawi</h1>
          </div>
          
          <h2 className="text-center text-xl font-semibold">¿De dónde eres?</h2>
          <h4 className= "text-center text-x1 font-semibold"> Completa tu usuario agregando esta información </h4> 
          
          <Input
            label="Prefijo + Número telefónico"
            placeholder=""
            value={telefono}
            onValueChange={setTelefono}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />
          
          <Input
            label="País"
            placeholder=""
            type="text"
            value={pais}
            onValueChange={setPais}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

          <Input
            label="Provincia"
            placeholder=""
            type="text"
            value={provincia}
            onValueChange={setProvincia}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />
          
          <Input
            label="Ciudad"
            placeholder=""
            type="text"
            value={ciudad}
            onValueChange={setCiudad}
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
            onPress={handleRegister}
          >
            Siguiente
          </Button>
          
          <p className="mt-2 text-center text-sm text-gray-500">
            <span 
              className="cursor-pointer hover:text-success-500"
              onClick={() => navigate("/login")}
            >
              ¿Necesitas ayuda? Contacta con nosotros
            </span>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}