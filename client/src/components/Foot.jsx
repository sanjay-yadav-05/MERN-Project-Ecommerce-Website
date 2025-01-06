import React from 'react'
import { NavLink } from 'react-router-dom'
const footer = () => {
  return (
    <div className='flex justify-around px-4 md:px-8 md:justify-between max-h-[7vh] h-[7vh] fixed md:flex-row flex-col  w-screen bottom-0 box-border items-center bg-black text-white'>

      <div className='text-md md:text-lg'>
        All Rights are Reserved. &copy; {new Date().getFullYear()} BrandName
      </div>
      <div className='flex gap-3 '>
        <NavLink className='hover:text-gray-400' to='/contact'>Contact</NavLink>
        <span>|</span>
        <NavLink className='hover:text-gray-400' to='/about'>About</NavLink>
        <span>|</span>
        <NavLink className='hover:text-gray-400' to='/policy'>Privacy Policy</NavLink>
      </div>
    </div>
  )
}

export default footer
