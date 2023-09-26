import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import './header.css'
import { NavLink } from 'react-router-dom';
import { BsPersonCircle } from "react-icons/bs";
import { BiSolidCart }from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { useContext, useState } from "react";
import MyContext from '../../context/MyContext';

function Header() {

    // useEffect(() => {
    //     const jwtToken = Cookies.get('token');

    //     console.log("token:" + jwtToken);

    //     if (jwtToken) {
    //         setToken(jwtToken);
    //       }
    // }, []);

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState("none");

    function logoutUser() {
        console.log(user);
        setUser("adadad");
        console.log(user);
    }

    function loginUser() {

    }
    
    return (
        <header className="header" id="header">
            <div id="header-top">
                <div id="header-news">
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p> 
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
                    <div id="h-logo-div">
                        <img id="logo" alt="" src="/src/assets/images/ucos-logo.png" />
                    </div> 
                    <div id="h-nav-div-search">
                        <input
                        type="search"
                        id="h-search"
                        defaultValue=""
                        placeholder="Search..."
                        aria-required="false"
                        maxLength={100}
                        autoComplete="off"
                        aria-label="Search..."
                        />
                    </div>
                    <div id="h-nav-div-nav">
                        <ul id="h-nav-ul">
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to='/'>Home</NavLink>
                            </li>
                            <li className="drop-li">
                                <NavLink className="drop-link" to="./store">Store<i className="fa fa-caret-down"></i></NavLink>
                                <div className="dropdown-content bg-light" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to="./skin-care-products">Skin Care</NavLink>
                                    <NavLink className="dropdown-item" to="./cosmetic-products">Cosmetics</NavLink>
                                </div>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./about-us">About Us</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./contact-us">Contact Us</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div id="h-nav-div-profile">
                            <a className="btn" id="login-icon" onClick={logoutUser}>
                                <BsPersonCircle className='top-icons' />
                            </a>
                            <a className="btn" id="cart-icon" href="./cart">
                                <BiSolidCart className='top-icons' />
                            </a>
                            <a className="btn" id="logout-icon" href="./cart" style={{display: logged}} >
                                <FiLogOut className='top-icons' />
                            </a>
                    </div>
                </nav>
            </div>
        </header>

    );
}

export default Header;