import React, { createContext, useState, useContext } from "react";

// Create the CartContext
const CartContext = createContext(undefined);

// Cart Provider Component
export const CartProvider = ({ children }) => {
 const [cart, setCart] = useState([]);

 const addToCart = (product) => {
   setCart((prevCart) => {
     const existingProduct = prevCart.find(
       (item) => item.name === product.name
     );
     if (existingProduct) {
       return prevCart.map((item) =>
         item.name === product.name
           ? { ...item, quantity: item.quantity + 1 }
           : item
       );
     }
     return [...prevCart, { ...product, quantity: 1 }];
   });
 };

 const removeFromCart = (productName) => {
   setCart((prevCart) => prevCart.filter((item) => item.name !== productName));
 };

 const updateCartQuantity = (productName, quantity) => {
   setCart((prevCart) =>
     prevCart.map((item) =>
       item.name === productName
         ? { ...item, quantity: Math.max(1, quantity) }
         : item
     )
   );
 };

 const clearCart = () => {
   setCart([]);
 };

 return (
   <CartContext.Provider
     value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}
   >
     {children}
   </CartContext.Provider>
 );
};

// Custom hook to use the CartContext
export const useCart = () => {
 const context = useContext(CartContext);
 if (context === undefined) {
   throw new Error("useCart must be used within a CartProvider");
 }
 return context;
};