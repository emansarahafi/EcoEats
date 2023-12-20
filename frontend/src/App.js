import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:8022/api/restaurants");
        setRestaurants(response.data.restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

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
    const selectedItemsNames = selectedItems.map((item) => item.name);
  
    if (selectedItemsNames.includes(item.name)) {
      console.log("already there");
  
      const updatedItems = selectedItems.map((product) => {
        if (product.name === item.name) {
          return { ...product, qte: product.qte + 1 };
        }
        return product;
      });
  
      setSelectedItems(updatedItems);
    } else {
      console.log("not there");
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
          'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")',
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
