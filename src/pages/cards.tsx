import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [loMenu, setloMenu] = useState(false)

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  }

  const handleCardClick = (ruta: string): void => {
    if (ruta === "Convocatorias") {
      navigate("/AsNewConv");
    } else if (ruta === "Biomo") {
      navigate("/asistentebiomo");
    } else if (ruta === "Anteproyectos") {
      navigate("/anteproyectos");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <Icon icon="lucide:eye" className="text-zinc-900 w-4 h-4" />
          </div>
          <span className="font-medium">Mawi</span>

        </div>
        <div className="relative">
          <Button size="sm" 
                  variant="ghost" 
                  className="text-white" 
                  onPress={() => setloMenu((prev) => !prev)}> {/*It sets loMenu to the opposite of its previous value  */}
            <Icon icon="lucide:user" className="text-white w-4 h-4" />
            EcoRanger
          </Button>
          {loMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-900 shadow-lg z-50 rounded border border-white py-1 px-2">
              <span className="block text-white w-full text-base text-center font-semibold mb-2 py-1"> 
                {sessionStorage.getItem("name")}  
              </span>
              <Button size="sm" 
                      variant="ghost" 
                      className="text-white w-full text-left text-xs"
                      onPress={handleLogout}>
                        Logout 
                      </Button>
            </div>
          )
          }
        </div>
        
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          {/* Card 1 */}
          <Card
          isPressable
          isHoverable
          onPress={() => handleCardClick("Biomo")}
          className="bg-zinc-800 hover:bg-zinc-600 border-none p-6 flex flex-col items-center text-center transition-colors"
      >
        <Icon icon="lucide:settings" className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-white font-medium mb-2">Asistente de Mi Biomo</h3>
        <p className="text-xs text-zinc-400">
          El asistente te ayudará a conocer todos los datos sobre tu biomonitorización y te guiará en todo aquello que necesites saber, así como subir datos nuevos.
      </p>
  </Card>


          {/* Card 2 */}
          <Card
            isPressable
            isHoverable
            onPress={() => handleCardClick("Convocatorias")}
            className="bg-zinc-800 border-none p-6 flex flex-col items-center text-center relative"
        >
            <Icon icon="lucide:file-text" className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-white font-medium mb-2">Nuevas Convocatorias</h3>
            <p className="text-xs text-zinc-400">
            Participa en nuevas convocatorias, genera nuevos anteproyectos. Registre todos los datos referentes a la nueva formulación de anteproyecto.
        </p>
    </Card>

          {/* Card 3 */}
          <Card 
           isPressable
          isHoverable
          onPress={() => handleCardClick("Anteproyectos")}
          className="bg-zinc-800 border-none p-6 flex flex-col items-center text-center">
            
            <Icon icon="lucide:file-edit" className="w-12 h-12 text-green-500 mb-4" style={{ strokeWidth: 1 }} />
            <h3 className="text-white font-medium mb-2">Explorador de Anteproyectos</h3>
            <p className="text-xs text-zinc-400">
             Interactúa con todas aquellas convocatorias abiertas y formula anteproyectos.
            </p>
          </Card>
        </div>

        {/* Contact Button */}
        <Button
          className="mt-8 bg-zinc-700 hover:bg-zinc-600 text-white"
          variant="flat"
          onPress={() => navigate("/soporte")}
        >
          Contacta con el soporte
        </Button>
      </main>
    </div>
  );
}
