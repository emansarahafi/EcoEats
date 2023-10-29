import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Import the custom styles
import Menu from './components/Menu';
import Cart from './components/Cart';

function App() {
  const [menu, setMenu] = useState([
    { id: 1, name: 'Burger', price: 10, rating: 4.5 },
    { id: 2, name: 'Pizza', price: 15, rating: 4.0 },
    { id: 3, name: 'Salad', price: 8, rating: 4.2 },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Food Ordering App
          </a>
        </div>
      </nav>
      <div className="my-4">
        <div className="row">
          <Menu menu={menu} addToCart={addToCart} />
          <Cart cart={cart} totalAmount={totalAmount} />
        </div>
      </div>
    </div>
  );
}

export default App;
