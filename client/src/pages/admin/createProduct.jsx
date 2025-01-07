import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import AdminMenu from './adminMenu'
import axios from 'axios'
import { toast } from "react-toastify";

const createProduct = () => {

    const [products, setProducts] = useState([])
    const getProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/get-products");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error("Error in displaying categories")
            }

        } catch (error) {
            // Check if the error has a response (indicates server responded with a status code)
            if (error.response) {
                // Display the error message from the backend
                toast.error(error.response.data.message || "An error occurred");
            } else if (error.request) {
                // Request was made but no response was received
                toast.error("No response from server. Please try again later.");
            } else {
                // Something else went wrong
                toast.error("Something went wrong");
            }
            console.error(error.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])


    return (
        <Layout>
            <div className='px-4 py-3 h-full flex gap-2'>
                {/* left section */}
               <AdminMenu/>
                {/* right section */}
                <div className='w-5/6 border-2 border-black'>
                    <div>
                    <table>
                            <thead>
                                <tr>
                                    <th colSpan={1}>Products</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td><button>Edit</button></td>
                                        <td><button>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default createProduct
