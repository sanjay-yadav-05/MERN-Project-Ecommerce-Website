import React,{useState} from 'react';
import Layout from '../../components/layout';
import UserMenu from './userMenu';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
    const { cart, setCart } = useCart();
    const { auth,setAuth } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm();
    // const [editAddress, setEditAddress] = useState(null); // Stores the category being edited



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


    const changeAddress = async(data)=>{
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/update-address/${auth.user._id}`,data);
            console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                const updatedAuth = { ...auth, user: res.data.user };
                setAuth(updatedAuth);
                localStorage.setItem('auth', JSON.stringify(updatedAuth));
                setIsModalOpen(false);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred');
            } else if (error.request) {
                toast.error('No response from server. Please try again later.');
            } else {
                toast.error('Something went wrong');
            }
        }
    }

    // Open modal for editing
    const openModal = () => {
        // setEditAddress(auth?.user?.address);
        setValue('address', auth?.user?.address); 
        setIsModalOpen(true);
    };

    const closeModal = () => {
        reset();
        // setEditAddress(null);
        setIsModalOpen(false);
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
                                <div className='flex flex-col justify-center'>
                                    <div className='flex gap-1'>
                                        <span>Address:</span>
                                        <span>{auth?.user.address}</span>
                                    </div>
                                    <button onClick={openModal} className='text-blue-400 w-auto'>change</button>
                                </div>
                                <div className=" flex justify-center">
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
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 hover:font-bold text-gray-500 hover:text-black"
                                >
                                    &times;
                                </button>
                                {/* Edit Form */}
                                <form className="flex flex-col gap-4" onSubmit={handleSubmit(changeAddress)}>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-full h-10 border-2 px-1 border-black rounded-md text-center"
                                            placeholder="Edit Address"
                                            {...register('address', { required: 'This field is required' })}
                                        />
                                        {errors.address && (
                                            <div className="text-red-600 text-sm mt-1">{errors.address.message}</div>
                                        )}
                                    </div>
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Updating...' : 'Update'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
