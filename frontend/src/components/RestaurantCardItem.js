import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import Show from './Show';

const RestaurantCardItem = ({ restaurant, details }) => {
  const navigate = useNavigate();

  const showRestaurantItems = () => {
    navigate(`/restaurant/${restaurant._id}/products`);
  };

  const showRestaurantDetails = () => {
    navigate(`/restaurant/${restaurant._id}/details`);
  };

  const stars = [...Array(5)].map((_, i) => (
    <span
      key={i}
      style={{
        color: restaurant && restaurant.rating && restaurant.rating > i ? 'gold' : 'grey',
        fontSize: '20px',
      }}
    >
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
        {details && (
          <>
            <p>Description: {restaurant.description}</p>
            <p>Address: {restaurant.address}</p>
            <p>Founding Date: {restaurant.foundingDate}</p>
          </>
        )}
        {!details && (
          <>
            <Show content={restaurant.description} maxLength={30} />
            {/* Use Button instead of Badge */}
            <Button variant="secondary" style={{ cursor: 'pointer' }} onClick={() => showRestaurantItems()}>
              View Menu
            </Button>
            <Button variant="light" style={{border:"1px solid black", cursor: 'pointer' }} onClick={showRestaurantDetails}>
              More Details <Badge bg="secondary">i</Badge>
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default RestaurantCardItem;
