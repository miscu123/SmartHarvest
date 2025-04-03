import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "./HomePage.css";
import { UserContext } from "./services/userContext.jsx";

const AuthForm = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is not provided");
  }

  const { handleLogin, handleRegister, setErrors, user } = userContext;
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setFormData({ fullName: "", email: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      let response;
      if (isLogin) {
        response = await handleLogin({ email: formData.email, password: formData.password });
      } else {
        response = await handleRegister({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
      }
  
      // Check if response is an object with a 'success' property
      if (response && typeof response === 'object' && 'success' in response) {
        if (response.success) {
          // On successful login, navigate to account page
          navigate("/account");
        } else {
          setError("An error occurred. Please check your credentials and try again.");
        }
      } else {
        setError("Unexpected error: response data is missing.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };
  

  return (
    <main className="welcome-container">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <a href="#" onClick={toggleForm}>
              {isLogin ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;
