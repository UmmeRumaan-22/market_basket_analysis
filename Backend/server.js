const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/apriori", require("./routes/aprioriRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes")); // ✅ only once
app.use("/api/association-rules", require("./routes/associationRuleRoutes"));
app.use("/api/segmentation", require("./routes/segmentationRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/business", require("./routes/businessRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});