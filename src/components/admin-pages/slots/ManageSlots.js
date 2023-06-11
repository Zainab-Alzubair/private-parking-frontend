import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SlotModal from './SlotModal';
import SideBar from '../side-bar/SideBar';
const ManageSlots = () => {
  const [showModal, setShowModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [editSlot, setEditSlot] = useState({
    id: '',
    time: '',
    car_type: '',
    price: '',
    is_disabled: false,
    is_available: false,
    is_cancelled: false,
    cancelation_policy: '',
    availability_start_time: '',
    availability_end_time: '',
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/slots');
      setSlots(response.data.slots);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const formatTime = (time) => {
    if (!time) return '-';

    // Check if time value is in ISO format
    if (time.includes('T')) {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditSlot({
      id: '',
      time: '',
      car_type: '',
      price: '',
      is_disabled: false,
      is_available: false,
      is_cancelled: false,
      cancelation_policy: '',
      availability_start_time: '',
      availability_end_time: '',
    });
  };

  const handleShowModal = (slot) => {
    setShowModal(true);
    if (slot) {
      setEditSlot(slot);
    } else {
      setEditSlot({
        id: '',
        time: '',
        car_type: '',
        price: '',
        is_disabled: false,
        is_available: true,
        is_cancelled: false,
        cancelation_policy: '',
        availability_start_time: '',
        availability_end_time: '',
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      let response;
      const updatedSlot = { ...editSlot };
  
      // Convert availability time values to the desired format
      if (!updatedSlot.is_available && updatedSlot.time) {
        const formattedTime = formatTime(updatedSlot.time);
        updatedSlot.availability_start_time = formattedTime;
        updatedSlot.availability_end_time = formattedTime;
      }
  
      if (updatedSlot.id) {
        response = await axios.patch(
          `http://127.0.0.1:3000/api/v1/slots/${updatedSlot.id}`,
          {
            slot: updatedSlot,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        response = await axios.post(
          'http://127.0.0.1:3000/api/v1/slots',
          {
            slot: updatedSlot,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
      console.log('API Response:', response.data);
      fetchSlots();
      handleCloseModal();
    } catch (error) {
      console.error('API Error:', error.response);
    }
  };
  

  const handleDeleteSlot = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/v1/slots/${id}`
      );
      console.log('API Response:', response.data);
      fetchSlots();
    } catch (error) {
      console.error('API Error:', error.response);
    }
  };

  const handleInputChange = (name, value) => {
    if (name === 'availability_start_time' || name === 'availability_end_time') {
      const updatedTime = value.substring(0, 5);
      setEditSlot((prevSlot) => ({
        ...prevSlot,
        [name]: updatedTime,
      }));
    } else {
      setEditSlot((prevSlot) => ({
        ...prevSlot,
        [name]: value,
      }));
    }
  };
  
  

  const carTypeOptions = [
    'Hybrid / Electric',
    'Sports Car',
    'Truck',
    'Van / Minivan',
  ];

  const dropdownOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  return (
    <div className="d-flex">
      <SideBar />
      <SlotModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        editSlot={editSlot}
        handleSaveChanges={handleSaveChanges}
        handleInputChange={handleInputChange}
        carTypeOptions={carTypeOptions}
        dropdownOptions={dropdownOptions}
      />

      <div className="container mt-4">
        <Button variant="primary" onClick={() => handleShowModal()}>
          Create Slot
        </Button>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Time</th>
              <th>Car Type</th>
              <th>Price</th>
              <th>Is Disabled</th>
              <th>Is Available</th>
              <th>Is Cancelled</th>
              <th>Cancellation Policy</th>
              <th>Availability Start Time</th>
              <th>Availability End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.time}</td>
                <td>{slot.car_type}</td>
                <td>{slot.price}</td>
                <td>{slot.is_disabled ? 'Yes' : 'No'}</td>
                <td>{slot.is_available ? 'Yes' : 'No'}</td>
                <td>{slot.is_cancelled ? 'Yes' : 'No'}</td>
                <td>{slot.cancelation_policy}</td>
                <td>{formatTime(slot.availability_start_time)}</td>
                <td>{formatTime(slot.availability_end_time)}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(slot)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteSlot(slot.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageSlots;
