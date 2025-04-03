import React, { useState } from "react";
import { useCart } from "./services/CartContext";
import { useAuth } from "./AuthenticationContext";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [checkoutError, setCheckoutError] = useState("");

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setCheckoutError(
        "You need to be authenticated for a personalized experience to continue"
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      alert("Proceeding to checkout!");
    }
  };

  return (
    <main className="welcome-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Your Cart
        </h1>

        {checkoutError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{checkoutError}</span>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            Your cart is empty<br></br>
            <button
              onClick={() => navigate("/products")}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 mb-6">
              {cart.map((product, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-bold text-green-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-green-700">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                    <br></br>
                    <button
                      onClick={() =>
                        updateCartQuantity(product.name, product.quantity - 1)
                      }
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400 transition-colors"
                      disabled={product.quantity <= 1}
                    >
                      −
                    </button>
                    Quantity:
                    <span className="text-xl font-bold">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(product.name, product.quantity + 1)
                      }
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(product.name)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold">
                  Total: ${totalPrice.toFixed(2)}
                </div>
              </div>

              <div className="flex justify-between space-x-4">
                <button
                  onClick={() => navigate("/products")}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={clearCart}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;