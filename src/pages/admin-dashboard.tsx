import React from "react";
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import Sidebar from "../components/sidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

const pieData = [
  { name: "Carbono", value: 65, color: "#1db954" },
  { name: "Agua", value: 42, color: "#3694FF" },
  { name: "Energía", value: 78, color: "#FFB547" },
];

const areaData = [
  { name: "Ene", carbono: 40, agua: 24, energia: 35 },
  { name: "Feb", carbono: 45, agua: 28, energia: 40 },
  { name: "Mar", carbono: 50, agua: 32, energia: 45 },
  { name: "Abr", carbono: 55, agua: 36, energia: 50 },
  { name: "May", carbono: 60, agua: 40, energia: 60 },
  { name: "Jun", carbono: 65, agua: 42, energia: 78 },
];

const users = [
  { id: 1, name: "Ana García", email: "ana@example.com", status: "Activo", progress: 78 },
  { id: 2, name: "Carlos López", email: "carlos@example.com", status: "Activo", progress: 65 },
  { id: 3, name: "María Rodríguez", email: "maria@example.com", status: "Inactivo", progress: 32 },
  { id: 4, name: "Juan Pérez", email: "juan@example.com", status: "Activo", progress: 54 },
  { id: 5, name: "Laura Sánchez", email: "laura@example.com", status: "Activo", progress: 91 },
];

export default function AdminDashboard() {
  return (
    <div className="flex h-screen w-full bg-black">
      <Sidebar isAdmin />
      
      <div className="flex-1 overflow-auto p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Panel de Administración</h1>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="bg-zinc-900 text-white">
            <CardBody>
              <h3 className="mb-4 text-lg font-medium">Progreso Global</h3>
              <div className="flex h-64 items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-zinc-900 text-white">
            <CardBody>
              <h3 className="mb-4 text-lg font-medium">Tendencias</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={areaData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="name" stroke="#71717a" />
                    <Tooltip contentStyle={{ backgroundColor: '#27272a', border: 'none' }} />
                    <Area type="monotone" dataKey="carbono" stackId="1" stroke="#1db954" fill="#1db95433" />
                    <Area type="monotone" dataKey="agua" stackId="1" stroke="#3694FF" fill="#3694FF33" />
                    <Area type="monotone" dataKey="energia" stackId="1" stroke="#FFB547" fill="#FFB54733" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <Card className="mt-6 bg-zinc-900 text-white">
          <CardBody>
            <h3 className="mb-4 text-lg font-medium">Usuarios Activos</h3>
            <Table 
              removeWrapper 
              aria-label="Usuarios activos"
              classNames={{
                table: "min-w-full",
                th: "bg-zinc-800 text-white",
                td: "text-white"
              }}
            >
              <TableHeader>
                <TableColumn>NOMBRE</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>ESTADO</TableColumn>
                <TableColumn>PROGRESO</TableColumn>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        color={user.status === "Activo" ? "success" : "danger"}
                        variant="flat"
                        size="sm"
                      >
                        {user.status}
                      </Chip>
                    </TableCell>
                    <TableCell>{user.progress}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}