import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../nav-bar/NavBar';
const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/v1/reservations?user_id=${userId}`);
        setReservations(response.data.reservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleCancelReservation = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:3000/api/v1/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 200) {
        // Remove the canceled reservation from the list
        setReservations(reservations.filter((reservation) => reservation.id !== id));
        toast.success('Reservation canceled successfully');
      }
    } catch (error) {
      console.error('Error canceling reservation:', error);
      toast.error('Error canceling reservation');
    }
  };

  return (
    <div>
      <NavBar/>
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.start_time}</td>
                <td>{reservation.end_time}</td>
                <td>
                  <Button variant="danger" onClick={() => handleCancelReservation(reservation.id)}>
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ToastContainer />
    </div>
  );
};

export default ReservationList;
