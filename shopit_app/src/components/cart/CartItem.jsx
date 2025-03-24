import React, { useState } from 'react'
import { BASE_URL } from '../../api'
import api from '../../api'
import { toast } from 'react-toastify';

const CartItem = ({item, setCartTotal, cartItems, setCartItems}) => {

    const [quantity, setQuantity] = useState(item.quantity)

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }

    const updated_item = {quantity : quantity, item_id : item.id}

    const updateQuantity = () => {
        api.patch('update_quantity', updated_item)
        .then(res => {
            console.log(res)
            // Update cart items with new quantity
            setCartItems(prevItems => 
                prevItems.map(item => {
                    if(item.id === res.data.data.id){
                        return res.data.data; // Replace with updated item from server
                    }
                    return item;
                })
            );
            // Update cart total by recalculating from updated cart items
            setCartItems(prevItems => {
                const newTotal = prevItems.reduce((acc, item) => acc + item.total, 0);
                setCartTotal(newTotal);
                return prevItems;
            });
            toast.success('Quantity updated successfully!', {
                position: "top-right",
                autoClose: 2000,
            });
        })
        .catch(err => {
            console.log(err)
            toast.error('Failed to update quantity!', {
                position: "top-right",
                autoClose: 2000,
            });
        })
    }

    const deleteItem = () => {
        // Show confirmation dialog
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            api.delete('delete_item', {data : {item_id : item.id}})
            .then(res => {
                console.log(res)
                // Update cart items by filtering out the deleted item
                setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id))
                // Update cart total
                setCartTotal(prevTotal => prevTotal - item.total)
                toast.success('Item removed from cart!', {
                    position: "top-right",
                    autoClose: 2000,
                });
            })
            .catch(err => {
                console.log(err)
                toast.error('Failed to remove item!', {
                    position: "top-right",
                    autoClose: 2000,
                });
            })
        }
    }

    return (
        <div className='col-md-12 '>
            <div 
                className="cart-item d-flex align-items-center mb-3 p-3"
                style={{backgroundColor : '#f8f9fa', borderRadius: '8px'}}
            >
                <img 
                    src={`${BASE_URL}${item.product.image}`} 
                    alt="product Image" 
                    className="img-fluid" 
                    style={{width:'80px', height: '80px', objectFit:'cover', borderRadius: '5px'}}
                />
                <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.product.name}</h5>
                    <p className="mb-0 text-muted">{`₹${item.total}`}</p>
                </div>
                <div className="d-flex align-items-center">
                    <input 
                        type="number" 
                        className="form-control me-2" 
                        style={{width: '60px'}}
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                    />
                    <button 
                        className="btn btn-outline-primary me-2"
                        onClick={updateQuantity}
                    >
                        Update
                    </button>
                    <button 
                        className="btn btn-outline-danger"
                        onClick={deleteItem}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
