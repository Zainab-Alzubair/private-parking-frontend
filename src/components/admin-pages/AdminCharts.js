import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import './AdminCharts.css';

const AdminCharts = () => {
  const [userData, setUserData] = useState(null);
  const [slotData, setSlotData] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchSlotData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/users');
      const users = response.data;
      const totalUsers = users.length;
      setUserData({
        options: {
          labels: ['Total Users', 'Remaining Users'],
          colors: ['#04ff00', '#0D6EFD'],
          dataLabels: {
            style: {
              colors: ['#fff'],
            },
          },
        },
        series: [totalUsers, 100 - totalUsers],
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const fetchSlotData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/slots');
      const slots = response.data.slots;
      const totalSlots = slots.length;
      setSlotData({
        options: {
          labels: ['Total Slots', 'Remaining Slots'],
          
          colors: ['#0D6EFD', '#BFFD9E'],
          dataLabels: {
            style: {
              colors: ['#fff'],
            },
          },
        },
        series: [totalSlots, 100 - totalSlots],
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div className="admin-charts-container">
      {userData && (
        <div className="chart-container">
          <h3>Users</h3>
          <Chart
            options={userData.options}
            series={userData.series}
            type="pie"
            width="400"
          />
        </div>
      )}
      {slotData && (
        <div className="chart-container">
              <h3>Slots</h3>
          <Chart
            options={slotData.options}
            series={slotData.series}
            type="pie"
            width="400"
          />
        </div>
      )}
    </div>
  );
};

export default AdminCharts;
