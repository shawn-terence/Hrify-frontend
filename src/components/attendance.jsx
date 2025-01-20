import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import Attend from './attend'; 

const AttendanceC = () => {
  const [attendance, setAttendance] = useState([]); 
  const [weeklyAttendance, setWeeklyAttendance] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const employeeId = localStorage.getItem("id");
  const token=localStorage.getItem('token')
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`https://hrify-backend.onrender.com/attendance/${employeeId}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        setAttendance(response.data);
        filterWeeklyAttendance(response.data); 
      } catch (error) {
        console.error("Error fetching attendance data", error);
        setError("Failed to fetch attendance data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchAttendance();
  }, [employeeId]); 

  const filterWeeklyAttendance = (data) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);

    startOfWeek.setDate(today.getDate() - dayOfWeek); // Start from Sunday
    endOfWeek.setDate(today.getDate() + (6 - dayOfWeek)); // End at Saturday

    const weeklyRecords = data.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startOfWeek && recordDate <= endOfWeek;
    });

    setWeeklyAttendance(weeklyRecords); 
  };

  const handleAttendanceRefresh = () => {
    fetchAttendance(); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';

    
    const timeParts = timeString.split(':');

   
    return timeParts.length >= 3 ? `${timeParts[0]}:${timeParts[1]}` : 'Invalid Time';
};
  return (
    <div className='p-2'>
      <Attend onAttendanceRefresh={handleAttendanceRefresh} />
      <div>
      <p className='text-lg font-bold text-center'>This week's attendance</p>
        <Table aria-label="Weekly Attendance Table">
          <TableHeader>
            <TableColumn>Day</TableColumn>
            <TableColumn>Time In</TableColumn>
            <TableColumn>Time Out</TableColumn>
          </TableHeader>
          <TableBody emptyContent={'no record available'}>
            {weeklyAttendance.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>
                <TableCell>{formatTime(record.time_in)}</TableCell>
                <TableCell>{formatTime(record.time_out)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceC;
