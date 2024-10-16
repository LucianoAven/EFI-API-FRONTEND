import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import {
  AddDevice,
  AdminPanel,
  DashBoard,
  ForgotPassword,
  Home,
  Login,
  Register,
} from "./views";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/pasword-recovery" element={<ForgotPassword />}></Route>
        <Route path="/add-device" element={<AddDevice />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
