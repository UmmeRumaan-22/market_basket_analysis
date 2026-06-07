import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function SalesReport() {
  const [data, setData] = useState({
    total_transactions: 0,
    total_items_sold: 0,
    total_revenue: 0,
    today_sales: 0,
    monthly_sales: 0,
    yearly_sales: 0,
    today_orders: 0,
  });

  const loadSales = async () => {
    try {
      const res = await API.get("/sales");
      setData(res.data);
    } catch (err) {
      console.log("Sales API Error:", err);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  return (
    <MainLayout>
      <div className="container-fluid">

        <h2 className="mb-4 fw-bold text-primary">
          Sales Report Dashboard
        </h2>

        {/* ROW 1 */}
        <div className="row g-4">

          <div className="col-md-3">
            <div className="card bg-primary text-white shadow">
              <div className="card-body text-center">
                <h6>Total Revenue</h6>
                <h2>₹{data.total_revenue}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success text-white shadow">
              <div className="card-body text-center">
                <h6>Total Orders</h6>
                <h2>{data.total_transactions}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning text-dark shadow">
              <div className="card-body text-center">
                <h6>Items Sold</h6>
                <h2>{data.total_items_sold}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-danger text-white shadow">
              <div className="card-body text-center">
                <h6>Today's Sales</h6>
                <h2>₹{data.today_sales}</h2>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 2 */}
        <div className="row g-4 mt-3">

          <div className="col-md-4">
            <div className="card border-primary shadow">
              <div className="card-body text-center">
                <h5>Monthly Sales</h5>
                <h3>₹{data.monthly_sales}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-success shadow">
              <div className="card-body text-center">
                <h5>Yearly Sales</h5>
                <h3>₹{data.yearly_sales}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-warning shadow">
              <div className="card-body text-center">
                <h5>Today's Orders</h5>
                <h3>{data.today_orders}</h3>
              </div>
            </div>
          </div>

        </div>

        {/* SALES SUMMARY TABLE */}
        <div className="card shadow mt-4">
          <div className="card-header bg-dark text-white">
            Sales Summary
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Total Revenue</td>
                  <td>₹{data.total_revenue}</td>
                </tr>

                <tr>
                  <td>Total Transactions</td>
                  <td>{data.total_transactions}</td>
                </tr>

                <tr>
                  <td>Total Items Sold</td>
                  <td>{data.total_items_sold}</td>
                </tr>

                <tr>
                  <td>Today's Sales</td>
                  <td>₹{data.today_sales}</td>
                </tr>

                <tr>
                  <td>Monthly Sales</td>
                  <td>₹{data.monthly_sales}</td>
                </tr>

                <tr>
                  <td>Yearly Sales</td>
                  <td>₹{data.yearly_sales}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

export default SalesReport;