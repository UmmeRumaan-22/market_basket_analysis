import { useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function AprioriAnalysis() {
  const [datasetId, setDatasetId] = useState("");
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRules = async () => {
    try {
      setLoading(true);

      const res = await API.post(
        "/apriori/generate",
        {
          datasetId,
          minSupport: 0.02,
          minConfidence: 0.3,
          minLift: 1.2,
        }
      );

      setRules(res.data.rules || []);
    } catch (error) {
      console.log(error);
      alert("Failed To Generate Rules");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mt-4">

        <h2 className="mb-4">
          Apriori Analysis & Association Rules
        </h2>

        <div className="card p-4 shadow">

          <label>Dataset ID</label>

          <input
            type="number"
            className="form-control mb-3"
            value={datasetId}
            onChange={(e) =>
              setDatasetId(e.target.value)
            }
            placeholder="Enter Dataset ID"
          />

          <button
            className="btn btn-success"
            onClick={generateRules}
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate Rules"}
          </button>

        </div>

        {rules.length > 0 && (

          <div className="mt-4">

            <div className="alert alert-info">

              <h5>
                Total Rules Generated:
                {rules.length}
              </h5>

            </div>

            <table className="table table-bordered table-striped">

              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Rule</th>
                  <th>Support</th>
                  <th>Confidence</th>
                  <th>Lift</th>
                  <th>Recommendation</th>
                </tr>
              </thead>

              <tbody>

                {rules.map((rule, index) => (

                  <tr key={index}>

                    <td>{index + 1}</td>

                    <td>
                      <b>
                        {rule.antecedent}
                      </b>

                      {" → "}

                      <b>
                        {rule.consequent}
                      </b>
                    </td>

                    <td>
                      {(
                        rule.support * 100
                      ).toFixed(2)}
                      %
                    </td>

                    <td>
                      {(
                        rule.confidence *
                        100
                      ).toFixed(2)}
                      %
                    </td>

                    <td>
                      {rule.lift.toFixed(2)}
                    </td>

                    <td>
                      Customers who buy
                      <b>
                        {" "}
                        {rule.antecedent}
                      </b>
                      are likely to buy
                      <b>
                        {" "}
                        {rule.consequent}
                      </b>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
    </MainLayout>
  );
}

export default AprioriAnalysis;