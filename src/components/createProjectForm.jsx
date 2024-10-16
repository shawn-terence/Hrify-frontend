import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Spacer } from "@nextui-org/react";
import { Card,CardBody } from "@nextui-org/react";
const CreateProjectForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [manager, setManager] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token=localStorage.getItem('token')
  // Function to handle search for users by email
  const handleSearch = async (e) => {
    const email = e.target.value;
    setSearchEmail(email);

    if (email.length > 2) {
      try {
        const response = await axios.get(`http://localhost:8000/users/?email=${email}`,{
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    } else {
      setSearchResults([]); // Clear search results if email length < 3
    }
  };

  // Function to add selected employee to the list
  const addEmployee = (email) => {
    if (!employees.includes(email)) {
      setEmployees([...employees, email]);
    }
    setSearchResults([]); // Clear search results after selection
    setSearchEmail(""); // Clear the search input
  };
  const removeEmployee = (email) => {
    setEmployees(employees.filter((emp) => emp !== email));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/projects/create/", {
        name,
        description,
        start_date: startDate,
        end_date: endDate,
        employees,
        manager,
      });
      console.log(response.data);
      // Handle success (show message, redirect, etc.)
    } catch (error) {
      console.error(error.response.data);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <Card>
      <CardBody className="">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <Input
              label="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <Input
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <Input
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Manager Email</label>
            <Input
              label="Manager Email"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Search Employee Emails</label>
            <Input
              label="Search Employee Emails"
              value={searchEmail}
              onChange={handleSearch}
              placeholder="Type to search..."
              fullWidth
            />
            {searchResults.length > 0 && (
              <div className="border border-gray-300 mt-2 p-2 rounded">

                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => addEmployee(user.email)}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {user.email}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <ul className="list-disc pl-5">
            {employees.map((email, index) => (
              <li key={index} className="flex justify-between items-center">
                <h4 className="text-lg font-medium">Selected Employees:</h4>
                {email}
                <Button

                  size="xs"
                  color="error"
                  onClick={() => removeEmployee(email)}
                  className="ml-4"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <Spacer y={1} />

        <button className="btnM" type="submit" fullWidth>
          Create Project
        </button>
      </form>
      </CardBody>
    </Card>

  );
};

export default CreateProjectForm;
