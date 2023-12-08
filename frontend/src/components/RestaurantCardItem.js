import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap
import { useNavigate } from 'react-router-dom';
import Show from './Show';

export default function RestaurantCardItem({ restaurant }) {
  const navigate = useNavigate();

  const showRestaurantItems = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/products`);
  };

  const stars = [...Array(5)].map((_, i) => (
    <span key={i} style={{ color: 'gold', fontSize: '20px' }}>
      ★
    </span>
  ));

  return (
    <Card
      style={{
        width: '18rem',
        marginTop: '60px',
        cursor: 'default',
      }}
    >
      <Card.Img variant="top" src={restaurant.logo} style={{ maxHeight: '200px' }} />
      <Card.Body
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card.Title>{restaurant.name}</Card.Title>
        <span>{stars}</span>
        <Show content={restaurant.description} maxLength={30} />
        {/* Use Button instead of Badge */}
        <Button variant="secondary" style={{ cursor: 'pointer' }} onClick={() => showRestaurantItems(restaurant.id)}>
          View Menu
        </Button>
      </Card.Body>
    </Card>
  );
}
