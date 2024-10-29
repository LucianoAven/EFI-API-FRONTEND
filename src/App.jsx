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
  EditDevice,
} from "./views";

function App() {
  const [usuario, setUsuario] = useState(0);

  useEffect(() => {
    let user = window.localStorage.getItem("usuario");
    console.log(user);
    console.log(typeof user);
    if (user !== null && user !== undefined && typeof user !== "string") {
      user = JSON.parse(user);
    }
    setUsuario(user);
    console.log({ user });
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/pasword-recovery" element={<ForgotPassword />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        {usuario?.role === "admin" ? (
          <>
            <Route path="/add-device" element={<AddDevice />}></Route>
          </>
        ) : null}
        <Route path="/edit-device/:id" element={<EditDevice />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
