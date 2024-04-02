import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet } from "react-router-dom" //To render all the child routes we use Outlet into the parent rout

function AppLayout() {  //We use the AppLayout as the parent of all the routes, all the childs will render inside this component
    
    return (
        <div>
            <Header/>{/* The applayout will have Header and Cart Overview static with nested routes */}

            <main>
                <h1>CONTENT</h1>
                <Outlet/>
            </main>
            <CartOverview/>
        </div>
    )
}

export default AppLayout
