import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (product) => {


    const existing = cart.find(
      (p) => p.slug === product.slug
    );

    if (existing) {

      setCart(
        cart.map((p) =>
          p.slug === product.slug
            ? { ...p, qty: p.qty + 1 }
            : p
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          qty: 1
        }
      ]);
    }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "add_to_cart", {
        currency: "INR",
        value: product.price,
        items: [
          {
            item_name: product.name,
            item_id: product._id,
            item_category: product.category,
            price: product.price,
            quantity: 1,
          },
        ],
      });
    }
  };

  /* =========================
     UPDATE QTY
  ========================= */

  const updateQty = (slug, qty) => {

    setCart(
      cart.map((p) =>
        p.slug === slug
          ? { ...p, qty }
          : p
      )
    );
  };

  /* =========================
     REMOVE ITEM
  ========================= */

  const removeFromCart = (slug) => {

    setCart(
      cart.filter(
        (p) => p.slug !== slug
      )
    );
  };

  /* =========================
     CLEAR CART
  ========================= */

  const clearCart = () => {
    setCart([]);
  };
const decreaseQuantity = (slug) => {

  setCart((prev) =>

    prev
      .map((item) => {

        if (item.slug === slug) {

          return {
            ...item,
            qty: item.qty - 1
          };
        }

        return item;
      })

      .filter((item) => item.qty > 0)
  );
};
  /* =========================
     TOTAL
  ========================= */

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalAmount,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);