import { createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import api from "../api";

const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [isAuthorised, setIsAuthorised] = useState(false);
    const [username, setUsername] = useState('');
    
    const handleAuth = () =>{
        const token = localStorage.getItem('token');

        if(token){
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if(decodedToken.exp < currentTime){
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                
            } else {
                setIsAuthorised(true);
                setUsername(decodedToken.username);
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setIsAuthorised(false);
        setUsername('');
    }

    function getUsername(){
        api.get('get_username')
        .then(response => {
            setUsername(response.data.username);
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleAuth();
        getUsername();
    }, []);
    
    return (
        <AuthContext.Provider value={{isAuthorised, username, handleAuth, handleLogout, getUsername}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContext;
export {AuthProvider};