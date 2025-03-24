import React from 'react'
import styles from './OrderSummary.module.css'
import OrderItem from './OrderItem'

const OrderSummary = ({cartItems, cartTotal, tax}) => {

    const total = (cartTotal + tax).toFixed(2);

  return (
    <div>
      <div className="col-mb-8">
        <div className={`card mb-4 ${styles.card}`}>
            <div className="card-header" style={{backgroundColor : '#6050DC'}}>
                <h5 className="card-title" style={{color : 'white'}}>Cart Summary</h5>
            </div>
            <div className="card-body">
                <div className="px-3">
                    {cartItems.map(item => <OrderItem key={item.id} item={item} />)}
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <h6>Total</h6>
                <h6>{`₹${total}`}</h6>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
