import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  Spacer
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Attend from '../../components/attend';

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Number of rows per page
  const employeeId = localStorage.getItem("id"); // Get employee ID from local storage
  const token =localStorage.getItem('token')
  // Fetch attendance records
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/attendance/${employeeId}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setAttendance(response.data);
          setFilteredAttendance(response.data); // Set filtered attendance to all initially
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendance();
  }, [employeeId]);

  // Handle search and filtering
  useEffect(() => {
    const filterAttendance = () => {
      const filtered = attendance.filter((record) => {
        const searchString = `${record.date} ${record.time_in} ${record.time_out}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      });
      setFilteredAttendance(filtered);
      setPage(1); // Reset to first page on filter
    };

    filterAttendance();
  }, [searchTerm, attendance]);

  // Paginated attendance
  const paginatedAttendance = filteredAttendance.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(filteredAttendance.length / rowsPerPage);

  const attendanceColumns = [
    { key: "date", label: "Date" },
    { key: "time_in", label: "Time In" },
    { key: "time_out", label: "Time Out" },
  ];

  const attendanceRows = paginatedAttendance.map((record) => ({
    key: record.id,
    date: record.date,
    time_in: record.time_in,
    time_out: record.time_out,
  }));

  // Helper function to format time
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A'; // Handle empty time
    return timeString.split(':').slice(0, 2).join(':'); // Get HH:MM
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl font-black">Attendance Records</h1>
        <Spacer y={4}/>
        <div>
          <Input
            placeholder="Search by date, time in or time out..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <Table isStriped aria-label="Attendance Table">
            <TableHeader>
              {attendanceColumns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody emptyContent={"No attendance records found"}>
              {attendanceRows.map((row) => (
                <TableRow key={row.key}>
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "time_in" ? formatTime(row.time_in) : columnKey === "time_out" ? formatTime(row.time_out) : row[columnKey]}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center">
            <Pagination
              page={page}
              total={totalPages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        </div>
    </div>
  );
}

export default Attendance;
