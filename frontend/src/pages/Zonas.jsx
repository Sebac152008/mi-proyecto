import { useState } from "react";

function Zonas() {
  const [zonas, setZonas] = useState([
    { id: 1, nombre: "Zona 1" },
    { id: 2, nombre: "Zona 2" },
    { id: 3, nombre: "Zona 3" },
    { id: 4, nombre: "Zona 4" },
    { id: 5, nombre: "Zona 5" },
    { id: 6, nombre: "Zona 6" },
  ]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!nombre.trim()) return;
    setZonas([...zonas, { id: zonas.length + 1, nombre }]);
    setNombre("");
  };

  const handleEdit = (zona) => {
    setEditId(zona.id);
    setNombre(zona.nombre);
  };

  const handleUpdate = () => {
    setZonas(zonas.map(z => z.id === editId ? { ...z, nombre } : z));
    setEditId(null);
    setNombre("");
  };

  const handleDelete = (id) => {
    setZonas(zonas.filter(z => z.id !== id));
  };

  return (
    <div>
      <h1 className="h4 fw-bold mb-4">Zonas</h1>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nombre de zona"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {zonas.map((zona) => (
            <tr key={zona.id}>
              <td>{zona.id}</td>
              <td>{zona.nombre}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(zona)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(zona.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Zonas;