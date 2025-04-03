import React, { useEffect, useState } from "react";
import { getById } from "./services/userService";
import { getAllCustomerOrders } from "./services/orderService";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
}

const AccountPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
        const userId = Number(localStorage.getItem("userId"));
        if (!userId) {
          navigate("/");
          return;
        }
        

      const userResponse = await getById(userId);
      if (userResponse.success && userResponse.body) {
        setUser(userResponse.body);
    } else {
        setUser(null); 
    }
    
    }

    async function fetchOrders() {
      const ordersResponse = await getAllCustomerOrders();
      if (ordersResponse.success) {
        setOrders(ordersResponse.body);
      }
    }

    fetchUserData();
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
    </div>
  );
};

export default AccountPage;
