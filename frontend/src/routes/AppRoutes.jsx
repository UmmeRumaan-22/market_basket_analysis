import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import UploadDataset from "../pages/UploadDataset";
import AprioriAnalysis from "../pages/AprioriAnalysis";
import RuleHistory from "../pages/RuleHistory";
import BusinessDashboard from "../pages/BusinessDashboard";

import InventoryManagement from "../pages/InventoryManagement";
import CustomerDashboard from "../pages/CustomerDashboard";
import SalesReport from "../pages/SalesReport";
import Notifications from "../pages/Notifications";

import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />

      {/* UPLOAD */}
      <Route
        path="/upload"
        element={<ProtectedRoute><UploadDataset /></ProtectedRoute>}
      />

      {/* ANALYSIS */}
      <Route
        path="/analysis"
        element={<ProtectedRoute><AprioriAnalysis /></ProtectedRoute>}
      />

      {/* HISTORY */}
      <Route
        path="/history"
        element={<ProtectedRoute><RuleHistory /></ProtectedRoute>}
      />

      {/* VISUALIZATIONS */}
      <Route
  path="/business-dashboard"
  element={
    <ProtectedRoute>
      <BusinessDashboard />
    </ProtectedRoute>
  }
/>
      {/* INVENTORY */}
      <Route
        path="/inventory"
        element={<ProtectedRoute><InventoryManagement /></ProtectedRoute>}
      />

      {/* CUSTOMERS */}
      <Route
        path="/customers"
        element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>}
      />

      {/* SALES REPORT */}
      <Route
        path="/sales-reports"
        element={<ProtectedRoute><SalesReport /></ProtectedRoute>}
      />

      <Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

      {/* PROFILE */}
      <Route
        path="/profile"
        element={<ProtectedRoute><Profile /></ProtectedRoute>}
      />

      {/* SETTINGS */}
      <Route
        path="/settings"
        element={<ProtectedRoute><Settings /></ProtectedRoute>}
      />

    </Routes>
  );
}

export default AppRoutes;