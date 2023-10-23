import React from "react";
import AdminHome from "../../components/Admin/AdminHome/AdminHome";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";

export default function AdminDashboard (props) {
    return (
            <div>
                <Sidebar />
                <AdminHome />
            </div>
    );
}