import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import axios from 'axios';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8000/report/adm/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        const currentMonth = new Date().getMonth(); // Get current month
        const filtered = response.data.filter((report) => {
          const reportMonth = new Date(report.date).getMonth();
          return reportMonth === currentMonth; // Filter reports for the current month
        });
        setReports(response.data);
        setFilteredReports(filtered);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [token]);

  return (
    <div>
      <h2 className='text-xl font-bold text-center'>This Month's Reports</h2>
      <Table aria-label="Reports Table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Details</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No reports yet"}>
          {filteredReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.employee_name}</TableCell>
              <TableCell>{report.category}</TableCell>
              <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
              <TableCell>{report.report}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminReports;
