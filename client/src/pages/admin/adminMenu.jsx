// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const adminMenu = () => {
//     const navLinkStyles = ({ isActive }) =>
//     isActive ? 'border-y-2 py-2 w-full text-center border-black bg-black text-white' : 'border-y-2 py-2 w-full text-center border-black';
//     return (
//         <div className='w-1/6 flex flex-col gap-3 py-2 items-center justify-start h-auto border-2 border-black'>
//             <NavLink to="/dashboard/admin" className='text-xl text-center font-bold'>
//                 Admin Dashboard
//             </NavLink>
//             <div className='flex flex-col gap-2  w-full items-center'>
//                 <NavLink className={navLinkStyles} to="/dashboard/admin/create-category">Manage-category</NavLink>
//                 <NavLink className={navLinkStyles} to="/dashboard/admin/create-product">Manage-product</NavLink>
//                 <NavLink className={navLinkStyles} to="/dashboard/admin/all-users">All-users</NavLink>
//             </div>
//         </div>
//     )
// }

// export default adminMenu


import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    const navLinkStyles = ({ isActive }) =>
        isActive
            ? 'bg-black text-white py-2 w-full text-center rounded-lg'
            : 'bg-gray-200 text-black py-2 w-full text-center rounded-lg hover:bg-gray-400 transition duration-200';

    return (
        <div className="w-1/5 bg-white flex flex-col gap-4 py-6 px-4 items-center justify-start h-auto border-2 border-gray-300 rounded-lg shadow-lg">
            <NavLink to="/dashboard/admin" className="text-2xl font-semibold text-center mb-4">
                Admin Dashboard
            </NavLink>
            <div className="flex flex-col gap-3 w-full">
                <NavLink className={navLinkStyles} to="/dashboard/admin/create-category">
                    Manage Category
                </NavLink>
                <NavLink className={navLinkStyles} to="/dashboard/admin/create-product">
                    Manage Product
                </NavLink>
                <NavLink className={navLinkStyles} to="/dashboard/admin/all-users">
                    All Users
                </NavLink>
            </div>
        </div>
    );
};

export default AdminMenu;
