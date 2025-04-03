import React, { useEffect, useState, useContext } from "react";
import { getAllCustomerOrders } from "./services/orderService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./services/userContext";

const AccountPage = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersResponse = await getAllCustomerOrders();
        console.log("Orders response:", ordersResponse);

        if (ordersResponse?.success && Array.isArray(ordersResponse.body)) {
          setOrders(ordersResponse.body);
        } else {
          setOrders([]); // Ensure orders is always an array
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Handle API failure gracefully
      }
    }

    fetchOrders();
  }, [navigate]);

  return (
    <div className="account-container">
      <h1>My Account</h1>
      {user && (
        <div className="user-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AccountPage;
