import React from 'react';
import { useSearch } from '../order/SearchContext';

function SortByPrice() {
  const { setSortBy } = useSearch();
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="mt-4">
      <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
        مرتب بر اساس :{' '}
      </label>
      <select
        id="sort"
        onChange={handleSortChange}
        className="rounded-md border border-gray-300 p-1 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
      >
        <option value="default">انتخاب کنید</option>
        <option value="asc">قیمت: کم به زیاد</option>
        <option value="desc">قیمت: زیاد به کم</option>
      </select>
    </div>
  );
}

export default SortByPrice;
