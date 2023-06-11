import React from "react";
import AdminCharts from "./admin-pages/AdminCharts";
import SideBar from "./admin-pages/side-bar/SideBar";
import './admin-pages/side-bar/Sidebar.css'; 
function AdminDashboard(){
  return(
    <div >
    <div className="admin-container" style={{ backgroundColor:"black"}}>
    <SideBar/>
    <div className="dashboard-content">
    <h1 className="admin-title"> Manage your Pravite Parking </h1>
    <AdminCharts/>
    </div>
    </div>
    </div>
  )
}
export default AdminDashboard