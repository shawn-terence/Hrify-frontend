import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import axios from 'axios';
import { Input, Spacer } from '@nextui-org/react'; // Import Input for the search bar
import { Button } from '@nextui-org/button';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleMoreDetails = (userId) => {
        navigate(`/adm/employee/${userId}`);
    };

    const handleMakeReport = (userId) => {
        navigate(`/adm/write/report/${userId}`);
    };

    // Filter users based on the search term
    const filteredUsers = users.filter(user => 
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <p className='text-xl font-bold text-center'>All Employees</p>
            <div className='flex justify-center items-center '>
                <div className='max-w-xl flex gap-2'>
                    <Input 
                        clearable 
                        underlined 
                        label="Enter employee name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        style={{width: '300px' }}
                    />
                    <button className='btnM'>Search</button>
                </div>
            </div>
            <Spacer y={2}/>
            <Table>
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Department</TableColumn>
                    <TableColumn>More Details</TableColumn>
                    <TableColumn>Make report</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell>
                                <button className='btnM' onClick={() => handleMoreDetails(user.id)}>
                                    View Details
                                </button>
                            </TableCell>
                            <TableCell>
                                <button className='btnM' onClick={() => handleMakeReport(user.id)}>write report</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default UserList;
