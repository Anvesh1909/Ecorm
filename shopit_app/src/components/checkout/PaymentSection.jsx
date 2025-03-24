import React from 'react'
import styles from './PaymentSection.module.css'
import api from '../../api'

const PaymentSection = () => {
  const handleRazorpayPayment = async () => {
    try {
      const cartCode = localStorage.getItem('cart_code');
      const response = await api.post('initiate-payment/', { cart_code: cartCode });
      
      const options = {
        key: response.data.key,
        amount: response.data.amount,
        currency: response.data.currency,
        name: "ShopIT",
        description: "Payment for your order",
        order_id: response.data.order_id,
        handler: function (razorpayResponse) {
          // Use the callback_url from our API response
          window.location.href = `${response.data.callback_url}?razorpay_payment_id=${razorpayResponse.razorpay_payment_id}&razorpay_order_id=${razorpayResponse.razorpay_order_id}&razorpay_signature=${razorpayResponse.razorpay_signature}`;
        },
        prefill: {
          name: response.data.name,
          email: response.data.email,
          contact: response.data.contact
        },
        theme: {
          color: "#6050DC"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation failed:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <div className="col-md-4">
        <div className="card-header" style={{backgroundColor : '#6050DC', color : 'white'}}>
            <h5 className="card-title">Payment Details</h5>
        </div>
        <div className="card-body">
            <button 
              className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} 
              onClick={handleRazorpayPayment}
            >
              <i className="bi bi-credit-card"></i>
              Pay with Razorpay
            </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSection
