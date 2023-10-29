import React from 'react';

const Cart = ({ cart, totalAmount }) => {
  return (
    <div className="col-md-4">
      <h2>Cart</h2>
      <ul className="list-group">
        {cart.map((item) => (
          <li key={item.id} className="list-group-item">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p>Total: ${totalAmount}</p>
    </div>
  );
};

export default Cart;
