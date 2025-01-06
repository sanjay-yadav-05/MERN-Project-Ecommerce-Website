import React from 'react'
import Layout from '../../components/layout'
import UserMenu from './userMenu'
import { useAuth } from '../../context/authContext'
const dashboard = () => {
    const {auth} = useAuth();
    return (
        <Layout>
            <div className='px-4 py-3 h-full flex gap-2'>
                {/* left section */}
                <UserMenu />
                {/* right section */}
                <div className='w-5/6 border-2 border-black flex items-center justify-center h-full  text-2xl'>
                    <div className='w-3/5 h-1/2 border-2 border-black flex flex-col gap-2 box-border'>

                    <div className=' h-1/4 w-full flex justify-center bg-black text-white items-center rounded-b-[25%]'>
                        Hey wekcom back to your work
                    </div>
                    <div className='h-3/4 w-11/12 mx-auto'>
                    
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
                    
                    </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default dashboard
