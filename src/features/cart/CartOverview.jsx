import { Link } from "react-router-dom";
import {useSelector} from "react-redux" // select the state  of the store in this case cart
import { getTotalCartPrice } from "./cartSlice";
import { getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartPrice = useSelector(getTotalCartPrice)
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  if (!totalCartQuantity) return null 
  //Make all the calcutation it is a good practice in redux
  return (
    <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 md:text-base flex items-center justify-between">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6 text-sm ">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link className="" to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
