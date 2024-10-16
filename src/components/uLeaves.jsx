import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Button } from '@nextui-org/button';
import axios from 'axios'; // Import axios
import { Spacer } from '@nextui-org/react';

const AdLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Replace with token management

  useEffect(() => {
    // Fetch all leave requests
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('http://localhost:8000/leaves/', {
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
      const response = await axios.patch(`http://localhost:8000/leave/action/${id}/`, 
        { status }, // Send the status as the body
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );
      // Update UI after successful action
      setLeaves(leaves.filter(leave => leave.id !== id)); // Remove the handled leave from UI
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter leaves to only display pending ones
  const pendingLeaves = leaves.filter(leave => leave.status === "pending");

  return (
    <div>
      <p className='text-xl font-bold text-center'>Requested Leaves</p>
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
                <Button color="danger" auto rounded onClick={() => handleAction(leave.id, 'rejected')}>Deny</Button>
                <Button color="success" auto rounded onClick={() => handleAction(leave.id, 'approved')}>Accept</Button>
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
