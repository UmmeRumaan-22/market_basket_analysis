import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
  try {
    const res = await API.get("/inventory/low-stock");

    const alerts = res.data.map((item) => ({
      id: item.id,
      title: "Low Stock Alert",
      message: `${item.product_name} stock is only ${item.stock}`,
      created_at: new Date(),
      type: "Inventory"
    }));

    setNotifications(alerts);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const deleteNotification = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);
      loadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="container mt-3">

        <h3 className="mb-3">
          Notifications ({notifications.length})
        </h3>

        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`alert ${
                n.type === "Inventory"
                  ? "alert-warning"
                  : "alert-info"
              }`}
            >
              <div className="d-flex justify-content-between">

                <div>
                  <h5>{n.title}</h5>

                  <p className="mb-1">
                    {n.message}
                  </p>

                  <small>
                    {new Date(
                      n.created_at
                    ).toLocaleString()}
                  </small>
                </div>

                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteNotification(n.id)
                    }
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info">
            No Notifications Found
          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default Notifications;