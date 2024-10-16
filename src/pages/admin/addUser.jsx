import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Input, Spacer } from '@nextui-org/react';

const AddUser = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    department: '',
    role: 'employee', // default role
    password: '',
    email: '',
    salary: '',
    job_role: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      setErrorMessage('Authentication token not found. Please log in.');
      return;
    }

    // Set up the config with headers for token authentication
    const config = {
      headers: {
        'Authorization': `Token ${token}`, // Django's token auth format
        'Content-Type': 'application/json',
      },
    };

    // Send the request with the form data
    axios
      .post('http://localhost:8000/register/', formData, config)
      .then((response) => {
        setSuccessMessage('User created successfully!');
        setErrorMessage('');
        // Reset form fields after successful submission
        setFormData({
          first_name: '',
          last_name: '',
          phone_number: '',
          department: '',
          role: 'employee',
          password: '',
          email: '',
          salary: '',
          job_role: '',
          
        });
      })
      .catch((error) => {
        setErrorMessage('Error creating user. Please try again.');
        setSuccessMessage('');
      });
  };

  return (
    <div>
      <h2 className='text-2xl font-bold text-center'>Create New User</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader></CardHeader>
          <CardBody className='grid grid-cols-2 gap-2'>
            <div>
              <label>First Name:</label>
              <Input
                type="text"
                name="first_name"
                value={formData.first_name}
                label="First Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Last Name:</label>
              <Input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                label="Last Name"
                required
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <Input
                type="text"
                name="phone_number"
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Department:</label>
              <Input
                type="text"
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="Hr">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div>
              <label>Email:</label>
              <Input
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <Input
                type="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Salary:</label>
              <Input
                type="number"
                name="salary"
                label="Salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Job Role:</label>
              <Input
                type="text"
                name="job_role"
                label="Job Role"
                value={formData.job_role}
                onChange={handleInputChange}
                required
              />
            </div>
            <button className='max-h-12 btnM mt-6' type="submit">Create User</button>
          </CardBody>
        </Card>
      </form>
    </div>
  );
};

export default AddUser;
