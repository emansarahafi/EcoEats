import React from 'react';
import RestaurantCardItem from './RestaurantCardItem';
import { useParams } from 'react-router-dom';

const RestaurantDetails = ({ restaurants }) => {
  let { id } = useParams();

  const restaurant = restaurants.find((r) => r._id === id);

  return (
    <RestaurantCardItem restaurant={restaurant} details={true} />
  );
}

export default RestaurantDetails;
