import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import GetStarted from "../Pages/GetStarted";
import Login from "../Pages/Login"; // Importing the Login component
import StudentRegister from "../Pages/StudentRegister";
import ProtectedRoute from "./ProtectedRoute";

const StaffDashboard = lazy(() => import("../Pages/StaffDashboard"));
const StudentDashboard = lazy(() => import("../Pages/StudentDashboard"));
const TPODashboard = lazy(() => import("../Pages/TPODashboard"));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} /> {/* Adding the login route */}
        <Route path="/register" element={<StudentRegister/>} />
        {/* Role-Based Dashboard Routes */}
        <Route path="/dashboard/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/staff" element={<ProtectedRoute role="staff"><StaffDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/tpo" element={<ProtectedRoute role="tpo"><TPODashboard /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
