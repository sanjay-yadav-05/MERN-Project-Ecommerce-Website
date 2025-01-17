import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const {auth , setAuth} = useAuth();

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    const getSimilarProducts = async (categoryId, productId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/product/similar-product/${categoryId}?exclude=${productId}`
            );
            setSimilarProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching similar products:', error);
        }
    };

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
            const productData = response.data.product;
            setProduct(productData);

            // Fetch similar products, excluding the current product
            getSimilarProducts(productData.category._id, productData._id);
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        if(auth?.user != null){

            // Check if the product is already in the cart
            const isProductInCart = cart.some(item => item._id === product._id);
            
            if (isProductInCart) {
                toast.error("This product is already in your cart.");
            } else {
                // Add product to cart with only required fields
                const { _id, name, description, price, quantity } = product;
                setCart([...cart, { _id, name, description, price, quantity:1 }]);
                toast.success(`${product.name} is added to cart`);
                localStorage.setItem("cart", JSON.stringify([...cart, { _id, name, description, price, quantity:1 }]))
                // localStorage.setItem("cart", JSON.stringify([...cart, product]))
                
            }
        }else{
            toast.error("Please login to add product to cart");
        }
    };

    return (
        <Layout>
            <div className="w-full h-auto min-h[100%] px-8 py-5 container flex gap-2 bg-gray-300">
                <div className="w-4/6 h-full px-4">
                    {loading ? (
                        <p className="text-center text-gray-600 text-lg">Loading...</p>
                    ) : product ? (
                        <div className="bg-white w-full h-full flex-col items-center shadow-lg rounded-lg px-6 justify-evenly py-2 flex">
                            <h1 className="text-4xl h-[6vh] font-serif text-center flex items-end font-semibold text-gray-800">Product Details</h1>
                            <div className='w-full flex h-[65vh]  items-center gap-3'>
                                <div className="w-1/2   h-5/6  rounded-xl flex items-center overflow-hidden">
                                    <img
                                        src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                                        alt="Product Image"
                                        className="w-full   object-contain rounded-lg"
                                    />
                                </div>
                                <div className="flex w-1/2  flex-col gap-16 justify-between">
                                    <div className='flex w-full h-1/2 flex-col justify-center gap-1'>
                                        <p className="text-gray-800 font-semibold font-serif text-3xl">{product.name}</p>
                                        <p className="text-gray-600 text-lg">{product.description}</p>
                                        <p className="text-gray-500 text-md">
                                            Category: <span className="text-gray-800 font-medium">{product.category.name}</span>
                                        </p>
                                        <p>{product.shipping == true ? "Delivery Available" : "Pick from Store"}</p>
                                    </div>

                                    <div className='flex w-full flex-col gap-1 justify-end h-1/2 '>
                                        <div className='flex justify-between w-full'>
                                            <div className="text-2xl font-semibold text-green-600">Price: ${product.price}</div>
                                            <div className="text-gray-500 text-lg">
                                                Quantity Available: <span className="text-gray-800 font-medium">{product.quantity}</span>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center gap-4'>

                                            <button className="mt-2 w-1/2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">
                                                Book Now
                                            </button>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                // onClick={() => {
                                                //     const { _id, name, description, price, quantity } = product; // Destructure only the required fields
                                                //     setCart([...cart, { _id, name, description, price, quantity }]);
                                                //     localStorage.setItem("cart", JSON.stringify([...cart, product]))
                                                //     toast.success(`${product.name} is added to cart`);
                                                // }}
                                                className="mt-2 w-1/2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition" >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-lg">Product not found.</p>
                    )}
                </div>
                <div className="w-2/6 border h-full overflow-auto flex flex-col rounded-lg bg-white pb-2 px-2">
                    <div className="text-xl font-semibold py-2.5 sticky top-0 bg-white">Similar Products</div>
                    {similarProducts.length > 0 ? (
                        similarProducts.map((product) => (
                            <div key={product._id} className="w-full mb-2 p-2 border justify-between rounded-lg flex items-center gap-4">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h2 className="text-md font-medium">{product.name}</h2>
                                        <p className="text-gray-600 text-sm">Price: ${product.price}</p>
                                    </div>
                                </div>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                    onClick={() => navigate(`/product/${product.slug}`)}
                                >
                                    Details
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 text-lg">No similar products found.</p>
                    )}
                </div>
            </div>
        </Layout >
    );
};

export default ProductDetails;
