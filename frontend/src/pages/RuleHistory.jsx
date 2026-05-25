import React, { useEffect, useState } from "react";
import API from "../api/axios";

function RuleHistory() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/history");

      setRules(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Rule History</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Antecedent</th>
            <th>Consequent</th>
            <th>Support</th>
            <th>Confidence</th>
            <th>Lift</th>
          </tr>
        </thead>

        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td>{rule.id}</td>
              <td>{rule.antecedent}</td>
              <td>{rule.consequent}</td>
              <td>{rule.support_value}</td>
              <td>{rule.confidence_value}</td>
              <td>{rule.lift_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RuleHistory;