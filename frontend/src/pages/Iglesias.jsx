import { useState } from "react";

function Iglesias() {
  // Simulación de distritos
  const distritos = [
    { id: 1, nombre: "Distrito Norte" },
    { id: 2, nombre: "Distrito Sur" },
  ];
  const [iglesias, setIglesias] = useState([
    { id: 1, nombre: "Iglesia Central", distritoId: 1 },
    { id: 2, nombre: "Iglesia Esperanza", distritoId: 2 },
  ]);
  const [nombre, setNombre] = useState("");
  const [distritoId, setDistritoId] = useState(distritos[0].id);
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!nombre.trim()) return;
    setIglesias([...iglesias, { id: iglesias.length + 1, nombre, distritoId: Number(distritoId) }]);
    setNombre("");
    setDistritoId(distritos[0].id);
  };

  const handleEdit = (iglesia) => {
    setEditId(iglesia.id);
    setNombre(iglesia.nombre);
    setDistritoId(iglesia.distritoId);
  };

  const handleUpdate = () => {
    setIglesias(iglesias.map(i => i.id === editId ? { ...i, nombre, distritoId: Number(distritoId) } : i));
    setEditId(null);
    setNombre("");
    setDistritoId(distritos[0].id);
  };

  const handleDelete = (id) => {
    setIglesias(iglesias.filter(i => i.id !== id));
  };

  return (
    <div>
      <h1 className="h4 fw-bold mb-4">Iglesias</h1>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nombre de iglesia"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <select
          className="form-select me-2"
          value={distritoId}
          onChange={e => setDistritoId(e.target.value)}
        >
          {distritos.map(d => (
            <option key={d.id} value={d.id}>{d.nombre}</option>
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
            <th>Distrito</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {iglesias.map((iglesia) => (
            <tr key={iglesia.id}>
              <td>{iglesia.id}</td>
              <td>{iglesia.nombre}</td>
              <td>{distritos.find(d => d.id === iglesia.distritoId)?.nombre}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(iglesia)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(iglesia.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Iglesias;