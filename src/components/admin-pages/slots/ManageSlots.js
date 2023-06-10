import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SlotModal from './SlotModal';
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
        is_available: false,
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
      if (editSlot.id) {
        response = await axios.patch(
          `http://127.0.0.1:3000/api/v1/slots/${editSlot.id}`,
          {
            slot: editSlot,
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
            slot: editSlot,
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setEditSlot((prevSlot) => ({
      ...prevSlot,
      [name]: inputValue,
    }));
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
    <div>
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
    <td>{slot.availability_start_time.slice(11, 16)}</td>
    <td>{slot.availability_end_time.slice(11, 16)}</td>
    <td>
    <Button
  variant="primary"
  size="sm"
  onClick={() => handleShowModal(slot)}
>
  Edit
</Button>
      <Button
        variant="danger"
        size="sm"
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
