import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdGlobe } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import SearchBar from './SearchBar';
import HorizontalScrollList from './HorizontalScrollList';
import "../Styles/Navbar.css"

const Navbar = ({ setCategory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setShowSearchBar(true);
        } else {
            setShowSearchBar(false);
        }
    };

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

                    {/* Right Side Icons */}
                    <div className="navbar-right"> 
                        <button className="right-link">
                            <IoMdGlobe className="navbar-icon" />
                        </button>
                        <div onClick={toggleMenu} className="navbar-icons">
                            <div className="sm:block hidden">
                                <GiHamburgerMenu className="navbar-icon" />
                            </div>
                            <div className="sm:hidden">
                                <button onClick={toggleMenu}>
                                    {isOpen ? <FaTimes className="navbar-icon" /> : <FaBars className="navbar-icon" />}
                                </button>
                            </div>
                            <FaUserCircle className="navbar-profile" />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mobile-menu visible">
                        <NavLink to="/" className="mobile-menu-link">
                            Sign up
                        </NavLink>
                        <NavLink to="/" className="mobile-menu-link">
                            Log in
                        </NavLink>
                        <div className="mobile-menu-divider"></div>
                        <NavLink to="/" className="mobile-menu-link">
                            Gift Cards
                        </NavLink>
                        <NavLink to="/" className="mobile-menu-link">
                            Airbnb Your Home
                        </NavLink>
                        <NavLink to="/" className="mobile-menu-link">
                            Host an Experience
                        </NavLink>
                        <NavLink to="/" className="mobile-menu-link">
                            Help Center
                        </NavLink>
                    </div>
                )}
            </div>

            <SearchBar />
            <HorizontalScrollList setCategory={setCategory} />
        </header>
    );
};

export default Navbar;
