import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import Login from "./login";
import Register from "./register";
import Dashboard from "./Dashboard";
import Application from "./Application"; // Import the new component
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/" />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {/* Add ToastContainer here */}
    <ToastContainer
      position="top-right" // Position of the toast notifications
      autoClose={3000} // Auto-close after 3 seconds
      hideProgressBar={false} // Show progress bar
      newestOnTop={false} // New toasts appear below older ones
      closeOnClick // Close toast on click
      rtl={false} // Left-to-right layout
      pauseOnFocusLoss // Pause toast timer when window loses focus
      draggable // Allow dragging to dismiss
      pauseOnHover // Pause toast timer on hover
    />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/application" element={<Application />} /> {/* Add this route */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
    </Routes>
  </BrowserRouter>
);