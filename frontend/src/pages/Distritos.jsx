import { useState } from "react";

function Distritos() {
  // Simulación de zonas y distritos
  const zonas = [
    { id: 1, nombre: "Zona 1" },
    { id: 2, nombre: "Zona 2" },
    { id: 3, nombre: "Zona 3" },
    { id: 4, nombre: "Zona 4" },
    { id: 5, nombre: "Zona 5" },
    { id: 6, nombre: "Zona 6" },
  ];
  const [distritos, setDistritos] = useState([
    { id: 1, nombre: "Distrito Norte", zonaId: 1 },
    { id: 2, nombre: "Distrito Sur", zonaId: 2 },
  ]);
  const [nombre, setNombre] = useState("");
  const [zonaId, setZonaId] = useState(zonas[0].id);
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!nombre.trim()) return;
    setDistritos([...distritos, { id: distritos.length + 1, nombre, zonaId: Number(zonaId) }]);
    setNombre("");
    setZonaId(zonas[0].id);
  };

  const handleEdit = (distrito) => {
    setEditId(distrito.id);
    setNombre(distrito.nombre);
    setZonaId(distrito.zonaId);
  };

  const handleUpdate = () => {
    setDistritos(distritos.map(d => d.id === editId ? { ...d, nombre, zonaId: Number(zonaId) } : d));
    setEditId(null);
    setNombre("");
    setZonaId(zonas[0].id);
  };

  const handleDelete = (id) => {
    setDistritos(distritos.filter(d => d.id !== id));
  };

  return (
    <div>
      <h1 className="h4 fw-bold mb-4">Distritos</h1>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nombre de distrito"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <select
          className="form-select me-2"
          value={zonaId}
          onChange={e => setZonaId(e.target.value)}
        >
          {zonas.map(z => (
            <option key={z.id} value={z.id}>{z.nombre}</option>
          ))}
        </select>
        {editId ? (
          <button className="btn btn-warning" onClick={handleUpdate}>Actualizar</button>
        ) : (
          <button className="btn btn-primary" onClick={handleAdd}>Agregar</button>
        )}
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Zona</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {distritos.map((distrito) => (
            <tr key={distrito.id}>
              <td>{distrito.id}</td>
              <td>{distrito.nombre}</td>
              <td>{zonas.find(z => z.id === distrito.zonaId)?.nombre}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(distrito)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(distrito.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Distritos;