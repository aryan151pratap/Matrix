import { Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Box from "./chat/box";
import Login from "./login/sign";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const App = function () {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    console.log(id);
    if(!id) return;
    const getUser = async function(id){
      try{
        const res = await fetch(`${API}/login/getUser/${id}`);
        const result = await res.json();
        if(res.ok){
          setUser(result);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    if(id && id != "undefined"){
      getUser(id);
    }
  }, [])
  return (
    <div className="w-full h-screen overflow-auto">
      <Routes>
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/chat" element={user ? <Box user={user}/> : <Login user={user} setUser={setUser}/>} />
        <Route path="*" element={<Landing user={user}/>} />

      </Routes>
    </div>
  );
};

export default App;
