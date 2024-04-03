import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom" //To render all the child routes we use Outlet into the parent rout
import Loader from "./Loader"
import SearchOrder from "../features/order/SearchOrder"
function AppLayout() {  //We use the AppLayout as the parent of all the routes, all the childs will render inside this component
    const navigation = useNavigation() // Provides the actual state of the page router
    const isLoading = navigation.state === "loading"
    
    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
           
            {isLoading && <Loader/>}
            <Header/>{/* The applayout will have Header and Cart Overview static with nested routes */}
            <div className="sm:overflow-hidden  overflow-scroll overflow-x-hidden ">
            <main className="mx-auto max-w-3xl ">
            {/* If there is no to mucho space for the components on main will scroll only that section */}    
                <Outlet/>
            </main>
            </div>
            <CartOverview/>
        </div>
    )
}

export default AppLayout
