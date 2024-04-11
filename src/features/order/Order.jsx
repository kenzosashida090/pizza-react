// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";



function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const  order = useLoaderData()
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const fetcher = useFetcher() // this hook allows us to retrieve data from  another route in this case the menu data.
  useEffect(()=>{
    if(!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu") //fetching the menu data from the /menu route
    }
  },[fetcher])
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold tracking-wide text-red-50">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold tracking-wide text-green-50">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5" >
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
            <ul className="divide-y divide-stone-200 border-b border-t">
              {cart.map((item) => <OrderItem item={item} key={item.pizzaId} ingredients={fetcher?.data?.find((el)=> el.id === item.pizzaId).ingredients ?? []}  isLoadingIngredients={fetcher.state === "loading"} />) }
              {/* if there is not ingridients with the  ?? with dlecare an empty array to avoid errors of the join propetie */}
            </ul>
      <div className="space-y-2 bg-stone-200 py-5 px-6">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader ({params}){ // react-router providesd to the loader functions some props like the params of the url
  const order = await getOrder(params.orderId)
  return order
}
export default Order;
