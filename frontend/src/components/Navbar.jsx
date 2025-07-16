import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar({ onLogout }) {
  const userType = localStorage.getItem("userType"); // 'usuario' o 'admin'
  const location = useLocation();
  const logoImg = localStorage.getItem("logoImg");
  const defaultImg = "./assets/default-profile.webp";
  const [fotoPerfil, setFotoPerfil] = useState(
    localStorage.getItem("logoPerfil") || defaultImg
  );

  // Escucha cambios en localStorage (por ejemplo, desde Perfil)
  useEffect(() => {
    const handleStorage = () => {
      setFotoPerfil(localStorage.getItem("logoPerfil") || defaultImg);
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("logoPerfilChanged", handleStorage); // <-- agrega esto
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("logoPerfilChanged", handleStorage); // <-- y esto
    };
  }, []);

  // Si quieres que también se actualice al volver del perfil sin recargar:
  useEffect(() => {
    setFotoPerfil(
      localStorage.getItem("logoPerfil") || defaultImg
    );
  }, [location.pathname]);

  // Función para saber si la ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <nav id="nave">
      {/* Logo */}
      <Link to="/">
        <img
          src={logoImg || "./assets/Logo_Vertical.png"}
          className="Logo_Nav"
          alt=""
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </Link>

      <Link to="/perfil" className="perfil-link">
        <div className="perfil-nav">
          {/* Foto de perfil */}
          <img
            src={fotoPerfil}
            alt="Perfil"
            className="foto-perfil-nav"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onError={e => { e.target.onerror = null; e.target.src = defaultImg; }}
          />
          <div className="datos-perfil-nav">
            {/* Nombre del usuario */}
            <span className="nombre-perfil-nav">
              {localStorage.getItem("nombreUsuario") || "Nombre"}
            </span>
            {/* Rol del usuario */}
            <span className="rol-perfil-nav">
              {localStorage.getItem("userType") || "Pastor"}
            </span>
          </div>
        </div>
      </Link>

      {/* Menú de enlaces */}
      <ul>
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            <i className="bi bi-bar-chart-fill"></i> Dashboard
          </Link>
        </li>

        {userType === "Pastor" && (
          <li>
            <Link
              to="/mis-iglesias"
              className={isActive("/mis-iglesias") ? "active" : ""}
            >
              <i className="bi bi-building"></i> Mis Iglesias
            </Link>
          </li>
        )}

        {(userType === "Administrador" || userType === "Administradora") && (
          <>
            <li>
              <Link to="/zonas" className={isActive("/zonas") ? "active" : ""}>
                <i className="bi bi-globe2"></i> Zonas
              </Link>
            </li>
            <li>
              <Link
                to="/distritos"
                className={isActive("/distritos") ? "active" : ""}
              >
                <i className="bi bi-buildings"></i> Distritos
              </Link>
            </li>
            <li>
              <Link
                to="/iglesias"
                className={isActive("/iglesias") ? "active" : ""}
              >
                <i className="bi bi-building"></i> Iglesias
              </Link>
            </li>
            <li>
              <Link
                to="/usuarios"
                className={isActive("/usuarios") ? "active" : ""}
              >
                <i className="bi bi-people-fill"></i> Usuarios
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Botón cerrar sesión */}
      <div className="mt-auto">
        <button
          className="btn btn-cerrar-seccion w-100 mt-4"
          type="button"
          onClick={onLogout}
        >
          <span className="efecto"></span>
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
