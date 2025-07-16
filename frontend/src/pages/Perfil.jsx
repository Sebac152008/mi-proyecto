// src/pages/Perfil.jsx
import { useRef, useState } from "react";
import "./Perfil.css";

function Perfil() {
  const nombreUsuario = localStorage.getItem("nombreUsuario") || "Nombre Apellido";
  const email = localStorage.getItem("emailUsuario") || "correo@ejemplo.com";
  const tipo = localStorage.getItem("userType") || "Pastor";
  const defaultImg = "./assets/default-profile.png";
  const [edit, setEdit] = useState(false);
  const [nombre, setNombre] = useState(nombreUsuario);
  const [correo, setCorreo] = useState(email);
  const [fotoPerfil, setFotoPerfil] = useState(
    localStorage.getItem("logoPerfil") || defaultImg
  );
  const fileInputRef = useRef(null);

  function resizeImage(file, maxSize = 300) {
    return new Promise((resolve) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    const usuarioId = localStorage.getItem("usuario_id");
    if (!usuarioId || usuarioId === "null") {
      alert("No se encontró el ID de usuario. Por favor, inicia sesión de nuevo.");
      return;
    }
    formData.append("usuario_id", usuarioId);
    formData.append("foto", file);

    const response = await fetch("http://localhost:5000/api/upload_foto", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      const nuevaUrl = `http://localhost:5000/uploads/${data.foto_perfil}?t=${Date.now()}`;
      setFotoPerfil(nuevaUrl);
      localStorage.setItem("logoPerfil", nuevaUrl);
      window.dispatchEvent(new Event("logoPerfilChanged"));
      if (fileInputRef.current) fileInputRef.current.value = ""; // limpia el input
    }
  };

  const handleSave = () => {
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("emailUsuario", correo);
    setEdit(false);
  };

  return (
    <div className="perfil-outer-container">
      <div className="perfil-card">
        <div className="perfil-foto-section">
          <div className="perfil-foto-grande">
            <img
              src={fotoPerfil}
              alt="Foto de perfil"
              onError={e => { e.target.onerror = null; e.target.src = defaultImg; }}
            />
            <label className="upload-label">
              <input
                className="input-file"
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              Cambiar foto
            </label>
          </div>
          <div className="perfil-nombre-rol">
            <h2>{nombre}</h2>
            <span className="perfil-rol">{tipo}</span>
          </div>
        </div>
        <div className="perfil-info-section">
          <div className="perfil-info-row">
            <label>Nombre</label>
            <input
              value={nombre}
              disabled={!edit}
              maxLength={50}
              onChange={(e) => setNombre(e.target.value)}
              className="perfil-input"
            />
          </div>
          <div className="perfil-info-row">
            <label>Email</label>
            <input
              value={correo}
              disabled={!edit}
              maxLength={50}
              onChange={(e) => setCorreo(e.target.value)}
              className="perfil-input"
            />
          </div>
          <div className="perfil-info-row">
            <label>Rol</label>
            <input value={tipo} disabled className="perfil-input" />
          </div>
        </div>
        <div className="perfil-botones" style={{ justifyContent: "center" }}>
          {edit ? (
            <>
              <button className="guardar" onClick={handleSave}>Guardar</button>
              <button className="limpiar" onClick={() => setEdit(false)}>Cancelar</button>
            </>
          ) : (
            <button className="editar" onClick={() => setEdit(true)}>Editar información</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
