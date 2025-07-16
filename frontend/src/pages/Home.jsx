import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Home() {
  // Iglesias por distrito (ejemplo)
  const iglesiasDistritoData = {
    labels: ["Distrito Norte", "Distrito Sur", "Distrito Este", "Distrito Oeste"],
    datasets: [
      {
        label: "Iglesias",
        data: [8, 5, 7, 4],
        backgroundColor: "#0d6efd",
      },
    ],
  };

  // Iglesias activas vs inactivas (ejemplo)
  const iglesiasEstadoData = {
    labels: ["Activas", "Inactivas"],
    datasets: [
      {
        data: [20, 5],
        backgroundColor: ["#198754", "#dc3545"],
      },
    ],
  };

  // KPIs
  const totalUsuarios = 350;
  const totalIglesias = 25;
  const totalDistritos = 8;
  const totalZonas = 3;

  return (
    <div className="home-dashboard">
      <div className="home-textRepresentativo">
        <h1 className="h4 fw-bold mb-1">Dashboard</h1>
        <p className="text-muted mb-4">Bienvenido/a a IglesiaConectada</p>
      </div>
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center p-3">
            <h6 className="mb-1">Pastores</h6>
            <span className="fs-4 fw-bold">{totalUsuarios}</span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center p-3">
            <h6 className="mb-1">Iglesias</h6>
            <span className="fs-4 fw-bold">{totalIglesias}</span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center p-3">
            <h6 className="mb-1">Distritos</h6>
            <span className="fs-4 fw-bold">{totalDistritos}</span>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center p-3">
            <h6 className="mb-1">Zonas</h6>
            <span className="fs-4 fw-bold">{totalZonas}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card p-2">
            <h5 className="mb-2" style={{ fontSize: "1rem" }}>Iglesias por distrito</h5>
            <div className="bar-chart-container">
              <Bar data={iglesiasDistritoData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card p-2">
            <h5 className="mb-2" style={{ fontSize: "1rem" }}>Iglesias activas vs inactivas</h5>
            <div className="doughnut-chart-container">
              <Doughnut
                data={iglesiasEstadoData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
