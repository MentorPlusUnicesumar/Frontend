import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BuscarMentores } from "../pages/buscarMentores";
import { Home } from "../pages/home";
import { Login } from "../pages/login/login";
import { RedefinirSenha } from "../pages/login/redefinirSenha";
import { RedefinirSenhaEmail } from "../pages/login/redefinirSenhaEmail";
import { AlteraPerfil } from "../pages/alteraPerfil";


export function AppRoutes() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Routes>
      {/* {isSignedIn ? ( */}
        <>
          <Route path="/" element={<Home />} />
          <Route path="/Buscar-mentores" element={<BuscarMentores />} />
        </>
      {/* ) : ( */}
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Altera-perfil" element={<AlteraPerfil />} />
          <Route path="/Redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/Redefinir-senha-email" element={<RedefinirSenhaEmail />} />
        </> 
      {/* )} */}
    </Routes>
  )
}

