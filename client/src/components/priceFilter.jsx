import React, { useState } from 'react';

const PriceFilter = ({ onFilterChange }) => {
  const priceRanges = [
    { id: 1, label: '$0 - $20', min: 0, max: 20 },
    { id: 2, label: '$21 - $40', min: 21, max: 40 },
    { id: 3, label: '$41 - $60', min: 41, max: 60 },
    { id: 4, label: '$61 - $80', min: 61, max: 80 },
    { id: 5, label: '$81 - $100', min: 81, max: 100 },
    { id: 6, label: 'More than $100', min: 101, max: Infinity },
  ];

  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleChange = (id) => {
    const selectedRange = priceRanges.find((range) => range.id === id);
    setSelectedPrice(id);
    onFilterChange(selectedRange); // Pass the selected range to the parent component
  };

  const handleShowAll = () => {
    setSelectedPrice(null);
    onFilterChange(null); // Reset price filter to show all products
  };

  return (
    <div className="flex flex-col items-start gap-1 text-sm">
        <div className='font-semibold'>Filter by Price:</div>
      <label className="w-full flex gap-1">
        <input
          type="radio"
          name="priceRange"
          value="all"
          checked={selectedPrice === null}
          onChange={handleShowAll}
        />
        All Products
      </label>
      {priceRanges.map((range) => (
        <label key={range.id} className="w-full flex gap-1">
          <input
            type="radio"
            name="priceRange"
            value={range.id}
            checked={selectedPrice === range.id}
            onChange={() => handleChange(range.id)}
          />
          {range.label}
        </label>
      ))}
    </div>
  );
};

export default PriceFilter;
