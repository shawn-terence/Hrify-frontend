import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button, Textarea, Spacer } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import axios from 'axios';

const CreateReport = () => {
  const { id } = useParams();
  const [category, setCategory] = useState('');
  const [reportText, setReportText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://hrify-backend.onrender.com/report/${id}/`, {
        category,
        report: reportText,
        date,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (response.status === 201) { 
        setSuccess(true);
        setCategory('');
        setReportText('');
        setDate(new Date().toISOString().split('T')[0]); 
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
            <button className='btnM' type="submit">Submit Report</button>
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
