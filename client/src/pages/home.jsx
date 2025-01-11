// import React, { useState, useEffect } from 'react'
// import Layout from '../components/layout.jsx'
// import { useAuth } from '../context/authContext.jsx'
// import axios from 'axios'
// import CategoryFilter from '../components/categoryFilter.jsx'
// import PriceFilter from '../components/priceFilter.jsx'

// const home = () => {
//   const { auth, setAuth } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState(null); // Selected category
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [loading, setLoading] = useState(true); // Loading state
//   const [priceRange, setPriceRange] = useState(null);
//   const [resetAll,setReSetAll] = useState(false);

//   const getAllproducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
//       setProducts(response.data.products); // Assuming the response has a "products" field
//       setFilteredProducts(response.data.products);
//     } catch (error) {
//       // Check if the error has a response (indicates server responded with a status code)
//       if (error.response) {
//         // Display the error message from the backend
//         toast.error(error.response.data.message || "An error occurred");
//       } else if (error.request) {
//         // Request was made but no response was received
//         toast.error("No response from server. Please try again later.");
//       } else {
//         // Something else went wrong
//         toast.error("Something went wrong");
//       }
//       console.error(error.message);
//     }
//     finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getAllproducts()
//   }, [])


//   // Function to handle filtering
//   useEffect(() => {
//     let filtered = [...products];

//     // Apply price filter
//     if (priceRange) {
//       filtered = filtered.filter((product) => {
//         return product.price >= priceRange.min && product.price <= priceRange.max;
//       });
//     }

//     // Apply category filter
//     if (category) {
//       filtered = filtered.filter((product) => product.category?._id === category);
//     }

//     setFilteredProducts(filtered);
//   }, [priceRange, category, products]);

//   return (
//     <div>
//       <Layout>
//         <div className='h-[85vh] w-screen flex gap-2 p-3'>
//           {/* left section  */}
//           <div className='w-1/6 border p-2 border-black rounded-lg'>
//             <div className='flex flex-col items-start gap-2 w-full"'>
//               <div className='text-lg font-semibold w-full'>Filters</div>
//               <CategoryFilter onCategoryChange={setCategory} reset={resetAll} />
//               <PriceFilter onFilterChange={setPriceRange} reset ={resetAll} />
//               <button className='px-3 py-1 bg-black text-white rounded-xl' onClick={()=>setReSetAll(!resetAll)}>Reset</button>
//             </div>
//           </div>
//           {/* right section  */}
//           <div className='w-5/6 border p-3 border-black rounded-lg'>
//             {
//               loading ? (
//                 // Display loading message while fetching
//                 <p>Loading...</p>
//               ) : (
//                 <div className='w-full h-full flex flex-wrap justify-start  gap-4 overflow-auto'>
//                   {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product) => (
//                       <div
//                         key={product._id}
//                         className='relative w-[18%] h-[48%] rounded-lg px-3 py-2 border hover:bg-gray-200'
//                       >
//                         {/* Out of Stock Overlay */}
//                         {product.quantity === 0 && (
//                           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
//                             <p className="text-white font-semibold text-3xl -rotate-45">Out of Stock</p>
//                           </div>
//                         )}

//                         <div className='flex flex-col justify-start h-full gap-1 w-full'>
//                           {/* Product Image */}
//                           <img
//                             className='w-full object-cover object-center h-[60%] rounded-lg'
//                             src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
//                             alt={product.name}
//                           />

//                           {/* Product Name */}
//                           <div className='w-full font-semibold'>{product.name}</div>

//                           {/* Product Description */}
//                           <div className='w-full text-nowrap overflow-hidden text-ellipsis text-xs'>
//                             {product.description}
//                           </div>

//                           {/* Product Price and Quantity */}
//                           <div className='w-full flex justify-between text-gray-600 text-sm'>
//                             <div>
//                               <span>Price:</span>
//                               <span> {`₹${product.price}`} </span>
//                             </div>
//                             <div>
//                               <span>Quantity:</span>
//                               <span>{` ${product.quantity}`}</span>
//                             </div>
//                           </div>

