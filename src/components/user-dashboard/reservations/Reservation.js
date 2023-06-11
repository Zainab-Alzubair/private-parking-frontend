import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reservation = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  // Fetch logged-in user ID
  const fetchLoggedInUserId = () => {
    try {
      // Retrieve the user ID from local storage
      const userId = localStorage.getItem('user_id');
      console.log('User ID:', userId);

      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      setUserId(userId);
    } catch (error) {
      console.error('Error fetching logged-in user ID:', error);
    }
  };

  // Fetch slots data from the API
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/slots');
        setSlots(response.data.slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots();
    fetchLoggedInUserId();
  }, []);

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setModalVisible(true);
  };

  // Handle reservation creation
  const handleReservationCreate = async () => {
    try {
      if (!selectedSlot) {
        console.error('No slot selected');
        return;
      }

      // Make an API request to create a reservation
      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/reservations',
        {
          reservation: {
            user_id: userId,
            slot_id: selectedSlot.id,
            start_time,
            end_time,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      console.log('Reservation created:', response.data);

      // Clear the form and close the modal
      setStartTime('');
      setEndTime('');
      setModalVisible(false);

      toast.success('Reservation created successfully');
    } catch (error) {
      console.error('Reservation creation error:', error);
      // Handle error if the reservation API request fails
      // You can choose to display an error message or take appropriate action
      if (error.response && error.response.data.error === 'Unprocessable Entity') {
        toast.error('You have a reservation at the same time');
      } else {
        toast.error('Error creating reservation');
      }
    }
  };

  return (
    <div>
      <h2>Slots</h2>
      <div className="row">
        {slots.map((slot) => (
          <div className="col-md-4" key={slot.id}>
            <Card>
              <Card.Body>
                <Card.Title>Time: {slot.time}</Card.Title>
                <Card.Text>
                  
               {slot.is_available ? 'Available' : (slot.availability_start_time && slot.availability_end_time) ? `Not Available from ${slot.availability_start_time.slice(11, 16)} to ${slot.availability_end_time.slice(11, 16)}` : ''}
  <br />
                  <br />
                  Price: {slot.price}
                  <br />
                  Cancellation Policy: {slot.cancelation_policy}
                  <br />
                  Is Disabled: {slot.is_disabled ? 'Yes' : 'No'}
                </Card.Text>
                <Button
                  variant="primary"
                  // disabled={!slot.is_available}
                  onClick={() => handleSlotSelect(slot)}
                >
                  Reserve
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={end_time}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalVisible(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReservationCreate}>
            Create Reservation
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Reservation;
