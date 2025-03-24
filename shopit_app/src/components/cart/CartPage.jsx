import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import Spinner from '../ui/Spinner'
import api from '../../api'
import useCartData from '../../hooks/useCartData'
const CartPage = () => {

    const {cartItems,setCartItems, cartTotal, setCartTotal, loading, tax} = useCartData();

    if(loading) {
      return <Spinner loading={loading} />
    }

    if(cartItems.length < 1){
      return (
          <div className="alert alert-primary my-5" role="alert">
            you haven't added any item to your cart. 
        </div>
      )
    }

  return (
    <div className='container my-3 py-3' style={{height:'80vh' ,overflow:'scroll'}}>
        <h5 className="mb-4">Shopping Cart</h5>
        <div className="row">
            <div className="col-md-8">
                {cartItems.map(item=> <CartItem 
                    key={item.id} 
                    item={item} 
                    setCartTotal={setCartTotal} 
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                /> )}
            </div>
            <CartSummary cartTotal={cartTotal}  tax={tax} />
        </div>
    </div>
  )
}

export default CartPage
