import React, { useState, useEffect } from "react";
import FoodCardItem from "./FoodCardItem";
import SearchBar from "./SearchBar";
import { useParams } from "react-router-dom";
import axios from "axios"; // Add this line

const ListOfFoodItems = ({ handleAddToCart }) => {
  const { id } = useParams();

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8022/api/restaurants/${id}`);
        const data = await response.json();
        if (data.restaurant) {
          setSelectedRestaurant(data.restaurant);
          setFilteredFoodItems(data.restaurant.products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

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
            key={foodItem._id}
            foodItem={foodItem}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfFoodItems;
