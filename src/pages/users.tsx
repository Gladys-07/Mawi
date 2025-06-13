import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userItems, adminItems } from "../constants";
import Sidebar from "../components/sidebar";

// Datos de ejemplo
const ecoRangers = [
  {
    nombre: "Licca",
    apellidos: "Jiménez Roca",
    país: "España",
    región: "Cotilla y León",
    ciudad: "Salamanca",
    correo: "Lenginyense@conservana.org",
    contacto: "+36 656 50 15 59",
    foto: "",
  },
  {
    nombre: "León",
    apellidos: "Henriérdez González",
    país: "México",
    región: "Chrisushua",
    ciudad: "San Juanito",
    correo: "mail.sluenandote@conservana.org",
    contacto: "+36 614 25 78 91",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    nombre: "Ecolanger...",
    apellidos: "",
    país: "",
    región: "",
    ciudad: "",
    correo: "",
    contacto: "",
    foto: "",
  }
];

// Vista principal
export default function ViewEcoranger() {
  const [isOpen, setIsOpen] = React.useState(true);
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  const toggleSidebar = () => { 
    setIsOpen(!isOpen);
  };
  const menuThings = isAdmin ? adminItems : userItems;
  console.log(`Is admin? ${sessionStorage.getItem("isAdmin")}`);
  const userRole = sessionStorage.getItem("isAdmin") === "true" ? "Admin" : "EcoRanger";
  
  return (
    <div className="flex bg-zinc-900 min-h-screen">
        <Sidebar isOpen={isOpen} menuItems={menuThings}/>
      <div className="flex flex-1 flex-col overflow-auto">
        <div className={`fixed top-0 left-0 right-0 z-30 h-16 flex items-center border-b border-zinc-800 bg-zinc-900 px-6 gap-4 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-0'}`}>
          <Button isIconOnly variant="light" className="text-white ml-2" onPress={() => setIsOpen(!isOpen)}>
            <Icon icon={isOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={20} height={20} />
          </Button>
          <h1 className="text-lg font-medium text-white">Usuarios en plataforma</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-white">
              {`${userRole} ${sessionStorage.getItem("name") ? `: ${sessionStorage.getItem("name")}` : ""}`}
            </span>
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <Icon icon="lucide:user" width={20} height={20} />
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-auto space-y-6 pt-20 bg-zinc-900">
          <div className="grid grid-cols-1 gap-6">
            {ecoRangers.map((ranger, index) => (
              <div
                key={index}
                className="bg-green-700 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg border border-green-800 transition-all hover:shadow-green-900/30 hover:translate-y-[-2px]"
              >
                <div className="flex items-start md:items-center gap-4">
                  {ranger.foto ? (
                    <img
                      src={ranger.foto}
                      alt="Foto"
                      className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-green-800/50 border-2 border-white/20 flex items-center justify-center">
                      <Icon icon="lucide:user" width={32} height={32} className="text-white/50" />
                    </div>
                  )}
                  <div className="text-sm space-y-1 text-white">
                    <p className="font-bold text-green-200">Labor: Ecolanger</p>
                    <p><strong>Nombre:</strong> {ranger.nombre || "-"}</p>
                    <p><strong>Apellidos:</strong> {ranger.apellidos || "-"}</p>
                    <p><strong>País:</strong> {ranger.país || "-"}</p>
                    <p><strong>Región:</strong> {ranger.región || "-"}</p>
                    <p><strong>Ciudad:</strong> {ranger.ciudad || "-"}</p>
                    <p><strong>Correo:</strong> {ranger.correo || "-"}</p>
                    <p><strong>Número de contacto:</strong> {ranger.contacto || "-"}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
                  <Button
                    className="bg-green-800/90 text-white hover:bg-green-700 w-full md:w-auto"
                  >
                    Informes, Métricas y Análisis
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      className="bg-green-800/70 text-white hover:bg-green-700"
                      variant="flat"
                      size="sm"
                    >
                      Crear EcoRanger
                    </Button>
                    <Button
                      className="bg-green-800/70 text-white hover:bg-green-700"
                      variant="flat"
                      size="sm"
                    >
                      Editar EcoRanger
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}