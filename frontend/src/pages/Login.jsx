import { useState } from "react";
import './Login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("nombreUsuario", data.nombreUsuario);
        localStorage.setItem("emailUsuario", data.emailUsuario);
        localStorage.setItem("usuario_id", data.usuario_id);
        // Guarda la foto de perfil específica de este usuario
        if (data.fotoPerfil) {
          localStorage.setItem(
            "logoPerfil",
            `http://localhost:5000/uploads/${data.fotoPerfil}`
          );
        } else {
          localStorage.removeItem("logoPerfil");
        }
        onLogin();
      } else {
        window.Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: "Usuario o contraseña incorrectos.",
          confirmButtonColor: "#dc3545",
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
      window.Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "No se pudo conectar con el servidor.",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setLoading(false);
    }
  };

  const logoLogin = localStorage.getItem('logoLogin');

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleSubmit}>
        <img src={logoLogin || "./assets/Logo.png"} alt="Logo" draggable={false} onContextMenu={e => e.preventDefault()} />
        <h4>Inicio de sesión</h4>
        <small>Accede con tu usuario y contraseña</small>

        <div className="login-row">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
            disabled={loading}
            placeholder="Ingrese su usuario"
          />
        </div>
        <div className="login-row">
          <label htmlFor="password">Contraseña</label>
          <div className="input-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Ingrese su contraseña"
            />
            <button
              type="button"
              className="eye-btn"
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando" : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
