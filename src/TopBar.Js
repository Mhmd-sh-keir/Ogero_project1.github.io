import React from "react";

const TopBar = ({ title, onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="top-bar">
      <button className="sidebar-toggle" onClick={onToggleSidebar}>
        {isSidebarOpen ? "✕" : "☰"}
      </button>
      <h1>{title}</h1>
    </header>
  );
};

export default TopBar;