// context/CartContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../types/Product";

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeItemFromCart: (product: Product) => void;
  getCartItemCount: () => number;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        const newCart = [...prevCart];
        if (
          newCart[productIndex].quantity &&
          newCart[productIndex].quantity > 1
        ) {
          newCart[productIndex].quantity! -= 1;
        } else {
          newCart.splice(productIndex, 1);
        }
        return newCart;
      }

      return prevCart;
    });
  };

  const removeItemFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  // const getCartItemCount = () => {
  //   return cart.reduce((total, product) => total + (product.quantity || 1), 0);
  // };
  const getCartItemCount = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeItemFromCart,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
