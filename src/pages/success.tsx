import React from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Card className="mx-auto w-full max-w-md bg-zinc-900 text-white">
        <CardBody className="flex flex-col items-center gap-4 p-6 text-center">
          <div className="mb-2 flex items-center justify-center">
            <Icon icon="lucide:eye" className="mr-3 h-6 w-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Mawi</h1>
          </div>
          
          <div className="my-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-500">
            <Icon icon="lucide:check" className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-xl font-semibold">¡Registro completado con éxito!</h2>
          <p className="text-gray-400">
            Ahora podrás comenzar a usar Mawi para ayudar al planeta
          </p>
          
          <Button 
            color="success" 
            className="mt-4 w-full"
            onPress={() => navigate("/dashboard")}
          >
            Continuar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}