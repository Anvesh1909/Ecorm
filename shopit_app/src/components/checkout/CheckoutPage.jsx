import React from 'react'
import OrderSummary from './OrderSummary'
import PaymentSection from './PaymentSection'
import useCartData from '../../hooks/useCartData'
import Spinner from '../ui/Spinner'

const CheckoutPage = () => {
    const {cartItems, setCartItems, cartTotal, setCartTotal, loading, error, tax} = useCartData();

    console.log('CheckoutPage render:', { loading, error, cartItems, cartTotal });

    if (loading) {
        console.log('CheckoutPage: Loading state');
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner loading={loading} />
            </div>
        );
    }

    if (error) {
        console.log('CheckoutPage: Error state', error);
        return (
            <div className="container my-5">
                <div className="alert alert-danger">
                    <h4 className="alert-heading">Error Loading Cart</h4>
                    <p>There was an error loading your cart data. Please try again later.</p>
                    <hr />
                    <p className="mb-0">{error}</p>
                </div>
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        console.log('CheckoutPage: Empty cart state');
        return (
            <div className="container my-5">
                <div className="alert alert-info">
                    <h4 className="alert-heading">Empty Cart</h4>
                    <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
                </div>
            </div>
        );
    }

    console.log('CheckoutPage: Rendering main content');
    return (
        <div className='container my-5'>
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                <div className="col-md-8">
                    <OrderSummary cartItems={cartItems} cartTotal={cartTotal} tax={tax} />
                </div>
                <div className="col-md-4">
                    <PaymentSection />
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage
