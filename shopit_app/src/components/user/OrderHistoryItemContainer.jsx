import React from 'react';
import OrderHistoryItem from './OrderHistoryItem';

const OrderHistoryItemContainer = ({orderHistory}) => {
  return (
    <div className="card">
      <div className="card-header" style={{ backgroundColor: '#6050DC', color: 'white' }}>
        <h5>Order History</h5>
      </div>
      {/* Scrollable Order List */}
      <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {orderHistory.map((item) => (
          <OrderHistoryItem key={item.id} item={item} />
        ))} 
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer;
