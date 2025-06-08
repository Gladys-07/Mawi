import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import UserProfile from "./pages/user-profile";
import SuccessPage from "./pages/success";
import IniciarSesion from "./pages/iniciar_sesion";
import RecuperarContrasenia from "./pages/recuperar_contrasenia";
import CambioContrasenia from "./pages/cambio_contrasenia";
import AsistenteNuevasConv from "./pages/asistenteNewConv";
import ConvocatoriasDashboard from "./pages/convocatoriasDasboard";
import Donde from "./pages/donde";
import Trabajo from "./pages/trabajo";
import Cards from "./pages/cards";
import AsistenteBiomo from "./pages/asistentebiomo";
import Anteproyectos from "./pages/anteproyectos";
import Soporte from "./pages/soporte";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/iniciar_sesion" element={<IniciarSesion />} />
      <Route path="/recuperar_contrasenia" element={<RecuperarContrasenia />} />
      <Route path="/cambio_contrasenia" element={<CambioContrasenia />} />
      <Route path="/AsNewConv" element={<AsistenteNuevasConv />} />
      <Route path="/convoDash" element={<ConvocatoriasDashboard />} />
      <Route path="/asistentebiomo" element={<AsistenteBiomo />} />
      <Route path="/anteproyectos" element={<Anteproyectos />} />
      <Route path="/donde" element={<Donde/>} />
      <Route path="/trabajo" element={<Trabajo/>} />
      <Route path="/cards" element={<Cards/>} />
      <Route path="/soporte" element={<Soporte />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}