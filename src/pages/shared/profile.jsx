import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useDisclosure } from '@nextui-org/react';

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false); // Toggle between edit and view mode
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // For password change modal
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [profileImage, setProfileImage] = useState(null); // State for profile image

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id'); // Assuming you store the user ID after login

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://hrify-backend.onrender.com/user/${userId}/details/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUser(response.data);
        setFormData(response.data); // Pre-fill formData with fetched user data
      } catch (error) {
        console.error('Error fetching user details', error);
        alert('Failed to load user details.');
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  // Handle profile update submission
  const handleUpdateProfile = async () => {
    const updatedData = new FormData(); // Use FormData for image and text data
    Object.keys(formData).forEach((key) => {
      updatedData.append(key, formData[key]);
    });
    if (profileImage) {
      updatedData.append('profile_image', profileImage); // Append profile image if available
    }

    try {
      const response = await axios.patch('https://hrify-backend.onrender.com/user/update/', updatedData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      setUser(response.data);
      setEditMode(false); // Exit edit mode after successful update
      alert("Profile updated successfully!");
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile.');
    }
  };

  // Handle password change submission
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageColor('red');
      return;
    }

    try {
      const response = await axios.put('https://hrify-backend.onrender.com/user/password/', {
        old_password: oldPassword,
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {
        setMessage("Password updated successfully!");
        setMessageColor('green');
        setOldPassword(''); // Clear input fields
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to update password.";
      setMessage(errorMessage);
      setMessageColor('red');
    }
  };

  return (
    <div className="profile-container flex flex-col items-center max-w-6xl">
      <p className="text-3xl font-bold text-center mb-4">My Profile</p>
      <Card className='' id='profile-card'>
        <CardHeader className='header'>
          <div className='flex flex-col md:flex-row '>
            <div className='flex flex-col items-center'>
              <img 
                src={user.profile_picture_url || 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678099-profile-filled-64.png'} 
                className='w-24 h-24 rounded-full sm:w-40 sm:h-40 md:w-36 md:h-36 lg:w-40 lg:h-40'
                alt='Profile Avatar'
              />
              {editMode && (
                <div className="mt-4">
                  <Input
                    type="file"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                    accept="image/*"
                  />
                </div>
              )}
            </div>
            <div className='name-email'>
              <p className='text-center md:text-start text-2xl font-bold'>
                {user.first_name} {user.last_name}
              </p>
              <p className='text-lg'>{user.email}</p>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
            <div>
              <p>First Name</p>
              <Input
                isDisabled={!editMode}
                name="first_name"
                value={formData.first_name || ''}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </div>
            <div>
              <p>Last Name</p>
              <Input
                isDisabled={!editMode}
                name="last_name"
                value={formData.last_name || ''}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
            <div>
              <p>Email</p>
              <Input
                isDisabled={!editMode}
                name="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <p>Phone Number</p>
              <Input
                isDisabled={!editMode}
                name="phone_number"
                value={formData.phone_number || ''}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
            <div>
              <p>Job Role</p>
              <Input
                isDisabled={true}
                name="job_role"
                value={formData.job_role || ''}
              />
            </div>
            <div>
              <p>Department</p>
              <Input
                isDisabled={true}
                name="department"
                value={user.department || ''}
              />
            </div>
          </div>
        </CardBody>

        <CardFooter className='grid gap-2 md:grid-cols-2'>
          {editMode ? (
            <>
              <button className='btnM' onClick={handleUpdateProfile}>Save Changes</button>
            </>
          ) : (
            <>
              <button className='btnM' onClick={() => setEditMode(true)}>Edit Profile</button>
              <button className='btnM' onClick={onOpen}>Change Password</button>
            </>
          )}
        </CardFooter>
      </Card>

      {/* Modal for password change */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3>Change Password</h3>
              </ModalHeader>
              <ModalBody>
                <Input
                  clearable
                  type="password"
                  label="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  clearable
                  type="password"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  clearable
                  type="password"
                  label="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                {confirmNewPassword && newPassword !== confirmNewPassword && (
                  <p style={{ color: 'red' }}>Passwords do not match</p>
                )}
                {message && (
                  <p style={{ color: messageColor }}>{message}</p>
                )}
              </ModalBody>
              <ModalFooter className='grid grid-cols-2'>
                <button className='btnD' onClick={handleChangePassword}>Update Password</button>
                <button className='btnA' auto onClick={onClose}>Close</button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Profile;
