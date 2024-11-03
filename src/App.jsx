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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AuthProvider>
      <NavBar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
              path="/"
              element={
                  <ProtectedRoute>
                      <Home />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/dashboard"
              element={
                  <ProtectedRoute>
                      <DashBoard />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/devices/add-device"
              element={
                  <ProtectedRoute>
                      <AddDevice />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/devices"
              element={
                  <ProtectedRoute>
                      <DevicesList />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/repairs"
              element={
                  <ProtectedRoute>
                      <RepairsList />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/repair-orders"
              element={
                  <ProtectedRoute>
                      <OrdersList />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/repair-orders/create"
              element={
                  <ProtectedRoute>
                      <CreateOrderForm />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/devices/:id"
              element={
                  <ProtectedRoute>
                      <DeviceDetail />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/repairs/:id"
              element={
                  <ProtectedRoute>
                      <RepairDetail />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/repair-orders/:id"
              element={
                  <ProtectedRoute>
                      <RepairOrderDetail />
                  </ProtectedRoute>
              }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
