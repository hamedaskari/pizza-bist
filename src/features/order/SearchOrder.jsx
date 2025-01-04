import React from 'react';
import { useSearch } from './SearchContext';

function SearchOrder() {
  const { query, setQuery } = useSearch();

  return (
    <div>
      <input
        placeholder="جستجو"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </div>
  );
}

export default SearchOrder;
