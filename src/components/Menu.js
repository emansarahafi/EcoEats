import React from 'react';
import MenuItem from './MenuItem';

const Menu = ({ menu, addToCart }) => {
  return (
    <div className="col-md-8">
      <h2>Menu</h2>
      <div className="row">
        {menu.map((item) => (
          <MenuItem key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
