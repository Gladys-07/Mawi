import React, { useState } from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function RecuperarContrasenia() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [OTP, setOTP] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [passMatch, setPassMatch] = useState(false);
  
  const handleRecuperar = async () => {
    // PASSWORD CHANGE LOGIC
    //NEWPASSWORD ES LA CONTRASEÑA, Y SESSIONSTOREAGE EMAIL ES EL MAIL
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Por favor, ingrese contraseña y confirmación de la misma.");
      return;
    }
    try {
      const response = await fetch("https://ludusdev-backend-1.onrender.com/CSoftware/api/cambioContra", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "email": sessionStorage.getItem("provEmail"),
          "password": newPassword
        })
      });
      const resChangePass = await response.json();
      if(resChangePass.total === "0") {
        setErrorMessage("No se pudo cambiar la contraseña");
      } else {
        console.log("changed password successfully");
        navigate("/success");
      }

    } catch(error) {
      console.log("Error al conectar con el servidor");
      setErrorMessage("Error de conexión con el servidor.");
    }
  };

  React.useEffect(() => {
    setPassMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

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
            placeholder=" "
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
            placeholder=" "
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
            placeholder=" "
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

          {errorMessage && (
            <div className="rounded-md bg-red-500/10 border border-red-500 text-red-400 text-sm p-2 text-center">
              {errorMessage}
            </div>
          )}

          <Button 
            color="success" 
            className="mt-2 w-full"
            onPress={handleRecuperar}
            disabled={!passMatch} //deshabilita el botón si passMatch es falso, solo es true si las contras coinciden
          >
            Guardar
          </Button>
          {!passMatch && newPassword && confirmPassword && (
            <div className="rounded-md bg-red-500/10 border border-red-500 text-red-400 text-sm p-2 text-center">
              Las contraseñas no coinciden.
            </div>
          )}

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
// mensaje de se ha actualizado tu contraseña