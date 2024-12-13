import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdGlobe } from 'react-icons/io';
import { Navigate, NavLink } from 'react-router-dom';
import "../Styles/Navbar.css"
import { useAuthStore } from '../store/useAuthStore';

const Navbar = ({ setCategory }) => {
    const {user,setUser,Logout} = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () =>{
        Logout();
    }
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setShowSearchBar(true);
        } else {
            setShowSearchBar(false);
        }
    };
    const handleProfileClick = () =>{
        <Navigate to='/profile'/>
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="navbar-header">
            <div className="navbar-wrapper">
                <div className="navbar-inner">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="navbar-logo">
                            Airbnb
                        </NavLink>
                    </div>

                    {showSearchBar ? (
                        <div className="navbar-searchbar visible">
                            <p className="searchbar-input">Anywhere</p>
                            <p className="searchbar-input">Any week</p>
                            <p className="searchbar-input placeholder">Any Guests</p>
                            <AiOutlineSearch className="searchbar-icon" />
                        </div>
                    ) : (
                        <div className="navbar-links visible">
                            <NavLink to="/stays" className="nav-link">
                                Stays
                            </NavLink>
                            <NavLink to="/experiences" className="nav-link">
                                Experiences
                            </NavLink>
                        </div>
                    )}

                    <div className="navbar-right"> 
                        <button className="right-link">
                            <IoMdGlobe className="navbar-icon" />
                        </button>
                        <div onClick={toggleMenu} className="navbar-icons">
                           
                            <div className="sm:hidden">
                                <button onClick={toggleMenu}>
                                    {isOpen ? <FaTimes className="navbar-icon" /> : <FaBars className="navbar-icon" />}
                                </button>
                            </div>
                            <FaUserCircle className="navbar-profile" />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="mobile-menu visible">
                        <NavLink to="/signup" className="mobile-menu-link" >
                            Sign up
                        </NavLink>
                        <NavLink to="/login" className="mobile-menu-link" onClick={<Navigate to={'/login'} />}>
                            Log in
                        </NavLink>
                        <NavLink to="/login" className="mobile-menu-link" onClick={handleLogout}>
                            Log Out
                        </NavLink>
                        <NavLink to="/profile" className="mobile-menu-link" onClick={handleProfileClick}>
                            My Profile
                        </NavLink>
                        <div className="mobile-menu-divider"></div>
                        <NavLink to="/listingform" className="mobile-menu-link" onClick={<Navigate to={'/listingform'} />}>
                            Airbnb Your Home
                        </NavLink>
                        <NavLink to="/" className="mobile-menu-link" onClick={<Navigate to={'#'} />}>
                            Host an Experience
                        </NavLink>
                        <NavLink to="/" className="mobile-menu-link" onClick={<Navigate to={'/helpcenter'} />}>
                            Help Center
                        </NavLink>
                    </div>
                )}
            </div>

           
        </header>
    );
};

export default Navbar;
