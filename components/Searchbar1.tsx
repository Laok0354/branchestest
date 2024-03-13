"use client"

import React, { useState } from 'react';

const SearchBar1 = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="border border-gray-300 rounded-md py-2 px-3 mr-2"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar1;
