import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ListOfRestaurants from "./components/ListOfRestaurants";
import ListOfFoodItems from "./components/ListOfFoodItems";
import NavigationBar from "./components/NavigationBar";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerServiceForm from "./components/CustomerServiceForm";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import PasswordReset from "./components/PasswordReset";
import Profile from "./components/Profile";
import CustomerServiceRequests from "./components/CustomerServiceRequests";
import Customers from "./components/Customers";
import RestaurantCardItem from "./components/RestaurantCardItem";
import RestaurantDetails from "./components/RestaurantDetails";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./components/Checkout";
import { Orders } from "./components/Orders";
import axios from 'axios';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/api/restaurants");
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const clearCart = () => {
    setSelectedItems([]);
  };

  const handleIncrement = (id) => {
    const idx = selectedItems.findIndex((product) => product._id === id);
    if (idx > -1) {
      const item = selectedItems[idx];
      const newItems = [...selectedItems];
      newItems[idx] = { ...item, qte: item.qte + 1 };
      setSelectedItems(newItems);
    }
  };

  const handleDecrement = (id) => {
    const idx = selectedItems.findIndex((product) => product._id === id);
    if (idx > -1) {
      const item = selectedItems[idx];
      if (item.qte === 1) {
        setSelectedItems(selectedItems.filter(product => product._id !== id));
      }
      else {
        const newItems = [...selectedItems];
        newItems[idx] = { ...item, qte: item.qte - 1 };
        setSelectedItems(newItems);
      }
    }
  };

  const handleAddToCart = (item) => {
    const acutalItem = selectedItems.find((x) => x._id === item._id);
  
    if (!!acutalItem) {
      const updatedItems = selectedItems.map((product) => {
        if (product._id === item._id) {
          return { ...product, qte: product.qte + 1 };
        }
        return product;
      });
  
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, qte: 1 }]);
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
          'url("https://images.pexels.com/photos/4040649/pexels-photo-4040649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <NavigationBar cartItemsCount={getItemsCount()} />
        <Routes>
        <Route 
            path="/orders" 
            element={
              <PrivateRoute allowedRoles={['user']}>
                <Orders/>
              </PrivateRoute>
            }
          />
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
          <Route path="/customers" element={<CustomerServiceForm />} />
          <Route 
            path="/customerServices" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <CustomerServiceRequests/>
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

          <Route 
            path="/checkout" 
            element={
              <PrivateRoute allowedRoles={['user']}>
                <Checkout selectedItems={selectedItems} clearCart={clearCart} />/
              </PrivateRoute>
            }
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
