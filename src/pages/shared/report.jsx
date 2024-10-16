import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Spacer, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const token=localStorage.getItem('token')
  // Function to fetch reports from the API
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:8000/report/",{
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      setReports(response.data);
      setFilteredReports(response.data); // Initialize filtered reports
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  // Function to handle filters
  const handleFilter = () => {
    const filtered = reports.filter((report) => {
      const matchesDate = dateFilter ? report.date.includes(dateFilter) : true;
      const matchesDescription = descriptionFilter
        ? report.description.toLowerCase().includes(descriptionFilter.toLowerCase())
        : true;
      return matchesDate && matchesDescription;
    });
    setFilteredReports(filtered);
  };

  // useEffect to fetch reports when component mounts
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="flex gap-4 mb-4">
        <Input
          label="Filter by Date"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          fullWidth
        />
        <Input
          label="Filter by Description"
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          placeholder="Search description..."
          fullWidth
        />
        <button className=" min-w-24 btnM" onClick={handleFilter}>Filter</button>
      </div>

      <Spacer y={1} />
      <Table isStriped aria-label="Reports Table">
        <TableHeader>
          <TableColumn>Date</TableColumn>
          <TableColumn>category</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No reports found">
          {filteredReports.map((report) => (
            <TableRow key={report.id}>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell>{report.report}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportPage;
