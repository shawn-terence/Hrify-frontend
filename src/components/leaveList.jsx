import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableCell, TableColumn, TableRow, TableBody, Button } from '@nextui-org/react';

const LeaveRequestsList = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token=localStorage.getItem('token')

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:8000/leave/request/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setLeaves(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch leave requests.');
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);

    const handleDelete = async (leaveId, leaveStatus) => {
        if (leaveStatus !== 'pending') {
            alert('Only pending leave requests can be deleted.');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this leave request?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/leave/delete/${leaveId}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave.id !== leaveId));
        } catch (err) {
            alert('Failed to delete the leave request.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className='text-xl font-bold text-center'>Leave Requests</h1>
            <Table aria-label="Leave Requests Table" isStriped>
                <TableHeader>
                    <TableColumn>Employee Name</TableColumn>
                    <TableColumn>Start Date</TableColumn>
                    <TableColumn>End Date</TableColumn>
                    <TableColumn>Leave Reason</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"no leave history available"}>
                    {leaves.map((leave) => (
                        <TableRow key={leave.id}>
                            <TableCell>{leave.employee_name}</TableCell>
                            <TableCell>{leave.date_from}</TableCell>
                            <TableCell>{leave.date_to}</TableCell>
                            <TableCell>{leave.reason}</TableCell>
                            <TableCell>{leave.status}</TableCell>
                            <TableCell>
                                <button
                                    color="error"
                                    auto
                                    className='btnD'
                                    size="small"
                                    onClick={() => handleDelete(leave.id, leave.status)}
                                >
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LeaveRequestsList;
