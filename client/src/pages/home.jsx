import React, { useState, useEffect } from 'react';
import Layout from '../components/layout.jsx';
import { useAuth } from '../context/authContext.jsx';
import axios from 'axios';
import CategoryFilter from '../components/categoryFilter.jsx';
import PriceFilter from '../components/priceFilter.jsx';
import { toast } from "react-toastify";
import { useSearch } from '../context/sreachContext.jsx';


// const Home = () => {
//   const { auth, setAuth } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState(null); // Selected category
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [loading, setLoading] = useState(true); // Loading state
//   const [priceRange, setPriceRange] = useState(null);
//   const [resetAll, setReSetAll] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1); // Current page
//   const [itemsPerPage] = useState(30); // Number of items per page

//   const getAllproducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
//       setProducts(response.data.products); // Assuming the response has a "products" field
//       setFilteredProducts(response.data.products);
//     } catch (error) {
//       // Handle errors
//       if (error.response) {
//         toast.error(error.response.data.message || "An error occurred");
//       } else if (error.request) {
//         toast.error("No response from server. Please try again later.");
//       } else {
//         toast.error("Something went wrong");
//       }
//       console.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllproducts();
//   }, []);

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

//     // Reset to first page when filters are applied
//     setCurrentPage(1);

//     setFilteredProducts(filtered);
//   }, [priceRange, category, products, resetAll]);

//   // Calculate the index of the first and last item on the current page
//   const indexOfLastProduct = currentPage * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

//   // Get the current products for the page
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Change page handler
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   return (
//     <div>
//       <Layout>
//         <div className='h-[85vh] w-screen flex gap-2 p-3'>
//           {/* Left section */}
//           <div className='w-1/6 border px-3 py-2 border-black rounded-lg'>
//             <div className='flex flex-col w-full h-full justify-between'>
//               <div className='flex flex-col items-start gap-2 w-full'>
//                 <div className='text-lg font-semibold w-full'>Filters</div>
//                 <CategoryFilter onCategoryChange={setCategory} reset={resetAll} />
//                 <PriceFilter onFilterChange={setPriceRange} reset={resetAll} />
//                 <button className='px-3 py-1 bg-black text-white rounded-xl' onClick={() => setReSetAll(!resetAll)}>Reset</button>
//               </div>
//               <div className="flex justify-between w-full">
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 w-1/3 bg-black text-white rounded-md"
//                 >
//                   Prev
//                 </button>
//                 <span className="px-4 py-2 flex justify-center text-nowrap w-1/3">{currentPage} / {totalPages}</span>
//                 <button
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 w-1/3 bg-black text-white rounded-md "
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right section */}
//           <div className='w-5/6 border p-3 border-black rounded-lg'>
//             {
//               loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 <div className='w-full h-full flex flex-wrap justify-start gap-4 overflow-auto'>
//                   {currentProducts.length > 0 ? (
//                     currentProducts.map((product) => (
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
//                     <p className="text-gray-500 text-center w-full">No products found.</p>
//                   )}
//                 </div>
//               )
//             }
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default Home;





// const Home = () => {
//   const { auth, setAuth } = useAuth();
//   const { search, setSearch } = useSearch(); // Access and reset the search result
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState(null); // Selected category
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [loading, setLoading] = useState(true); // Loading state
//   const [priceRange, setPriceRange] = useState(null);
//   const [resetAll, setReSetAll] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1); // Current page
//   const [itemsPerPage] = useState(30); // Number of items per page

//   const getAllproducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
//       setProducts(response.data.products); // Assuming the response has a "products" field
//       setFilteredProducts(response.data.products);
//     } catch (error) {
//       // Handle errors
//       if (error.response) {
//         toast.error(error.response.data.message || "An error occurred");
//       } else if (error.request) {
//         toast.error("No response from server. Please try again later.");
//       } else {
//         toast.error("Something went wrong");
//       }
//       console.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllproducts();
//   }, []);

//   // Function to handle filtering
//   useEffect(() => {
//     let filtered = [...products];

//     // Apply search filter if search results exist
//     if (search.result.length > 0) {
//       filtered = search.result;
//     }

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

//     // Reset to first page when filters are applied
//     setCurrentPage(1);

//     setFilteredProducts(filtered);
//   }, [priceRange, category, products, resetAll, search.result]); // Include search.result in dependency array

//   // Calculate the index of the first and last item on the current page
//   const indexOfLastProduct = currentPage * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

//   // Get the current products for the page
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Change page handler
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   // Reset all filters and search
//   const handleReset = () => {
//     setCategory(null); // Reset category filter
//     setPriceRange(null); // Reset price range filter
//     setSearch({ result: [] }); // Reset search results
//     setReSetAll(!resetAll); // Trigger re-render for reset
//     setCurrentPage(1); // Reset to the first page
//     setFilteredProducts(products); // Show all products
//     document.getElementById("searchInput").value = "";

//   };
  
