import { useEffect, useState } from "react";

import API from "../api/axios";

import MainLayout from "../layouts/MainLayout";

import StatsCard from "../components/StatsCard";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/dashboard");

    setStats(res.data);
  };

  return (
    <MainLayout>
      <div className="dashboard-container">
        <div className="hero-section">
          <h1>
            AI Powered Market Basket Analysis
          </h1>

          <p>
            Upload datasets and generate
            intelligent association rules
          </p>
        </div>

        <div className="stats-grid">
          <StatsCard
            title="Users"
            value={stats.users}
          />

          <StatsCard
            title="Datasets"
            value={stats.datasets}
          />

          <StatsCard
            title="Rules"
            value={stats.rules}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;