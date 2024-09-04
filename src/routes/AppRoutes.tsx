import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home } from "../home";
import { Login } from "../login";
import { RedefinirSenha } from "../login/redefinirSenha";
import { RedefinirSenhaEmail } from "../login/redefinirSenhaEmail";
import { BuscarMentores } from "../buscarMentores";
import { Perfil } from "../perfil";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Redefinir-senha" element={<RedefinirSenha />} />
      <Route path="/Redefinir-senha-email" element={<RedefinirSenhaEmail />} />
      <Route path="/Buscar-mentores" element={<BuscarMentores />} />
      <Route path="/perfil" element={<Perfil />} />
      
    </Routes>
  );
}

