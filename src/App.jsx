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
import DevicesList from "./views/Devices/DevicesList";
import RepairsList from "./views/Repairs/RepairsList";
import OrdersList from "./views/Orders/OrdersList";
import CreateOrderForm from "./views/Orders/CreateOrder";

import DeviceDetail from "./components/detailDevice";
import RepairDetail from "./components/detailRepair";
import RepairOrderDetail from "./components/detailRepairOrder";


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
        <Route path="/devices/add-device" element={<AddDevice />}></Route>
        <Route path="/devices" element={<DevicesList />}></Route>
        <Route path="/repairs" element={<RepairsList />}></Route>
        <Route path="/repair-orders" element={<OrdersList />}></Route>
        <Route path="/repair-orders/create" element={<CreateOrderForm />}></Route>
        <Route path="/devices/:id" element={<DeviceDetail />} />
        <Route path="/repairs/:id" element={<RepairDetail />} />
        <Route path="/repair-orders/:id" element={<RepairOrderDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
