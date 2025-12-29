import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((p) => p.slug === product.slug);

    if (existing) {
      setCart(
        cart.map((p) =>
          p.slug === product.slug
            ? { ...p, qty: p.qty + 1 }
            : p
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (slug, qty) => {
    setCart(
      cart.map((p) =>
        p.slug === slug ? { ...p, qty } : p
      )
    );
  };

  const removeFromCart = (slug) => {
    setCart(cart.filter((p) => p.slug !== slug));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
