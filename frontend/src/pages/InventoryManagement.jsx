import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function DashboardManagement() {
  // ================= CATEGORY =================
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // ================= PRODUCT =================
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    product_name: "",
    category_id: "",
    price: "",
    stock: "",
  });

  // ================= LOAD DATA =================
  const loadCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const loadProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
    loadInventoryAlerts();
  }, []);

  // ================= CATEGORY ADD =================
  const addCategory = async () => {
    if (!categoryName.trim()) return alert("Enter category");

    await API.post("/categories", {
      name: categoryName,
    });

    setCategoryName("");
    loadCategories();
  };

  // ================= PRODUCT ADD =================
  const addProduct = async () => {
    await API.post("/products", formData);

    setFormData({
      product_name: "",
      category_id: "",
      price: "",
      stock: "",
    });

    loadProducts();
    loadInventoryAlerts();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    loadProducts();
    loadInventoryAlerts();
  };

  const deleteCategory = async (id) => {
  try {
    await API.delete(`/categories/${id}`);
    loadCategories();
  } catch (err) {
    console.log(err);
  }
};

  // ================= INVENTORY ALERTS =================
  const [lowStock, setLowStock] = useState([]);

  const loadInventoryAlerts = async () => {
    const res = await API.get("/inventory/low-stock");
    setLowStock(res.data);
  };

  return (
    <MainLayout>
      <div className="container mt-4">

        <h2>Inventory Dashboard</h2>

        {/* ================= CATEGORY FIRST ================= */}
       <div className="card p-3 mt-3">
  <h4>Category Management</h4>

  <div className="d-flex gap-2">
    <input
      className="form-control"
      placeholder="Category Name"
      value={categoryName}
      onChange={(e) => setCategoryName(e.target.value)}
    />

    <button
      className="btn btn-primary"
      onClick={addCategory}
    >
      Add
    </button>
  </div>

  <table className="table mt-3">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {categories.map((c) => (
        <tr key={c.id}>
          <td>{c.id}</td>
          <td>{c.name}</td>

          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteCategory(c.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* ================= PRODUCT SECOND ================= */}
        <div className="card p-3 mt-4">
          <h4>Product Management</h4>

          <div className="row g-2">

            <div className="col-md-3">
              <input
                className="form-control"
                name="product_name"
                placeholder="Product"
                value={formData.product_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option>Select Category</option>

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                name="price"
                placeholder="Price"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={addProduct}
              >
                Add
              </button>
            </div>

          </div>

          <table className="table mt-3">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.product_name}</td>
                  <td>{p.category_name}</td>
                  <td>{p.stock}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteProduct(p.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= INVENTORY ALERTS THIRD ================= */}
        <div className="card p-3 mt-4">
          <h4>Inventory Alerts</h4>

          <div className="alert alert-danger">
            Low Stock Products
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {lowStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </MainLayout>
  );
}

export default DashboardManagement;