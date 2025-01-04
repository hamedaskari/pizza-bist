// Menu.jsx
import { useLoaderData } from 'react-router-dom';
import { getMenuList } from '../../services/GetMenu';
import MenuItem from './MenuItem';
import { useSearch } from '../order/SearchContext';

function Menu() {
  const menu = useLoaderData();
  const { query } = useSearch();

  const filteredMenu = menu.filter((pizza) =>
    pizza.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {filteredMenu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenuList();
  return menu;
}

export default Menu;
