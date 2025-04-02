import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const productCategories = [
  {
    id: "sensors",
    name: "Environmental Sensors",
    description:
      "Advanced sensing technologies for precise agricultural monitoring",
    products: [
      {
        name: "SoilSync Pro",
        description: "Comprehensive soil moisture and nutrient tracking sensor",
        price: 299.99,
      },
      {
        name: "ClimateGuard Sensor",
        description:
          "Microclimate monitoring system with real-time data transmission",
        price: 449.99,
      },
    ],
  },
  {
    id: "iot",
    name: "IoT Equipment",
    description:
      "Smart systems for optimizing agricultural processes and increasing efficiency",
    products: [
      {
        name: "FarmNet Central",
        description:
          "Centralized IoT management platform for farm-wide connectivity",
        price: 1299.99,
      },
      {
        name: "DroneHarvest X1",
        description:
          "Autonomous agricultural drone for crop monitoring and analysis",
        price: 2499.99,
      },
    ],
  },
  {
    id: "accessories",
    name: "Specialized Accessories",
    description:
      "High-quality components and equipment for professional farmers",
    products: [
      {
        name: "Precision Irrigation Kit",
        description:
          "Advanced water management system with AI-driven optimization",
        price: 799.99,
      },
      {
        name: "SmartFarm Toolkit",
        description:
          "Comprehensive set of precision agricultural tools and sensors",
        price: 1499.99,
      },
    ],
  },
];

function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState(
    productCategories[0].id
  );
  const [notification, setNotification] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const activeCategory = productCategories.find(
    (cat) => cat.id === selectedCategory
  );

  const handleAddToCart = (product: {
    name: string;
    description: string;
    price: number;
  }) => {
    addToCart(product);
    setNotification(`"${product.name}" has been added to your cart!`);
    setTimeout(() => setNotification(""), 3000); // Hide notification after 3 seconds
  };

  return (
    <main className="welcome-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          SmartHarvest Product Catalog
        </h1>

        {/* Notification */}
        {notification && (
          <div className="bg-green-600 text-white p-4 rounded-md text-center mb-6">
            {notification}
          </div>
        )}

        {/* Category Selector */}
        <div className="flex justify-center mb-8 space-x-4">
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Active Category Description */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            {activeCategory?.name}
          </h2>
          <p className="text-gray-600">{activeCategory?.description}</p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {activeCategory?.products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-green-50"
            >
              <h3 className="text-xl font-bold text-green-800 mb-3">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-700">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <br></br>
        {/* Toggle Cart Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Your Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
