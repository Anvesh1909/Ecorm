import React from 'react';
import styles from './OrderHistoryItem.module.css';
import { BASE_URL } from '../../api';
import formatDate from '../../FormatDate';


const OrderHistoryItem = ({item}) => {
  return (
    <div className={`order-item mb-3 ${styles.orderItem}`}>
      <div className="row align-items-center">
        <div className="col-md-2">
          <img
            src={`${BASE_URL}${item.product.image}`}
            alt="OrderItem"
            className="img-fluid rounded-3"
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-md-5">
          <h5 className="mb-1">{item.product.name}</h5>
          <p className="text-muted">Category: {item.product.category}</p>
        </div>
        <div className="col-md-3 text-center">
          <h6>Order ID: {item.order_id}</h6>
          <p>Order Date: {formatDate(item.order_date)}</p>
        </div>
        <div className="col-md-2 text-center">
          <div className="text-muted">Quantity: 1</div>
          <div className="text-muted">Price: ₹100</div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
