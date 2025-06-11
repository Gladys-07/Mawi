import React, {useState} from "react";
import { Navbar, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {getChatCompletion} from "../api/chat";
import Sidebar from "../components/sidebar";
import { userItems, adminItems } from "../constants";

// Main Application
export default function AsistenteBiomo() {
  {/* necessary for sidebar*/}
  const [isOpen, setIsOpen] = React.useState(true);
  //<>state type (an array of objects in this case) ([]) initial state value, an empty array.
  const [chatHistory, setChatHistory] = useState<{sender: "user" | "AI", message: string}[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  
  //API USE ---------------------------------------
  async function sendMessage() {
    if(!userInput.trim()) return;
    setChatHistory(prev => [...prev, {sender: "user", message: userInput}]);
    setLoading(true);
    try {
      const aiResponse = await getChatCompletion(userInput);
      //prev => nueva versión, es la función de actualización de un estado
      //lo que haces en estas lineas es decir, a lo anterior, concatena este nuevo estado.
      setChatHistory(prev => [...prev, {sender: "AI", message: aiResponse}]);
    } catch {
      setChatHistory(prev => [...prev, {sender: "AI", message: "Sorry, I encountered an error."}]);
    }
    setUserInput("");
    setLoading(false);
  }
  
  {/* necessary for sidebar*/}
  const toggleSidebar = () => { 
    setIsOpen(!isOpen);
  };

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  {/* necessary for sidebar*/}
  const menuThings = isAdmin ? adminItems : userItems;
  console.log(`Is admin? ${sessionStorage.getItem("isAdmin")}`);
  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} menuItems={menuThings}/>
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Navbar className="border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-2">
            <Button 
              isIconOnly 
              variant="light" 
              className="text-white" 
              onPress={toggleSidebar}
            >
              {isOpen ? (
                <Icon icon="lucide:chevron-left" width={20} height={20} />
              ) : (
                <Icon icon="lucide:chevron-right" width={20} height={20} />
              )}
            </Button>
            <div>
              <h1 className="text-lg font-medium">Asistente de Mi Biomo</h1>
              <p className="text-xs text-zinc-400">Biomo.ID: 1234</p>
            </div>
          </div>
        </Navbar>
        
        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4">
          {/* CHAT MESSAGES GO HERE*/}
          <div className="flex flex-col gap-2" style={{ maxHeight: "100%", overflowY: "auto" }}>
            {/* Va mapenado cada mensaje en el historial del chat y acomoda el div segun si es de AI o de user */}
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[70%] ${msg.sender === "user" ? "bg-success-900 self-end text-right" : "bg-zinc-800 self-start text-left"}`}
              >
                {msg.message}
              </div>
            ))}
            {/* Si aun esta pensando, solo muestra este div de lado de la AI */}
            {loading && (
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 max-w-[70%] self-start">Pensando...</div>
            )}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="border-t border-zinc-800 p-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Escribe..."
              variant="bordered"
              classNames={{
                base: "bg-zinc-800 rounded-md",
                inputWrapper: "bg-zinc-800 border-zinc-700 hover:border-zinc-600 focus-within:border-zinc-500",
              }}
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <Button 
              isIconOnly 
              color="success" 
              className="min-w-12 h-12"
              aria-label="Send"
              onPress={sendMessage}
              // deshablita el uso del boton si loading es true
              disabled={loading}
            >
              <Icon icon="lucide:arrow-up" width={20} height={20} />
            </Button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end border-t border-zinc-800 p-2">
          <Button 
            color="success" 
            variant="flat" 
            size="sm"
            startContent={<Icon icon="lucide:download" width={16} height={16} />}
          >
            Salvar Datos
          </Button>
        </div>
      </div>
    </div>
  );
}