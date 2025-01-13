import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cancelIcon from '../assets/svg/cancel.svg';
import ProfileIcon from '../assets/svg/profile.svg';
import menuIcon from '../assets/svg/menu.svg';
import { useAuth } from '../context/authContext';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import SearchbarATHome from './searchbarATHome';
// import { useToast } from '../context/toastContext';

const Header = () => {
  // const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation(); // Get the current path
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const navLinkaccStyles = ({ isActive }) =>
    isActive ? 'text-gray-400' : 'hover:text-gray-400';
  const navLinkStyles = ({ isActive }) =>
    isActive ? 'h-3/6 items-center flex border-b-2 border-gray-400 z-50 ' : 'h-3/6 items-center flex border-b-2  border-black z-50';
  const handleLogout = () => {
    toast.success("Loged out successfully");
    // showToast("Loged out successfully")
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login")
  }

  const ishome =  ( location?.pathname  == "/" || location?.pathname  == "/search") ;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };


  return (
    <header className="fixed top-0 w-full bg-black text-white   shadow-gray-500  md:shadow-gray-500 z-10">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center h-[8vh] px-6">
        <NavLink to="/" className="text-4xl w-[32%] font-mono">BrandName</NavLink>
        {ishome && <nav className="flex gap-6 w-[36%] py-2.5 px-2 justify-center items-center h-full">
          {/* <NavLink to="/" className={navLinkStyles}>Home</NavLink>
          <NavLink to="/category" className={navLinkStyles}>Category</NavLink> */}
          <SearchbarATHome/>
        </nav>}
        {auth.user ? (
          <div className="flex gap-4 h-full bg-black items-center w-[32%] justify-end ">
            {/* Profile Section */}
            <div className='overflow-hidden h-full'>  
            <div className={`flex gap-2 h-full z-40 items-center ease-in-out cursor-pointer duration-500 ${isDropdownOpen? "translate-x-0" : "translate-x-[200%]"}`}>
              <NavLink to={`/dashboard/${auth.user.role === 1 ? "admin" : "user/profile"}`} className="hover:bg-gray-800 px-2 rounded-l-lg py-2" onClick={closeDropdown} >
                Dashboard
              </NavLink>
              <div className="hover:bg-gray-800 px-2 rounded-r-lg py-2" onClick={() => { closeDropdown(); handleLogout(); }} > Logout
              </div>
            </div>
              </div>
              <div className='flex gap-4 items-center justify-end z-50  bg-black h-full '>
              <div onClick={toggleDropdown} className="border-l-2 cursor-pointer border-gray-700 px-1 flex items-center justify-center gap-2" >
                <img className="h-9 invert " src={ProfileIcon} alt="Profile" />
                <div className='text-xl font-mono'>{auth.user.name}</div>
              </div>
             {auth?.user?.role == 0 && <NavLink to="/dashboard/user/cart" className={navLinkStyles}>
                Cart(0)
              </NavLink>}
            </div>
          </div>
        ) : (<div className="flex gap-4 w-2/5 justify-end ">
          <NavLink to="/login" state={{ from: location.pathname }} className={navLinkaccStyles}>Login</NavLink>
          <NavLink to="/register" state={{ from: location.pathname }} className={navLinkaccStyles}>Sign Up</NavLink>
        </div>)}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center h-[8vh] px-4 w-screen ">
        <NavLink to="/" className="text-xl" onClick={closeMenu}>BrandName</NavLink>
        <button onClick={toggleMenu}>
          <img
            src={menuOpen ? cancelIcon : menuIcon}
            alt="Menu"
            className="h-6 invert"
          />
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-black text-white flex flex-col items-center py-4 w-screen">
          <NavLink to="/" className="py-2" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/category" className="py-2" onClick={closeMenu}>Category</NavLink>
          <NavLink to="/cart" className="py-2" onClick={closeMenu}>Cart</NavLink>
          <NavLink to="/login" className="py-2" state={{ from: location.pathname }} onClick={closeMenu}> Login </NavLink>
          <NavLink to="/register" className="py-2" state={{ from: location.pathname }} onClick={closeMenu}> Sign Up </NavLink>

        </nav>
      )}
    </header>
  );
};

export default Header;
