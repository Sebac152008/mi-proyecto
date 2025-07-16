import { useState } from "react";

function MisIglesias() {
  // Iglesias simuladas del usuario
  const [iglesias] = useState([
    {
      id: 1,
      nombre: "Iglesia Esperanza Viva",
      direccion: "Av. Principal 123",
      archivos: [
        { id: 1, nombre: "sermón1.pdf" },
        { id: 2, nombre: "imagen.jpg" },
      ],
    },
    {
      id: 2,
      nombre: "Iglesia Central El Buen Pastor",
      direccion: "Calle Central 456",
      archivos: [
        { id: 3, nombre: "boletin.pdf" },
      ],
    },
    {
      id: 3,
      nombre: "Iglesia Fuente de Vida",
      direccion: "Carrera 7 #89",
      archivos: [],
    },
  ]);
  const [iglesiaId, setIglesiaId] = useState(iglesias[0].id);
  const [nuevoArchivo, setNuevoArchivo] = useState("");

  const iglesiaSeleccionada = iglesias.find(i => i.id === Number(iglesiaId));

  const handleSubirArchivo = (e) => {
    e.preventDefault();
    if (!nuevoArchivo.trim()) return;
    iglesiaSeleccionada.archivos.push({
      id: Date.now(),
      nombre: nuevoArchivo,
    });
    setNuevoArchivo("");
  };

  return (
    <div>
      <h1 className="h4 fw-bold mb-4">Mis Iglesias</h1>
      <div className="mb-4">
        <label className="form-label fw-semibold">Seleccionar Iglesia</label>
        <select
          className="form-select w-auto d-inline-block ms-2"
          value={iglesiaId}
          onChange={e => setIglesiaId(e.target.value)}
        >
          {iglesias.map(i => (
            <option key={i.id} value={i.id}>{i.nombre}</option>
          ))}
        </select>
      </div>

      {iglesiaSeleccionada && (
        <div className="border rounded p-4 bg-light" style={{ maxWidth: 500 }}>
          <div className="mb-2">
            <span role="img" aria-label="iglesia" className="me-2">🏠</span>
            <strong>Iglesia:</strong> {iglesiaSeleccionada.nombre}
          </div>
          <div className="mb-2">
            <span role="img" aria-label="direccion" className="me-2">📍</span>
            <strong>Dirección:</strong> {iglesiaSeleccionada.direccion}
          </div>
          <div className="mb-2">
            <span role="img" aria-label="archivos" className="me-2">🗂️</span>
            <strong>Archivos:</strong>
            <ul className="mb-2">
              {iglesiaSeleccionada.archivos.length === 0 && (
                <li className="text-muted">No hay archivos</li>
              )}
              {iglesiaSeleccionada.archivos.map(a => (
                <li key={a.id}>{a.nombre}</li>
              ))}
            </ul>
            <form className="d-flex" onSubmit={handleSubirArchivo}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Nombre del archivo"
                value={nuevoArchivo}
                onChange={e => setNuevoArchivo(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">Subir</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MisIglesias;