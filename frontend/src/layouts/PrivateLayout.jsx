// src/layouts/PrivateLayout.jsx
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
