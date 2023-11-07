import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Component/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Component/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Component/Dashboard";
import AddTask from "./Component/AddTask";
import UpdateTask from "./Component/UpdateTask";
import SettNavbar from "./Component/Navbar";
import { AuthProvider } from "./Component/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>          
    <AuthProvider>
    <BrowserRouter>
      <SettNavbar />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/updatetask" element={<UpdateTask />} />
          <Route path="/" element={<App />} />
        </Routes>
     
      <ToastContainer />
    </BrowserRouter>
    </AuthProvider>
    </React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
