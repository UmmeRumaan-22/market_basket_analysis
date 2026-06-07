import {
  FaHome,
  FaUpload,
  FaChartBar,
  FaHistory,
  FaBox,
  FaFileAlt,
  FaUsers,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="p-3">

      <h3 className="text-center mb-4">Market Basket AI</h3>

      <Link to="/dashboard" className="d-block mb-2">
        <FaHome /> Dashboard
      </Link>

      <Link to="/upload" className="d-block mb-2">
        <FaUpload /> Upload Dataset
      </Link>

      <Link to="/analysis" className="d-block mb-2">
        <FaChartBar /> Apriori & Analysis
      </Link>

      <Link to="/history" className="d-block mb-2">
        <FaHistory /> Rule History
      </Link>

      {/* <Link to="/visualizations" className="d-block mb-2">
        <FaChartBar /> Visualizations
      </Link> */}

      <Link to="/inventory" className="d-block mb-2">
        <FaBox /> Inventory
      </Link>

      <Link to="/customers" className="d-block mb-2">
        <FaUsers /> Customer Dashboard
      </Link>

      <Link to="/sales-reports" className="d-block mb-2">
        <FaFileAlt /> Sales Reports
      </Link>

      <Link to="/business-dashboard" className="d-block mb-3">
         <FaChartBar /> Business Intelligence
      </Link>

      <Link to="/notifications" className="d-block mb-2">
        <FaBell /> Notifications
      </Link>

      <Link to="/profile" className="d-block mb-2">
        <FaUser /> Profile
      </Link>

      <Link to="/settings" className="d-block mb-2">
        <FaCog /> Settings
      </Link>

      <button className="btn btn-danger w-100 mt-3" onClick={logout}>
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
}

export default Sidebar;