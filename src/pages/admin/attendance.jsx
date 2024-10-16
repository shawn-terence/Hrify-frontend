import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Table, TableHeader,Spacer, TableBody, TableColumn, TableRow, TableCell, Button } from '@nextui-org/react';
import { Card,CardBody} from "@nextui-org/react";
const AttendancePage = () => {
  const [allAttendances, setAllAttendances] = useState([]);  // Store all records fetched from backend
  const [filteredAttendances, setFilteredAttendances] = useState([]); // Store filtered records
  const [employeeName, setEmployeeName] = useState("");
  const [date, setDate] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const token=localStorage.getItem("token")
  // Fetch all attendance records from the backend
  const fetchAllAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:8000/attendance/",{
        headers: {
          'Authorization': `Token ${token}`,
      },
      });
      setAllAttendances(response.data);  // Store the complete attendance records
      setFilteredAttendances(response.data);  // Initially, filtered data is the same as all data
    } catch (error) {
      console.error("Error fetching attendance", error);
    }
  };

  // Fetch records on component mount
  useEffect(() => {
    fetchAllAttendance();
  }, []);

  // Filter attendance records based on form input
  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = allAttendances.filter((attendance) => {
      // Check employee name (case-insensitive)
      const matchesEmployee = employeeName
        ? attendance.employee.username.toLowerCase().includes(employeeName.toLowerCase())
        : true;

      // Check date
      const matchesDate = date ? attendance.date === date : true;

      // Check time in (greater than or equal)
      const matchesTimeIn = timeIn ? attendance.time_in >= timeIn : true;

      // Check time out (less than or equal)
      const matchesTimeOut = timeOut ? attendance.time_out <= timeOut : true;

      // Return true only if all filters match
      return matchesEmployee && matchesDate && matchesTimeIn && matchesTimeOut;
    });

    setFilteredAttendances(filtered); // Update the filtered attendance data
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">Attendance Records</h2>
      <Card>
        <CardBody>
        <form onSubmit={handleSearch} className=" flex flex-col gap-4">
        <div>
          <label>Search by Employee Name:</label>
          <Input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Enter employee name"
          />
        </div>
        <div>
          <label>Filter by Date:</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Filter by Time In:</label>
          <Input
            type="time"
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)}
          />
        </div>
        <div>
          <label>Filter by Time Out:</label>
          <Input
            type="time"
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)}
          />
        </div>
        <Spacer y={2}/>
        <button className="btnM" type="submit">Search</button>
      </form>
        </CardBody>
      </Card>

      <Table>
        <TableHeader>
          
            <TableColumn>Employee</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Time In</TableColumn>
            <TableColumn>Time Out</TableColumn>
          
        </TableHeader>
        <TableBody>
          {
            filteredAttendances.map((attendance) => (
              <TableRow key={attendance.id}>
                <TableCell>{attendance.employee_name}</TableCell>
                <TableCell>{attendance.date}</TableCell>
                <TableCell>{attendance.time_in || "N/A"}</TableCell>
                <TableCell>{attendance.time_out || "N/A"}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendancePage;
