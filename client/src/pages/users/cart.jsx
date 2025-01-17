import React from 'react'
import Layout from '../../components/layout'
import UserMenu from './userMenu'
import { useAuth } from '../../context/authContext'
import { useCart } from '../../context/cartContext'
import { NavLink } from 'react-router-dom'

// const cart = () => {
//     const { cart, setCart } = useCart();
//     const { auth, setAuth } = useAuth();

//     const removeCartItem = async (id) => {
//         try {
//             const newCart = await cart.filter(item => item._id !== id);
//             await setCart(newCart)
//             localStorage.setItem("cart", JSON.stringify(newCart))
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     return (
//         <Layout>
//             <div className='px-4 py-3 h-full flex gap-2'>
//                 {/* left section */}
//                 <UserMenu />
//                 {/* right section */}
//                 <div className='w-5/6 h-full border-2 p-3 border-black'>
//                     {
//                         auth?.user == null ? (
//                             <div className='w-full h-full flex gap-1 items-center justify-center text-3xl'>
//                                 <span>Please</span>
//                                 <NavLink to={"/login"}>login</NavLink>
//                                 <span>to checkout</span>
//                             </div>
//                         ) : (
//                             <div className="w-full h-full flex flex-col justify-start gap-3 overflow-auto">
                                // {cart.length > 0 ? (
                                //     cart.map((product) => (
                                //         <div
                                //             key={product._id}
                                //             className="relative h-[22%] w-4/6 rounded-lg p-2 border hover:bg-gray-200"
                                //         >
                                //             <div className="flex w-full  justify-start h-full gap-3">
                                //                 {/* Product Image */}
                                //                 <img
                                //                     className="w-1/6 object-cover object-center h-full rounded-lg"
                                //                     src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                                //                     alt={product.name}
                                //                 />
                                //                 <div className='flex flex-col w-4/5 justify-between py-2'>
                                //                     <div className='flex w-full flex-col justify-between h-1/2'>
                                //                         {/* Product Name */}
                                //                         <div className="w-full text-xl font-semibold">{product.name}</div>
                                //                         {/* Product Description */}
                                //                         <div className="w-full text-nowrap overflow-hidden text-ellipsis text-sm">
                                //                             {product.description}
                                //                         </div>
                                //                     </div>
                                //                     {/* Product Price and Quantity */}
                                //                     <div className="w-full flex items-center justify-between h-1/2 text-gray-600 text-sm">
                                //                         <div className='flex gap-1 text-base'>
                                //                             <span>Price:</span>
                                //                             <span> {`₹${product.price}`} </span>
                                //                         </div>
                                //                         <div className='flex gap-1 text-base'>
                                //                             <span>Quantity:</span>
                                //                             <span>{` ${product.quantity}`}</span>
                                //                         </div>
                                //                     </div>
                                //                 </div>
                                //                 {/* Action Buttons */}
                                //                 <div className="flex justify-center w-1/6 h-full items-center">
                                //                     <button onClick={() => removeCartItem(product._id)} className="text-sm w-full h-12 bg-red-600 text-white py-1 px-2 rounded-md font-semibold">
                                //                         Remove
                                //                     </button>

                                //                 </div>
                                //             </div>
                                //         </div>
                                //     ))
                                // ) : (
                                //     <p className="text-gray-500 flex items-center justify-center  h-full text-3xl w-4/6">Your Cart is Empty.</p>
                                // )}
//                                 <div className='w-2/4'>
//                                     hello
//                                 </div>
//                             </div>
//                         )
//                     }
//                 </div>
//             </div>
//         </Layout>
//     )
// }


// const cart = () => {
//     const { cart, setCart } = useCart();
//     const { auth, setAuth } = useAuth();

//     const removeCartItem = async (id) => {
//         try {
//             const newCart = await cart.filter(item => item._id !== id);
//             await setCart(newCart)
//             localStorage.setItem("cart", JSON.stringify(newCart))
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const calculateTotal = ()=>{
//         let total = 0;
//         cart.forEach(item => {
//             total += item.price * item.quantity
//             })
//             return total;
//     }
    
//     return (
//         <Layout>
//             <div className='px-4 py-3 h-full flex gap-2'>
//                 {/* left section */}
//                 <UserMenu />
//                 {/* right section */}
//                 <div className='w-5/6 h-full border-2 p-3 flex gap-2 border-black'>
//                     <div className='w-4/6 h-full '>
//                         {
//                             auth?.user == null ? (
//                                 <div className='w-full h-full flex gap-1 items-center justify-center text-3xl'>
//                                     <span>Please</span>
//                                     <NavLink to={"/login"}>login</NavLink>
//                                     <span>to checkout</span>
//                                 </div>
//                             ) : (
//                                 <div className='w-full h-full flex flex-col px-2 py-1 justify-start gap-3 overflow-auto'>
//                                     {cart.length > 0 ? (
//                                     cart.map((product) => (
//                                         <div
//                                             key={product._id}
//                                             className="relative h-[22%] w-full rounded-lg p-2 border hover:bg-gray-200"
//                                         >
//                                             <div className="flex w-full  justify-start h-full gap-3">
//                                                 {/* Product Image */}
//                                                 <img
//                                                     className="w-1/6 object-cover object-center rounded-lg"
//                                                     src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
//                                                     alt={product.name}
//                                                 />
//                                                 <div className='flex flex-col w-4/6 justify-between py-2'>
//                                                     <div className='flex w-full flex-col justify-start gap-2 h-auto'>
//                                                         {/* Product Name */}
//                                                         <div className="w-full text-xl font-semibold">{product.name}</div>
//                                                         {/* Product Description */}
//                                                         <div className="w-full text-nowrap overflow-hidden text-ellipsis text-sm">
//                                                             {product.description}
//                                                         </div>
//                                                     </div>
//                                                     {/* Product Price and Quantity */}
//                                                     <div className="w-full flex items-center justify-between h-1/2 text-gray-600 text-sm">
//                                                         <div className='flex gap-1 text-base'>
//                                                             <span>Price:</span>
//                                                             <span> {`₹${product.price}`} </span>
//                                                         </div>
//                                                         <div className='flex gap-1 text-base'>
//                                                             <span>Quantity:</span>
//                                                             <span>{` ${product.quantity}`}</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 {/* Action Buttons */}
//                                                 <div className="flex justify-center w-1/6 h-full items-center">
//                                                     <button onClick={() => removeCartItem(product._id)} className="text-sm w-full h-12 bg-red-600 text-white py-1 px-2 rounded-md font-semibold">
//                                                         Remove
//                                                     </button>

//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500 flex items-center justify-center  h-full text-3xl w-full">Your Cart is Empty</p>
//                                 )}
//                                 </div>
//                             )
//                         }
//                     </div>
//                     <div className='w-2/6 h-full border rounded-lg py-1 px-2'>
//                     <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
//                     {cart.length > 0 ? (
//                         <div className="flex flex-col gap-3 px-4">
//                             <div className="flex justify-between">
//                                 <span>Total Items:</span>
//                                 <span>{cart.length}</span>
//                             </div>
//                             <div className="flex justify-between border-b">
//                                 <span>Total Price:</span>
//                                 <span>₹{calculateTotal()}</span>
//                             </div>
//                             <div className="flex justify-center ">
//                                 <NavLink to="/checkout">
//                                     <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
//                                         Proceed to Checkout
//                                     </button>
//                                 </NavLink>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="text-center text-xl">Add some products!</div>
//                     )}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }







const cart = () => {
    const { cart, setCart } = useCart();
    const { auth } = useAuth();

    // Remove item from the cart
    const removeCartItem = async (id) => {
        try {
            const newCart = cart.filter(item => item._id !== id);
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
        } catch (error) {
            console.log(error);
        }
    };

    // Increase product quantity
    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item._id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Decrease product quantity
    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item._id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Layout>
            <div className="px-4 py-3 h-full flex gap-2">
                {/* Left Section */}
                <UserMenu />

                {/* Right Section */}
                <div className="w-5/6 h-full border-2 p-3 flex gap-2 border-black">
                    <div className="w-4/6 h-full border rounded-lg">
                        {auth?.user == null ? (
                            <div className="w-full h-full flex gap-1 items-center justify-center text-3xl">
                                <span>Please</span>
                                <NavLink to="/login">login</NavLink>
                                <span>to checkout</span>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col px-2 py-1 justify-start gap-3 overflow-auto">
                                {cart.length > 0 ? (
                                    cart.map((product) => (
                                        <div
                                            key={product._id}
                                            className="relative h-[22%] w-full rounded-lg p-2 border hover:bg-gray-200"
                                        >
                                            <div className="flex w-full justify-start h-full gap-3">
                                                {/* Product Image */}
                                                <img
                                                    className="w-1/6 object-cover object-center rounded-lg"
                                                    src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                                                    alt={product.name}
                                                />
                                                <div className="flex flex-col w-4/6 justify-between py-2">
                                                    <div className="flex w-full flex-col justify-start gap-2 h-auto">
                                                        {/* Product Name */}
                                                        <div className="w-full text-xl font-semibold">{product.name}</div>
                                                        {/* Product Description */}
                                                        <div className="w-full text-nowrap overflow-hidden text-ellipsis text-sm">
                                                            {product.description}
                                                        </div>
                                                    </div>
                                                    {/* Product Price and Quantity */}
                                                    <div className="w-full flex items-center justify-between h-1/2 text-gray-600 text-sm">
                                                        <div className="flex gap-1 text-base">
                                                            <span>Price:</span>
                                                            <span>{`₹${product.price}`}</span>
                                                        </div>
                                                        <div className="flex gap-2 items-center text-base">
                                                            <span>Quantity:</span>
                                                            <button
                                                                onClick={() => decreaseQuantity(product._id)}
                                                                className="bg-gray-300 px-2 rounded-md"
                                                            >
                                                                -
                                                            </button>
                                                            <span>{product.quantity}</span>
                                                            <button
                                                                onClick={() => increaseQuantity(product._id)}
                                                                className="bg-gray-300 px-2 rounded-md"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Action Buttons */}
                                                <div className="flex justify-center w-1/6 h-full items-center">
                                                    <button
                                                        onClick={() => removeCartItem(product._id)}
                                                        className="text-sm w-full h-12 bg-red-600 text-white py-1 px-2 rounded-md font-semibold"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 flex items-center justify-center h-full text-3xl w-full">
                                        Your Cart is Empty
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Checkout Section */}
                    <div className="w-2/6 h-full border rounded-lg py-1 px-2">
                        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                        {cart.length > 0 ? (
                            <div className="flex flex-col gap-3 px-4">
                                <div className="flex justify-between">
                                    <span>Total Items:</span>
                                    <span>{cart.length}</span>
                                </div>
                                <div className="flex justify-between border-b">
                                    <span>Total Price:</span>
                                    <span>₹{calculateTotal()}</span>
                                </div>
                                <div className="flex justify-center">
                                    <NavLink to="/checkout">
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                                            Proceed to Checkout
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-xl">Add some products!</div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};


export default cart
