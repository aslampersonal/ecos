import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import axios from 'axios';

import './header.css'
import Toast from '../Toast/Toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";

import { useCont } from '../../context/MyContext';
import { useAuth } from "../../context/AuthContext";
import { BiSolidCart, BiLogInCircle, BiSearchAlt }from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { FaUser } from "react-icons/fa"
import { AiTwotoneShopping } from 'react-icons/ai';

function Header() {
    
    const { loggedIn, login, logout } = useAuth();
    const { cart, setCart, setToken, user, setUser, getCart } = useCont();
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {

        const jwtToken = Cookies.get("jwtToken");
        if (jwtToken) {
            const decodedToken = jwt_decode(jwtToken);
            setUser(decodedToken);
            login();
            document.getElementById("login-icon").style.display = "none";            
            document.getElementById("user-icon").style.display = "";            
            document.getElementById("cart-icon").style.display = ""            
            document.getElementById("logout-icon").style.display = "";
        } else {
            document.getElementById("login-icon").style.display = "";            
            document.getElementById("user-icon").style.display = "none";            
            document.getElementById("cart-icon").style.display = ""            
            document.getElementById("logout-icon").style.display = "none";
        }
        getCart();

    }, [loggedIn]);

    async function logoutUser() {

        const jwtToken = Cookies.get("jwtToken");
        const decodedToken = jwt_decode(jwtToken);
        if (decodedToken.email === "admin@gmail.com") {
            Cookies.remove("jwtToken");
            localStorage.removeItem('cartProducts');
            localStorage.removeItem("cart");
            setToken("");
            setUser(null);
            logout();
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000); 
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            try {
                const response = await axios.post('http://localhost:3000/api/users/logout',
                {username: user.username},
                {
                    headers: {
                      'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });
                console.log(user.username," - ", response.data.message);
                Cookies.remove("jwtToken");
                localStorage.removeItem('cartProducts');
                localStorage.removeItem("cart");
                setToken("");
                setUser(null);
                logout();
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 2000); 
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                console.error('Error login:', error);
            }
        }

    }

    async function searchProduct() {

    }
    
    return (
        <header className="header" id="header">
                <div id="header-news">
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p>
                    <p className="h-news-text">FREE SHIPPING ON ALL ORDERS ABOVE ₹1000</p> 
                </div>
                <nav className="navbar navbar-expand-lg" id="navbar">
                    <NavLink to="/">
                        <div id="h-logo-div">
                            <img id="logo" alt="" src="/src/assets/images/ucos-logo.png" />
                        </div> 
                    </NavLink>
                    <div id="h-nav-div-nav">
                        <ul id="h-nav-ul">
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to='/offers'>offers</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./store">Store</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"lips"}}>lips</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"face"}}>face</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"eyes"}}>eyes</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"skincare"}}>skin care</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"haircare"}}>hair care</NavLink>
                            </li>
                            <li className="h-nav-li">
                                <NavLink className="h-nav-a" to="./collections" state= {{title:"services"}}>services</NavLink>
                            </li>
                        </ul>
                    </div>
                    <form className='search-form'>
                        <button className='search-btn' type='submit' onChange={searchProduct}><BiSearchAlt className='search-icon' /></button>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="search"
                        />
                    </form>
                    <div id="h-nav-div-profile">
                            <NavLink to="./login">
                                <button className="btn" id="login-icon" >
                                    <BiLogInCircle className='top-icons' />
                                </button>
                            </NavLink>
                            <NavLink to="./profile">
                                <button className="btn" id="user-icon" >
                                    <FaUser className='top-icons' />
                                </button>
                            </NavLink>
                            <NavLink to="./cart">
                                <button className="btn" id="cart-icon" >
                                    <AiTwotoneShopping className='top-icons' style={{fontSize: "30px"}} />
                                    <label>{cart ? cart.length: ""}</label>
                                </button>
                            </NavLink>
                            <button onClick={logoutUser} className="btn" id="logout-icon" >
                                <FiLogOut className='top-icons' />
                            </button>
                    </div>
                </nav>
                {/* notification toasts */}
                <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
                    <Toast show={showToast} type="info" message="User logged out successfully" />
                </div>
        </header>

    );
}

export default Header;