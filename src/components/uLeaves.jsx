import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Button } from '@nextui-org/button';
import axios from 'axios'; // Import axios
import { Spacer } from '@nextui-org/react';

const AdLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    // Fetch all leave requests
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('https://hrify-backend.onrender.com/leaves/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        setLeaves(response.data); // Set leaves data from response
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLeaves();
  }, [token]);

  const handleAction = async (id, status) => {
    try {
      const response = await axios.patch(`https://hrify-backend.onrender.com/leave/action/${id}/`, 
        { status },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );

      setLeaves(leaves.filter(leave => leave.id !== id)); 
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter leaves to only display pending ones
  const pendingLeaves = leaves.filter(leave => leave.status === "pending");

  return (
    <div>
      <p className='text-3xl mb-4 font-bold text-center'>Requested Leaves</p>
      <Table>
        <TableHeader>
          <TableColumn>Date Requested</TableColumn>
          <TableColumn>Employee</TableColumn>
          <TableColumn>Reason</TableColumn>
          <TableColumn>Start Date</TableColumn>
          <TableColumn>End Date</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No requested leaves'}>
          {pendingLeaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.date_requested}</TableCell>
              <TableCell>{leave.employee_name}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{leave.date_from}</TableCell>
              <TableCell>{leave.date_to}</TableCell>
              <TableCell className='grid gap-2 lg:grid-cols-2'>
                <button color="danger" className='btnD' auto rounded onClick={() => handleAction(leave.id, 'rejected')}>Deny</button>
                <button color="success" className='btnA' auto rounded onClick={() => handleAction(leave.id, 'approved')}>Accept</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default AdLeaves;
