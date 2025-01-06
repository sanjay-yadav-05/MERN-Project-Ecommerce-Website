import React from 'react'
import { NavLink } from 'react-router-dom'

const adminMenu = () => {
    const navLinkStyles = ({ isActive }) =>
    isActive ? 'border-y-2 py-2 w-full text-center border-black bg-black text-white' : 'border-y-2 py-2 w-full text-center border-black';
    return (
        <div className='w-1/6 flex flex-col gap-3 py-2 items-center justify-start h-auto border-2 border-black'>
            <NavLink to="/dashboard/admin" className='text-xl font-bold'>
                Admin Dashboard
            </NavLink>
            <div className='flex flex-col gap-2  w-full items-center'>
                <NavLink className={navLinkStyles} to="/dashboard/admin/create-category">Create-category</NavLink>
                <NavLink className={navLinkStyles} to="/dashboard/admin/create-product">Create-product</NavLink>
                <NavLink className={navLinkStyles} to="/dashboard/admin/all-users">All-users</NavLink>
            </div>
        </div>
    )
}

export default adminMenu
