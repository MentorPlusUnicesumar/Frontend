import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import PrivateRoute from "../context/privateRoutes";
import { GerenciamentoAreas } from "../pages/admin/gerenciamentoAreas";
import { GerenciamentoMentorias } from "../pages/admin/gerenciamentoMentorias";
import { GerenciamentoUsuarios } from "../pages/admin/gerenciamentoUsuarios";
import { NovoUsuario } from "../pages/admin/novoUsuario";
import { CadastroUsuario } from "../pages/cadastroUsuario/cadastroUsuario";
import { Chat } from "../pages/chat/chat";
import { Home } from "../pages/home";
import { Login } from "../pages/login/login";
import { LoginCelular } from "../pages/login/loginCelular";
import { RedefinirSenha } from "../pages/login/redefinirSenha";
import { RedefinirSenhaEmail } from "../pages/login/redefinirSenhaEmail";
import { BuscarMentores } from "../pages/mentor/buscarMentores";
import { PerfilMentor } from "../pages/mentor/perfilMentor";
import { TelaMentoria } from "../pages/mentoria/telaMentoria";
import { PerfilUsuario } from "../pages/perfil/perfilUsuario";

export function AppRoutes() {
  const { isSignedIn } = useContext(AuthContext);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

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
            <PerfilUsuario />
          </PrivateRoute>
        }
      />
      <Route
        path="/mentoria/:id"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <TelaMentoria />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil-mentor/:id"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <PerfilMentor />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat/"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route
        path="/gerenciamento-usuarios"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <GerenciamentoUsuarios />
          </PrivateRoute>
        }
      />
      <Route
        path="/gerenciamento-mentorias"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <GerenciamentoMentorias />
          </PrivateRoute>
        }
      />
      <Route
        path="/gerenciamento-areas"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <GerenciamentoAreas />
          </PrivateRoute>
        }
      />
      <Route
        path="/novo-usuario/:id"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <NovoUsuario />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute isSignedIn={isSignedIn}>
            <Home />
          </PrivateRoute>
        }
      />
      {!isSignedIn && (
        <>
          <Route
            path="/login"
            element={isMobile ? <LoginCelular /> : <Login />}
          />
          <Route path="/Altera-perfil" element={<PerfilUsuario />} />
          <Route path="/Redefinir-senha" element={<RedefinirSenha />} />
          <Route
            path="/Redefinir-senha-email"
            element={<RedefinirSenhaEmail />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
        </>
      )}
    </Routes>
  );
}
