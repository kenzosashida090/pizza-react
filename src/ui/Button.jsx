import { Link } from "react-router-dom"

function Button({children, disabled,to,type}) { 
    const base = "inline-block text-sm  bg-yellow-400  font-semibold tracking-wide  uppercase  text-stone-800 transition-colors duration-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 rounded-full hover:bg-yellow-300"
    const styles = {
        primary:base + " px-4 py-3 sm:px-6 md:py-4",
        small: base + " py-2 px-4 sm:px-5 md:py-2.5 text-xs ",
        secondary: "inline-block px-4 py-2.5 sm:px-6 md:py-3.5   font-semibold tracking-wide  uppercase  text-stone-400 transition-colors duration-500 focus:outline-none focus:ring focus:ring-stone-300 focus:bg-stone-300 focus:ring-offset-2 rounded-full hover:bg-stone-300 focus:text-stone-300 border-2 border-stone-300"
    }
    if(to) return <Link className={styles[type]} to={to}>{children}</Link>
    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button


