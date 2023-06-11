import React from "react";
import AdminCharts from "./admin-pages/AdminCharts";
import SideBar from "./admin-pages/side-bar/SideBar";
import './admin-pages/side-bar/Sidebar.css'; 
function AdminDashboard(){
  return(
    <>
    <div className="admin-container">
    
    <SideBar/>
    <div>
    <h1 className="title">Manage your Pravite Parking </h1>
    <AdminCharts/>
    </div>
    </div>
    </>
  )
}
export default AdminDashboard