import React, { useState } from "react";
import "./Sidebar.css"
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useCont } from '../../../context/MyContext';
import { useAuth } from "../../../context/AuthContext";
import Toast from "../../Toast/Toast";
import axios from "axios";

export default function Sidebar() {
    
    const { loggedIn, login, logout } = useAuth();
    const { cart, setCart, setToken, user, setUser, getCart } = useCont();

    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // getUsers();
    })

    async function logoutAdmin() {
        const jwtToken = Cookies.get("jwtToken");
        const decodedToken = jwt_decode(jwtToken);
        if (decodedToken.email === "admin@gmail.com") {
            try {
                const response = await axios.post('http://localhost:3000/api/admin/logout',
                {username: "admin"},
                {
                    headers: {
                        'Content-Type': 'application/json', // or 'application/json' if needed
                    },
                });
                console.log("Admin ", response.data.message);
                Cookies.remove("jwtToken");
                localStorage.removeItem('cartProducts');
                localStorage.removeItem("cart");
                localStorage.removeItem("allUsers");
                localStorage.removeItem("allProducts");
                localStorage.removeItem("allOrders");
                localStorage.removeItem("orderList");
                localStorage.removeItem("orders");
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 2000); 
                setTimeout(() => {
                    window.location.reload();
                    navigate("/login");
                }, 2000);
            } catch (error) {
                console.error('Error login:', error);
            }
        }
    }
    
    return (
        <>
        <div className="sidebar">
            {/* notification toasts */}
            <div className="toast-container position-fixed top-0 start-50 translate-middle-x" style={{zIndex: "10"}}>
                <Toast show={showToast} type="info" message="Admin logged out successfully" />
            </div>
            <div className="center">
                <div className="admin-h-icon">
                    <div className="admin-h-txt">
                        <img src="/src/assets/images/icons/admin.png" className="admin-icon" />
                        <span><strong>Admin</strong></span>
                    </div>
                </div>
                <ul className="ul">
                    <p className="title">MAIN</p>
                    <li className="li">
                        <NavLink to="/admin" className="nav-link">
                        <DashboardIcon className="icon" />
                        <span className="span">Dashboard</span>
                        </NavLink>
                    </li>
                    <p className="title">LISTS</p>
                    <li className="li">
                        <NavLink to="/admin/users" className="nav-link">
                            <PersonOutlineIcon className="icon" />
                            <span className="span">Users</span>
                        </NavLink>
                    </li>
                    <li className="li">
                        <NavLink to="/admin/products" className="nav-link">
                        <StoreIcon className="icon" />
                        <span className="span">Products</span>
                        </NavLink>
                    </li>
                    <li className="li">
                        <NavLink to="/admin/orders" className="nav-link">
                        <CreditCardIcon className="icon" />
                        <span className="span">Orders</span>
                        </NavLink>
                    </li>
                    <li className="li">
                        <NavLink to="/admin/delivery" className="nav-link">
                        <LocalShippingIcon className="icon" />
                        <span className="span">Delivery</span>
                        </NavLink>
                    </li>
                    <p className="title">USEFUL</p>
                    <li className="li">
                        <NavLink to="/admin/stats" className="nav-link">
                        <InsertChartIcon className="icon" />
                        <span className="span">Stats</span>
                        </NavLink>
                    </li>
                    <li className="li">
                        <NavLink to="/admin/notifications" className="nav-link">
                        <NotificationsNoneIcon className="icon" />
                        <span className="span">Notifications</span>
                        </NavLink>
                    </li>
                    <p className="title">SERVICE</p>
                    <li className="li">
                        <NavLink to="/admin/system" className="nav-link">
                        <SettingsSystemDaydreamOutlinedIcon className="icon" />
                        <span className="span">System Health</span>
                        </NavLink>
                    </li>
                    <li className="li">
                        <NavLink to="/admin/logs" className="nav-link">
                        <PsychologyOutlinedIcon className="icon" />
                        <span className="span">Logs</span>
                        </NavLink>
                    </li>
                    <li className="li">
                        <NavLink to="/admin/settings" className="nav-link">
                        <SettingsApplicationsIcon className="icon" />
                        <span className="span">Settings</span>
                        </NavLink>
                    </li>
                    <p className="title">USER</p>
                    <li className="li">
                        <NavLink to="/admin/profile" className="nav-link">
                        <AccountCircleOutlinedIcon className="icon" />
                        <span className="span">Profile</span>
                        </NavLink>
                    </li>
                    <li className="li">
                        <ExitToAppIcon className="icon" />
                        <button className="button" onClick={logoutAdmin}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}