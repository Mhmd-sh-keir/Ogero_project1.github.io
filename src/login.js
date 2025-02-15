import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address."); // Toast for invalid email
      return;
    }
    if (!password) {
      toast.error("Password is required."); // Toast for missing password
      return;
    }
    localStorage.setItem("isAuthenticated", "true");
    toast.success("Login successful!"); // Toast for successful login
    navigate("/dashboard");
  };

  return (
    <div className="body1">
      <div className="map">
        <h2>Login to Ogero</h2>
        <Link to="/register">Don't have an account? Register.</Link>
        <br />
        <br />
        {error && <div className="error-message">{error}</div>}
        <form className="mail" onSubmit={handleLogin}>
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
            className="block"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <input className="Submit" type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
  );
}

export default Login;