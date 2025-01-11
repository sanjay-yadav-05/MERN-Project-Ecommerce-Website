import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryFilter = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/category/get-categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId || null); // Pass category ID or null for "All Categories"
  };

  return (
    <div className="flex flex-col items-start gap-1 text-sm w-full">
      <label htmlFor="categoryDropdown" className="font-semibold">
        Filter by Category:
      </label>
      <select
        id="categoryDropdown"
        className="border rounded-md px-2 py-1 w-full"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
