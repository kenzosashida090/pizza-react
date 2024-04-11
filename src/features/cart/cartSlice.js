
import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    cart: [],

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addItem(state,action) {
            state.cart.push(action.payload);
        },
        delteItem(state,action) {
          state.cart =  state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increasItemQuantity(state,action) {
                const item = state.cart.find((item)=> item.pizzaId === action.payload)
                item.quantity++
                item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state,action){
            const item = state.cart.find((item)=> item.pizzaId === action.payload)
            item.quantity--
            item.totalPrice =  item.quantity*item.unitPrice
            if(item.quantity === 0 ) {
            cartSlice.caseReducers.delteItem(state,action) // delete the item from the array call it from the actual slice creator
            }
        },
        clearCart(state){
            state.cart=[]
        }

        
        

    }
})

export const {addItem,delteItem,increasItemQuantity,decreaseItemQuantity,clearCart} = cartSlice.actions;

export default  cartSlice.reducer;
export const getCart = (state)=>state.cart.cart
export const getTotalCartQuantity = (state)=> state.cart.cart.reduce((acc,item)=>acc + item.quantity,0)// get total quantity of items in the cart
export const getCurrentQuantityById =(id) => (state) => state.cart.cart.find((item)=> item.pizzaId === id)?.quantity ?? 0 // get the quantity of an specific pizza on the cart
export const getTotalCartPrice = (state)=> state.cart.cart.reduce((acc,item)=>acc + item.totalPrice,0)// get total price of all the items in the cart with te reduce function 

//The up selector functions will cause at large scale application a perfomance issue (to optimize this selector we use the library reselect)