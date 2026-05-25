import { useState } from "react";

import API from "../api/axios";

import MainLayout from "../layouts/MainLayout";

function AprioriAnalysis() {
  const [datasetId, setDatasetId] =
    useState("");

  const [rules, setRules] = useState([]);

  const generateRules = async () => {
    const res = await API.post(
      "/apriori/generate",
      {
        datasetId,
        minSupport: 0.02,
        minConfidence: 0.3,
        minLift: 1.2
      }
    );

    setRules(res.data.rules);
  };

  return (
    <MainLayout>
      <div className="page-container">
        <h2>Apriori Analysis</h2>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Dataset ID"
          onChange={(e) =>
            setDatasetId(e.target.value)
          }
        />

        <button
          className="btn btn-success"
          onClick={generateRules}
        >
          Generate Rules
        </button>

        <table className="table table-dark mt-4">
          <thead>
            <tr>
              <th>Antecedent</th>
              <th>Consequent</th>
              <th>Support</th>
              <th>Confidence</th>
              <th>Lift</th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule, index) => (
              <tr key={index}>
                <td>{rule.antecedent}</td>

                <td>{rule.consequent}</td>

                <td>{rule.support}</td>

                <td>{rule.confidence}</td>

                <td>{rule.lift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default AprioriAnalysis;