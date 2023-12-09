import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate} from 'react-router-dom';


const Cart = ({ selectedItems, handleIncrement, handleDecrement }) => {
  const getTotal = () => {
    return selectedItems.reduce((acc, item) => {
      return acc + item.price * item.qte;
    }, 0);
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
          <li key={item.id} >
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', width: '40%'}}>
              <div>
                {item.name} - Quantity: {item.qte} - Unit Price: {item.price}$ - Price: {item.price * item.qte}$
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: 'center' }}>
                <Button variant="success" onClick={() => handleIncrement(item.id)}>
                  +
                </Button>
                <span>{item && item.qte}</span>
                <Button variant="primary" onClick={() => handleDecrement(item.id)}>
                  -
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
