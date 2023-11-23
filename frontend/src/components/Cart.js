import React from "react";
import FoodCardItem from "./FoodCardItem";

const Cart = ({
  selectedItems,
  handleIncrement,
  handleDecrement,
  handleDelete,
  handleSumDecrement,
  handleSumIncrement,
  handleSumDelete,
  sum,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {selectedItems.map((item) => (
          <FoodCardItem
            key={item.id}
            foodItem={item}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleDelete={handleDelete}
            handleSumDecrement={handleSumDecrement}
            handleSumIncrement={handleSumIncrement}
            sum={sum}
            handleSumDelete={handleSumDelete}
          />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        {selectedItems.length !== 0 ? (
          <h1>Total: {sum} $</h1>
        ) : (
          <h1>You have no Products</h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
