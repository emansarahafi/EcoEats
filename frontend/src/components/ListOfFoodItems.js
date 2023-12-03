import React, { useState, useEffect } from "react";
import FoodCardItem from "./FoodCardItem";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";

const ListOfFoodItems = ({
  restaurants,
  handleIncrement,
  handleDecrement,
  handleDelete,
  handleSumDecrement,
  handleSumIncrement,
  handleSumDelete,
  sum,
  selectedItems,
  handleAddToCart,
}) => {
  const { id } = useParams();

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);

  useEffect(() => {
    const restaurant = restaurants.find(
      (restaurant) => restaurant.id === parseInt(id, 10)
    );

    if (restaurant) {
      setSelectedRestaurant(restaurant);
      setFilteredFoodItems(restaurant.products);
    } else {
      setSelectedRestaurant(null);
      setFilteredFoodItems([]);
    }
  }, [restaurants, id]);

  const handleSearch = (query) => {
    const filtered = selectedRestaurant.products.filter((foodItem) =>
      foodItem.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoodItems(filtered);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {filteredFoodItems.map((foodItem) => (
          <FoodCardItem
            key={foodItem.id}
            foodItem={foodItem}
            handleIncrement={() => handleAddToCart(foodItem)}
            handleDecrement={() => handleDecrement(foodItem.id)}
            handleDelete={handleDelete}
            handleSumDecrement={handleSumDecrement}
            handleSumIncrement={handleSumIncrement}
            sum={sum}
            handleSumDelete={handleSumDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfFoodItems;
