import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../side-bar/SideBar';
import './table.css'
const ManageWorkingHour = () => {
  const [showModal, setShowModal] = useState(false);
  const [workingHours, setWorkingHours] = useState([]);
  const [editWorkingHour, setEditWorkingHour] = useState({
    id: '',
    day: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/working_hours');
      setWorkingHours(response.data.working_hours);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditWorkingHour({
      id: '',
      day: '',
      start_time: '',
      end_time: '',
    });
  };

  const handleShowModal = (workingHour) => {
    setEditWorkingHour({
      id: workingHour.id,
      day: workingHour.day,
      start_time: workingHour.start_time.substring(0, 5), // Extract only the time portion (HH:mm)
      end_time: workingHour.end_time.substring(0, 5), // Extract only the time portion (HH:mm)
    });
    setShowModal(true);
  };
  
  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/api/v1/working_hours/${editWorkingHour.id}`,
        {
          working_hour: {
            start_time: editWorkingHour.start_time,
            end_time: editWorkingHour.end_time,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('API Response:', response.data);
      fetchWorkingHours();
      handleCloseModal();
    } catch (error) {
      console.error('API Error:', error.response);
    }
  };
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditWorkingHour((prevWorkingHour) => ({
      ...prevWorkingHour,
      [name]: value,
    }));
  };

  const getWorkingHourByDay = (dayName) => {
    return workingHours.find((hour) => hour.day === dayName);
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="d-flex ">
        <SideBar/>
      <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Working Hour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Day:</label>
              <input
                type="text"
                className="form-control"
                name="day"
                value={editWorkingHour.day}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Start Time:</label>
              <input
                type="time"
                className="form-control"
                name="start_time"
                value={editWorkingHour.start_time}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>End Time:</label>
              <input
                type="time"
                className="form-control"
                name="end_time"
                value={editWorkingHour.end_time}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{getWorkingHourByDay(day)?.start_time.substring(11, 16)}</td>
              <td>{getWorkingHourByDay(day)?.end_time.substring(11, 16)}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(getWorkingHourByDay(day))}>
                  Edit
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

export default ManageWorkingHour;
