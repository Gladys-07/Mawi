const userItems = [
    { title: "Inicio", icon: "lucide:home", path: "/cards" },
    { title: "Asistente de Mi Biomo", icon: "lucide:activity", path: "/asistentebiomo" },
    { title: "Nuevas Convocatorias", icon: "lucide:bell", path: "/AsNewConv" },
    { title: "Explorador de Convocatorias", icon: "lucide:newspaper", path: "/convoDash" },
    { title: "Explorador de Anteproyectos", icon: "lucide:search", path: "/anteproyectos" }
  ];

const adminItems = [
    { title: "Informes, métricas y análisis", icon: "lucide:chart-no-axes-combined", path: "/admin" },
    { title: "Usuarios", icon: "lucide:user-round-search", path: "/users" },
    { title: "Vista de usuario", icon: "lucide:users", path: "/cards" }
  ];

export {
    userItems,
    adminItems
}