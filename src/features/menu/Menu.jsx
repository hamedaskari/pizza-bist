import { useLoaderData } from 'react-router-dom';
import { getMenuList } from '../../services/GetMenu';
import MenuItem from './MenuItem';
import { useSearch } from '../order/SearchContext';
import SortByPrice from './Sort';

function Menu() {
  const menu = useLoaderData();
  const { query, sortBy } = useSearch();

  const sortedMenu = menu.sort((a, b) => {
    if (sortBy === 'asc') {
      return a.price - b.price;
    } else if (sortBy === 'desc') {
      return b.price - a.price;
    }
    return 0;
  });
  const filteredMenu = sortedMenu
    .filter((pizza) => pizza.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      return a.soldOut === b.soldOut ? 0 : a.soldOut ? 1 : -1;
    });

  return (
    <div>
      <SortByPrice />
      <ul className="mt-10 divide-y divide-stone-200 px-2">
        {filteredMenu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenuList();
  return menu;
}

export default Menu;
