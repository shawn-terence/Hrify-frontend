import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { Input, Table, TableHeader, Spacer, TableBody, TableColumn, TableRow, TableCell, Button } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://hrify-backend.onrender.com/report/adm/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        setReports(response.data);
        setFilteredReports(response.data); // Set initial filtered reports
      } catch (err) {
        setError(err.response ? err.response.data : 'Failed to fetch reports');
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://hrify-backend.onrender.com/report/categories/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        setCategories(response.data); // Populate category dropdown
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchReports();
    fetchCategories();
  }, [token]);

  // Handle search by employee name
  const handleSearch = () => {
    const searchedReports = reports.filter((report) =>
      report.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredReports(searchedReports);
  };

  // Handle filter by category and date
  const handleFilter = () => {
    let filtered = reports;

    if (categoryFilter) {
      filtered = filtered.filter((report) => report.category === categoryFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter((report) => report.date === dateFilter);
    }

    setFilteredReports(filtered);
  };

  return (
    <div>
      <h2 className='text-3xl text-center font-bold'>Reports Page</h2>
      <Spacer y={2} />

      {/* Search by Name */}
      <div className='flex flex-row gap-2'>
        <Input
          label="Search by Employee Name"
          placeholder="Enter employee"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          clearable
        />
        <button className='btnM' onClick={handleSearch}>Search</button>
      </div>
      <Spacer y={2} />

      {/* Filter by Category and Date */}
      <div className='grid grid-cols-2 gap-2'>
        <Select
          label="Filter by Category"
          placeholder="Select category"
          value={categoryFilter}
          onChange={(value) => setCategoryFilter(value)}
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Filter by Date"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>
      <Spacer y={2} />
      <button className='btnM' onClick={handleFilter}>Filter</button>
      <Spacer y={2} />

      {/* Display Error */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display Reports */}
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <Table aria-label="Reports Table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Details</TableColumn>
          </TableHeader>
          <TableBody emptyContent={'No data to be displayed'}>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.employee_name}</TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.report}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Report;
