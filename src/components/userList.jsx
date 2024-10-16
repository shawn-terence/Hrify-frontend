import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import axios from 'axios';
import { Button } from '@nextui-org/button';
const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const token=localStorage.getItem('token')
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/', {
                    headers: {
                        'Authorization': `Token ${token}` // Adjust this line based on your token handling
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
        navigate(`/adm/employee/${userId}`); // Adjust this to match your route for user details
    };
    const handleMakeReport=(userId)=>{
        navigate(`/adm/write/report/${userId}`)
    }

    return (
        <div>
            <p className='text-xl font-bold text-center'>All Employees</p>
            <Table > 
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Department</TableColumn>
                    <TableColumn>More Details</TableColumn>
                    <TableColumn>Make report</TableColumn>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
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
