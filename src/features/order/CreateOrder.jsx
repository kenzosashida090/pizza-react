import {  useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import {useSelector} from "react-redux"
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store"
import {formatCurrency} from "../../utils/helpers"
import {useDispatch} from "react-redux"
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const formErrors = useActionData(); //If there is an error, this will return what ever the action fucntion resposne
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? (totalCartPrice * 0.20): 0
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch() 
  // in this case we use formErrros to display if there is an error
 // const cart = fakeCart;

  const cart = useSelector(getCart)
 
  const {username, status:addressStatus, position, address, error:errorAddress} = useSelector((state)=> state.user)
  if(!cart.length)  return  <EmptyCart />
const isLoadingAddress = addressStatus === "loading"
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
{/* NEVER USE WIDTH INSIDE A FLEX CONTAINER INSTEAD USE GROW, THE TWO OTHER INPUTS ARE NO LONGER INSIDE A FLEX CONTAINER */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center  ">
          <label className="sm:basis-40">First Name</label>
          <input defaultValue={username} className="input grow" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center  " >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow relative ">
            <input className="input w-full" type="tel" name="phone" required />
          {formErrors?.phone && <p className="text-xs mt-2  text-red-500 ">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative "> 
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" defaultValue={address} required disabled={isLoadingAddress} />
            {addressStatus === "error" && <p className="text-xs mt-2  text-red-500 ">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude &&<span className="absolute right-[0px] top-[33px] z-50 sm:top-[0px]">

          <Button type="small" disabled={isLoadingAddress} onClick={(e)=>{
            e.preventDefault()
            dispatch(fetchAddress())
            
            }}>Get position</Button>
          </span>}
        </div>


        <div className="mb-12 flex gap-4 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-3 w-3 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
        <input type="hidden"  value={JSON.stringify(cart)} name="cart" />
        <input type="hidden" value={position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ""} />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>{ isSubmitting ? 'Placing order...':`Order now from ${formatCurrency(totalPrice)} `}</Button>
          
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){ // This  action will be trigger by the Form component provided by react-router
  //this function allows us to make Post, Update, Delete requests, configured on thje App.jsx file on the router options
 //This action will create a new order and the redirect to the order detailsr
 const formData = await request.formData()
 const data = Object.fromEntries(formData)

 const order = {
  ...data,
  cart:JSON.parse(data.cart),
  priority: data.priority === "true" // data.priority will be astring because it comes  from an HTML input which always sends strings

 }
 const errors = {}

 if(!isValidPhone(order.phone)) errors.phone = "Please provide a correct phone number. We might need it to contact you"
 
 if(Object.keys(errors).length>0) return errors //if there is any error inside the object error will return the errors
 const newOrder = await createOrder(order);
 store.dispatch(clearCart()) // this is not recommended at all export the entire store into a single file
 return redirect(`/order/${newOrder.id}`)  //all because we receive a request we need to return a resonse we make happend all the fetching here
} 

export default CreateOrder;
