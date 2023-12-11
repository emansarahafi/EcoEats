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
import PasswordReset from "./components/PasswordReset";
import Profile from "./components/Profile";
import ListOfForms from "./components/ListOfForms";
import Customers from "./components/Customers";
import RestaurantCardItem from "./components/RestaurantCardItem";
import RestaurantDetails from "./components/RestaurantDetails";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";
import PasswordReset from "./components/PasswordReset";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleIncrement = (id) => {
    const item = selectedItems.find((product) => product.id === id);
    if (!!item) {
      const newItems = selectedItems.filter(
        (product) => product.id !== id
      );
      setSelectedItems([...newItems, { ...item, qte: item.qte + 1 }]);
    }
  };

  const handleDecrement = (id) => {
    const item = selectedItems.find((product) => product.id === id);
    if (!!item && item.qte > 0) {
      const newItems = selectedItems.filter(
        (product) => product.id !== id
      );
      setSelectedItems([...newItems, { ...item, qte: item.qte - 1 }]);
    }
  };

  const handleAddToCart = (item) => {
    const oldItem = selectedItems.find(
      (product) => product.id === item.id
    );
    if (!oldItem) {
      setSelectedItems([...selectedItems, { ...item, qte: 1 }]);
    } else {
      const newItems = selectedItems.filter(
        (product) => product.id !== item.id
      );
      setSelectedItems([...newItems, { ...oldItem, qte: oldItem.qte + 1 }]);
    }
  };

  const getItemsCount = () => {
    return selectedItems.reduce((acc, current) => {
      return acc + current.qte;
    }, 0);
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("your-background-image-url")', // Add your background image URL
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <NavigationBar cartItemsCount={getItemsCount()} />
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/resetPassword" element={<PasswordReset />} />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute allowedRoles={['user']}>
                <Profile/>
              </PrivateRoute>
            }
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/customers" element={<CustomerServiceForm />} />
          <Route 
            path="/customerServices" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <ListOfForms/>
              </PrivateRoute>
            }
          />
          <Route 
            path="/users" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Customers/>
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={<ListOfRestaurants restaurants={restaurants} />}
          />
          <Route
            path="/restaurant/:id"
            element={<RestaurantCardItem restaurants={restaurants} />}
          />
          <Route
            path="/restaurant/:id/details"
            element={<RestaurantDetails restaurants={restaurants} />}
          />
          <Route
            path="/restaurant/:id/products"
            element={<ListOfFoodItems restaurants={restaurants} handleAddToCart={handleAddToCart} />}
          />
          <Route path="/checkout" element={<Checkout selectedItems={selectedItems} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                selectedItems={selectedItems}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
