import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MawiOjo from "../assets/MawiOjo.png";


export default function Login() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* Animated background */}
   <div className="absolute inset-0 z-0">
  <motion.div
    className="absolute -inset-[90px] blur-[90px] opacity-60"
    animate={{
      background: [
        "radial-gradient(circle at 30% 30%, rgba(0,255,180,0.7) 0%, rgba(0,0,0,0) 30%)",
        "radial-gradient(circle at 50% 50%, rgba(0, 255, 60, 0.73) 0%, rgba(0,0,0,0) 30%)",
        "radial-gradient(circle at 50% 50%, rgba(152, 232, 189, 0.6) 0%, rgba(0,0,0,0) 30%)",
      ],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }}
         />
        
        <motion.div 
          className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-success-500/10 blur-[100px]"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 h-[200px] w-[200px] rounded-full bg-white/5 blur-[80px]"
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 80, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center px-4">
        <div className="mb-6 flex items-center">
          <img
            src={MawiOjo}
            alt="Logo Mawi"
            className="w-16 h-16 object-contain mr-2"
          />
          <h1 className="text-4xl font-bold text-white">Mawi</h1>
        </div>
        
        <p className="mb-6 text-center text-gray-300">
          Bienvenido a la IA con la que podrás ayudar al planeta
        </p>
        
        <Button 
          color="success" 
          className="w-full max-w-xs backdrop-blur-sm"
          onPress={()=> navigate("/iniciar_sesion")}
        >
          Log in
        </Button>
        
        <p className="mt-4 text-sm text-gray-500">
          <span 
            className="cursor-pointer hover:text-success-500"
             onClick={() => navigate("/register")}
           
          >
            ¿No tienes cuenta? Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}