import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuditLogs from "./pages/AuditLogs";
import MyRequisitions from "./pages/MyRequisitions";
import VehicleManagement from "./pages/VehicleManagement";

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {}
        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        />

        {}
        <Route
          path="/my-requisitions"
          element={<MyRequisitions />}
        />

        {}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

{}
        <Route
  path="/audit-logs"
  element={<AuditLogs />}
/>

        <Route
  path="/vehicle-management"
  element={<VehicleManagement />}
/>

      </Routes>
    </Router>
  );
}

export default App;