import React, { useState } from "react";
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import Sidebar from "../components/sidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";

export default function AdminDashboard() {  
   const [users, setUsers] = useState<User[]>([])
   const [sttsUsers, setSttsUsers] = useState<statusUsers[]>([])
   const [records, setRecords] = useState<Record[]>([])

  //it's viable to use colors due to record being a known and LOW number of things
  type Record = {
    type: string,
    amount: number,
    color: string
  };

  type User = 
  { 
    id: number,
    username: string,
    email: string,
    status: number
  };

  type statusUsers =
  {
    name: string,
    value: number,
    color: string
  }

  // const getRecords = async () => {
  //   const token = sessionStorage.getItem("token");
  //   try {
  //     const res = await fetch("", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type" : "application/json",
  //         "authorization" : `Bearer ${token}`
  //       }
  //     });
  //     const resRecordsData = await res.json(); //get the answer's json formatted
  //   } catch(error) {
  //     console.log("Error al traer Records segun type: ", error);
  //   }
  // };

  const getUsersFromStatus = async () => {
    const token = sessionStorage.getItem("token");
    try {
      //active
      const resActive = await fetch("http://localhost:3000/CSoftware/api/getStatusUsers?status=1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        }
      });
      const dataActive = await resActive.json();

      //inactive
      const resInactive = await fetch("http://localhost:3000/CSoftware/api/getStatusUsers?status=2", {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "authorization" : `Bearer ${token}`
        }
      });
      const dataInactive = await resInactive.json();

      setSttsUsers([
        {name: "Activos", value: dataActive.total, color: "#1db954"},
        {name: "Inactivos", value: dataInactive.total, color: "#FFB547"}
      ]);

    } catch(error){
      console.error("Error al traer los usuarios segun su status, ", error);
    }
  };

  console.log(sessionStorage.getItem("token"));
  const token = sessionStorage.getItem("token");
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/CSoftware/api/getUsers", {
        method: "GET",
        headers: {"Content-Type": "application/json",
                  "authorization": "Bearer " + token
        },
        
      })
      
      const res = await response.json();
      if(res && res.records){
        const mappedUsers: User[] = res.records.map((user: any) => ({
          id: user.ID_usuario,
          username: user.username,
          email: user.email,
          status: user.statusUsuario,
        }));
        setUsers(mappedUsers);
      }
    
    } catch(error) {
      console.error("Error fetching users: ", error);
    }
  };

  React.useEffect(() => {
    getUsers();
    getUsersFromStatus();
  }, []); //no dependencies used


  // Datos de ejemplo para las gráficas

  const colors = ['#1db954', '#3694FF', '#FFB547'];

  const areaData = [
    { name: 'Ene', carbono: 400, agua: 240, energia: 240 },
    { name: 'Feb', carbono: 300, agua: 139, energia: 221 },
    { name: 'Mar', carbono: 200, agua: 980, energia: 229 },
    { name: 'Abr', carbono: 278, agua: 390, energia: 200 },
    { name: 'May', carbono: 189, agua: 480, energia: 218 },
    { name: 'Jun', carbono: 239, agua: 380, energia: 250 },
    { name: 'Jul', carbono: 349, agua: 430, energia: 210 },
  ];



  return (
    <>
      <div className="flex h-screen w-full bg-black">
        <div className="flex-1 overflow-auto p-6 text-justify">
          <Sidebar isAdmin /> {/* QUE LE PASO A LA SIDEBAR MOVIBLE*/}
          <div className="flex-1 overflow-auto p-6">
            <h1 className="mb-6 text-2xl font-bold text-white">Informes, Métricas y Análisis</h1>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="bg-zinc-900 text-white">
                <CardBody>
                  <h3 className="mb-4 text-lg font-medium">EcoRangers</h3>
                  <div className="flex h-64 items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        {/* pieData debe estar definido en el componente */}
                        <Pie
                          data={sttsUsers}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {sttsUsers.map((entry, index) => (
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
                  <h3 className="mb-4 text-lg font-medium">Biomos</h3>
                  <div className="h-64">
                    {/* create the endpoint to get the table that has type and quantity,
                    save in state for records, call the function with a useEffect, and 
                    use the info in a chart, pie or radar
                     */}
                    {/* <ResponsiveContainer width="100%" height="100%">
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
                    </ResponsiveContainer> */}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        
          {/* Users general data table */}
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
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          color={user.status === 1 ? "success" : "danger"}
                          variant="flat"
                          size="sm"
                          >
                          {user.status === 1 ? "Active" : "Inactive"}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

