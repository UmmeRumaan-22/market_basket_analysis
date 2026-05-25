import React, { useEffect, useState } from "react";

import API from "../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Visualizations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const res = await API.get("/history");

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container mt-4 p-4 rounded shadow"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <h2
        className="mb-4"
        style={{
          color: "#343a40",
          fontWeight: "bold",
        }}
      >
        Apriori Visualizations
      </h2>

      <div
        style={{
          width: "100%",
          height: 450,
          background: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
            />

            <XAxis
              dataKey="antecedent"
              tick={{ fill: "#555" }}
            />

            <YAxis
              tick={{ fill: "#555" }}
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="confidence_value"
              fill="#74c0fc"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Visualizations;