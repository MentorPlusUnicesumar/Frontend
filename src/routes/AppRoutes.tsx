import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BuscarMentores } from "../pages/buscarMentores";
import { Home } from "../pages/home";
import { Login } from "../pages/login/login";
import { RedefinirSenha } from "../pages/login/redefinirSenha";
import { RedefinirSenhaEmail } from "../pages/login/redefinirSenhaEmail";
import { Perfil } from "../pages/Perfil";
import PrivateRoute from "../context/privateRoutes";
import { TelaMentoria } from "../pages/teleMentoria";


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
            <Perfil />
          </PrivateRoute>
        }
      />
      <Route
        path="/mentoria"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <TelaMentoria />
          </PrivateRoute>
        }
      />

      {!isSignedIn && (
        <>        
          <Route path="/login" element={<Login />} />
          <Route path="/Redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/Redefinir-senha-email" element={<RedefinirSenhaEmail />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}
