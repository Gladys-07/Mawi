import React, { useState } from "react";
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import Sidebar from "../components/sidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";

export default function AdminDashboard() {  
   const [users, setUsers] = useState<User[]>([])
   const [sttsUsers, setSttsUsers] = useState<statusUsers[]>([])
   const [records, setRecords] = useState<Record[]>([])

  const colors = ['#1db954', '#3694FF', '#FFB547', '#FF6384', '#36A2EB', '#8E44AD'];

  //it's viable to use colors due to record being a known and LOW number of things
  type Record = {
    type: string,
    total: number,
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

  const getRecordsByType = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/CSoftware/api/recordTypesNum", {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "authorization" : `Bearer ${token}`
        }
      });
      const resRecordsData = await res.json(); //get the answer's json formatted
      if(resRecordsData && resRecordsData.Result) {
        const mappedRecords: Record[] = resRecordsData.Result.map((record: any, index : number) => ({
          type: record.recordType,
          total: record.total,
          color: colors[index % colors.length]
        }));
        setRecords(mappedRecords);
      }
    } catch(error) {
      console.log("Error al traer Records segun type: ", error);
    }
  };

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

    //used for functions that alter states
  React.useEffect(() => {
    getUsers();
    getUsersFromStatus();
    getRecordsByType();
  }, []); //no dependencies used

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
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={records} cx="50%" cy="50%" outerRadius="80%">
                      <PolarGrid /> {/* shows the grid in the background of the chart */}
                      <PolarAngleAxis dataKey="type"/> {/* shows the names of each axis */}
                      <Radar name="Total" dataKey="total" stroke="#1db954" fill="#1db954" fillOpacity={0.6}/>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#18181b", border: "none", color: "#fff", fontSize: 12, padding: 8 }}
                        formatter={(value: any, name: string) => [
                          <span style={{ color: '#fff' }}>{value}</span>,
                          <span style={{ color: '#fff' }}>{name}</span>
                        ]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
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

