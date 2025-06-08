import React, { useState } from "react";
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import Sidebar from "../components/sidebar";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

export default function AdminDashboard() {  
  type User = 
  { 
    id: number,
    username: string,
    email: string,
    status: number
};

const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/CSoftware/api/getUsers", {
      method: "GET",
      headers: {"Content-Type": "application/json"},
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
}, []);
  const [users, setUsers] = useState<User[]>([])
  return (
    <>
      <div className="flex h-screen w-full bg-black">
        <Sidebar isAdmin />
        <div className="flex-1 overflow-auto p-6 text-justify">
          <h1 className="mb-2 text-2xl font-bold text-white pl-16 pt-2">Informes, Métricas y Análisis</h1>
          <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-5xl bg-zinc-900 rounded-xl shadow-lg p-2">
              <iframe className="w-full h-full md:h-[600px] rounded-lg" 
                      src="https://lookerstudio.google.com/embed/reporting/b9fcbd8b-fffa-4bb8-81f0-51a445a7fbab/page/FtVMF" 
                      style={{border:0 }}
                      allowFullScreen 
                      sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
              </iframe>
            </div>
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

//EXAMPLE CHARTS------------------------
{/* //   <div className="flex-1 overflow-auto p-6">
//     <h1 className="mb-6 text-2xl font-bold text-white">Informes, Métricas y Análisis</h1>
    
//     <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//       <Card className="bg-zinc-900 text-white">
//         <CardBody>
//           <h3 className="mb-4 text-lg font-medium">Progreso Global</h3>
//           <div className="flex h-64 items-center justify-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={80}
//                   paddingAngle={5}
//                   dataKey="value"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </CardBody>
//       </Card>
      
//       <Card className="bg-zinc-900 text-white">
//         <CardBody>
//           <h3 className="mb-4 text-lg font-medium">Tendencias</h3>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">{/*Reesponsive allows the graphic to adapt to the parent container */}
               {/* <AreaChart
//                 data={areaData}
//                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//               >
//                 <XAxis dataKey="name" stroke="#71717a" />
//                 <Tooltip contentStyle={{ backgroundColor: '#27272a', border: 'none' }} />
//                 <Area type="monotone" dataKey="carbono" stackId="1" stroke="#1db954" fill="#1db95433" />
//                 <Area type="monotone" dataKey="agua" stackId="1" stroke="#3694FF" fill="#3694FF33" />
//                 <Area type="monotone" dataKey="energia" stackId="1" stroke="#FFB547" fill="#FFB54733" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </CardBody>
//       </Card>
//     </div> */} 