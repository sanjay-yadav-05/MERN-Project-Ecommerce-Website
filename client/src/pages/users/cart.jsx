// import React from 'react'
// import Layout from '../../components/layout'
// import UserMenu from './userMenu'
// import { useAuth } from '../../context/authContext'
// import { useCart } from '../../context/cartContext'
// import { NavLink } from 'react-router-dom'



// const cart = () => {
//     const { cart, setCart } = useCart();
//     const { auth } = useAuth();

//     // Remove item from the cart
//     const removeCartItem = async (id) => {
//         try {
//             const newCart = cart.filter(item => item._id !== id);
//             setCart(newCart);
//             localStorage.setItem("cart", JSON.stringify(newCart));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // Increase product quantity
//     const increaseQuantity = (id) => {
//         const updatedCart = cart.map(item => {
//             if (item._id === id) {
//                 return { ...item, quantity: item.quantity + 1 };
//             }
//             return item;
//         });
//         setCart(updatedCart);
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//     };

//     // Decrease product quantity
//     const decreaseQuantity = (id) => {
//         const updatedCart = cart.map(item => {
//             if (item._id === id && item.quantity > 1) {
//                 return { ...item, quantity: item.quantity - 1 };
//             }
//             return item;
//         });
//         setCart(updatedCart);
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//     };

//     // Calculate total price
//     const calculateTotal = () => {
//         return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//     };

//     return (
//         <Layout>
//             <div className="px-4 py-3 h-full flex gap-2">
//                 {/* Left Section */}
//                 <UserMenu />

//                 {/* Right Section */}
//                 <div className="w-5/6 h-full border-2 p-3 flex gap-2 border-black">
//                     <div className="w-4/6 h-full border rounded-lg">
//                         {auth?.user == null ? (
//                             <div className="w-full h-full flex gap-1 items-center justify-center text-3xl">
//                                 <span>Please</span>
//                                 <NavLink to="/login">login</NavLink>
//                                 <span>to checkout</span>
//                             </div>
//                         ) : (
//                             <div className="w-full h-full flex flex-col px-2 py-1 justify-start gap-3 overflow-auto">
//                                 {cart.length > 0 ? (
//                                     cart.map((product) => (
//                                         <div
//                                             key={product._id}
//                                             className="relative h-[22%] w-full rounded-lg p-2 border hover:bg-gray-200"
//                                         >
//                                             <div className="flex w-full justify-start h-full gap-3">
//                                                 {/* Product Image */}
//                                                 <img
//                                                     className="w-1/6 object-cover object-center rounded-lg"
//                                                     src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
//                                                     alt={product.name}
//                                                 />
//                                                 <div className="flex flex-col w-4/6 justify-between py-2">
//                                                     <div className="flex w-full flex-col justify-start gap-2 h-auto">
//                                                         {/* Product Name */}
//                                                         <div className="w-full text-xl font-semibold">{product.name}</div>
//                                                         {/* Product Description */}
//                                                         <div className="w-full text-nowrap overflow-hidden text-ellipsis text-sm">
//                                                             {product.description}
//                                                         </div>
//                                                     </div>
//                                                     {/* Product Price and Quantity */}
//                                                     <div className="w-full flex items-center justify-between h-1/2 text-gray-600 text-sm">
//                                                         <div className="flex gap-1 text-base">
//                                                             <span>Price:</span>
//                                                             <span>{`₹${product.price}`}</span>
//                                                         </div>
//                                                         <div className="flex gap-2 items-center text-base">
//                                                             <span>Quantity:</span>
//                                                             <button
//                                                                 onClick={() => decreaseQuantity(product._id)}
//                                                                 className="bg-gray-300 px-2 rounded-md"
//                                                             >
//                                                                 -
//                                                             </button>
//                                                             <span>{product.quantity}</span>
//                                                             <button
//                                                                 onClick={() => increaseQuantity(product._id)}
//                                                                 className="bg-gray-300 px-2 rounded-md"
//                                                             >
//                                                                 +
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 {/* Action Buttons */}
//                                                 <div className="flex justify-center w-1/6 h-full items-center">
//                                                     <button
//                                                         onClick={() => removeCartItem(product._id)}
//                                                         className="text-sm w-full h-12 bg-red-600 text-white py-1 px-2 rounded-md font-semibold"
//                                                     >
//                                                         Remove
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500 flex items-center justify-center h-full text-3xl w-full">
//                                         Your Cart is Empty
//                                     </p>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* Checkout Section */}
//                     <div className="w-2/6 h-full border rounded-lg py-2 px-2">
//                         <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
//                         {cart.length > 0 ? (
//                             <div className="flex flex-col gap-3 px-4">
//                                 <div className="flex justify-between">
//                                     <span>Total Items:</span>
//                                     <span>{cart.length}</span>
//                                 </div>
//                                 <div className="flex justify-between border-b">
//                                     <span>Total Price:</span>
//                                     <span>₹{calculateTotal()}</span>
//                                 </div>
//                                 <div className="flex justify-center">
//                                     <NavLink to="/checkout">
//                                         <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
//                                             Proceed to Checkout
//                                         </button>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="text-center text-xl">Add some products!</div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// };


