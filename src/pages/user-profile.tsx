import React from "react";
import Sidebar from "../components/sidebar";
import { getMenuItems } from "../utils/menuItems";
import { Button, Card, CardBody, Avatar, Input, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function UserDashboard() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [name, setName] = React.useState("Ana García");
  const [email, setEmail] = React.useState("ana@example.com");
  const [bio, setBio] = React.useState("Entusiasta del medio ambiente y la sostenibilidad");

  const menuItems = getMenuItems();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      <Sidebar isOpen={isOpen} menuItems={menuItems} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className={`fixed top-0 left-0 right-0 z-30 h-16 flex items-center border-b border-zinc-800 bg-zinc-900 px-4 gap-4 transition-all duration-300 ${isOpen ? 'pl-64' : 'pl-0'}`}>
          <Button isIconOnly variant="light" onPress={toggleSidebar} className="text-white">
            <Icon icon={isOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={20} height={20} />
          </Button>
          <h1 className="text-lg font-medium text-white">Perfil de Usuario</h1>
          <span className="ml-auto text-sm">
            {`EcoRanger${sessionStorage.getItem("name") ? `: ${sessionStorage.getItem("name")}` : ""}`}
          </span>
        </div>

        {/* Contenido */}
        <main className={`pt-24 pb-20 px-6 overflow-auto transition-all duration-300 ${isOpen ? 'ml-0' : 'ml-0'}`}>
          <h1 className="mb-6 text-2xl font-bold text-white ml-8 pl-4">Perfil de Usuario</h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Columna 1: Avatar y estadísticas */}
            <Card className="bg-zinc-900 text-white lg:col-span-1">
              <CardBody className="flex flex-col items-center p-6 text-center">
                <Avatar
                  src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                  className="h-24 w-24"
                />
                <h2 className="mt-4 text-xl font-semibold">{name}</h2>
                <p className="text-sm text-gray-400">{email}</p>

                <div className="mt-6 w-full">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Nivel de impacto</span>
                    <span className="text-sm font-medium text-success-500">Avanzado</span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon icon="lucide:award" className="h-5 w-5 text-success-500" />
                      <span className="text-sm">78 acciones completadas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon icon="lucide:users" className="h-5 w-5 text-success-500" />
                      <span className="text-sm">12 amigos invitados</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon icon="lucide:calendar" className="h-5 w-5 text-success-500" />
                      <span className="text-sm">Miembro desde Enero 2023</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Columna 2: Información editable */}
            <Card className="bg-zinc-900 text-white lg:col-span-2">
              <CardBody className="p-6">
                <h3 className="mb-4 text-lg font-medium">Información Personal</h3>

                <div className="space-y-4">
                  <Input
                    label="Nombre completo"
                    value={name}
                    onValueChange={setName}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "bg-zinc-800 border-zinc-700",
                      input: "text-white",
                      label: "text-gray-400"
                    }}
                  />

                  <Input
                    label="Correo electrónico"
                    value={email}
                    onValueChange={setEmail}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "bg-zinc-800 border-zinc-700",
                      input: "text-white",
                      label: "text-gray-400"
                    }}
                  />

                  <Input
                    label="Biografía"
                    value={bio}
                    onValueChange={setBio}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "bg-zinc-800 border-zinc-700",
                      input: "text-white",
                      label: "text-gray-400"
                    }}
                  />
                </div>

                <Divider className="my-6" />

                <h3 className="mb-4 text-lg font-medium">Preferencias</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Notificaciones por correo</span>
                    <Button color="success" size="sm" variant="flat">Activado</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Notificaciones push</span>
                    <Button color="success" size="sm" variant="flat">Activado</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Compartir estadísticas</span>
                    <Button color="danger" size="sm" variant="flat">Desactivado</Button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button color="default" variant="flat">Cancelar</Button>
                  <Button color="success">Guardar cambios</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
