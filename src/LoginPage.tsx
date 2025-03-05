import React, { useState } from "react";
import "./index.css"; // Import the global CSS file
import "./HomePage.css";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <main className="welcome-container">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form>
          <input type="text" placeholder="Username" required />
          {!isLogin && <input type="email" placeholder="Email" required />}
          <input type="password" placeholder="Password" required />
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
