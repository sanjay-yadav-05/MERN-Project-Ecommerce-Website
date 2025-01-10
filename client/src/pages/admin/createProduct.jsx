import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import AdminMenu from './adminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext';

const CreateProduct = () => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const { auth } = useAuth();
    const [photo, setphoto] = useState(null);

    // Fetch all products
    const getProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/get-products');
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error('Error fetching products');
            }
        } catch (error) {
            handleError(error);
        }
    };

    // Fetch all categories
    const getCategories = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:8080/api/v1/category/get-categories');
            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error('Error fetching categories');
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle API errors
    const handleError = (error) => {
        if (error.response) {
            toast.error(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            toast.error('No response from server. Please try again later.');
        } else {
            toast.error('Something went wrong');
        }
        console.error(error.message);
    };

    // Handle add product form submission
    const handleAddProduct = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'image') {
                    console.log(photo)
                    formData.append("image", photo); // Use the selected file
                } else if (Array.isArray(value)) {
                    value.forEach((item) => formData.append(key, item)); // Handle array fields
                } else {
                    formData.append(key, value); // Append other fields
                }
            });

            const res = await axios.post('http://localhost:8080/api/v1/product/create-product', formData, {
                headers: {
                    Authorization: auth.token, // Authorization header
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res?.data?.success) {
                toast.success(`${data.name} created successfully`);
                getProducts(); // Refresh the product list
                reset(); // Reset the form fields
                setphoto(null); // Clear the photo preview
                closeAddForm(); // Close the modal
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            handleError(error); // Custom error handler
        }
    };


    // Open the add product modal
    const openAddForm = () => setIsAddProductModalOpen(true);

    // Close the add product modal
    const closeAddForm = () => {
        reset();
        setphoto(null);
        setIsAddProductModalOpen(false);
    };

    // Use effect to fetch products and categories on load
    useEffect(() => {
        getProducts();
        getCategories();
    }, []);





    const handleFilePreview = (event) => {
        const file = event.target.files[0];
        setphoto(file); // Update the photo state for preview
    };


    return (
        <Layout>
            <div className='px-4 py-3 h-full flex gap-2'>
                {/* Left section */}
                <AdminMenu />
                {/* Right section */}
                <div className='w-5/6 border-2 p-4 box-border border-black flex flex-col gap-3'>
                    <h1 className="text-4xl flex justify-center font-bold">Manage Products</h1>
                    <div><button className='bg-black text-white px-4 py-2 rounded-lg' onClick={openAddForm}>Add Product</button></div>

                    {isAddProductModalOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
                                {/* Close Button */}
                                <button
                                    onClick={closeAddForm}
                                    className="absolute top-2 right-2 hover:font-bold text-gray-500 hover:text-black"
                                >
                                    &times;
                                </button>

                                {/* Add Product Form */}
                                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleAddProduct)}>
                                    {/* Product Name */}
                                    <div>
                                        <input
                                            type="text"
                                            className="w-full h-10 border-2 border-black rounded-md text-center"
                                            placeholder="Product Name"
                                            {...register('name', { required: 'Product name is required' })}
                                        />
                                        {errors.name && (
                                            <div className="text-red-600 text-sm mt-1">{errors.name.message}</div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <textarea
                                            className="w-full h-20 border-2 border-black rounded-md text-center"
                                            placeholder="Description"
                                            {...register('description', { required: 'Description is required' })}
                                        />
                                        {errors.description && (
                                            <div className="text-red-600 text-sm mt-1">{errors.description.message}</div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <input
                                            type="number"
                                            className="w-full h-10 border-2 border-black rounded-md text-center"
                                            placeholder="Price"
                                            {...register('price', {
                                                required: 'Price is required',
                                                valueAsNumber: true,
                                                min: { value: 0, message: 'Price must be a positive number' },
                                            })}
                                        />
                                        {errors.price && (
                                            <div className="text-red-600 text-sm mt-1">{errors.price.message}</div>
                                        )}
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <input
                                            type="number"
                                            className="w-full h-10 border-2 border-black rounded-md text-center"
                                            placeholder="Quantity"
                                            {...register('quantity', {
                                                required: 'Quantity is required',
                                                valueAsNumber: true,
                                                min: { value: 0, message: 'Quantity must be a positive number' },
                                            })}
                                        />
                                        {errors.quantity && (
                                            <div className="text-red-600 text-sm mt-1">{errors.quantity.message}</div>
                                        )}
                                    </div>

                                    {/* Image */}
                                    <div>
                                        <input
                                            type="file"
                                            className="w-full h-10 border-2 border-black rounded-md"
                                            accept="image/*"
                                            {...register('image', { required: 'Image is required' })}
                                            onChange={(e) => {
                                                handleFilePreview(e); // Update photo state for preview
                                            }}
                                        />
                                        {photo && (
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="Product Preview"
                                                className="w-20 h-20 object-cover mt-2"
                                            />
                                        )}
                                        {errors.image && (
                                            <div className="text-red-600 text-sm mt-1">{errors.image.message}</div>
                                        )}
                                    </div>
                                    

                                    {/* Categories */}
                                    <div>
                                        <select
                                            className="w-full h-10 border-2 border-black rounded-md"
                                            {...register('category', { required: 'Category is required' })}
                                        >
                                            {categories.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <div className="text-red-600 text-sm mt-1">{errors.category.message}</div>
                                        )}
                                    </div>

                                    {/* Shipping */}
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" {...register('shipping')} />
                                        <label>Shipping Available</label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Adding...' : 'Add Product'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Product Table */}
                    <div className="overflow-auto border-2 border-gray-300 border-collapse">
                        {loading ? (
                            <div>Loading categories...</div>
                        ) : (
                            <table className="w-full border-collapse border h-full border-gray-800">
                                <thead className="sticky top-0 bg-white w-full">
                                    <tr>
                                        <th  className="border border-gray-800 p-2 text-center w-1/4">Products</th>
                                        <th  className="border border-gray-800 p-2 text-center w-2/4">Description</th>
                                        <th  className="border border-gray-800 p-2 text-center w-1/4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id} className='border h-full border-gray-800 items-center justify-center'>
                                            <td className=" text-wrap px-3 py-2 w-1/4">{product.name}</td>
                                            <td className=" text-wrap border-x px-3 py-2 w-2/4">{product.description}</td>
                                            <td className="px-3 py-2 flex h-full items-center justify-center w-full">
                                                <button
                                                    onClick={() => openModal(product)}
                                                    className="text-blue-500 hover:font-bold w-full"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(product)}
                                                    className="text-red-500 hover:font-bold w-full"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;