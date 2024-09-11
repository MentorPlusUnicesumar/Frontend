import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BuscarMentores } from "../pages/buscarMentores";
import { Home } from "../pages/home";
import { Login } from "../pages/login/login";
import { RedefinirSenha } from "../pages/login/redefinirSenha";
import { RedefinirSenhaEmail } from "../pages/login/redefinirSenhaEmail";
import { AlteraPerfil } from "../pages/alteraPerfil";
import PrivateRoute from "../context/privateRoutes";


export function AppRoutes() {
  const navigate = useNavigate();

  const { isSignedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/Minhas-mentorias"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/Buscar-mentores"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <BuscarMentores />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <AlteraPerfil />
          </PrivateRoute>
        }
      />

      {!isSignedIn && (
        <>        
          <Route path="/login" element={<Login />} />
          <Route path="/Altera-perfil" element={<AlteraPerfil />} />
          <Route path="/Redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/Redefinir-senha-email" element={<RedefinirSenhaEmail />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}
