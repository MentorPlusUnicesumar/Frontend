import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BuscarMentores } from "../pages/buscarMentores";
import { Home } from "../pages/home";
import { Login } from "../pages/login/login";
import { RedefinirSenha } from "../pages/login/redefinirSenha";
import { RedefinirSenhaEmail } from "../pages/login/redefinirSenhaEmail";
import PrivateRoute from "../context/privateRoutes";
import { Perfil } from "../pages/perfil";


export function AppRoutes() {
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

      {!isSignedIn && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/Redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/Redefinir-senha-email" element={<RedefinirSenhaEmail />} />
        </>
      )}
    </Routes>
  );
}
