import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../side-bar/SideBar';
const ManageCustomers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: '',
    surname: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:3000/api/v1/users/${selectedUser.id}`, {
        user: updatedUserData
      });
      console.log('API Response:', response.data);
      fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error('API Error:', error.response);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/users/${id}`);
      console.log('API Response:', response.data);
      fetchUsers();
    } catch (error) {
      console.error('API Error:', error.response);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter((user) => {
      const name = user.name ? user.name.toLowerCase() : '';
      const surname = user.surname ? user.surname.toLowerCase() : '';
      const email = user.email ? user.email.toLowerCase() : '';
      return (
        name.includes(searchTerm) ||
        surname.includes(searchTerm) ||
        email.includes(searchTerm)
      );
    });
    setFilteredUsers(filteredUsers);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setUpdatedUserData(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setUpdatedUserData({
      name: '',
      surname: '',
      email: '',
      role: ''
    });
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="d-flex">
        <SideBar/>
        <div>
      <FormControl
        type="text"
        placeholder="Search by name, surname, or email"
        className="mb-4"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginTop: '3rem', marginLeft:'0.5rem' }}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleOpenModal(user)} style={{ marginRight: '10px' }}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="name"
            placeholder="Name"
            name="name"
            value={updatedUserData.name}
            onChange={handleInputChange}
          />
          <FormControl
            type="name"
            placeholder="Surname"
            name="surname"
            value={updatedUserData.surname}
            onChange={handleInputChange}
          />
          <FormControl
            type="email"
            placeholder="Email"
            name="email"
            value={updatedUserData.email}
            onChange={handleInputChange}
          />
          <FormControl
            type="text"
            placeholder="Role"
            name="role"
            value={updatedUserData.role}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default ManageCustomers;
