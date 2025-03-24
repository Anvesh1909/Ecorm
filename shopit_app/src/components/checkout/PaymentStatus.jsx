import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../../api';

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePaymentStatus = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const paymentData = {
          razorpay_payment_id: searchParams.get('razorpay_payment_id'),
          razorpay_order_id: searchParams.get('razorpay_order_id'),
          razorpay_signature: searchParams.get('razorpay_signature')
        };

        // Send POST request to backend
        const response = await api.post('/payment-callback/', paymentData);
        
        if (response.data.status === 'success') {
          setStatus('success');
          // Clear cart from localStorage
          localStorage.removeItem('cart_code');
        } else {
          setStatus('failed');
          setError(response.data.message || 'Payment failed. Please try again.');
        }
      } catch (error) {
        setStatus('failed');
        setError(error.response?.data?.message || 'An error occurred while processing your payment.');
        console.error('Payment status error:', error);
      }
    };

    handlePaymentStatus();
  }, [location]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              {status === 'processing' && (
                <>
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h4>Processing your payment...</h4>
                  <p>Please wait while we confirm your payment.</p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="text-success mb-3">
                     <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h4>Payment Successful!</h4>
                  <p>Thank you for your purchase. Your order has been confirmed.</p>
                  <Link to="/profile">
                    <button className="btn btn-primary mt-3">
                      view Order Details
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="btn btn-primary mt-3">
                      continue shopping
                    </button>
                  </Link>
                </>
              )}

              {status === 'failed' && (
                <>
                  <div className="text-danger mb-3">
                    <i className="bi bi-x-circle-fill" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h4>Payment Failed</h4>
                  <p>{error || 'There was an issue with your payment.'}</p>
                  <Link to="/profile">
                    <button className="btn btn-primary mt-3">
                      view Order Details
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="btn btn-primary mt-3">
                      continue shopping
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus; 