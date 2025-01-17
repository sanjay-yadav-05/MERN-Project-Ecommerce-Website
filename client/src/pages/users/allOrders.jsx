import React from 'react';
import Layout from '../../components/layout';
import UserMenu from './userMenu';

const AllOrders = () => {
    return (
        <Layout>
            <div className="px-4 py-3 h-full flex gap-4">
                {/* Left Section */}
                <UserMenu />

                {/* Right Section */}
                <div className="w-4/5 border-2 border-gray-300 rounded-lg shadow-lg bg-white p-4">
                    <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
                    <div className="text-gray-600">
                        {/* Placeholder for all orders information */}
                        <p className="text-center text-lg">No orders to display currently.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AllOrders;
