import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const token = localStorage.getItem("token");

  // Function to fetch reports from the API
  const fetchReports = async () => {
    try {
      const response = await axios.get("https://hrify-backend.onrender.com/report/", {
        headers: {
          Authorization: `Token ${token}`,
        },
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
        ? report.description
            .toLowerCase()
            .includes(descriptionFilter.toLowerCase())
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
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold text-center">Reports</h1>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        <Input
          label="Filter by Date"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="flex-1 min-w-[150px]"
        />
        <Input
          label="Filter by Description"
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          placeholder="Search description..."
          className="flex-1 min-w-[150px]"
        />
        <button
          className=" btnM px-4 py-2  btnM"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>

      <Table
        isStriped
        aria-label="Reports Table"
        className="w-full overflow-x-auto text-sm"
      >
        <TableHeader>
          <TableColumn>Date</TableColumn>
          <TableColumn>Category</TableColumn>
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
