import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { restaurants } from "./components/Data";
import ListOfRestaurants from "./components/ListOfRestaurants";
import ListOfFoodItems from "./components/ListOfFoodItems";
import NavigationBar from "./components/NavigationBar";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notifications from "./components/Notifications";
import CustomerServiceForm from "./components/CustomerServiceForm";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const [restaurant, setRestaurant] = useState(restaurants);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  const handleIncrement = (id) => {
    setRestaurant(
      restaurant.map((elt) => {
        if (elt.id === id) {
          return { ...elt, qte: elt.qte + 1 };
        }
        return elt;
      })
    );
  };

  const handleDecrement = (id) => {
    console.log("Decrementing", id);
    setRestaurant(
      restaurant.map((elt) => {
        if (elt.id === id && elt.qte > 0) {
          return { ...elt, qte: elt.qte - 1 };
        }
        return elt;
      })
    );
  };  

  const handleDelete = (id) => {
    setRestaurant(restaurant.filter((elt) => elt.id !== id));
  };

  const handleSumIncrement = (price) => {
    setTotalSum((prevSum) => prevSum + price);
  };

  const handleSumDecrement = (article) => {
    if (article.qte > 0) {
      setTotalSum((prevSum) => prevSum - article.price);
    }
  };

  const handleSumDelete = (article) => {
    setTotalSum((prevSum) => prevSum - article.price * article.qte);
  };

  const handleAddToCart = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div
      style={{
        backgroundImage: 'url("your-background-image-url")', // Add your background image URL
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/customers" element={<CustomerServiceForm />} />
          <Route
            path="/"
            element={
              <ListOfRestaurants
                restaurants={restaurant}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/restaurant/:id/products"
            element={
              <ListOfFoodItems
                restaurants={restaurants}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
                handleSumDecrement={handleSumDecrement}
                handleSumIncrement={handleSumIncrement}
                sum={totalSum}
                handleSumDelete={handleSumDelete}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          {/* Add a separate route for the Cart */}
          <Route
            path="/cart"
            element={
              <Cart
                selectedItems={selectedItems}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
                handleSumIncrement={handleSumIncrement}
                handleSumDecrement={handleSumDecrement}
                handleSumDelete={handleSumDelete}
                sum={totalSum}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
