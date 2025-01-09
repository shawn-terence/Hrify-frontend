import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableCell, TableColumn, TableRow, TableBody, Button, Input } from '@nextui-org/react';

const LeaveRequestsList = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:8000/leave/request/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setLeaves(response.data);
                setFilteredLeaves(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch leave requests.');
                setLoading(false);
            }
        };

        fetchLeaves();
    }, [token]);

    useEffect(() => {
        let filtered = leaves;

        // Filter by status
        if (statusFilter) {
            filtered = filtered.filter((leave) => leave.status.toLowerCase() === statusFilter);
        }

        // Filter by search query (leave reason)
        if (searchQuery) {
            filtered = filtered.filter((leave) =>
                leave.reason.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredLeaves(filtered);
    }, [searchQuery, statusFilter, leaves]);

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
            <h1 className="text-xl font-bold text-center">Leave Requests</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <Input
                    clearable
                    underlined
                    label="Search by reason"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Filter Buttons */}
            <div className="requestfltr">
                <Button
                    onClick={() => setStatusFilter('')}
                    auto
                    className='font-bold'
                    color={statusFilter === '' ? 'primary' : 'default'}
                >
                    All
                </Button>
                <Button
                    onClick={() => setStatusFilter('pending')}
                    auto
                    className='font-bold'
                    color={statusFilter === 'pending' ? 'primary' : 'default'}
                >
                    Pending
                </Button>
                <Button
                    onClick={() => setStatusFilter('approved')}
                    auto
                    className='font-bold'
                    color={statusFilter === 'approved' ? 'primary' : 'default'}
                >
                    Approved
                </Button>
                <Button
                    onClick={() => setStatusFilter('rejected')}
                    auto
                    className='font-bold'
                    color={statusFilter === 'rejected' ? 'primary' : 'default'}
                >
                    Rejected
                </Button>
            </div>

            {/* Table */}
            <Table aria-label="Leave Requests Table" isStriped>
                <TableHeader>
                    <TableColumn>Employee Name</TableColumn>
                    <TableColumn>Start Date</TableColumn>
                    <TableColumn>End Date</TableColumn>
                    <TableColumn>Leave Reason</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No leave history available">
                    {filteredLeaves.map((leave) => (
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
                                    className="btnD"
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
