import React, { useEffect, useState } from "react";

function Settings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [sidebar, setSidebar] = useState(
    localStorage.getItem("sidebar") || "show"
  );

  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "16"
  );

  const [animations, setAnimations] = useState(
    localStorage.getItem("animations") || "on"
  );

  // APPLY THEME
  useEffect(() => {
    document.body.className = theme;

    localStorage.setItem("theme", theme);
  }, [theme]);

  // APPLY FONT SIZE
  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;

    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  // SAVE SIDEBAR
  useEffect(() => {
    localStorage.setItem("sidebar", sidebar);
  }, [sidebar]);

  // SAVE ANIMATIONS
  useEffect(() => {
    localStorage.setItem("animations", animations);
  }, [animations]);

  return (
    <div className="container mt-4">
      <div
        className="p-4 rounded shadow"
        style={{
          background:
            theme === "dark" ? "#1e293b" : "#ffffff",
          color:
            theme === "dark" ? "#ffffff" : "#000000",
        }}
      >
        <h2 className="mb-4">⚙ Settings</h2>

        {/* THEME */}
        <div className="mb-4">
          <h5>Theme Mode</h5>

          <button
            className="btn btn-dark me-2"
            onClick={() => setTheme("dark")}
          >
            Dark Mode
          </button>

          <button
            className="btn btn-light border"
            onClick={() => setTheme("light")}
          >
            Light Mode
          </button>
        </div>

      </div>
    </div>
  );
}

export default Settings;