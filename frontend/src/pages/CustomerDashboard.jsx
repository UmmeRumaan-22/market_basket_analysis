import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [segments, setSegments] = useState([]);

  const [form, setForm] = useState({
    customer_name: "",
    items: "",
    total_amount: "",
  });

  // LOAD ORDERS
  const loadOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  // LOAD SEGMENTATION
  const loadSegments = async () => {
    const res = await API.get("/segmentation");
    setSegments(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    loadOrders();
    loadSegments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addOrder = async () => {
    await API.post("/orders", form);
    setForm({ customer_name: "", items: "", total_amount: "" });
    loadOrders();
    loadSegments();
  };

  const deleteOrder = async (id) => {
    await API.delete(`/orders/${id}`);
    loadOrders();
    loadSegments();
  };

  return (
    <MainLayout>
      <h3>Orders Dashboard</h3>

      {/* ORDER FORM */}
      <div className="card p-3 mb-3">
        <div className="row">
          <div className="col-md-3">
            <input
              className="form-control"
              name="customer_name"
              placeholder="Customer Name"
              value={form.customer_name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              name="items"
              placeholder="Items (Milk,Bread)"
              value={form.items}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              name="total_amount"
              placeholder="Total"
              value={form.total_amount}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={addOrder}>
              Add Order
            </button>
          </div>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <h5>Orders List</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer_name}</td>
              <td>{o.items}</td>
              <td>{o.total_amount}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteOrder(o.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SEGMENTATION TABLE */}
      <h5 className="mt-4">Customer Segmentation</h5>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total Orders</th>
            <th>Total Spent</th>
            <th>Segment</th>
          </tr>
        </thead>

        <tbody>
          {segments.map((s, i) => (
            <tr key={i}>
              <td>{s.customer_name}</td>
              <td>{s.total_orders}</td>
              <td>{s.total_spent}</td>
              <td>
                <span
                  className={
                    s.segment === "VIP"
                      ? "text-success"
                      : s.segment === "Regular"
                      ? "text-primary"
                      : "text-secondary"
                  }
                >
                  {s.segment}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default CustomerDashboard;