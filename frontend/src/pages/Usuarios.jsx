import { useState } from "react";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@ejemplo.com", tipo: "Pastor", distrito: "Norte" },
    { id: 2, nombre: "Ana López", email: "ana@ejemplo.com", tipo: "Pastor", distrito: "Sur" },
    { id: 3, nombre: "Admin", email: "admin@ejemplo.com", tipo: "Administrador", distrito: "-" },
  ]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("Pastor");
  const [distrito, setDistrito] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!nombre.trim() || !email.trim()) return;
    setUsuarios([...usuarios, { id: usuarios.length + 1, nombre, email, tipo, distrito }]);
    setNombre(""); setEmail(""); setTipo("Pastor"); setDistrito("");
  };

  const handleEdit = (usuario) => {
    setEditId(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setTipo(usuario.tipo);
    setDistrito(usuario.distrito);
  };

  const handleUpdate = () => {
    setUsuarios(usuarios.map(u => u.id === editId ? { ...u, nombre, email, tipo, distrito } : u));
    setEditId(null); setNombre(""); setEmail(""); setTipo("Pastor"); setDistrito("");
  };

  const handleDelete = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <div>
      <h1 className="h4 fw-bold mb-4">Usuarios</h1>
      <div className="mb-3 d-flex flex-wrap">
        <input type="text" className="form-control me-2 mb-2" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input type="email" className="form-control me-2 mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <select className="form-select me-2 mb-2" value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="Pastor">Pastor</option>
          <option value="Administrador">Administrador</option>
          <option value="Administradora">Administradora</option>
        </select>
        <input type="text" className="form-control me-2 mb-2" placeholder="Distrito" value={distrito} onChange={e => setDistrito(e.target.value)} />
        {editId ? (
          <button className="btn btn-warning mb-2" onClick={handleUpdate}>Actualizar</button>
        ) : (
          <button className="btn btn-primary mb-2" onClick={handleAdd}>Agregar</button>
        )}
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Distrito</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.tipo}</td>
              <td>{usuario.distrito}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(usuario)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
