import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import { toast } from "react-toastify"; // Import toast

const Application = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    unitName: "",
    parentName: "",
    unitType: "",
    supervisorName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.unitName && formData.parentName && formData.unitType && formData.supervisorName) {
      setData([...data, formData]);
      setFormData({ unitName: "", parentName: "", unitType: "", supervisorName: "" }); // Reset form
      toast.success("Data added successfully!"); // Toast for successful data addition
    } else {
      toast.error("Please fill all fields."); // Toast for missing fields
    }
  };

  const handleProceedToLogin = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="application">
      <h1>Application Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="unitName"
          placeholder="Unit Name"
          value={formData.unitName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="parentName"
          placeholder="Parent Name"
          value={formData.parentName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="unitType"
          placeholder="Unit Type"
          value={formData.unitType}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="supervisorName"
          placeholder="Supervisor Name"
          value={formData.supervisorName}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Data</button>
      </form>

      <DataTable selectedPage="Application" customData={data} />

      <button onClick={handleProceedToLogin} className="proceed-btn">
        Proceed to Login
      </button>
    </div>
  );
};

export default Application;