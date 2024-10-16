import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import Attend from './attend'; // Import the Attend component

const AttendanceC = () => {
  const [attendance, setAttendance] = useState([]); // State to store all attendance data
  const [weeklyAttendance, setWeeklyAttendance] = useState([]); // State to store this week's attendance
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(""); // State for error messages
  const employeeId = localStorage.getItem("id");
  const token=localStorage.getItem('token')
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/attendance/${employeeId}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        setAttendance(response.data); // Set all attendance data
        filterWeeklyAttendance(response.data); // Filter to set weekly attendance
      } catch (error) {
        console.error("Error fetching attendance data", error);
        setError("Failed to fetch attendance data."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after request
      }
    };

    fetchAttendance();
  }, [employeeId]); // Dependency on employeeId

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

    setWeeklyAttendance(weeklyRecords); // Update the state with filtered records
  };

  const handleAttendanceRefresh = () => {
    // Function to refresh attendance data
    fetchAttendance(); // Call fetchAttendance here
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A'; // Return 'N/A' if no time is provided

    // Split the time string by ':'
    const timeParts = timeString.split(':');

    // Return the formatted time as 'HH:MM'
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
