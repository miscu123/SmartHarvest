// App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./ProductPage";
import ServicesPage from "./ServicesPage";
import MembershipPage from "./MembershipPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Cart from "./Cart";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthenticationContext"; // Import AuthProvider
import Footer from "./Footer"; // Import Footer component
import "./App.css";
import "./NavigationButtons.css";

// 404 Page Component
function NotFound() {
  return (
    <div className="text-center p-6">
      <h2 className="text-3xl font-semibold">404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState<
    "home" | "products" | "services" | "membership" | "login" | "cart"
  >("home");

  return (
    <AuthProvider>
      {/* Wrap with AuthProvider */}
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-green-50 text-gray-800">
            {/* Include Navbar globally */}
            <Navbar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            {/* Main Routes block */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {/* Use Footer component */}
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
