import React, { useState, useEffect } from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import SearchBar from "./SearchBar";
import axios from "axios";
import "@picocss/pico";
import { getUserRole } from "./UserRole";

export default function ListOfRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const role = getUserRole();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/restaurants");
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRestaurants(
      restaurants.filter((restaurant) => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (locationFilter === '' || restaurant.location === locationFilter) &&
        restaurant.rating >= minRatingFilter
      )
    );
  }, [restaurants, searchTerm, locationFilter, minRatingFilter]);

  useEffect(() => {
    const locations = restaurants.map((restaurant) => restaurant.location);
    const uniqueLocations = Array.from(new Set(locations));
    setUniqueLocations(uniqueLocations);
  }, [restaurants]);

  return (
    <div className="container">
      <div className="header">
        <h1>Restaurant Search</h1>
      </div>
      <div className="search-bar">
        <SearchBar onSearch={(term) => setSearchTerm(term)} />
      </div>
      <div className="filter-dropdowns">
        <div className="filter-dropdown">
          <select
            style={{ backgroundColor: "white" }}
            id="location"
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-dropdown">
          <select
            id="stars"
            onChange={(e) => setMinRatingFilter(parseFloat(e.target.value))}
            style={{ backgroundColor: "white" }}
          >
            <option value="">All</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>
      <div className="restaurant-list" style={{ display: "flex", justifyContent: "space-around" }}>
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCardItem key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
