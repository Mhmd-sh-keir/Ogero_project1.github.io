import React, { useState } from "react";

const DataTable = ({ selectedPage, searchTerm, customData = [], onDelete, onModify }) => {
  const defaultTables = {
    "Domains": [
      { unitName: "Technology", parentName: "IT and Software", unitType: "Industry", supervisorName: "John Smith" },
      { unitName: "Finance", parentName: "Banking and Investments", unitType: "Industry", supervisorName: "Jane Doe" },
    ],
    "Firms": [
      { unitName: "Apple", parentName: "Technology", unitType: "Corporation", supervisorName: "Tim Cook" },
      { unitName: "Tesla", parentName: "Automotive", unitType: "Corporation", supervisorName: "Elon Musk" },
    ],
    "Users": [
      { unitName: "johndoe", parentName: "john@example.com", unitType: "User", supervisorName: "Regular User" },
      { unitName: "adminuser", parentName: "admin@example.com", unitType: "User", supervisorName: "Super Admin" },
    ],
    "Units": [
      { unitName: "Technical Directorate", parentName: "OGERO", unitType: "Directorate", supervisorName: "John Smith" },
      { unitName: "Network Directorate", parentName: "OGERO", unitType: "Directorate", supervisorName: "Jane Doe" },
    ],
    "Roles and Permissions": [
      { unitName: "Admin", parentName: "Full Access", unitType: "Role", supervisorName: "Super Admin" },
      { unitName: "User", parentName: "Limited Access", unitType: "Role", supervisorName: "Regular User" },
    ],
  };

  // Combine default data with custom data
  const allData = [...(defaultTables[selectedPage] || []), ...customData];
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter data based on search term
  const filteredData = allData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((rowIndex) => rowIndex !== index)
        : [...prevSelected, index]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((_, index) => index));
    }
  };

  return (
    <div className="data-table">
      {selectedRows.length > 0 && (
        <div className="action-buttons-container">
          <div className="action-buttons">
            <button
              className="delete-btn"
              onClick={() => {
                selectedRows.forEach(index => onDelete(filteredData[index]));
                setSelectedRows([]);
              }}
            >
              Delete
            </button>
            <button
              className="modify-btn"
              onClick={() => onModify(filteredData[selectedRows[0]])}
              disabled={selectedRows.length !== 1}
            >
              Modify
            </button>
            <button
              className="view-details-btn">
              View Details
            </button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length === filteredData.length}
              />
            </th>
            <th>UNIT NAME</th>
            <th>PARENT NAME</th>
            <th>UNIT TYPE</th>
            <th>SUPERVISOR NAME</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{row.unitName}</td>
              <td>{row.parentName}</td>
              <td>{row.unitType}</td>
              <td>{row.supervisorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;