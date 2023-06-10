import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      {/* Sidebar content */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="/manage-working-hour">Manage Working Hours</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/manage-slots">Manage Slots</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#manage-reservations">Manage Reservations</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#manage-customers">Manage Customers</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
