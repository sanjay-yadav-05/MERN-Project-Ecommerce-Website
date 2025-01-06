import React from 'react'
import { Link } from 'react-router-dom'

import Layout from '../components/layout.jsx'
const pageNotFound = () => {
  return (
    <div>
      <Layout>
        <main className='flex flex-col gap-3 justify-center items-center h-full w-screen'>
          <h1 className='text-8xl font-bold'>404</h1>
          <p className='text-4xl text-center'>Oops ! Page not found</p>
          <Link className='text-xl border-2 bg-blue-600 h-9 w-28 text-center rounded-3xl text-white' to='/'>Go back</Link>
        </main>

      </Layout>
    </div>
  )
}

export default pageNotFound
