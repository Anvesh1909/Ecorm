import React from 'react'
import UserInfo from './UserInfo'
import OrderHistoryItemContainer from './OrderHistoryItemContainer'

import api from '../../api'
import { useState, useEffect } from 'react';
import Spinner from '../ui/Spinner';

const UserProfilePage = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [orderHistory, setOrderHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api
          .get("/get_user_info")
          .then((response) => {
            setUserInfo(response.data);
            setOrderHistory(response.data.items);
            setLoading(false);
            console.log(response.data.items);
          })
          .catch((error) => {
            console.error("Error fetching user info:", error);
            setLoading(false);
          });
      }, []);
      

    if(loading){
        return <Spinner loading={loading}/>
    }

    return (
        <div className="container mt-5 mb-5">
          {loading ? (
            <p>Loading user information...</p>
          ) : userInfo ? (
            <>
              <UserInfo userInfo={userInfo} />
              <OrderHistoryItemContainer orderHistory={orderHistory} />
            </>
          ) : (
            <p>Error loading user information.</p>
          )}
        </div>
      );
      
}

export default UserProfilePage
