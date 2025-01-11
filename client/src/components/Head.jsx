import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import cancelIcon from '../assets/svg/cancel.svg';
import ProfileIcon from '../assets/svg/profile.svg';
import menuIcon from '../assets/svg/menu.svg';
import { useAuth } from '../context/authContext';
import axios from 'axios'; // Import axios for fetching products

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]); // All products
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const isHomePage = location.pathname === '/';

  const navLinkaccStyles = ({ isActive }) =>
    isActive ? 'text-gray-400' : 'hover:text-gray-400';

  const navLinkStyles = ({ isActive }) =>
    isActive ? 'h-3/6 items-center flex border-b-2 border-gray-400 z-50 ' : 'h-3/6 items-center flex border-b-2  border-black z-50';

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initially show all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredProducts(products); // Show all products if search query is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black text-white shadow-xl shadow-gray-500 md:shadow-gray-500 z-10">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center h-[8vh] px-6">
        <NavLink to="/" className="text-4xl w-[36%]">BrandName</NavLink>
        {isHomePage && <nav className="flex flex-col gap-6 w-[30%] box-border  justify-center items-center h-full relative top-0">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-3 py-2 w-[98%] sticky top-0 text-black m-auto text-center  rounded-lg border border-gray-400"
          />
          {/* Display search suggestions */}
          {searchQuery && filteredProducts.length > 0 && (
            <div className=" bg-white m-auto text-black border absolute top-full rounded-lg w-full min-h-20 max-h-60 overflow-y-auto shadow-lg z-50">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => navigate(`/product/${product._id}`)} // Navigate to product page
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </nav>}
        {auth.user ? (
          <div className="flex gap-4 bg-black items-center w-[34%] justify-end relative">
            {/* Profile Section */}
            <div className="overflow-hidden">
              <div className={`flex gap-2 h-full z-40 ease-in-out cursor-pointer duration-500 ${isDropdownOpen ? "translate-x-0" : "translate-x-[200%]"}`}>
                <NavLink to={`/dashboard/${auth.user.role === 1 ? "admin" : "user/profile"}`} className="hover:bg-gray-800 px-2 rounded-l-lg py-2" onClick={closeDropdown}>
                  Dashboard
                </NavLink>
                <div className="hover:bg-gray-800 px-2 rounded-r-lg py-2" onClick={() => { closeDropdown(); handleLogout(); }}>
                  Logout
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-end z-50 bg-black h-full">
              <div onClick={toggleDropdown} className="border-l-2 cursor-pointer border-gray-700 px-1 flex items-center justify-center gap-2">
                <img className="h-9 invert" src={ProfileIcon} alt="Profile" />
                <div className="text-lg">{auth.user.name}</div>
              </div>
              {auth?.user?.role === 0 && <NavLink to="/dashboard/user/cart" className={navLinkStyles}>
                Cart(0)
              </NavLink>}
            </div>
          </div>
        ) : (
          <div className="flex gap-4 w-[35%] justify-end">
            <NavLink to="/login" state={{ from: location.pathname }} className={navLinkaccStyles}>Login</NavLink>
            <NavLink to="/register" state={{ from: location.pathname }} className={navLinkaccStyles}>Sign Up</NavLink>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-between items-center h-[8vh] px-4 w-screen ">
        <NavLink to="/" className="text-xl" onClick={closeMenu}>BrandName</NavLink>
        <button onClick={toggleMenu}>
          <img src={menuOpen ? cancelIcon : menuIcon} alt="Menu" className="h-6 invert" />
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
