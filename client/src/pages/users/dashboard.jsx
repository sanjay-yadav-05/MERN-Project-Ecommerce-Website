import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/layout';
import { useAuth } from '../../context/authContext';
import UserMenu from './userMenu';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
    const { auth, setAuth } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const openModal = () => {
        // Reset form with current user data when opening the modal
        reset({
            name: auth?.user?.name || '',
            email: auth?.user?.email || '',
            phone: auth?.user?.phone || '',
            address: auth?.user?.address || '',
        });
        setIsModalOpen(true);
    };

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/update-profile/${auth?.user._id}`, data);
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
    };

    return (
        <Layout>
            <div className="px-4 py-3 h-full flex gap-4">
                {/* Left Section */}
                <UserMenu />

                {/* Right Section */}
                <div className="w-4/5 border-2 border-gray-300 rounded-lg shadow-lg bg-white flex items-center justify-center">
                    <div className="w-full h-full  rounded-lg flex flex-col gap-4 p-6">
                        {/* Header */}
                        <div className="h-[14%] bg-black text-white w-full px-3 text-3xl flex items-center rounded-lg">
                            Profile Details
                        </div>

                        {/* Profile Information */}
                        <div className="h-[86%] w-full flex flex-col gap-4 px-3 text-xl">
                            <div className="gap-2 flex">
                                <span>Name:</span>
                                <span>{auth?.user?.name}</span>
                            </div>
                            <div className="gap-2 flex">
                                <span>Email:</span>
                                <span>{auth?.user?.email}</span>
                            </div>
                            <div className="gap-2 flex">
                                <span>Phone Number:</span>
                                <span>{auth?.user?.phone}</span>
                            </div>
                            <div className="gap-2 flex">
                                <span>Address:</span>
                                <span className="whitespace-pre-wrap">{auth?.user?.address}</span>
                            </div>
                            <button
                                className="bg-black text-white w-20 text-center text-lg rounded-lg px-4 py-1"
                                onClick={openModal}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-1/3 p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'Invalid phone number',
                                        },
                                    })}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Address</label>
                                <textarea
                                    {...register('address', { required: 'Address is required' })}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                ></textarea>
                                {errors.address && (
                                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
