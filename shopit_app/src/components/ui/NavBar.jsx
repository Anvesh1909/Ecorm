import React from 'react';
import {Link} from 'react-router-dom';
import {FaCartShopping} from 'react-icons/fa6';
import { useTheme } from '../../context/ThemeContext';
import styles from "./NavBar.module.css"
import themeStyles from '../../styles/theme.module.css'
import NavBarLink from './NavBarLink';

const NavBar = ({numCartItems}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={`navbar navbar-expand-lg navbar-light shadow-sm py-3 ${styles.stickyNavbar}`}>
        <div className="container">
            <Link className='navbar-brand fw-bold text-uppercase' to="/">SHOPIT</Link>
            <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse' 
                data-bs-target='#navbarContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
                <NavBarLink />
                <div className="d-flex align-items-center">
                    <label className={themeStyles['theme-switch']}>
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleTheme}
                        />
                        <span className={themeStyles.slider}></span>
                    </label>
                    <Link to='/cart' className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
                        <FaCartShopping/>
                        {numCartItems === 0 || <span 
                            className='position-absolute top-0 start-100 translate-middle badge rounded-pill'
                            style={{ fontSize:'0.85rem', padding:'0.5em 0.65em', backgroundColor:'#6050DC'}}
                        >
                            {numCartItems}
                        </span>}
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
