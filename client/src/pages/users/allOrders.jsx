// import React, { useEffect, useState } from 'react';
// import Layout from '../../components/layout';
// import UserMenu from './userMenu';
// import axios from 'axios';
// import { useAuth } from '../../context/authContext';

// const AllOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { auth } = useAuth();
//     const [error, setError] = useState(null);

//     // Fetch orders from the server
//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 setLoading(true);
//                 const { data } = await axios.get(
//                     `http://localhost:8080/api/v1/auth/fetch-order/${auth?.user?._id}`
//                 );
//                 // console.log(data);
//                 // console.log(data.orders);

//                 // setOrders(await JSON.parse(data.orders) || []); // Fallback to an empty array if `orders` is null
//                 setOrders(data.fetchorder || []); // Fallback to an empty array if `orders` is null
//                 // console.log(orders);
//             } catch (err) {
//                 console.error('Error fetching orders:', err);
//                 setError('Failed to fetch orders. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (auth?.user?._id) fetchOrders();
//     }, [auth?.user?._id]);

//     return (
//         <Layout>
//             <div className="px-4 py-3 h-full flex gap-4">
//                 {/* Left Section */}
//                 <UserMenu />

//                 {/* Right Section */}
//                 <div className="w-4/5 border-2 h-full  border-gray-300 rounded-lg shadow-lg bg-white p-4">
//                     <h2 className="text-2xl font-semibold h-[10%]">All Orders</h2>
//                     {loading ? (
//                         <p className="text-center text-lg text-gray-600">Loading orders...</p>
//                     ) : error ? (
//                         <p className="text-center text-lg text-red-600">{error}</p>
//                     ) : orders.length > 0 ? (
//                         <div className="space-y-4 h-[90%] w-full overflow-auto">
//                             {orders
//                                 // .filter((order) => order && order._id) // Filter out invalid entries
//                                 .map((order) => (
//                                     <div
//                                         key={order._id}
//                                         className="border border-gray-200 rounded-lg p-4 shadow-sm"
//                                     >
//                                         <h3 className="font-medium text-lg">Order ID: {order._id}</h3>
//                                         <h3 className="font-medium text-lg">Status :{order.status}</h3>
//                                         <h3 className="font-medium text-lg">Payment ID : {order.razorpay_order_id}</h3>
//                                         <div>

//                                             {
//                                                 order.products.map((item) => (
//                                                 <div key={item._id} className="flex gap-2 items-center">
//                                                     <p className="text-lg font-medium">{item.name}</p>
//                                                     <p className="text-lg font-medium">Quantity: {item.quantity}</p>
//                                                     <p className="text-lg font-medium">Price: {item.price}</p>
//                                                     </div>
//                                         )
//                                         )
                                
//                             }
//                                     </div>
//                         </div>
//                     ))}
//                 </div>
//                 ) : (
//                 <p className="text-center text-lg text-gray-600">
//                     No orders to display currently.
//                 </p>
//                     )}
//             </div>
//         </div>
//         </Layout >
//     );
// };

// export default AllOrders;









// import React, { useEffect, useState } from 'react';
// import Layout from '../../components/layout';
// import UserMenu from './userMenu';
// import axios from 'axios';
// import { useAuth } from '../../context/authContext';

// const AllOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { auth } = useAuth();
//     const [error, setError] = useState(null);

//     // Fetch orders from the server
//     const fetchOrders = async () => {
//         try {
//             setLoading(true);
//             const { data } = await axios.get(
//                 `http://localhost:8080/api/v1/auth/fetch-order/${auth?.user?._id}`
//             );
//             setOrders(data.fetchorder || []); // Fallback to an empty array if `fetchorder` is null
//         } catch (err) {
//             console.error('Error fetching orders:', err);
//             setError('Failed to fetch orders. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (auth?.user?._id) fetchOrders();
//     }, [auth?.user?._id]);

//     return (
//         <Layout>
//             <div className="px-4 py-3 h-full flex gap-4">
//                 {/* Left Section */}
//                 <UserMenu />

//                 {/* Right Section */}
//                 <div className="w-4/5 border-2 h-full border-gray-300 rounded-lg shadow-lg bg-white p-4">
//                     <h2 className="text-2xl font-semibold h-[10%]">All Orders</h2>
//                     {loading ? (
//                         <p className="text-center text-lg text-gray-600">Loading orders...</p>
//                     ) : error ? (
//                         <p className="text-center text-lg text-red-600">{error}</p>
//                     ) : orders.length > 0 ? (
//                         <div className="space-y-4 h-[90%] w-full overflow-auto">
//                             {orders.map((order) => (
//                                 <div key={order._id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
//                                     <h3 className="font-medium text-lg">Order ID: {order._id}</h3>
//                                     <h3 className="font-medium text-lg">Status: {order.status}</h3>
//                                     <h3 className="font-medium text-lg">Payment ID: {order.razorpay_order_id}</h3>
//                                     <div>
//                                         {order.products?.map((item) => (
//                                             <div key={item._id} className="flex gap-2 items-center">
//                                                 <p className="text-lg font-medium">{item.name}</p>
//                                                 <p className="text-lg font-medium">Quantity: {item.quantity}</p>
//                                                 {/* <p className="text-lg font-medium">Price: {item.price}</p> */}
//                                             </div>
//                                         ))}
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

// export default AllOrders;



import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import UserMenu from './userMenu';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth();
    const [error, setError] = useState(null);

    // Fetch orders from the server
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/auth/fetch-order/${auth?.user?._id}`
            );
            setOrders(data.fetchorder || []); // Fallback to an empty array if `fetchorder` is null
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to fetch orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.user?._id) fetchOrders();
    }, [auth?.user?._id]);

    return (
        <Layout>
            <div className="px-4 py-3 flex gap-4 h-full">
                {/* Left Section */}
                <UserMenu />

                {/* Right Section */}
                <div className="w-4/5 bg-white border-2 rounded-lg border-gray-300 shadow-lg px-4 py-3 h-full">
                    <h2 className="text-3xl font-semibold mb-6">All Orders</h2>
                    {loading ? (
                        <p className="text-center text-lg text-gray-500">Loading orders...</p>
                    ) : error ? (
                        <p className="text-center text-lg text-red-500">{error}</p>
                    ) : orders.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
                                >
                                    <h3 className="font-bold text-lg mb-2 text-gray-800">
                                        Order ID: <span className="text-gray-600">{order._id}</span>
                                    </h3>
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Status: <span className="text-gray-600">{order.status}</span>
                                    </p>
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Payment ID: <span className="text-gray-600">{order.razorpay_order_id}</span>
                                    </p>
                                    <div className="mt-4 overflow-auto h-44">
                                        <h4 className="text-gray-700 font-semibold mb-2">Products:</h4>
                                        <div className="space-y-2">
                                            {order.products?.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="flex justify-between items-center bg-white p-2 rounded shadow-sm border"
                                                >
                                                    <p className="text-gray-800">{item.name}</p>
                                                    <p className="text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg text-gray-500">No orders to display currently.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AllOrders;
