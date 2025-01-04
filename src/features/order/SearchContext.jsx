import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  return (
    <SearchContext.Provider value={{ query, setQuery, sortBy, setSortBy }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