//   return (
//     <div>
//       <Layout>
//         <div className='h-[85vh] w-screen flex gap-2 p-3'>
//           {/* Left section */}
//           <div className='w-1/6 border px-3 py-2 border-black rounded-lg'>
//             <div className='flex flex-col w-full h-full justify-between'>
//               <div className='flex flex-col items-start gap-2 w-full'>
//                 <div className='text-lg font-semibold w-full'>Filters</div>
//                 <CategoryFilter onCategoryChange={setCategory} reset={resetAll} />
//                 <PriceFilter onFilterChange={setPriceRange} reset={resetAll} />
//                 <button className='px-3 py-1 bg-black text-white rounded-xl' onClick={handleReset}>Reset</button>
//               </div>
//               <div className="flex justify-between w-full">
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="px-3 py-2 w-1/3 bg-black text-white rounded-md"
//                 >
//                   Prev
//                 </button>
//                 <span className="px-4 py-2 flex justify-center text-nowrap w-1/3">{currentPage} / {totalPages}</span>
//                 <button
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-2 w-1/3 bg-black text-white rounded-md "
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right section */}
//           <div className='w-5/6 border p-3 border-black rounded-lg'>
//             {
//               loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 <div className='w-full h-full flex flex-wrap justify-start gap-4 overflow-auto'>
//                   {currentProducts.length > 0 ? (
//                     currentProducts.map((product) => (
//                       <div
//                         key={product._id}
//                         className='relative w-[18%] h-[48%] rounded-lg px-3 py-2 border hover:bg-gray-200'
//                         >
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
//                     <p className="text-gray-500 text-center w-full">No products found.</p>
//                   )}
//                 </div>
//               )
//             }
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };






const Home = () => {
  const { auth, setAuth } = useAuth();
  const { search, setSearch } = useSearch(); // Access and reset the search result
  const [products, setProducts] = useState([]); // All products
  const [category, setCategory] = useState(null); // Selected category
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true); // Loading state
  const [priceRange, setPriceRange] = useState(null); // Selected price range
  const [resetAll, setReSetAll] = useState(false); // Reset trigger state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(30); // Number of items per page

  // Fetch products from the server
  const getAllproducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
      setProducts(response.data.products); // Assuming the response has a "products" field
      setFilteredProducts(response.data.products); // Initialize with all products
    } catch (error) {
      // Handle errors
      toast.error("Error fetching products");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllproducts(); // Fetch products when component mounts
  }, []);

  // Function to handle filtering based on search, category, and price
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter if search results exist
    if (search.result.length > 0) {
      filtered = search.result;
    }
    

    // Apply price filter if price range is set
    if (priceRange) {
      filtered = filtered.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max);
    }

    // Apply category filter if category is selected
    if (category) {
      filtered = filtered.filter((product) => (product.category?._id === category || product.category === category));
    }

    // Reset to first page when filters are applied
    setCurrentPage(1);

    // Update the filtered products state
    setFilteredProducts(filtered);
  }, [priceRange, category, products, resetAll, search.result]); // Re-run when filters or search result change

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset all filters and search
  const handleReset = () => {
    setCategory(null); // Reset category filter
    setPriceRange(null); // Reset price range filter
    setSearch({ result: [] }); // Reset search results
    setReSetAll(!resetAll); // Trigger re-render for reset
    setCurrentPage(1); // Reset to the first page
    setFilteredProducts(products); // Show all products
    document.getElementById("searchInput").value = ""; // Clear search input
  };

  return (
    <div>
      <Layout>
        <div className="h-[85vh] w-screen flex gap-2 p-3">
          {/* Left section for filters */}
          <div className="w-1/6 border px-3 py-2 border-black rounded-lg">
            <div className="flex flex-col w-full h-full justify-between">
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="text-lg font-semibold w-full">Filters</div>
                <CategoryFilter onCategoryChange={setCategory} reset={resetAll} />
                <PriceFilter onFilterChange={setPriceRange} reset={resetAll} />
                <button className="px-3 py-1 bg-black text-white rounded-xl" onClick={handleReset}>Reset</button>
              </div>
              <div className="flex justify-between w-full">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 w-1/3 bg-black text-white rounded-md"
                >
                  Prev
                </button>
                <span className="px-4 py-2 flex justify-center text-nowrap w-1/3">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 w-1/3 bg-black text-white rounded-md "
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right section for products */}
          <div className="w-5/6 border p-3 border-black rounded-lg">
            {
              loading ? (
                <p>Loading...</p>
              ) : (
                <div className="w-full h-full flex flex-wrap justify-start gap-4 overflow-auto">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <div
                        key={product._id}
                        className="relative w-[18%] h-[48%] rounded-lg px-3 py-2 border hover:bg-gray-200"
                      >
                        {/* Out of Stock Overlay */}
                        {product.quantity === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                            <p className="text-white font-semibold text-3xl -rotate-45">Out of Stock</p>
                          </div>
                        )}

                        <div className="flex flex-col justify-start h-full gap-1 w-full">
                          {/* Product Image */}
                          <img
                            className="w-full object-cover object-center h-[60%] rounded-lg"
                            src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                            alt={product.name}
                          />

                          {/* Product Name */}
                          <div className="w-full font-semibold">{product.name}</div>

                          {/* Product Description */}
                          <div className="w-full text-nowrap overflow-hidden text-ellipsis text-xs">
                            {product.description}
                          </div>

                          {/* Product Price and Quantity */}
                          <div className="w-full flex justify-between text-gray-600 text-sm">
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
                          <div className="flex justify-between">
                            <button className="text-sm bg-slate-400 text-white py-1 px-2 rounded-md font-semibold">
                              More Info
                            </button>
                            <button className="text-sm bg-slate-500 text-white py-1 px-2 rounded-md font-semibold">
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
      </Layout>
    </div>
  );
};

export default Home;