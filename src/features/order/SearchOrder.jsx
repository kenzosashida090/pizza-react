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

        <input placeholder="Search order #" onChange={e=>setQuery(e.target.value)} />
        </form>
    
        )
}

export default SearchOrder
