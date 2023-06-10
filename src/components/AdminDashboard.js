import React from "react";
import SideBar from "./admin-pages/side-bar/SideBar";
import './admin-pages/side-bar/Sidebar.css'; 
function AdminDashboard(){
  return(
    <div className="admin-container">
    
    <SideBar/>
    <h1 className="title">Manage your Pravite Parking </h1>
    </div>
  )
}
export default AdminDashboard