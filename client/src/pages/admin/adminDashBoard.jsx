import React from 'react'
import Layout from '../../components/layout'
import { NavLink } from 'react-router-dom'
import AdminMenu from './adminMenu'
import { useAuth } from '../../context/authContext'
const dashboard = () => {
    const { auth } = useAuth()
    return (
        <Layout>
            <div className='px-4 py-3 h-full flex gap-4'>
                {/* left section */}
                <AdminMenu />
                {/* right section */}
                <div className='w-4/5 border-2 border-gray-300 rounded-lg bg-white flex items-center justify-center h-full'>
                    <div className='w-full h-full px-3 py-2 items-start  flex flex-col gap-3 box-border'>
                        <div className='h-[14%] bg-black text-white w-full px-3 text-3xl flex justify-start border  items-center rounded-lg'>
                        Profile Details
                        </div>
                        <div className='h-[86%] w-full flex flex-col gap-2 px-3 text-xl'>
                            {/* <div className='gap-2 flex'>
                                <span>User:</span>
                                <span>{auth?.user?.role == 1 ? 'Admin' : 'Customer'}</span>
                            </div> */}
                            <div className='gap-2 flex'>
                                <span>Name:</span>
                                <span>{auth?.user?.name}</span>
                            </div>
                            <div className='gap-2 flex'>
                                <span>Email:</span>
                                <span>{auth?.user?.email}</span>
                            </div>
                            <div className='gap-2 flex'>
                                <span>Phone Number:</span>
                                <span>{auth?.user?.phone}</span>
                            </div>
                            <div className='gap-2 flex '>
                                <span>Address:</span>
                                <span className='text-wrap h-auto'>{auth?.user?.address}</span>
                            </div>
                            <button className='bg-black text-white w-20 text-center text-lg rounded-lg px-4 py-1'>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default dashboard

