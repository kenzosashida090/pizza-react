import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import Username from "../features/user/Username"
function Header() {
    return (
        <header className="bg-yellow-400 uppercase px-4 py-3 border-b border-stone-500 flex items-center justify-between  ">
            <Link className="tracking-widest"  to="/">React Pizza Co.</Link> 
           <SearchOrder/>
           <Username/>
        </header>
    )
}

export default Header
