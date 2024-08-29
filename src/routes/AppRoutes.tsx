import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home } from '../Home';
import { Login } from "../login/Login";
import { RedefinirSenhaEmail } from "../login/RedefinirSenhaEmail";
import { RedefinirSenha } from "../login/RedefinirSenha";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Redefinir-senha" element={<RedefinirSenha />} />
      <Route path="/Redefinir-senha-email" element={<RedefinirSenhaEmail />} />
    </Routes>
  );
}

