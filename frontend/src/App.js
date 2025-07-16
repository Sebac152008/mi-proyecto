import { useState, useEffect, useRef } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function AppContent() {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [showDashboard, setShowDashboard] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [showLogin, setShowLogin] = useState(() => {
    return !localStorage.getItem("isAuthenticated") || localStorage.getItem("isAuthenticated") === "false";
  });
  const navigate = useNavigate();
  const dashboardRef = useRef(null);
  const loginRef = useRef(null);

  useEffect(() => {
    setShowDashboard(autenticado);
    setShowLogin(!autenticado);
  }, [autenticado]);

  // Cambia aquí para hacer fade-out del login y luego fade-in del dashboard
  const handleLogin = () => {
    setShowLogin(false); // fade-out login
    setTimeout(() => {
      setAutenticado(true);
      localStorage.setItem("isAuthenticated", "true");
      setShowDashboard(true); // fade-in dashboard
    }, 400); // igual al timeout de CSSTransition
  };

  const handleLogout = () => {
    setShowDashboard(false); // fade-out dashboard
    setTimeout(() => {
      setAutenticado(false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("logoPerfil");
      localStorage.removeItem("usuario_id");
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("nombreUsuario");
      localStorage.removeItem("emailUsuario");
      // ...agrega aquí cualquier otro dato de usuario que guardes
      navigate("/", { replace: true });
      setShowLogin(true); // fade-in login
    }, 400); // igual al timeout de CSSTransition
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1 }}>
        <CSSTransition
          in={showLogin}
          timeout={400}
          classNames="fade"
          unmountOnExit
          nodeRef={loginRef}
        >
          <div ref={loginRef}>
            <Login onLogin={handleLogin} />
          </div>
        </CSSTransition>
        <CSSTransition
          in={showDashboard}
          timeout={400}
          classNames="fade"
          appear
          unmountOnExit
          nodeRef={dashboardRef}
        >
          <div ref={dashboardRef}>
            <Dashboard onLogout={handleLogout} />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;