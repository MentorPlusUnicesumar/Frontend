import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BuscarMentores } from "../pages/buscarMentores";
import { Home } from "../pages/home";
import { Login } from "../pages/login/login";
import { RedefinirSenha } from "../pages/login/redefinirSenha";
import { RedefinirSenhaEmail } from "../pages/login/redefinirSenhaEmail";
import PrivateRoute from "../context/privateRoutes";


export function AppRoutes() {
  const { isSignedIn } = useContext(AuthContext);
  return (
    <Routes>
      {/* Rotas protegidas */}
      <Route
        path="/"
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

      {/* Rotas públicas */}
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
