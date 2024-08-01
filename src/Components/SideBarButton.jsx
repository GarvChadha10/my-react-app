import React from "react";
import "./sidebarbutton.css";

function SideBarButton({ onlick }) {
  return (
    <button className="sidebarbtn" onClick={onlick}>
      <img className="Sidebar-icon" src="../Photos/Sidebar-icon.png" alt="Sidebar icon" />
    </button>
  );
}

export default SideBarButton;
