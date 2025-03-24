import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';

const NavBarLink = () => {
    const { isAuthorised, username, handleAuth, setIsAuthorised, setUsername, handleLogout } = useContext(AuthContext);

  

    return (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthorised ? (
                <>
                    <li className="nav-item">
                        <NavLink 
                            to="/profile" 
                            className={({ isActive }) => isActive ? 'nav-link active fw-semibold' : 'nav-link fw-semibold'}
                        >
                            Hi, {username}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link btn btn-link fw-semibold">
                            Logout
                        </button>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            to="/profile" 
                            className={({ isActive }) => isActive ? 'nav-link active fw-semibold' : 'nav-link fw-semibold'}
                        >
                            Profile
                        </NavLink>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item">
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) => isActive ? 'nav-link active fw-semibold' : 'nav-link fw-semibold'}
                        >
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            to="/register" 
                            className={({ isActive }) => isActive ? 'nav-link active fw-semibold' : 'nav-link fw-semibold'}
                        >
                            Register
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    );
};

export default NavBarLink;
