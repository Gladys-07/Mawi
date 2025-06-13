import React from "react";
import { Button, Input, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Await, useNavigate } from "react-router-dom";
import MawiOjo from "../assets/MawiOjo.png"; // Ajusta la ruta si tu imagen está en otra carpeta
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [role, setRole] = useState("3");

  const getUserRole = async (token : string) => {
    try {
      const response = await fetch(`https://ludusdev-backend-1.onrender.com/CSoftware/api/getRoleByEmail?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "authorization" : `Bearer ${token}`
        }
      });
      const resUserRole = await response.json();
      const specificRole = resUserRole.result;
      if (specificRole.length > 0) {
        return specificRole[0].rol;
      } else {
        setErrorMessage("No role found");
        return null;
      }
    } catch(err) {
      setErrorMessage("No role found, sorry");
      return null;
    }
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, ingresa correo y contraseña.");
      return;
    }

    try {
      const response = await fetch("https://ludusdev-backend-1.onrender.com/CSoftware/api/loginByEmail", {
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

          const token = res.jwt;
          const role = await getUserRole(token);

          console.log(role)
          if (role == "2") {
            navigate("/admin");
          } else {
            // Aqui va cuando checas si es admin o ecoranger y lo mandas para cards o adminDashboard segun su rol
          navigate("/cards");
          }
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
              ¿Has olvidado tu contraseña?
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
