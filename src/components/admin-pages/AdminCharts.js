import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

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
          colors: ['#36A2EB', '#FF6384']
        },
        series: [totalUsers, 100 - totalUsers]
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
          colors: ['#FFCE56', '#FF6384']
        },
        series: [totalSlots, 100 - totalSlots]
      });
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {userData && (
        <div style={{ marginRight: '20px' }}>
          <h2>Total Users</h2>
          <Chart
            options={userData.options}
            series={userData.series}
            type="pie"
            width="400"
          />
        </div>
      )}
      {slotData && (
        <div>
          <h2>Total Slots</h2>
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
