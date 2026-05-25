import {
  FaHome,
  FaUpload,
  FaChartBar,
  FaHistory,
  FaCog,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h3 className="logo">
        Market Basket AI
      </h3>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/upload">Upload Dataset</Link>

      <Link to="/analysis">Apriori Analysis</Link>

      <Link to="/history">History</Link>

      <Link to="/visualizations">
        Visualizations
      </Link>

      <Link to="/profile">Profile</Link>

      <Link to="/settings">Settings</Link>

      <button
        className="btn btn-danger mt-4"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;