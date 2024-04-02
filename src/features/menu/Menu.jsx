import { useLoaderData } from "react-router-dom";
import {getMenu} from "../../services/apiRestaurant"
import MenuItem from "./MenuItem";
function Menu() {
  //render as fetch happened at the same time. Instead of fetching data weith useEffect that first will render and after fetch the data, that creates a data waterfall
  const menu = useLoaderData() //Fetch the data that is associated into this page, in this case is the loader function set in the App routing definition
  console.log(menu)
  return <ul>
    {menu.map((pizza)=> <MenuItem pizza={pizza} key={pizza.id} />)}
  </ul>;
}

export async function loader() { // this function fetch the data and return it 
  
  const menu = await getMenu()
  return menu;
}

export default Menu;
