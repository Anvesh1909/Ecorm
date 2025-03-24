import { useState, useEffect } from 'react';
import api from '../api';

function useCartData() {
    const cart_code = localStorage.getItem('cart_code');
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0.00);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tax = 4.00;

    useEffect(() => {
        const fetchCartData = async () => {
            console.log('useCartData: Starting fetch with cart_code:', cart_code);
            
            if (!cart_code) {
                console.log('useCartData: No cart_code found');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                console.log('useCartData: Making API request');
                const response = await api.get(`get_cart?cart_code=${cart_code}`);
                console.log('useCartData: API response:', response.data);
                
                if (response.data && response.data.items) {
                    console.log('useCartData: Setting cart items:', response.data.items);
                    setCartItems(response.data.items);
                    setCartTotal(response.data.sum_total || 0);
                } else {
                    console.log('useCartData: No items in response');
                    setCartItems([]);
                    setCartTotal(0);
                }
            } catch (err) {
                console.error('useCartData: Error fetching cart:', err);
                console.error('useCartData: Error details:', err.response?.data || err.message);
                setError(err.message);
                setCartItems([]);
                setCartTotal(0);
            } finally {
                setLoading(false);
                console.log('useCartData: Loading complete');
            }
        };

        fetchCartData();
    }, [cart_code]);

    return {
        cartItems,
        setCartItems,
        cartTotal,
        setCartTotal,
        loading,
        error,
        tax
    };
}

export default useCartData;
