import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useLocation, useNavigate, Link } from "react-router-dom";

// Sidebar
const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const userId = sessionStorage.getItem("userId");

  const menuItems = [
    { title: "Inicio", icon: "lucide:home", path: "/cards" },
    { title: "Asistente de Mi Biomo", icon: "lucide:activity", path: "/asistentebiomo" },
    { title: "Nuevas Convocatorias", icon: "lucide:bell", path: "/AsNewConv" },
    { title: "Explorador de Anteproyectos", icon: "lucide:search", path: "/anteproyectos" },
    { title: "Informes, Métricas y Análisis", icon: "lucide:bar-chart-2", path: "/informes" },
  ];

  return (
    <div className={`flex flex-col bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}>
      <div className="flex items-center gap-2 p-4 border-b border-zinc-800">
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <Icon icon="lucide:eye" className="text-zinc-900 w-4 h-4" />
        </div>
        <span className="font-medium text-white">Mawi</span>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item, idx) => (
          <Link to={item.path} key={idx}>
            <Button
              variant="flat"
              color={location.pathname === item.path ? "success" : "default"}
              className={`justify-start w-full mb-1 ${location.pathname === item.path ? "bg-success-900/20 text-success" : "bg-transparent text-white"}`}
              startContent={<Icon icon={item.icon} width={18} height={18} />}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
      <div className="mt-auto border-t border-zinc-800 p-3">
        <Button
          variant="flat"
          color="default"
          className="justify-start w-full text-zinc-400"
          startContent={<Icon icon="lucide:help-circle" width={18} height={18} />}
          onPress={() => navigate("/soporte")} 
        >
          Contacta con el soporte
        </Button>
      </div>
    </div>
  );
};

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

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 p-4 overflow-auto space-y-6">
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
  );
}
