import React from "react";
import { Card, CardBody, Button, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen w-full bg-black">
      <Sidebar isOpen={sidebarOpen} />

      <div className={`fixed top-0 left-0 right-0 z-30 h-16 flex items-center border-b border-zinc-800 bg-zinc-900 px-6 gap-4 transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <Button isIconOnly variant="light" className="text-white" onPress={() => setSidebarOpen(!sidebarOpen)}>
          <Icon icon={sidebarOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={20} height={20} />
        </Button>
        <h1 className="text-lg font-medium text-white">Dashboard</h1>

  <div className="ml-auto flex items-center gap-4">
    <Button 
  color="success" 
  variant="flat"
  size="sm"
  className="bg-success-500/80 text-white hover:bg-success-500"
  startContent={<Icon icon="lucide:plus" />}
>
  Nueva acción
</Button>

    <span className="text-sm text-white">
      {sessionStorage.getItem("name") || "EcoRanger"}
    </span>
    <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
      <Icon icon="lucide:user" width={20} height={20} className="text-white" />
    </div>
  </div>
</div>

      <div className="absolute top-4 right-6 z-40">
</div>


      <div className={`flex-1 overflow-auto pt-24 pb-20 px-6 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="mb-6 flex justify-end">
</div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-zinc-900 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Huella de carbono</h3>
                <Icon icon="lucide:leaf" className="h-6 w-6 text-success-500" />
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Progreso</span>
                  <span className="text-sm font-medium text-success-500">65%</span>
                </div>
                <Progress value={65} color="success" className="h-2" />
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Has reducido tu huella de carbono en un 65% este mes
              </p>
            </CardBody>
          </Card>

          <Card className="bg-zinc-900 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Consumo de agua</h3>
                <Icon icon="lucide:droplets" className="h-6 w-6 text-blue-500" />
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Progreso</span>
                  <span className="text-sm font-medium text-blue-500">42%</span>
                </div>
                <Progress value={42} color="primary" className="h-2" />
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Has reducido tu consumo de agua en un 42% este mes
              </p>
            </CardBody>
          </Card>

          <Card className="bg-zinc-900 text-white">
            <CardBody>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Energía renovable</h3>
                <Icon icon="lucide:zap" className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Progreso</span>
                  <span className="text-sm font-medium text-yellow-500">78%</span>
                </div>
                <Progress value={78} color="warning" className="h-2" />
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Has incrementado tu uso de energía renovable en un 78%
              </p>
            </CardBody>
          </Card>
        </div>

        <Card className="mt-6 bg-zinc-900 text-white">
          <CardBody>
            <h3 className="mb-4 text-lg font-medium">Recomendaciones de la IA</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg bg-zinc-800 p-4">
                <Icon icon="lucide:lightbulb" className="mt-1 h-5 w-5 text-success-500" />
                <div>
                  <h4 className="font-medium text-white">Reduce el consumo eléctrico</h4>
                  <p className="text-sm text-gray-400">
                    Apaga los dispositivos electrónicos cuando no los estés usando para reducir tu huella de carbono.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-zinc-800 p-4">
                <Icon icon="lucide:recycle" className="mt-1 h-5 w-5 text-success-500" />
                <div>
                  <h4 className="font-medium text-white">Separa tus residuos</h4>
                  <p className="text-sm text-gray-400">
                    Implementa un sistema de reciclaje en tu hogar para contribuir a la economía circular.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-zinc-800 p-4">
                <Icon icon="lucide:droplets" className="mt-1 h-5 w-5 text-success-500" />
                <div>
                  <h4 className="font-medium text-white">Ahorra agua</h4>
                  <p className="text-sm text-gray-400">
                    Cierra el grifo mientras te cepillas los dientes y toma duchas más cortas.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
