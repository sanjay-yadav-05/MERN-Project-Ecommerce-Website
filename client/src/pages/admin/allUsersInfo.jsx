import React from 'react'
import Layout from '../../components/layout'
import AdminMenu from './adminMenu'

const allUsersInfo = () => {
    return (
        <Layout>
             <div className='px-4 py-3 h-full flex gap-2'>
                {/* left section */}
               <AdminMenu/>
                {/* right section */}
                <div className='w-5/6 border-2 border-black'>
                    allUsersInfo
                </div>
            </div>
        </Layout>
    )
}

export default allUsersInfo
