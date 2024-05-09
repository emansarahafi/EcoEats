import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate} from 'react-router-dom';

const Cart = ({ selectedItems, handleIncrement, handleDecrement }) => {
  const getTotal = () => {
    let total = 0;
    selectedItems.forEach(product => {
      total += product.price * product.qte;
    });
    return Math.round(total * 100) / 100;
  };
  const navigate = useNavigate();
  const NavigateCheckout=()=>{

      navigate('/checkout')
  };
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {selectedItems.map((item) => (
          <li key={item._id} >
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', width: '40%'}}>
              <div>
                {item.name} - Quantity: {item.qte} - Unit Price: {item.price}$ - Price: {item.price * item.qte}$
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: 'center' }}>
                <Button variant="primary" onClick={() => handleDecrement(item._id)}>
                  -
                </Button>
                <span>{item && item.qte}</span>
                <Button variant="success" onClick={() => handleIncrement(item._id)}>
                  +
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        Total price: {getTotal()}
      </div>
      <Button variant="primary" onClick={NavigateCheckout}>
          Checkout
      </Button>
    </div>
  );
};

export default Cart;
