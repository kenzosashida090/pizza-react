import { RouterProvider, createBrowserRouter } from "react-router-dom" // ROUTER
import Home from "./ui/Home"
import Menu, {loader as menuLoader} from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import Order from "./features/order/Order"
import AppLayout from "./ui/AppLayout"

const router = createBrowserRouter([
  {
    element:<AppLayout/>, //No need to pass the path, react-router will be considered as the app layout
    children:[
      {
        path:"/", // define the path home page
        element: <Home/> 
    
      },
      {
        path:"/menu",
        element:<Menu/>, 
        loader:menuLoader// Loader is a react router function that fetch data and pass the data and render the componenrt
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/order/new",
        element:<CreateOrder/>
      },
      {
        path:"/order/:orderId",
        element:<Order/>
      }
    ]
  },
  
])


function App() {
  return <RouterProvider router={router}/>
}

export default App
