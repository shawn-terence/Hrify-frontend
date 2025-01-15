import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardHeader, Button, Spacer } from '@nextui-org/react';

const LeaveRequestForm = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        try {
            const token = localStorage.getItem("token"); // Example for JWT

            const payload = {
                date_from: dateFrom,
                date_to: dateTo,
                reason: reason,
            };

            const response = await axios.post(
                'https://hrify-backend.onrender.com/leave/request/',
                payload,
                {
                    headers: {
                        'Authorization': `Token ${token}`, // Pass token for authentication
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                setSuccess("Leave request submitted successfully!");
                setError("");
                setDateFrom("");
                setDateTo("");
                setReason("");
            }
        } catch (error) {
            if (error.response) {
                setError("Failed to submit the leave request: " + error.response.data.detail);
            } else {
                setError("An error occurred. Please try again.");
            }
            setSuccess("");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <p className='text-xl font-bold text-center'>Leave Request Form</p>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <label>Date From:</label>
                            <Input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Date To:</label>
                            <Input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Reason:</label>
                            <Input
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            />
                        </div>
                        <Spacer y={2} />
                        <button className='btnM' type="submit">Submit Request</button>
                    </CardBody>
                </Card>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default LeaveRequestForm;
