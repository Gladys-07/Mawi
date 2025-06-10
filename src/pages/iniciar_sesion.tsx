import React from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import MawiOjo from "../assets/MawiOjo.png"; // Ajusta la ruta si tu imagen está en otra carpeta

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [name, setName] = React.useState("");

  
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, ingresa correo y contraseña.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/CSoftware/api/loginByEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const res = await response.json();

      if (res.isLogin) {
          const user = res.user;
          sessionStorage.setItem("name", user.username);
          sessionStorage.setItem("userEmail", user.email);
          sessionStorage.setItem("userId", user.id);
          sessionStorage.setItem("token", res.jwt);
          navigate("/cards");
      } else {
          setErrorMessage("Correo o contraseña incorrectos.");
      }


    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setErrorMessage("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Card className="mx-auto w-full max-w-md bg-zinc-900 text-white">
        <CardBody className="flex flex-col gap-4 p-6">
          <div className="mb-2 flex items-center justify-center">
            <img
              src={MawiOjo}
              alt="Logo Mawi"
              className="mr-3 h-10 w-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-white">Mawi</h1>
          </div>
          
          <h2 className="text-center text-xl font-semibold">Iniciar sesión</h2>

          <Input
            label="Correo electrónico"
            placeholder=""
            type="email"
            value={email}
            onValueChange={(val) => {
              setEmail(val);
              if (errorMessage) setErrorMessage("");
            }}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />

          <Input
            label="Contraseña"
            placeholder=""
            type="password"
            value={password}
            onValueChange={(val) => {
              setPassword(val);
              if (errorMessage) setErrorMessage("");
            }}
            variant="bordered"
            classNames={{
              inputWrapper: "bg-zinc-800 border-zinc-700",
              input: "text-white",
              label: "text-gray-400"
            }}
          />


          {/* Mensaje de error visible y estilizado */}
          {errorMessage && (
            <div className="rounded-md bg-red-500/10 border border-red-500 text-red-400 text-sm p-2 text-center">
              {errorMessage}
            </div>
          )}

          <p className="mt-4 text-sm text-gray-500">
            <span 
              className="cursor-pointer hover:text-success-500"
              onClick={() => navigate("/recuperar_contrasenia")}
            >
              ¿Has olvidado tu constraseña?
            </span>
          </p>
          
          <Button 
            color="success" 
            className="mt-2 w-full"
            onPress={handleLogin}
          >
            Iniciar sesión
          </Button>
          
          <p className="mt-2 text-center text-sm text-gray-500">
            <span 
              className="cursor-pointer hover:text-success-500"
              onClick={() => navigate("/login")}
            >
              ¿No tienes cuenta? Crea una nueva
            </span>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
