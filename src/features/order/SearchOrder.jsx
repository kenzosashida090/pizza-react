import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const [query,setQuery] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault();
        if(!query) return
        navigate(`/order/${query}`)
        setQuery("")

    }
    return (
        <form onSubmit={handleSubmit}> {/* To submit the order number to search for */}

        <input className="w-28 rounded-full px-4 py-2 text-sm bg-yellow-100 sm:w-64 placeholder:text-stone-400 sm:focus:w-72 focus:ring focus:outline-none focus:ring-yellow-500 focus:ring-opacity-50 transistion-all  duration-500" placeholder="Search order #" onChange={e=>setQuery(e.target.value)} />
        </form>
    
        )
}

export default SearchOrder
