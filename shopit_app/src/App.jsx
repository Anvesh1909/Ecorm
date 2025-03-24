import React, { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/home/HomePage"
import MainLayout from "./layout/MainLayout"
import NotFoundPage from './components/ui/NotFoundPage'
import ProductPage from './components/Product/ProductPage'
import api from './api'
import CartPage from './components/cart/CartPage'
import CheckoutPage from './components/checkout/CheckoutPage'
import LoginPage from './components/user/LoginPage';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import UserProfilePage from './components/user/UserProfilePage';
import PaymentStatus from './components/checkout/PaymentStatus';


const App = () => {

  const [numCartItems, setNumberCartItems] = useState(0);

  const cart_code = localStorage.getItem('cart_code');

  useEffect(function(){
    if(cart_code){
      api.get(`get_cart_stat?cart_code=${cart_code}`)
      .then(res=>{
        setNumberCartItems(res.data.num_of_items);
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err.message);
      })
    }
  },[])


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout numCartItems={numCartItems} />}>
            <Route index element={<HomePage />} />
            <Route path='products/:slug' element={<ProductPage setNumberCartItems={setNumberCartItems} />}/>  
            <Route path='cart' element={<CartPage />} />
            <Route path='checkout' element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>} />
            <Route path='login' element={<LoginPage />} />
            <Route path='profile' element={<UserProfilePage />} />
            <Route path='payment-status' element={<PaymentStatus />} />

            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>



        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
