import React from 'react';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/react';
import axios from 'axios';
import '../styles/app.css'
const Attend = ({ onAttendanceRefresh }) => {
  const token =localStorage.getItem('token')
  const handleClockIn = async () => {
    try {
      await axios.post('https://hrify-backend.onrender.com/time-in/', {}, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      onAttendanceRefresh();
    } catch (error) {
      console.error("Error clocking in", error);
    }
  };

  const handleClockOut = async () => {
    try {
      await axios.post('https://hrify-backend.onrender.com/time-out/', {}, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      onAttendanceRefresh(); 
    } catch (error) {
      console.error("Error clocking out", error);
    }
  };

  return (
    <div className='mt-2 p-2'>
      <Card>
        <CardBody className='grid grid-cols-2 gap-4 mt-2'>
          <button className='btnM' onClick={handleClockIn}>Clock In</button>
          <button className='btnM' onClick={handleClockOut}>Clock Out</button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Attend;
