import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      toast.error("Please fill all fields."); // Toast for missing fields
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address."); // Toast for invalid email
      return;
    }
    setError("");
    toast.success("Registration successful! Please log in."); // Toast for successful registration
    navigate("/application");
  };

  return (
    <div className="body1">
      <div className="map">
        <h2>Register New Account</h2>
        <Link to="/">Already have an account? Login.</Link>
        <br />
        <br />
        {error && <div className="error-message">{error}</div>}
        <form className="mail1" onSubmit={handleRegister}>
          <input
            className="block"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            className="block"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="text"
            id="mobile_code"
            className="block"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            className="block"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <input className="Submit" type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default Register;