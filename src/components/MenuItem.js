import React from 'react';

const MenuItem = ({ item, addToCart }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <img src="https://via.placeholder.com/150" className="card-img-top" alt={item.name} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">${item.price}</p>
          <button className="btn btn-primary" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
