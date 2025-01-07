import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import AdminMenu from './adminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext';

const CreateCategory = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    // Fetch categories
    const getCategories = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://localhost:8080/api/v1/category/get-categories');
            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error('Error in displaying categories');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong while fetching categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    // Handle category creation
    const onSubmitLogin = async (data) => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/category/create-category', data, {
                headers: {
                    Authorization: auth.token,
                }
            });
            if (res?.data?.success) {
                toast.success(`${data.name} is created`);
                getCategories();
                reset(); // Reset the form
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong while creating category.');
        }
    };

    return (
        <Layout>
            <div className="px-4 py-3 h-full flex gap-2">
                {/* Left section */}
                <AdminMenu />

                {/* Right section */}
                <div className="w-5/6 border-2 py-2 px-4 box-border border-black flex flex-col gap-3">
                    {/* Add Category Form */}
                    <h1 className='text-4xl flex justify-center font-bold'>Manage Categories</h1>
                    <div>
                        <form className="flex  w-full gap-2 h-14" onSubmit={handleSubmit(onSubmitLogin)}>
                            <div className="flex items-start flex-col w-9/12 h-full">
                                <input
                                    type="text"
                                    className="text-center w-full h-10 border-2 border-black rounded-md"
                                    placeholder="Enter Category"
                                    {...register('name', { required: 'This field is required' })}
                                />
                                {errors.name && <div className="text-red-600 text-sm h-2">{errors.name.message}</div>}
                            </div>
                            <input
                                disabled={isSubmitting}
                                className="font-bold w-3/12 h-10 text-lg cursor-pointer bg-black text-white py-2 px-4 rounded disabled:opacity-50"
                                type="submit"
                                value={isSubmitting ? 'Adding...' : 'Add'}
                            />
                        </form>
                    </div>

                    {/* Categories Table */}
                    <div className="overflow-auto border border-gray-400 border-collapse">
                        {loading ? (
                            <div>Loading categories...</div>
                        ) : (
                            <table className="w-full border-collapse border border-gray-400">
                                <thead className='sticky top-0 bg-white'>
                                    <tr>
                                        <th className="border border-gray-400 p-2 text-center">Categories</th>
                                        <th className="border border-gray-400 p-2 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {categories.map((category) => (
                                        <tr key={category._id}>
                                            <td className="border border-gray-400 px-3 py-2">{category.name}</td>
                                            <td className="border border-gray-400 px-3 py-2 flex justify-around">
                                                <button className="text-blue-500 hover:underline">Edit</button>
                                                <button className="text-red-500 hover:underline ml-4">Delete</button>
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

export default CreateCategory;
