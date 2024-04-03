import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

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
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const formErrors = useActionData(); //If there is an error, this will return what ever the action fucntion resposne
  // in this case we use formErrros to display if there is an error
  const cart = fakeCart;
  console.log(formErrors)
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input className="w-full rounded-full border-stone-200 px-3 py-2 text-sm transition-all duration-100 placeholder:text-stone-400 focus:ring focus:outline-none focus:ring-yellow-400" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-3 w-3 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
        <input type="hidden"  value={JSON.stringify(cart)} name="cart" />
          <button className="inline-block  bg-yellow-400 py-3 px-4 font-semibold tracking-wide  uppercase  text-stone-800 transition-colors duration-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 rounded-full hover:bg-yellow-300 " disabled={isSubmitting}>{ isSubmitting ? 'Placing order...':'Order now'}</button>
          
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
  priority: data.priority === "on"

 }
 const errors = {}

 if(isValidPhone(order.phone)) errors.phone = "Please provide a correct phone number. We might need it to contact you"
 if(Object.keys(errors)>0) return errors
 const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`)  //all because we receive a request we need to return a resonse we make happend all the fetching here
} 

export default CreateOrder;
