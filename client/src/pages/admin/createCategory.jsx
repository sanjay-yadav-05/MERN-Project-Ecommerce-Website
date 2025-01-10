import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import AdminMenu from './adminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/authContext';

const CreateCategory = () => {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState(null); // Stores the category being edited
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(null);

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
    const handleAddCategory = async (data) => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/category/create-category', data, {
                headers: { Authorization: auth.token },
            });
            if (res?.data?.success) {
                toast.success(`${data.name} is created`);
                getCategories();
                reset();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong while creating category.');
        }
    };

    // Handle category update
    const handleEditCategory = async (data) => {
        try {
            const res = await axios.put(`http://localhost:8080/api/v1/category/update-category/${editCategory._id}`, data, {
                headers: { Authorization: auth.token },
            });
            if (res?.data?.success) {
                toast.success(`${data.name} is updated`);
                getCategories();
                closeModal();
                reset();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong while updating category.');
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${deleteCategory._id}`, {
                headers: { Authorization: auth.token },
            });
            if (res?.data?.success) {
                toast.success(`${deleteCategory.name} has been deleted`);
                getCategories();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong while deleting category.');
        } finally {
            closeDeleteModal();
        }
    };


    // Open modal for editing
    const openModal = (category) => {
        setEditCategory(category);
        setValue('name', category.name); // Pre-fill the form with the category's name
        setIsModalOpen(true);
    };

    const closeModal = () => {
        reset();
        setEditCategory(null);
        setIsModalOpen(false);
    };

    const openDeleteModal = (category) => {
        setDeleteCategory(category);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteCategory(null);
        setIsDeleteModalOpen(false);
    };


    return (
        <Layout>
            <div className="px-4 py-3 h-full flex gap-2">
                {/* Left section */}
                <AdminMenu />

                {/* Right section */}
                <div className="w-5/6 border-2 p-4 box-border border-black flex flex-col gap-3">
                    <h1 className="text-4xl flex justify-center font-bold">Manage Categories</h1>

                    {/* Add Category Form */}
                    <div>
                        <form className="flex w-full gap-2 h-14" onSubmit={handleSubmit(handleAddCategory)}>
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
                    <div className="overflow-auto border-2 border-gray-800 border-collapse">
                        {loading ? (
                            <div>Loading categories...</div>
                        ) : (
                            <table className="w-full border-collapse border border-gray-800 ">
                                <thead className="sticky top-0 bg-white w-full">
                                    <tr>
                                        <th className="border border-gray-800 p-2 text-center w-2/3">Categories</th>
                                        <th className="border border-gray-800 p-2 text-center w-1/3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='w-full '>
                                    {categories.map((category) => (
                                        <tr key={category._id} className='w-full'>
                                            <td className="border  border-gray-800 px-3 py-2 w-2/3">{category.name}</td>
                                            <td className="border  border-gray-800 px-3 py-2 flex justify-around w-full">
                                                <button
                                                    onClick={() => openModal(category)}
                                                    className="text-blue-500 hover:font-bold w-full"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(category)}
                                                    className="text-red-500 hover:font-bold w-full">Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Edit Category Modal */}
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
                                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleEditCategory)}>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-full h-10 border-2 border-black rounded-md text-center"
                                            placeholder="Edit Category"
                                            {...register('name', { required: 'This field is required' })}
                                        />
                                        {errors.name && (
                                            <div className="text-red-600 text-sm mt-1">{errors.name.message}</div>
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
                    {isDeleteModalOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
                                {/* Close Button */}
                                <button
                                    onClick={closeDeleteModal}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                                >
                                    &times;
                                </button>

                                {/* Confirmation Message */}
                                <div className="text-center">
                                    <h2 className="text-xl font-bold mb-4">Delete Category</h2>
                                    <p>Are you sure you want to delete <span className="font-bold">{deleteCategory?.name}</span>?</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center gap-4 mt-6">
                                    <button
                                        onClick={handleDeleteCategory}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={closeDeleteModal}
                                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
