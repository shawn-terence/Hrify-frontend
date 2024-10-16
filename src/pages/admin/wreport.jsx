import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button, Textarea, Spacer } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import axios from 'axios'; // Import Axios

const CreateReport = () => {
  const { id } = useParams(); // Assuming you're getting the user_id from the route
  const [category, setCategory] = useState('');
  const [reportText, setReportText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const token = '8cdee9ffbae0a2bd4e6c223e8dc5f92e04bca1d0';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/report/${id}/`, {
        category,
        report: reportText,
        date,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Assuming token-based auth
        },
      });

      if (response.status === 201) { // Assuming a successful creation returns a 201 status
        setSuccess(true);
        setCategory('');
        setReportText('');
        setDate(new Date().toISOString().split('T')[0]); // Reset date to today
      }
    } catch (err) {
      const errorData = err.response ? err.response.data : { detail: 'Failed to create report' };
      setError(errorData.detail || 'Failed to create report');
    }
  };

  return (
    <div>
      <h2 className='text-xl font-bold text-center'>Write Report</h2>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Spacer y={2} />
            <Input
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <Spacer y={2} />
            <Input
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Spacer y={2} />
            <Textarea
              label="Report"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              required
            />
            <Spacer y={2} />
            <Button type="submit">Submit Report</Button>
          </form>
        </CardBody>
        <CardFooter>
          {success && <p style={{ color: 'green' }}>Report created successfully!</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateReport;
