import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import DataTable from "./DataTable";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("Domains");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    unitName: "",
    parentName: "",
    unitType: "",
    supervisorName: ""
  });

  // State for custom data (resets on refresh)
  const [customData, setCustomData] = useState({
    Domains: [],
    Firms: [],
    Users: [],
    Units: [],
    "Roles and Permissions": []
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.unitName || !newItem.parentName || !newItem.supervisorName) {
      toast.error("Please fill all required fields");
      return;
    }

    setCustomData(prev => ({
      ...prev,
      [pageTitle]: [...prev[pageTitle], newItem]
    }));

    toast.success("Item added successfully!");
    setShowAddModal(false);
    setNewItem({
      unitName: "",
      parentName: "",
      unitType: "",
      supervisorName: ""
    });
  };

  const handleModifyItem = (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    setCustomData(prev => ({
      ...prev,
      [pageTitle]: prev[pageTitle].map(item =>
        item.unitName === selectedItem.unitName ? newItem : item
      )
    }));

    toast.success("Item modified successfully!");
    setShowModifyModal(false);
    setSelectedItem(null);
    setNewItem({
      unitName: "",
      parentName: "",
      unitType: "",
      supervisorName: ""
    });
  };

  const handleDeleteItem = (itemToDelete) => {
    setCustomData(prev => ({
      ...prev,
      [pageTitle]: prev[pageTitle].filter(item => item.unitName !== itemToDelete.unitName)
    }));
    toast.success("Item deleted successfully!");
  };

  const getFieldLabels = () => {
    switch (pageTitle) {
      case "Domains":
        return { unit: "Domain", parent: "Category", typeOptions: ["Industry", "Sector"] };
      case "Firms":
        return { unit: "Firm", parent: "Industry", typeOptions: ["Corporation", "LLC", "Partnership"] };
      case "Users":
        return { unit: "Username", parent: "Email", typeOptions: ["User", "Admin"] };
      case "Units":
        return { unit: "Unit", parent: "Parent Unit", typeOptions: ["Directorate", "Department"] };
      case "Roles and Permissions":
        return { unit: "Role", parent: "Access Level", typeOptions: ["Admin", "Editor", "Viewer"] };
      default:
        return { unit: "Unit", parent: "Parent", typeOptions: [] };
    }
  };

  const labels = getFieldLabels();

  return (
    <div className="dashboard">
      <Sidebar
        setPageTitle={setPageTitle}
        isOpen={isSidebarOpen}
        activePage={pageTitle}
      />

      <main className="content">
        <TopBar
          title={pageTitle}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="toolbar">
          <button
            className="add-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span>+</span> Add New {labels.unit}
          </button>

          <div className="search-bar">
            <input
              type="text"
              placeholder={`Search ${pageTitle.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New {labels.unit}</h3>
              <form onSubmit={handleAddItem}>
                <div className="form-group">
                  <label>{labels.unit} Name:</label>
                  <input
                    type="text"
                    value={newItem.unitName}
                    onChange={(e) => setNewItem({ ...newItem, unitName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{labels.parent} Name:</label>
                  <input
                    type="text"
                    value={newItem.parentName}
                    onChange={(e) => setNewItem({ ...newItem, parentName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{labels.unit} Type:</label>
                  <select
                    value={newItem.unitType}
                    onChange={(e) => setNewItem({ ...newItem, unitType: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    {labels.typeOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Supervisor Name:</label>
                  <input
                    type="text"
                    value={newItem.supervisorName}
                    onChange={(e) => setNewItem({ ...newItem, supervisorName: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit">Add {labels.unit}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modify Modal */}
        {showModifyModal && selectedItem && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Modify {labels.unit}</h3>
              <form onSubmit={handleModifyItem}>
                <div className="form-group">
                  <label>{labels.unit} Name:</label>
                  <input
                    type="text"
                    value={newItem.unitName}
                    onChange={(e) => setNewItem({ ...newItem, unitName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{labels.parent} Name:</label>
                  <input
                    type="text"
                    value={newItem.parentName}
                    onChange={(e) => setNewItem({ ...newItem, parentName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{labels.unit} Type:</label>
                  <select
                    value={newItem.unitType}
                    onChange={(e) => setNewItem({ ...newItem, unitType: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    {labels.typeOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Supervisor Name:</label>
                  <input
                    type="text"
                    value={newItem.supervisorName}
                    onChange={(e) => setNewItem({ ...newItem, supervisorName: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModifyModal(false)}>
                    Cancel
                  </button>
                  <button type="submit">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <DataTable
          selectedPage={pageTitle}
          searchTerm={searchTerm}
          customData={customData[pageTitle]}
          onDelete={handleDeleteItem}
          onModify={(item) => {
            setSelectedItem(item);
            setNewItem(item);
            setShowModifyModal(true);
          }}
        />
      </main>
    </div>
  );
};

export default Dashboard;