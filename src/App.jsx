import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import userContext from "./context/userContext";
import cartContext from "./context/cartontext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getUser } from "./services/userService";
import setAuthToken from "./utils/setAuthToken";
import { getJwt } from "./services/userService";
import {
  addToCartAPI,
  getCartAPI,
  increaseFromCartAPI,
  removeFromCartAPI,
} from "./services/cartService";
import "react-toastify/dist/ReactToastify.css";
setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added Successfully!");
      })
      .catch((err) => {
        toast.error("Failed to Add Product");
        setCart(cart);
      });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error("Something Went Wrong!!");
      setCart(oldCart);
    });
  };
  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      increaseFromCartAPI(id).catch((err) => {
        toast.error("Something Went Wrong!!");
        setCart(oldCart);
      });
    }
    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);
      decreaseFromCartAPI(id).catch((err) => {
        toast.error("Something Went Wrong!!");
        setCart(updatedCart);
      });
    }
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something Went Wrong!!");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </cartContext.Provider>
    </userContext.Provider>
  );
};

export default App;
