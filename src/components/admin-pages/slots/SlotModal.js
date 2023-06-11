import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SlotModal = ({
  showModal,
  handleCloseModal,
  editSlot,
  handleSaveChanges,
  handleInputChange,
  carTypeOptions,
  dropdownOptions,
}) => {
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{editSlot.id ? 'Edit Slot' : 'Create Slot'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Time:</label>
            <select
              className="form-control"
              name="time"
              value={editSlot.time}
              onChange={handleFieldChange}
            >
              <option value="">Select Time</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <div className="form-group">
            <label>Car Type:</label>
            <select
              className="form-control"
              name="car_type"
              value={editSlot.car_type}
              onChange={handleFieldChange}
            >
              <option value="">Select Car Type</option>
              {carTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={editSlot.price}
              onChange={handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label>Is Disabled:</label>
            <select
              className="form-control"
              name="is_disabled"
              value={editSlot.is_disabled}
              onChange={handleFieldChange}
            >
              <option value="">Select Option</option>
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Is Available:</label>
            <select
              className="form-control"
              name="is_available"
              value={editSlot.is_available}
              onChange={handleFieldChange}
            >
              <option value="">Select Option</option>
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Is Cancelled:</label>
            <select
              className="form-control"
              name="is_cancelled"
              value={editSlot.is_cancelled}
              onChange={handleFieldChange}
            >
              <option value="">Select Option</option>
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Cancellation Policy:</label>
            <input
              type="text"
              className="form-control"
              name="cancelation_policy"
              value={editSlot.cancelation_policy}
              onChange={handleFieldChange}
            />
          </div>
          {editSlot.is_available === 'false' && (
            <div>
              <div className="form-group">
                <label>Availability Start Time:</label>
                <input
                  type="time"
                  className="form-control"
                  name="availability_start_time"
                  value={editSlot.availability_start_time || ''}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="form-group">
                <label>Availability End Time:</label>
                <input
                  type="time"
                  className="form-control"
                  name="availability_end_time"
                  value={editSlot.availability_end_time || ''}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SlotModal;
