import Button from "../../ui/Button"
import {useDispatch} from "react-redux"
import { delteItem } from "./cartSlice"
function DeleteItem({pizzaId}) {
    const dispatch = useDispatch()
    
    return (
        <Button onClick={()=> dispatch(delteItem(pizzaId))}  type="small">Delete</Button>
    )
}

export default DeleteItem
