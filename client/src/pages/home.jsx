// import React, { useEffect, useState } from 'react';
// import Layout from '../components/layout.jsx';
// import PriceFilter from '../components/priceFilter.jsx';
// import CategoryFilter from '../components/categoryFilter.jsx';
// import { useAuth } from '../context/authContext.jsx';
// import axios from 'axios';

// const Home = () => {
//   const { auth } = useAuth();
//   const [products, setProducts] = useState([]); // All products
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [loading, setLoading] = useState(true); // Loading state
//   const [priceRange, setPriceRange] = useState(null); // Selected price range
//   const [category, setCategory] = useState(null); // Selected category


//   // Function to fetch products
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
//       setProducts(response.data.products); // Assuming the response has a "products" field
//       setFilteredProducts(response.data.products); // Initially display all products
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(); // Call the fetch function on component mount
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

//     setFilteredProducts(filtered);
//   }, [priceRange, category, products]);


//   return (
//     <div>
//       <Layout>
//         <div className="h-[85vh] w-screen flex gap-2 p-3">
//           <div className="w-1/6 border border-black rounded-lg py-2 px-3">
//             <div className="flex flex-col items-start gap-2 w-full">
//               <div className="text-lg font-semibold w-full">Filters</div>
//               <CategoryFilter onCategoryChange={setCategory} />
//               <PriceFilter onFilterChange={setPriceRange} />
//               {/* <button onClick={resetAll} className='bg-black text-white px-3 py-1 rounded-lg'>reset</button> */}
//             </div>
//           </div>
//           <div className="w-5/6 border border-black overflow-auto rounded-lg h-full">
//             {loading ? (
//               <p>Loading...</p> // Display loading message while fetching
//             ) : (
//               <div className="overflow-auto grid grid-cols-5 auto-rows-[48%] gap-4 h-full p-2 w-full">
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((product) => (
//                     <div key={product._id} className="border h-full w-full py-2 rounded-md overflow-hidden">
//                       <div className="flex flex-col gap-1 w-[88%] m-auto h-full">
//                         <img
//                           src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
//                           alt={product.name}
//                           className="h-[60%] object-cover rounded-lg mb-2"
//                         />
//                         <h3 className="font-bold text-md">{product.name}</h3>
//                         <p className="text-sm  overflow-hidden h-auto text-nowrap text-ellipsis">
//                           {product.description}
//                         </p>
//                         <p className="text-sm">Category: {product.category?.name || 'N/A'}</p>
//                         <div className="flex justify-between w-full">
//                           <p className="text-md">Price: ${product.price}</p>
//                           <p className="text-md">Quantity: {product.quantity}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No products available.</p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default Home;




import React, { useEffect, useState } from 'react';
import Layout from '../components/layout.jsx';
import PriceFilter from '../components/priceFilter.jsx';
import CategoryFilter from '../components/categoryFilter.jsx';
import { useAuth } from '../context/authContext.jsx';
import axios from 'axios';

const Home = () => {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true); // Loading state
  const [priceRange, setPriceRange] = useState(null); // Selected price range
  const [category, setCategory] = useState(null); // Selected category


  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
      setProducts(response.data.products); // Assuming the response has a "products" field
      setFilteredProducts(response.data.products); // Initially display all products
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call the fetch function on component mount
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

  return (
    <div>
      <Layout>
        <div className="h-[85vh] w-screen flex gap-2 p-3">
          <div className="w-1/6 border border-black rounded-lg py-2 px-3">
            <div className="flex flex-col items-start gap-2 w-full">
              <div className="text-lg font-semibold w-full">Filters</div>
              <CategoryFilter onCategoryChange={setCategory} />
              <PriceFilter onFilterChange={setPriceRange} />
              {/* <button onClick={resetAll} className='bg-black text-white px-3 py-1 rounded-lg'>reset</button> */}
            </div>
          </div>
          <div className="w-5/6 border border-black overflow-auto rounded-lg h-full">
            {loading ? (
              <p>Loading...</p> // Display loading message while fetching
            ) : (
              <div className="overflow-auto grid grid-cols-5 auto-rows-[48%] gap-4 h-full p-2 w-full">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product._id} className="relative border h-full w-full py-2 rounded-md overflow-hidden">
                      {/* Watermark Overlay for products with quantity = 0 */}
                      {product.quantity === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <p className="text-white font-bold text-3xl -rotate-45">Out of Stock</p>
                        </div>
                      )}
                      <div className="flex flex-col gap-1 w-[88%] m-auto h-full">
                        <img
                          src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                          alt={product.name}
                          className="h-[60%] object-cover rounded-lg mb-2"
                        />
                        <h3 className="font-bold text-md">{product.name}</h3>
                        <p className="text-sm overflow-hidden h-auto text-nowrap text-ellipsis">
                          {product.description}
                        </p>
                        <p className="text-sm">Category: {product.category?.name || 'N/A'}</p>
                        <div className="flex justify-between w-full">
                          <p className="text-md">Price: ${product.price}</p>
                          <p className="text-md">Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
