import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import api from '../../api'
import { jwtDecode } from 'jwt-decode'
import Spinner from './Spinner'

const ProtectedRoute = ({ children }) => {
    const [isAuthorised, setIsAuthorised] = useState(null);
    const location = useLocation();

    async function refreshToken(){
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            console.log("No refresh token found");
            setIsAuthorised(false);
            return;
        }

        try{
            console.log("Attempting to refresh token...");
            const response = await api.post("/token/refresh/", {
                refresh: refreshToken
            });
            if(response.status === 200){        
                localStorage.setItem("token", response.data.access);
                console.log("Token refreshed successfully");
                setIsAuthorised(true);
            } else {
                console.log("Token refresh failed - no 200 status");
                setIsAuthorised(false);
            }
        } catch (error) {
            console.log("Token refresh error:", error.response?.data || error.message);
            setIsAuthorised(false);
        }
    }

    async function verifyToken(){
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        console.log("Verifying token...");
        console.log("Token exists:", !!token);
        console.log("Refresh token exists:", !!refreshToken);

        if(!token || !refreshToken){
            console.log("Missing token or refresh token");
            setIsAuthorised(false);
            return;
        }

        try{
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const expiry_date = decoded.exp;
            
            console.log("Token expiry:", new Date(expiry_date * 1000).toLocaleString());
            console.log("Current time:", new Date(currentTime * 1000).toLocaleString());
            
            if(expiry_date < currentTime){
                console.log("Token expired, attempting refresh");
                await refreshToken();
            } else {
                console.log("Token valid");
                setIsAuthorised(true);
            }
        } catch (error) {
            console.log("Token verification error:", error.message);
            setIsAuthorised(false);
        }
    }

    useEffect(() => {
        console.log("ProtectedRoute mounted");
        verifyToken();
    }, []);

    if(isAuthorised === null){
        console.log("Still loading authorization status");
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Spinner />
            </div>
        );
    }

    console.log("Authorization status:", isAuthorised);
    
    if (!isAuthorised) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return children;
}

export default ProtectedRoute
