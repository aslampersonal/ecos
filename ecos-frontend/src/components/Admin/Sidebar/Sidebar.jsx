import React from "react";
import "./Sidebar.css"
import { NavLink } from "react-router-dom";
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

export default function Sidebar() {
    
    const { loggedIn, login, logout } = useAuth();
    const { cart, setCart, setToken, user, setUser, getCart } = useCont();

    useEffect(() => {
        // getUsers();
    })

    async function getUsers() {
        try {
            
        } catch (error) {
            console.log("Error getting users");
        }
    }

    async function logoutUser() {
        const jwtToken = Cookies.get("jwtToken");
        const decodedToken = jwt_decode(jwtToken);
        if (decodedToken.email === "admin@gmail.com") {
            Cookies.remove("jwtToken");
            localStorage.removeItem('cartProducts');
            localStorage.removeItem("cart");
            localStorage.removeItem("orders");
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
        }
    }
    
    return (
        <>
            <div className="sidebar">
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
                            <button className="button" onClick={logoutUser}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}