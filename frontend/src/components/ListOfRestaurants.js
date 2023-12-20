import React, { useState, useEffect, useCallback } from "react";
import RestaurantCardItem from "./RestaurantCardItem";
import SearchBar from "./SearchBar";
import axios from "axios";
import "@picocss/pico";

export default function ListOfRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [locationfilteredRestaurants, setLocationFilteredRestaurants] = useState([]);
  const [searchfilteredRestaurants, setSearchFilteredRestaurants] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8022/api/restaurants");
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

  const handleSearch = useCallback((searchTerm) => {
    const newFilteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchFilteredRestaurants(newFilteredRestaurants);
    setIsSearchClicked(true);
  }, [restaurants]);

  useEffect(() => {
    if (isSearchClicked) {
      const combinedFilteredRestaurants = locationfilteredRestaurants.filter((restaurant) =>
        searchfilteredRestaurants.includes(restaurant)
      );

      setFilteredRestaurants(combinedFilteredRestaurants);
    }
  }, [locationfilteredRestaurants, searchfilteredRestaurants, isSearchClicked]);

  const handleLocationFilter = useCallback((location) => {
    if (location === "") {
      setLocationFilteredRestaurants(restaurants);
    } else {
      const newFilteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.location === location
      );
      setLocationFilteredRestaurants(newFilteredRestaurants);
    }
  }, [restaurants]);

  const handleRatingFilter = useCallback((minRating) => {
    if (minRating === "") {
      setMinRatingFilter(0);
    } else {
      setMinRatingFilter(parseFloat(minRating));
    }
  }, []);

  useEffect(() => {
    const newFilteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.rating >= minRatingFilter
    );
    setFilteredRestaurants(newFilteredRestaurants);
  }, [minRatingFilter]);

  return (
    <div className="container">
      <div className="header">
        <h1>Restaurant Search</h1>
      </div>
      <div className="filters">
        <div className="search-bar">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="filter-dropdowns">
          <div className="filter-dropdown">
            <select
              style={{ backgroundColor: "white" }}
              id="location"
              onChange={(e) => handleLocationFilter(e.target.value)}
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
              onChange={(e) => handleRatingFilter(e.target.value)}
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
      </div>
      <div className="restaurant-list" style={{ display: "flex", justifyContent: "space-around" }}>
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCardItem key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
