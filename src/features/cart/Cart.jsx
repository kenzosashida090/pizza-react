import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import {useSelector,useDispatch} from "react-redux"
import { clearCart, getCart } from './cartSlice';
import  EmptyCart from "./EmptyCart"
function Cart() {
  const cart = useSelector(getCart)
  const username = useSelector((state)=> state.user.username)
  const dispatch = useDispatch()
  if(!cart.length) return <EmptyCart/>
  return (
    <div className='p-4 py-3'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-lg font-semibold'>Your cart, {username} </h2>
      <ul className='mt-3 divide-y divide-stone-200'>
        {cart.map((pizza) => <CartItem item={pizza} key={pizza.pizzaId} />)}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button type="primary" to="/order/new">Order pizzas</Button>
        <Button onClick={()=>dispatch(clearCart())} type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
