import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import { Link } from 'react-router-dom'

const CartTotal = () => {

    const {currency, delivery_fee,getCartAmount} =useContext(ShopContext)

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'}></Title>
        </div>
        <div className='flx flex-col gap-2  text-sm'>
            <div className='flex justify-between m-2'>
                <p>Subtotal</p>
                <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between m-2'>
                <p>Shipping Fee</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between m-2'>
               <b>Total</b>
               <b>{currency} {getCartAmount()=== 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
            </div>
        </div>
        <Link to='/'><button className='w-full border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 mt-5'>PROCEED TO CHECKOUT</button></Link>

    </div>
  )
}

export default CartTotal