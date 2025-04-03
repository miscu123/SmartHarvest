import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./services/userContext.jsx";

const Navbar = ({ activeSection, setActiveSection }) => {
  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <header className="bg-green-600 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with link to HomePage */}
        <Link to="/">
          <h1 className="text-3xl font-bold logo" style={{ textAlign: "right" }}>
            SmartHarvest
          </h1>
        </Link>

        <nav className="space-x-4">
          <Link
            to="/products"
            className={`nav-button ${activeSection === "products" ? "active" : ""}`}
            onClick={() => setActiveSection("products")}
          >
            Products
          </Link>
          <Link
            to="/services"
            className={`nav-button ${activeSection === "services" ? "active" : ""}`}
            onClick={() => setActiveSection("services")}
          >
            Services
          </Link>
          <Link
            to="/membership"
            className={`nav-button ${activeSection === "membership" ? "active" : ""}`}
            onClick={() => setActiveSection("membership")}
          >
            Membership
          </Link>
          {user.id!= 0 ? (
            <Link
              to="/account"
              className={`nav-button ${activeSection === "account" ? "active" : ""}`}
              onClick={() => setActiveSection("account")}
            >
              {user.fullName}
            </Link>
          ) : (
            <Link
              to="/login"
              className={`nav-button ${activeSection === "login" ? "active" : ""}`}
              onClick={() => setActiveSection("login")}
            >
              Login
            </Link>
          )}
          <Link
            to="/cart"
            className={`nav-button ${activeSection === "cart" ? "active" : ""}`}
            onClick={() => setActiveSection("cart")}
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
