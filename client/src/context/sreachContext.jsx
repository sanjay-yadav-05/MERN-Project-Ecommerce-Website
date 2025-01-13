import {  useState, createContext, useContext } from "react";


// Create Auth Context
const SearchContext = createContext();

// AuthProvider Component
const SearchProvider = ({ children }) => {
    const [search,setSearch] = useState({
        keyword: "",
        result: []
    });


    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom Hook to use Auth Context
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
