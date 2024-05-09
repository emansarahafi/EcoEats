import { useState, useEffect } from "react";
import axios from "axios";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/orders",
        {
          headers: { Authorization: "Bearer " + token },
        });
        setOrders(response.data.orders);
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();
  }, []);

  return (
    <div style={{ padding: 60 }}>
      <h3>Orders</h3>
      {isLoading && <div> Loading...</div>}
      {!isLoading && !orders.length && <div> No orders yet.</div>}
      {!isLoading && !!orders.length && (
        <table>
          <thead>
            <th>OrderId</th>
            <th>Order Date</th>
            <th>Total price</th>
            <th>State</th>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order._id} </td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.totalPrice}</td>
                <td style={{ color: "green" }}>Confirmed</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
