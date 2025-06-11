import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userItems, adminItems } from "../constants";
import Sidebar from "../components/sidebar";

// Datos de ejemplo
const ecoRangers = [
  {
    nombre: "Lucas",
    apellidos: "Jiménez Roca",
    país: "España",
    región: "Castilla y León",
    ciudad: "Salamanca",
    correo: "lucasjimenez@consemawa.org",
    contacto: "+34 656 90 15 89",
    foto: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    nombre: "Marta",
    apellidos: "Hernández González",
    país: "México",
    región: "Chihuahua",
    ciudad: "San Juanito",
    correo: "marta.hernandez@consemawa.org",
    contacto: "+52 614 25 78 91",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    nombre: "EcoRanger...",
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
    <div className="flex">
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
      <div className="flex-1 p-4 overflow-auto space-y-6 pt-20">
        {ecoRangers.map((ranger, index) => (
          <div
            key={index}
            className="bg-green-700 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between shadow-md border border-green-800"
          >
            <div className="flex items-start md:items-center gap-4">
              {ranger.foto && (
                <img
                  src={ranger.foto}
                  alt="Foto"
                  className="w-20 h-20 rounded-full object-cover border border-white"
                />
              )}
              <div className="text-sm space-y-1 text-white">
                <p><strong>Labor:</strong> EcoRanger</p>
                <p><strong>Nombre:</strong> {ranger.nombre}</p>
                <p><strong>Apellidos:</strong> {ranger.apellidos}</p>
                <p><strong>País:</strong> {ranger.país}</p>
                <p><strong>Región:</strong> {ranger.región}</p>
                <p><strong>Ciudad:</strong> {ranger.ciudad}</p>
                <p><strong>Correo:</strong> {ranger.correo}</p>
                <p><strong>Número de contacto:</strong> {ranger.contacto}</p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
              <Button color="secondary" variant="shadow">
                Informes, Métricas y Análisis
              </Button>
              <Button color="success" variant="flat">
                Crear EcoRanger
              </Button>
              <Button color="primary" variant="flat">
                Editar EcoRanger
              </Button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
