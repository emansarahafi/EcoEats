import React, { useState, useEffect } from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import SearchBar from "./SearchBar";

export default function ListOfRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8022/api/restauants");
        const data = await response.json();
        setRestaurants(data.restaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          <div key={restaurant._id}>
            <RestaurantCardItem restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
}
