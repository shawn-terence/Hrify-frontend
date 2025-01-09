import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import { Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:8000/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);

        // Redirect based on user role
        if (data.role === 'employee') {
          navigate('/emp/emphome');
        } else if (data.role === 'admin') {
          navigate('/adm/admhome');
        }
      } else if (response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please check your network connection and try again.');
    }
  };
  return (
    <div className="login-container">
      <div className="">
        <Card id='login-card' className='bg-transparent'>
          <CardHeader className='flex flex-col'>
            <div className="">
              <Image
                id="Logo"
                width={80}
                radius="full"
                src='https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png'
              />
              <p className='pl-4 mt-2 text-lg font-bold text-white'>Hrify</p>
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleLogin}>
              <Input
                type='email'
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pb-4"
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent pb-4"
              />
              <button type='submit' className="btnM">
                <p>Login</p>
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            </form>
          </CardBody>
          <CardFooter className='grid text-white font-semibold'>
            <div>
              <p>email:Johndoe@example.com</p>
              <p>password:ppassword123</p>
            </div>
            <div>
              <p>Employee email:Pete@example.com</p>
              <p>password:ppassword123</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
