import React from 'react';
import RestaurantCardItem from './RestaurantCardItem';
import { useParams } from 'react-router-dom';

const RestaurantDetails = ({ restaurants }) => {
  let { id } = useParams();

  const restaurant = restaurants.find((r) => r._id === id);

  return (
    <div style={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'}}>
      <RestaurantCardItem restaurant={restaurant} details={true} />
    </div>
  );
}

export default RestaurantDetails;
