import React, { useEffect, useState } from 'react';
import Layout from '../components/layout.jsx';
import { useAuth } from '../context/authContext.jsx';
import axios from 'axios';

const Home = () => {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/product/get-products');
      setProducts(response.data.products); // Assuming the response has a "products" field
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Call the fetch function on component mount
  }, []);

  return (
    <div>
      <Layout>
        <div className='h-[85vh] w-screen flex gap-2 p-3'>
          <div className='w-1/6 border border-black rounded-lg'>
            <select name="Select Category" id="category"></select>
          </div>
          <div className='w-5/6 border border-black overflow-auto rounded-lg h-full'>
            {loading ? (
              <p>Loading...</p> // Display loading message while fetching
            ) : (
              <div className="grid grid-cols-5 gap-4 h-full p-2 w-full">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product._id} className="border h-full w-full py-2 rounded-md overflow-hidden">
                      <div className='flex flex-col gap-1 w-[88%] m-auto h-full'>
                        <img
                          src={`http://localhost:8080/api/v1/product/get-product-image/${product._id}`}
                          alt={product.name}
                          className=" h-[60%] object-cover rounded-lg"
                        />
                        <h3 className="font-bold text-md">{product.name}</h3>
                        <p className="text-sm max-h-[20%] overflow-hidden h-auto text-nowrap  text-ellipsis">{product.description}</p>
                        <p className='text-sm'>Category: {product.category?.name || 'N/A'}</p>
                        <div className='flex justify-between w-full'>

                          <p className="text-md ">Price: ${product.price}</p>
                          <p className="text-md ">Quantity: {product.quantity}</p>
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
