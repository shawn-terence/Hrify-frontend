import React, { useEffect, useState } from 'react';
import { Table, Spacer, TableCell, TableColumn, TableBody, TableRow, TableHeader } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 

const GReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
   
    const fetchReports = async () => {
      try {
        const response = await axios.get(`https://hrify-backend.onrender.com/report/${id}/`, {
          headers: {
            'Authorization': `Token ${token}`, 
          },
        });

        setReports(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, [id, token]);

  if (loading) {
    return <p>Loading reports...</p>;
  }

  return (
    <div>
      <Table aria-label="Reports table" bordered shadow={false}>
        <TableHeader>
          <TableColumn>Employee Name</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Report</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No data to be displayed'}>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.employee_name}</TableCell>
              <TableCell>{report.category}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.report}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GReport;
