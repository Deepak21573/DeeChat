import React from "react";
import {BrowserRouter ,  Routes , Route} from 'react-router-dom';
import Signup from "./pages/signup";
import Login from "./pages/login";
import Chat from "./pages/chat";
import SetAvatar from "./pages/setAvatar"
function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/signup"element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/setAvatar" element={<SetAvatar/>}/>
        <Route path="/" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App