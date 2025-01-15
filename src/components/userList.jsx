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
                const response = await axios.get('https://hrify-backend.onrender.com/users/', {
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
            <p className='text-xl font-bold text-center mb-4'>All Employees</p>
            <div className="flex justify-center items-center p-4">
            <div className="w-full sm:max-w-xl flex flex-wrap gap-2">
                <Input
                clearable
                underlined
                label="Enter employee name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                className="w-full sm:w-72" // Full width on smaller screens, fixed width on larger screens
                />
                <button className="btnM w-full sm:w-auto">Search</button> {/* Full width on smaller screens */}
            </div>
        </div>
            <Spacer y={6}/>
            <Table>
                <TableHeader >
                    <TableColumn className='text-base font-bold'>Name</TableColumn>
                    <TableColumn className='text-base font-bold'>Email</TableColumn>
                    <TableColumn className='text-base font-bold'>Department</TableColumn>
                    <TableColumn className='text-base font-bold'>More Details</TableColumn>
                    <TableColumn className='text-base font-bold'>Make report</TableColumn>
                </TableHeader>
                <TableBody className='text-lg'>
                    {filteredUsers.map(user => (
                        <TableRow  key={user.id}>
                            <TableCell className='text-base font-medium'>{`${user.first_name} ${user.last_name}`}</TableCell>
                            <TableCell className='text-base font-medium'>{user.email}</TableCell>
                            <TableCell className='text-base font-medium'>{user.department}</TableCell>
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
