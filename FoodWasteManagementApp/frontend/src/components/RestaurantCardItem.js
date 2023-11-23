import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";

export default function RestaurantCardItem({ restaurant }) {
  const navigate = useNavigate();

  const showRestaurantItems = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/products`);
  };

  const stars = [...Array(5)].map((_, i) => (
    <span key={i} style={{ color: "gold", fontSize: "20px" }}>
      ★
    </span>
  ));

  return (
    <Card
      style={{
        width: "18rem",
        marginTop: "60px",
        cursor: "pointer",
      }}
      onClick={() => showRestaurantItems(restaurant.id)}
    >
      <Card.Img
        variant="top"
        src={restaurant.logo}
        style={{ maxHeight: "200px" }}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Title>{restaurant.name}</Card.Title>
        <span>{stars}</span>
        <Card.Text>{restaurant.description}</Card.Text>
        <Badge bg="secondary">View Menu</Badge>
      </Card.Body>
    </Card>
  );
}
