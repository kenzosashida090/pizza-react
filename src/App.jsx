import { RouterProvider, createBrowserRouter } from "react-router-dom" // ROUTER
import Home from "./ui/Home"
import Menu, {loader as menuLoader} from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import Order, { loader as orderLoader } from "./features/order/Order"
import AppLayout from "./ui/AppLayout"
import Error from "./ui/Error"
const router = createBrowserRouter([
  {
    element:<AppLayout/>, //No need to pass the path, react-router will be considered as the app layout
    errorElement:<Error/>, // render  if there is an error in the page
    children:[
      {
        path:"/", // define the path home page
        element: <Home/> 
    
      },
      {
        path:"/menu",
        element:<Menu/>, 
        errorElement:<Error/>, //also can be set on the childs routes
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
        element:<Order/>,
        loader: orderLoader,
        errorElement:<Error/>,
      }
    ]
  },
  
])


function App() {
  return <RouterProvider router={router}/>
}

export default App
