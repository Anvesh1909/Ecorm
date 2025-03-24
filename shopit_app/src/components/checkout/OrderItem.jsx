import React from 'react'

import { BASE_URL } from '../../api'

const OrderItem = ({item}) => {
  return (
    <div className='d-flex justify-content-between align-items-center mb-3' style={{padding : '10px', border : '1px solid #ccc', borderRadius : '5px'}}>
      <div className='d-flex align-items-center'>
        <img src={`${BASE_URL}${item.product.image}`} className='img-fluid' alt={item.name} style={{width : '50px', height : '50px', objectFit : 'cover', marginRight : '10px'}} />
        <div>
          <h6 className='mb-0'>{item.product.name}</h6>
          <p className='mb-0'>{item.quantity} x ₹{item.product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
