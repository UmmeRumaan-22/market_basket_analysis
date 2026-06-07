import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function BusinessDashboard() {
  const [summary, setSummary] = useState({});
  const [topCustomers, setTopCustomers] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/business");

      console.log("Business Data:", res.data);

      setSummary(res.data.summary || {});
      setTopCustomers(res.data.topCustomers || []);
      setLowStock(res.data.lowStock || []);
      setRecommendations(res.data.recommendations || []);
    } catch (error) {
      console.log("Business API Error:", error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <MainLayout>
      <div className="container mt-4">

        <h2 className="mb-4">Business Intelligence Dashboard</h2>

        {/* Summary Cards */}
        <div className="row">

          <div className="col-md-3">
            <div className="card text-center p-3">
              <h5>Revenue</h5>
              <h3>₹{summary.totalRevenue || 0}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center p-3">
              <h5>Orders</h5>
              <h3>{summary.totalOrders || 0}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center p-3">
              <h5>Customers</h5>
              <h3>{summary.totalCustomers || 0}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card text-center p-3">
              <h5>Products</h5>
              <h3>{summary.totalProducts || 0}</h3>
            </div>
          </div>

        </div>

        {/* Top Customers */}
        <div className="card mt-4 p-3">
          <h4>Top Customers</h4>

          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
              </tr>
            </thead>

            <tbody>
              {topCustomers.map((c, index) => (
                <tr key={index}>
                  <td>{c.customer_name}</td>
                  <td>{c.total_orders}</td>
                  <td>₹{c.total_spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock */}
        <div className="card mt-4 p-3">
          <h4>Low Stock Alerts</h4>

          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {lowStock.map((item, index) => (
                <tr key={index}>
                  <td>{item.product_name}</td>
                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recommended Product Pairs */}
        <div className="card mt-4 p-3">
          <h4>Recommended Product Pairs (Apriori)</h4>

          <table className="table">
            <thead>
              <tr>
                <th>If Customer Buys</th>
                <th>Recommend</th>
                <th>Confidence</th>
              </tr>
            </thead>

            <tbody>
              {recommendations.map((r, index) => (
                <tr key={index}>
                  <td>{r.antecedent}</td>
                  <td>{r.consequent}</td>
                  <td>
                    {(Number(r.confidence_value) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </MainLayout>
  );
}

export default BusinessDashboard;