// export default cart



import React from 'react';
import Layout from '../../components/layout';
import UserMenu from './userMenu';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const { cart, setCart } = useCart();
    const { auth } = useAuth();

    // Remove item from the cart
    const removeCartItem = async (id) => {
        try {
            const newCart = cart.filter((item) => item._id !== id);
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        } catch (error) {
            console.log(error);
        }
    };

    // Increase product quantity
    const increaseQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Decrease product quantity
    const decreaseQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item._id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Layout>
            <div className="px-4 py-3 h-full flex gap-4">
                {/* Left Section */}
                <UserMenu />

                {/* Right Section */}
                <div className="w-4/5 h-full border-2 p-4 flex gap-6 border-gray-300 rounded-lg shadow-lg bg-white">
                    {/* Cart Items Section */}
                    <div className="w-2/3 h-full border rounded-lg bg-gray-50 px-3 py-2 ">
                        {auth?.user == null ? (
                            <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-700">
                                <span>Please</span>
                                <NavLink to="/login" className="text-blue-500 mx-1">
                                    login
                                </NavLink>
                                <span>to checkout</span>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col gap-4 overflow-auto">
                                {cart.length > 0 ? (
                                    cart.map((product) => (
                                        <div
                                            key={product._id}
                                            className="relative flex items-center gap-4 px-2 py-1 border rounded-lg hover:bg-gray-100 transition"
                                        >
                                            {/* Product Image */}
                                            <img
                                                className="w-20 h-20 object-cover rounded-lg"
                                                src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                                                alt={product.name}
                                            />
                                            <div className="flex-1">
                                                <div className="text-lg font-semibold">{product.name}</div>
                                                <div className="text-sm text-gray-600 line-clamp-2">
                                                    {product.description}
                                                </div>
                                                <div className="mt-2 flex justify-between items-center">
                                                    <div className="text-gray-700 text-sm">
                                                        Price: <span className="font-semibold">₹{product.price}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => decreaseQuantity(product._id)}
                                                            className="px-2  bg-gray-300 rounded-md"
                                                        >
                                                            -
                                                        </button>
                                                        <span>{product.quantity}</span>
                                                        <button
                                                            onClick={() => increaseQuantity(product._id)}
                                                            className="px-2 bg-gray-300 rounded-md"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeCartItem(product._id)}
                                                className="text-sm bg-red-500 text-white px-3 py-2 rounded-lg"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 flex items-center justify-center h-full text-xl">
                                        Your Cart is Empty
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Checkout Section */}
                    <div className="w-1/3 h-full border rounded-lg bg-gray-50 p-4">
                        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                        {cart.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <span>Total Items:</span>
                                    <span>{cart.length}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span>Total Price:</span>
                                    <span>₹{calculateTotal()}</span>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <NavLink to="/checkout">
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
                                            Proceed to Checkout
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-lg text-gray-700">
                                Add some products to your cart!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
