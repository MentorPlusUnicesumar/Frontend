import { useContext } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BuscarMentores } from "../pages/mentor/buscarMentores";
import { Home } from "../pages/home";
import { Login } from "../pages/login/login";
import { RedefinirSenha } from "../pages/login/redefinirSenha";
import { RedefinirSenhaEmail } from "../pages/login/redefinirSenhaEmail";
<<<<<<< HEAD
import { Perfil } from "../pages/Perfil";
=======
>>>>>>> 88e3a741260548132131439750d380cfccb2b7bd
import PrivateRoute from "../context/privateRoutes";
import { PerfilMentor } from "../pages/mentor/perfilMentor";
import { TelaMentoria } from "../pages/mentoria/telaMentoria";
import { GerenciamentoUsuarios } from "../pages/admin/gerenciamentoUsuarios";
import { NovoUsuario } from "../pages/admin/novoUsuario";
import { PerfilUsuario } from "../pages/perfil/perfilUsuario";
import { Chat } from "../pages/chat/chat";

export function AppRoutes() {
  const navigate = useNavigate();

  const { isSignedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/minhas-mentorias"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/buscar-mentores"
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
<<<<<<< HEAD
            <Perfil />
=======
            <PerfilUsuario />
>>>>>>> 88e3a741260548132131439750d380cfccb2b7bd
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
      <Route
        path="/perfil-mentor"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <PerfilMentor />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <Chat />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/gerenciamento-usuarios"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <GerenciamentoUsuarios />
          </PrivateRoute>
        }
      /> */}
      {/* <Route
        path="/novo-usuario"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <NovoUsuario />
          </PrivateRoute>
        }
      /> */}

      {!isSignedIn && (
        <>
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
=======
          <Route path="/Altera-perfil" element={<PerfilUsuario />} />
>>>>>>> 88e3a741260548132131439750d380cfccb2b7bd
          <Route path="/Redefinir-senha" element={<RedefinirSenha />} />
          <Route
            path="/Redefinir-senha-email"
            element={<RedefinirSenhaEmail />}
          />
          <Route
            path="/gerenciamento-usuarios"
            element={<GerenciamentoUsuarios />}
          />
          <Route path="/novo-usuario" element={<NovoUsuario />} />
          <Route path="/Perfil-mentor" element={<PerfilMentor />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}