//                           {/* Action Buttons */}
//                           <div className='flex justify-between'>
//                             <button className='text-sm bg-slate-400 text-white py-1 px-2 rounded-md font-semibold'>
//                               More Info
//                             </button>
//                             <button className='text-sm bg-slate-500 text-white py-1 px-2 rounded-md font-semibold'>
//                               Add to Cart
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     // Fallback message when no products are found
//                     <p className="text-gray-500 text-center w-full">No products found.</p>
//                   )}
//                 </div>
//               )
//             }
//           </div>

//         </div>
//       </Layout>
//     </div>
//   )
// }

// export default home




import React, { useState, useEffect } from 'react';
import Layout from '../components/layout.jsx';
import { useAuth } from '../context/authContext.jsx';
import axios from 'axios';
import CategoryFilter from '../components/categoryFilter.jsx';
import PriceFilter from '../components/priceFilter.jsx';

const Home = () => {
  const { auth, setAuth } = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null); // Selected category
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true); // Loading state
  const [priceRange, setPriceRange] = useState(null);
  const [resetAll, setReSetAll] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(10); // Number of items per page

  const getAllproducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
      setProducts(response.data.products); // Assuming the response has a "products" field
      setFilteredProducts(response.data.products);
    } catch (error) {
      // Handle errors
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("Something went wrong");
      }
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  // Function to handle filtering
  useEffect(() => {
    let filtered = [...products];

    // Apply price filter
    if (priceRange) {
      filtered = filtered.filter((product) => {
        return product.price >= priceRange.min && product.price <= priceRange.max;
      });
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter((product) => product.category?._id === category);
    }

    setFilteredProducts(filtered);
  }, [priceRange, category, products]);

  // Calculate the index of the first and last item on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Get the current products for the page
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <Layout>
        <div className='h-[85vh] w-screen flex gap-2 p-3'>
          {/* Left section */}
          <div className='w-1/6 border px-3 py-2 border-black rounded-lg'>
            <div className='flex flex-col w-full h-full justify-between'>

              <div className='flex flex-col items-start gap-2 w-full'>
                <div className='text-lg font-semibold w-full'>Filters</div>
                <CategoryFilter onCategoryChange={setCategory} reset={resetAll} />
                <PriceFilter onFilterChange={setPriceRange} reset={resetAll} />
                <button className='px-3 py-1 bg-black text-white rounded-xl' onClick={() => setReSetAll(!resetAll)}>Reset</button>
              </div>
              <div className="flex justify-between w-full">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-black text-white rounded-md"
                >
                  Prev
                </button>
                <span className="px-4 py-2 text-nowrap">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-black text-white rounded-md "
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className='w-5/6 border p-3 border-black rounded-lg'>
            {
              loading ? (
                <p>Loading...</p>
              ) : (
                <div className='w-full h-full flex flex-wrap justify-start gap-4 overflow-auto'>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <div
                        key={product._id}
                        className='relative w-[18%] h-[48%] rounded-lg px-3 py-2 border hover:bg-gray-200'
                      >
                        {/* Out of Stock Overlay */}
                        {product.quantity === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                            <p className="text-white font-semibold text-3xl -rotate-45">Out of Stock</p>
                          </div>
                        )}

                        <div className='flex flex-col justify-start h-full gap-1 w-full'>
                          {/* Product Image */}
                          <img
                            className='w-full object-cover object-center h-[60%] rounded-lg'
                            src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                            alt={product.name}
                          />

                          {/* Product Name */}
                          <div className='w-full font-semibold'>{product.name}</div>

                          {/* Product Description */}
                          <div className='w-full text-nowrap overflow-hidden text-ellipsis text-xs'>
                            {product.description}
                          </div>

                          {/* Product Price and Quantity */}
                          <div className='w-full flex justify-between text-gray-600 text-sm'>
                            <div>
                              <span>Price:</span>
                              <span> {`₹${product.price}`} </span>
                            </div>
                            <div>
                              <span>Quantity:</span>
                              <span>{` ${product.quantity}`}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className='flex justify-between'>
                            <button className='text-sm bg-slate-400 text-white py-1 px-2 rounded-md font-semibold'>
                              More Info
                            </button>
                            <button className='text-sm bg-slate-500 text-white py-1 px-2 rounded-md font-semibold'>
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center w-full">No products found.</p>
                  )}
                </div>
              )
            }
          </div>
        </div>

        {/* Pagination */}

      </Layout>
    </div>
  );
};

export default Home;
