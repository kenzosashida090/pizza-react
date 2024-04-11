import { useFetcher } from "react-router-dom"
import Button from "../../ui/Button"
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({order}) {
    const fetcher = useFetcher();
    
    return (
        // fetcher.Form allows us to write into the data from another page and re render the page in this case  from the order 
        <fetcher.Form method="PATCH" className="text-right"> 
       <Button type="primary">Make priority</Button>
        </fetcher.Form>
    )
}

export default UpdateOrder

export async function action({ params}) {
    const data = { priority:true}
    console.log("hola")
    await updateOrder(params.orderId,data)
    return null
} 