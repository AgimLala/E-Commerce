import React, { useEffect, useState } from "react";
import axiosInstance from "../services/api-users";

// Define types for OrderItem and Order
interface OrderItem {
  orderItemId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  orderedDate: string;
  orderItems: OrderItem[];
}

const Profile = () => {
  const [orders, setOrders] = useState<Order[]>([]); // State for orders
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null); // State for managing expanded dropdown

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get<Order[]>("/orders"); // Fetch orders
        setOrders(response.data); // Set orders in state
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Toggle dropdown for an order
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  return (
    <div className="profile-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.orderId} className="order-item" >
              <div
                className="order-header"
                onClick={() => toggleOrderDetails(order.orderId)}
              >
                Order ID: {order.orderId} <br />
                Date:{" "}
                {new Date(order.orderedDate).toLocaleString()}
              </div>

              {/* Dropdown content */}
              {expandedOrderId === order.orderId && (
                <div  className="order-details" >
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.orderItemId} className="order-detail-item">
                      <div 
                      >
                    Product: {item.productName} <br />
                    Quantity: {item.quantity} <br />
                    Price: ${item.price.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
