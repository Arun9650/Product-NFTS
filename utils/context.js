import Cookies from 'js-cookie';
import React, { createContext,  useReducer } from 'react'

 export  const AppWrapper = createContext();

  const initialState = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItem : []}
    // cart:{cartItem:[]}

  }


  const reducer = (state,   action) => {
    switch(action.type){
      case  'CART_ADD_ITEM': {
          //get the product detials 
        const newItem = action.payload;
        // check if product already exist or not 
        // if yes then not add the product 
        // update the quntity of product 

        const existItem = state.cart.cartItem.find(
          (item) => item._id === newItem._id
        ); 
        
        // if no then add the product in the cart 
        const cartItem = existItem 
        ?  state.cart.cartItem.map((item) => 
             item._id === existItem._id  ? newItem : item
        )
        : [...state.cart.cartItem, newItem];

        // return the state with the change in the cart which is all the state and the updated cart 
        // or you can say add the new cartItem in the cart 

        Cookies.set('cart', JSON.stringify({...state.cart, cartItem}))
        return {  ...state, cart:{ ...state.cart, cartItem} }


        

      }

      case 'CART_REMOVE_ITEM' : {
        const cartItem = state.cart.cartItem.filter(
          (item) => item._id !== action.payload._id
        );
        Cookies.set('cart', JSON.stringify({...state.cart, cartItem}))
        return {...state, cart:{...state.cart , cartItem}}

      }

      default: 
      return  state
    }
  }

export  function AppContext({children}) {

  const [state, dispatch ] = useReducer(reducer, initialState );
    const value ={state,dispatch}

  return (
    <AppWrapper.Provider value={value}>
      {children}
    </AppWrapper.Provider>
  )
}
