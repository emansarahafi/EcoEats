import React, { useState } from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import SearchBar from "./SearchBar";

export default function ListOfRestaurants({ restaurants }) {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  const handleSearch = (query) => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <SearchBar onSearch={handleSearch} />

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <RestaurantCardItem restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
}
