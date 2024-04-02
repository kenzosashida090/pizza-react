import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom" //To render all the child routes we use Outlet into the parent rout
import Loader from "./Loader"
function AppLayout() {  //We use the AppLayout as the parent of all the routes, all the childs will render inside this component
    const navigation = useNavigation() // Provides the actual state of the page router
    const isLoading = navigation.state === "loading"
    
    return (
        <div className="layout">
            
            {isLoading && <Loader/>}

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
