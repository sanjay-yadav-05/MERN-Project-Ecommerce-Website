// import React from 'react';
// import { useSearch } from '../context/sreachContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SearchbarATHome = () => {
//     const { search, setSearch } = useSearch();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${search.keyword}`);
//             setSearch({ ...search, result: data.data });
//         } catch (error) {
//             console.error('Error fetching search results:', error);
//             alert('Failed to fetch search results. Please try again later.');
//         }
//     };

//     return (
//         <form className="w-full h-full flex gap-2.5" onSubmit={handleSubmit}>
//             <input
//                 className="rounded-md w-10/12 px-3 h-full text-center text-black"
//                 placeholder="Search Product"
//                 type="search"
//                 aria-label="Search"
//                 value={search.keyword}
//                 id='searchInput'
//                 onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
//             />
//             <button
//                 type="submit"
//                 className="py-1 px-2 w-2/12 rounded-md bg-black text-white border hover:bg-red-900"
//             >
//                 Search
//             </button>
//         </form>
//     );
// };

// export default SearchbarATHome;



// import React, { useEffect } from 'react';
// import { useSearch } from '../context/sreachContext';
// import axios from 'axios';
// import toast from "react-toastify"

// const SearchbarATHome = () => {
//     const { search, setSearch } = useSearch();

//     // Fetch all products when the search query is cleared
//     const getAllProducts = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:8080/api/v1/product/get-products');
//             setSearch({ ...search, result: data.products });
//         } catch (error) {
//             console.error('Error fetching all products:', error);
//             toast.error('Failed to fetch products. Please try again later.');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (search.keyword.trim() === "") {
//             // If search query is empty, show all products
//             getAllProducts();
//         } else {
//             try {
//                 const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${search.keyword}`);
//                 setSearch({ ...search, result: data.data });
//             } catch (error) {
//                 console.error('Error fetching search results:', error);
//                 alert('Failed to fetch search results. Please try again later.');
//             }
//         }
//     };

//     const handleChange = (e) => {
//         const newKeyword = e.target.value;
//         setSearch({ ...search, keyword: newKeyword });

//         // If the search query is empty, fetch all products
//         if (newKeyword.trim() === "") {
//             getAllProducts();
//         }
//     };

//     // Effect to show all products on page load
//     useEffect(() => {
//         if (search.keyword.trim() === "") {
//             getAllProducts();
//         }
//     }, []); // This effect will run only once when the component is mounted

//     return (
//         <form className="w-full h-full flex gap-2.5" onSubmit={handleSubmit}>
//             <input
//                 className="rounded-md w-10/12 px-3 h-full text-center text-black"
//                 placeholder="Search Product"
//                 type="search"
//                 aria-label="Search"
//                 value={search.keyword}
//                 id='searchInput'
//                 onChange={handleChange} // Handle input change
//             />
//             <button
//                 type="submit"
//                 className="py-1 px-2 w-2/12 rounded-md bg-black text-white border hover:bg-red-900"
//             >
//                 Search
//             </button>
//         </form>
//     );
// };

// export default SearchbarATHome;



import React, { useEffect } from 'react';
import { useSearch } from '../context/sreachContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const SearchbarATHome = () => {
    const { search, setSearch } = useSearch();

    // Function to fetch all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/get-products');
            setSearch({ keyword: '', result: data.products }); // Reset search state with all products
        } catch (error) {
            console.error('Error fetching all products:', error);
            toast.error('Failed to fetch products. Please try again later.');
        }
    };

    // Handle submit (search query)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!search.keyword.trim()) {
            getAllProducts(); // Show all products if the search query is empty
        } else {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${search.keyword}`);
                setSearch({ ...search, result: data.data }); // Update search context with search results
            } catch (error) {
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
    };

    // Handle input change (search query)
    const handleChange = (e) => {
        const newKeyword = e.target.value;

        // Update the search keyword state
        setSearch({ ...search, keyword: newKeyword });

        // If the input becomes empty, fetch all products
        if (!newKeyword.trim()) {
            // getAllProducts();
            setSearch({ keyword: '', result: [] }); // Reset search state with all products

        }
    };

    // Fetch all products on component mount
    useEffect(() => {
        getAllProducts(); // Show all products when the component is first rendered
    }, []); // Empty dependency array ensures this runs only once

    return (
        <form className="w-full h-full flex gap-2.5" onSubmit={handleSubmit}>
            <input
                className="rounded-md w-10/12 px-3 h-full text-center text-black"
                placeholder="Search Product"
                type="search"
                aria-label="Search"
                value={search.keyword || ''} // Ensure the input is controlled and has a fallback value
                id="searchInput"
                onChange={handleChange} // Update state on input change
            />
            <button
                type="submit"
                className="py-1 px-2 w-2/12 rounded-md bg-black text-white border hover:bg-red-900"
            >
                Search
            </button>
        </form>
    );
};

export default SearchbarATHome;
