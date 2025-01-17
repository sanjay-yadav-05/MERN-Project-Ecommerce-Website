import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';

const UserMenu = () => {
    const { auth } = useAuth();
    const { cart } = useCart();

    const navLinkStyles = ({ isActive }) =>
        isActive
            ? 'bg-black text-white py-2 w-full text-center rounded-lg'
            : 'bg-gray-200 text-black py-2 w-full text-center rounded-lg hover:bg-gray-400  transition duration-200';

    return (
        <div className="w-1/5 bg-white flex flex-col gap-4 py-6 px-4 items-center justify-start h-auto border-2 border-gray-300 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold text-center mb-4">
                {auth?.user?.name}
            </div>
            <div className="flex flex-col gap-3 w-full ">
                <NavLink className={navLinkStyles} to="/dashboard/user/profile">
                    Profile
                </NavLink>
                <NavLink className={navLinkStyles} to="/dashboard/user/all-orders">
                    All Orders
                </NavLink>
                <NavLink className={navLinkStyles} to="/dashboard/user/cart">
                    Cart ({cart.length})
                </NavLink>
            </div>
        </div>
    );
};

export default UserMenu;
