import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spacer, CardHeader, CardBody, Input, CardFooter, Button } from '@nextui-org/react';
import GReport from '../../components/greport';
import axios from 'axios';
const EmployeeDetails = () => {
  const { id } = useParams(); 
  const Id=+id
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    department: '',
    role: '',
    salary: '',
    job_role: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://hrify-backend.onrender.com/user/${Id}/details/`, {
          headers: {
            'Authorization': `Token ${token}`
          },
        });
        setEmployee(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update user details
  const handleUpdate = async () => {
    try {
      const response = await fetch('https://hrify-backend.onrender.com/user/update/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee details');
      }

      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading employee details...</p>;
  }

  if (error) {
    return <p>Error fetching employee details: {error}</p>;
  }

  return (
    <div>
      <div>
        <h2 className='text-3xl font-bold text-center'>Employee Details</h2>
        <Spacer y={2} />
        <Card>
          <CardHeader className='header'>
            <div className=' flex flex-col md:flex-row '>
              <div className='flex flex-col items-center'>
                <img src={employee.profile_picture|| 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-256.png'} className='w-24 h-24 rounded-full sm:w-40 sm:h-40 md:w-36 md:h-36 lg:w-40 lg:h-40' alt="Profile" />
              </div>
            </div>
          </CardHeader>
          <CardBody className='grid md:grid-cols-2 gap-2'>
            <div>
              <p>Email</p>
              <Input name="email" value={employee.email} onChange={handleInputChange} />
            </div>
            <div>
              <p>First name</p>
            <Input name="first_name" value={employee.first_name} onChange={handleInputChange} />
            </div>
            <div>
              <p>Last name</p>
              <Input name="last_name" value={employee.last_name} onChange={handleInputChange} />
            </div>
            
            <div>
              <p>Job Role</p>
              <Input name="job_role" value={employee.job_role} onChange={handleInputChange} />
            </div>
            <div>
              <p>Salary</p>
              <Input name="salary" value={employee.salary} onChange={handleInputChange} />
            </div>
            <div>
              <p>Department</p>
              <Input name="department" value={employee.department} onChange={handleInputChange} />
            </div>
            <div>
              <p>Phone Number</p>
              <Input name="phone_number" value={employee.phone_number} onChange={handleInputChange} />
            </div>
          </CardBody>
          <CardFooter className='grid grid-cols-2 gap-4'>
            <button className='btnM' onClick={handleUpdate}>Update Info</button>
            <button className='btnM' >Delete</button>
          </CardFooter>
        </Card>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
      <div>
        <Spacer y={2} />
        <h3 className='text-xl font-bold text-center'>Employee reports</h3>
        <GReport />
      </div>
    </div>
  );
};

export default EmployeeDetails;
