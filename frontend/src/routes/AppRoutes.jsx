import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Workspace from "../pages/workspace/Workspace";
import ProtectedRoute from "./ProtectedRoute";
import Document from "../pages/documents/Document";
import Profile from "../pages/profile/Profile";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
            }
        />
        <Route
            path="/workspace/:id"
            element={
                <ProtectedRoute>
                <Workspace />
                </ProtectedRoute>
            }
        />
        <Route
        path="/documents/:id"
        element={
          <ProtectedRoute>
            <Document />
          </ProtectedRoute>
        }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;