import React, { useState } from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import ListOfFoodItems from "./ListOfFoodItems";
import SearchBar from "./SearchBar";

export default function ListOfRestaurants({ restaurants, foodItems }) {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const handleSearch = (query) => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const handleRestaurantClick = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <SearchBar onSearch={handleSearch} />

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id)}>
            <RestaurantCardItem restaurant={restaurant} />
          </div>
        ))}
      </div>

      {selectedRestaurantId && (
        <ListOfFoodItems
          foodItems={foodItems}
          selectedRestaurantId={selectedRestaurantId}
        />
      )}
    </div>
  );
}
