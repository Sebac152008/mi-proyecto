// src/pages/SearchPage.jsx

import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

import "./SearchPage.css";

function SearchPage() {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Aquí puedes hacer la búsqueda real
    console.log("Buscar:", query);
  };

  return (
    <div className="search-login-bg">
      <div className="search-title-row">
        <h2 className="search-title">Buscar</h2>
      </div>
      <form onSubmit={handleSearch} className="search-login-card search-login-card-only">
        <div className="search-login-row">
          <input
            ref={inputRef}
            type="text"
            className="search-login-input"
            placeholder="¿Qué deseas buscar?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-login-btn">
            <FiSearch size={22} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchPage;