import React, { useState } from "react";

const Sidebar = ({ setPageTitle, isOpen, activePage }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuItems = [
    { name: "Domains", icon: "🌐" },
    { name: "Firms", icon: "🏢" },
    {
      name: "Users and Hierarchy",
      icon: "👥",
      submenu: ["Users", "Units", "Units Types"],
    },
    { name: "Roles and Permissions", icon: "🔑" },
  ];

  const handleMenuClick = (itemName) => {
    if (!isOpen) return;
    setPageTitle(itemName);
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={() => handleMenuClick(item.name)}
                className={activePage === item.name ? "active" : ""}
              >
                <i className="icon">{item.icon}</i>
                {isOpen && <span>{item.name}</span>}
              </a>
              {item.submenu && isOpen && (
                <ul className={`submenu ${openSubmenu === item.name ? "open" : ""}`}>
                  {item.submenu.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <a href="#" onClick={() => setPageTitle(sub)}>
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
    // { name: "Database Connections", icon: "🗄️" },
    // { name: "API Servers", icon: "🔌" },
    // { name: "Database Imports", icon: "📥" },
    // { name: "API Method Links", icon: "🔗" },
    // { name: "API Management", icon: "⚙️" },
    // { name: "Dynamic Methods", icon: "📊" },
    // { name: "Logs and Monitoring", icon: "📝" },
    // { name: "Help And Support", icon: "❓" },
