



// import React, { useEffect, useState } from 'react';
// import Layout from '../../components/layout';
// import axios from 'axios';
// import { useAuth } from '../../context/authContext';
// import AdminMenu from './adminMenu';

// const AllUsersInfo = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { auth } = useAuth();
//     const [error, setError] = useState(null);

//     // Fetch orders from the server
//     const fetchOrders = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(
//                 `http://localhost:8080/api/v1/order/fetch-all-orders`
//             );
//             setOrders(data.orders || []); // Fallback to an empty array if `orders` is null
//         } catch (err) {
//             console.error('Error fetching orders:', err);
//             setError('Failed to fetch orders. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle order status update
//     const updateOrderStatus = async (orderId, newStatus) => {
//         try {
//             const { data } = await axios.put(
//                 `http://localhost:8080/api/v1/order/update-order-status/${orderId}`,
//                 { status: newStatus }
//             );
//             // Update the orders state with the new status
//             setOrders((prevOrders) =>
//                 prevOrders.map((order) =>
//                     order._id === orderId ? { ...order, status: newStatus } : order
//                 )
//             );
//         } catch (err) {
//             console.error('Error updating order status:', err);
//             setError('Failed to update order status. Please try again later.');
//         }
//     };

//     useEffect(() => {
//         if (auth?.user?._id && auth?.user?.role === 1) fetchOrders();
//     }, [auth?.user?._id]);

//     return (
//         <Layout>
//             <div className='px-4 py-3 h-full flex gap-4'>
//                 {/* Left section */}
//                 <AdminMenu />
//                 {/* Right section */}
//                 <div className="w-4/5 border-2 h-full border-gray-300 rounded-lg shadow-lg bg-white p-4">
//                     <h2 className="text-2xl font-semibold h-[10%]">All Orders</h2>
//                     {loading ? (
//                         <p className="text-center text-lg text-gray-600">Loading orders...</p>
//                     ) : error ? (
//                         <p className="text-center text-lg text-red-600">{error}</p>
//                     ) : orders.length > 0 ? (
//                         <div className="space-y-4 h-[90%] w-full overflow-auto">
//                             {orders.map((order) => (
//                                 <div
//                                     key={order._id}
//                                     className="border border-gray-200 rounded-lg p-4 shadow-sm flex gap-1"
//                                 >
//                                     <h3 className="font-medium text-lg">Order ID: {order._id}</h3>
//                                     {/* <h3 className="font-medium text-lg">Status: {order.status}</h3> */}
//                                     <h3 className="font-medium text-lg">Payment ID: {order.payment.razorpay_order_id}</h3>
//                                     <h3 className="font-medium text-lg">Payment Receipt: {order.payment.razorpay_receipt}</h3>
                                    
//                                     {/* Status Update Dropdown */}
//                                     <div className="mt-1">
//                                         <select
//                                             value={order.status}
//                                             onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                                             className="px-4 py-2 border border-gray-300 rounded-lg"
//                                         >
//                                             <option value="pending">Pending</option>
//                                             <option value="processing">Processing</option>
//                                             <option value="shipped">Shipped</option>
//                                             <option value="delivered">Delivered</option>
//                                             <option value="cancelled">Cancelled</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="text-center text-lg text-gray-600">No orders to display currently.</p>
//                     )}
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default AllUsersInfo;




import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import AdminMenu from './adminMenu';

const AllUsersInfo = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth();
    const [error, setError] = useState(null);

    // Fetch orders from the server
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/order/fetch-all-orders`
            );
            setOrders(data.orders || []); // Fallback to an empty array if `orders` is null
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to fetch orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Handle order status update
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const { data } = await axios.put(
                `http://localhost:8080/api/v1/order/update-order-status/${orderId}`,
                { status: newStatus }
            );
            // Update the orders state with the new status
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            console.error('Error updating order status:', err);
            setError('Failed to update order status. Please try again later.');
        }
    };

    useEffect(() => {
        if (auth?.user?._id && auth?.user?.role === 1) fetchOrders();
    }, [auth?.user?._id]);

    return (
        <Layout>
            <div className='px-4 py-3 h-full flex gap-4'>
                {/* Left section */}
                <AdminMenu />
                {/* Right section */}
                <div className="w-4/5 border-2 h-full border-gray-300 rounded-lg shadow-lg bg-white px-4 py-3 relative">
                    <h2 className="text-2xl font-semibold  h-[10%] ">All Orders</h2>
                    {loading ? (
                        <p className="text-center text-lg text-gray-600">Loading orders...</p>
                    ) : error ? (
                        <p className="text-center text-lg text-red-600">{error}</p>
                    ) : orders.length > 0 ? (
                        <div className="h-[90%] w-full overflow-auto relative">
                            <table className="w-full border-collapse border border-gray-300 text-left  h-full relative">
                                <thead className='sticky top-0'>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2">Order ID</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Status</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Payment ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Payment Receipt</th>
                                        <th className="border border-gray-300 px-4 py-2">Update Status</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                                            {/* <td className="border border-gray-300 px-4 py-2">{order.status}</td> */}
                                            <td className="border border-gray-300 px-4 py-2">{order.payment.razorpay_order_id}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.payment.razorpay_receipt}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    className="px-2 py-1 border border-gray-300 rounded"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-lg text-gray-600">No orders to display currently.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AllUsersInfo;
