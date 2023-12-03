import React from "react";

const Cart = ({ selectedItems }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {selectedItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.qte} - Price: {item.price} $
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
