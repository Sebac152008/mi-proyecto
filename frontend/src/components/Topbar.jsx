// src/components/Topbar.jsx
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./Topbar.css";

function Topbar() {
  const navigate = useNavigate();

  const handleGoToSearch = () => {
    navigate("/search");
  };

  return (
    <div className="topbar shadow-sm">
      <div>
        <button className="search-button" onClick={handleGoToSearch}>
          <FiSearch size={18} className="me-1" />
          Buscar
        </button>
      </div>
    </div>
  );
}

export default Topbar;
