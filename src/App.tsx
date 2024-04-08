import "./App.css";
import { Button } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignupForm from "pages/Signup";
import Conference from "pages/Conference";
import Dashboard from "pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/:id" element={<Conference />} />
    </Routes>
  );
}

export default App;
