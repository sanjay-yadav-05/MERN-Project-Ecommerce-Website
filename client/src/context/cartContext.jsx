import { useState, createContext, useContext, useEffect } from "react";


// Create Auth Context
const CartContext = createContext();

// AuthProvider Component
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    async function fetchCartItems() {
        const storedCart = await JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }
    useEffect(() => {
        fetchCartItems();
    }, []);
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook to use Auth Context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
