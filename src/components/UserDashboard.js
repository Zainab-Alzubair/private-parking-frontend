import React from "react";
import NavBar from "./user-dashboard/nav-bar/NavBar";
import Reservation from "./user-dashboard/reservations/Reservation";
function UserDashboard(){
  return(
    <div>
    <NavBar/>
    <Reservation/>
    </div>
  )
}
export default UserDashboard