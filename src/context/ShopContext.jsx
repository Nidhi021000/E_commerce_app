import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import {toast} from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider=(props)=>{
 
 const currency ='$';
 const delivery_fee =10;
 const [search,setSearch]=useState('')
 const [showSearch,setShowSearch]=useState(false)
 const [cartItems,setCartItems] = useState({})

 const addToCart = async(itemId,size)=>{
    let cartData = structuredClone(cartItems)

    if(!size){
        toast.error('Select Product Size')
        return;
    }

    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] += 1
        }
        else{
            cartData[itemId][size] = 1
        }

    }
    else{
        cartData[itemId]= {}
        cartData[itemId][size] = 1
    }
    setCartItems(cartData)
 }

 const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error("Error calculating cart count:", error);
        }
      }
    }
    return totalCount; // Ensure totalCount is returned
  }

  const updateQuantity=async(itemId,size,quantity)=>{

    let cartData = structuredClone(cartItems)
    cartData[itemId][size] =quantity
    setCartItems(cartData)

  }

  const getCartAmount=() =>{
    let totalAmount = 0
    for(const items in cartItems){
      let itemInfo = products.find(product => product._id === items);
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item] > 0){
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch (error) {
          
        }
      }
    }
    return totalAmount
  }
  
    const value={
        getCartAmount,updateQuantity,getCartCount,products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,cartItems,addToCart
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;