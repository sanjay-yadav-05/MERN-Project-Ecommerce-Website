import React from 'react'
import Layout from '../../components/layout'
import AdminMenu from './adminMenu'

const allUsersInfo = () => {
    return (
        <Layout>
             <div className='px-4 py-3 h-full flex gap-4'>
                {/* left section */}
               <AdminMenu/>
                {/* right section */}
                <div className='w-4/5 border-2 border-gray-300 rounded-lg bg-white'>
                    allUsersInfo
                </div>
            </div>
        </Layout>
    )
}

export default allUsersInfo
