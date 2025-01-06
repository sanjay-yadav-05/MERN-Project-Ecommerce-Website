import React from 'react'
import Layout from '../components/layout.jsx'
import { useAuth } from '../context/authContext.jsx'

const home = () => {
  const { auth, setAuth } = useAuth();
  return (
    <div>
      <Layout>
        <div className='h-[85vh] w-screen'>

          <h2>Home</h2>
          <div>{JSON.stringify(auth,null,4)}</div>
        </div>
      </Layout>
    </div>
  )
}

export default home
