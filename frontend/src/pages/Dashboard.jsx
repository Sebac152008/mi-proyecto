import Navbar from "../components/Navbar";
import { useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Topbar from "../components/Topbar";
import SearchPage from "./SearchPage";
import Home from "./Home";
import Usuarios from "./Usuarios";
import Zonas from "./Zonas";
import Distritos from "./Distritos";
import Iglesias from "./Iglesias";
import MisIglesias from "./MisIglesias";
import Perfil from "./Perfil";
import Tablas from "./Tablas";
import "../index.css";

function Dashboard({ onLogout }) {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <div>
      <div className="d-flex vh-100">
        {/* Navbar SIEMPRE visible */}
        <div className="navbar-container">
          <Navbar onLogout={onLogout} />
        </div>
        {/* Contenido principal */}
        <div className="main-content flex-grow-1 d-flex flex-column overflow-hidden bg-light">
          <Topbar />
          <div className="flex-grow-1 p-4 position-relative contenido-scroll">
            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={300}
                nodeRef={nodeRef}
                unmountOnExit
              >
                <div ref={nodeRef} className="h-100">
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/zonas" element={<Zonas />} />
                    <Route path="/distritos" element={<Distritos />} />
                    <Route path="/iglesias" element={<Iglesias />} />
                    <Route path="/mis-iglesias" element={<MisIglesias />} />
                    <Route path="/tablas" element={<Tablas />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/search" element={<SearchPage />} />
                  </Routes>
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
