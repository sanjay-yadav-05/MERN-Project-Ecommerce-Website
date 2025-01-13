// import React from 'react';
// import Layout from '../components/layout';
// import { useSearch } from '../context/sreachContext';

// const SearchResultPage = () => {
//     const { search } = useSearch();

//     return (
//         <Layout>
//             <div className="container mx-auto p-4">
//                 <h1 className="text-2xl font-bold mb-4">Search Result Page</h1>
//                 {search?.result?.length > 0 ? (
//                     <div>
//                         <h2 className="text-xl mb-2">Found {search.result.length} results:</h2>
//                         <ul className="list-disc pl-6">
//                             {search.result.map((product) => (
//                                 <li key={product._id} className="mb-1">
//                                     {product.name} - {product.description}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ) : (
//                     <h2 className="text-xl text-gray-500">No results found</h2>
//                 )}
//             </div>
//         </Layout>
//     );
// };

// export default SearchResultPage;
