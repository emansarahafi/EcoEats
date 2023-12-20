import React, { useState, useEffect } from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import SearchBar from "./SearchBar";
import axios from "axios";
import "@picocss/pico";
export default function ListOfRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8022/api/restaurants"
        );
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    const locations = restaurants.map((restaurant) => restaurant.location);
    const uniqueLocations = Array.from(new Set(locations));
    setUniqueLocations(uniqueLocations);
  }, [restaurants]);

  const handleSearch = (searchTerm) => {
    const newFilteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRestaurants(newFilteredRestaurants);
  };

  

  const handleLocationFilter = (location) => {
    setLocationFilter(location);
    console.log(locationFilter)
    if (location === "All") {
      setFilteredRestaurants(restaurants);}
    else {
      var newFilteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.location === locationFilter
      );
    
      }
    setFilteredRestaurants(newFilteredRestaurants)
    ;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <SearchBar onSearch={handleSearch} />
        
      </div>
      <select onChange={(e) => {console.log(e.target.value); handleLocationFilter(e.target.value)}}>
          <option value="" disabled selected>
             Location
          </option>
          <option value="All">All</option>
          {uniqueLocations.map((location) => (
            <option
              key={location}
              value={location}
              
            >
              {location}
            </option>
          ))}
        </select>{" "}

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant._id}>
            <RestaurantCardItem restaurant={restaurant} />
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
}
