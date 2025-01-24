import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Progress } from '@nextui-org/react';
import { Input } from '@nextui-org/input';
import { Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Show progress bar
    setLoadingMessage('Initializing...'); // Initial status

    // Status messages to show during progress
    const statusMessages = [
      'Authenticating...',
      'Accessing database...',
      'Validating credentials...',
      'Establishing secure session...',
    ];

    // Update loading messages in intervals
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < statusMessages.length) {
        setLoadingMessage(statusMessages[messageIndex]);
        messageIndex++;
      }
    }, 2000); 



    try {
      const response = await fetch('https://hrify-backend.onrender.com/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      clearInterval(interval);
      setLoadingMessage('Processing response...');



      const data = await response.json();

      if (response.ok) {
        setLoadingMessage('Login successful!');
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);

          if (data.role === 'employee') {
            navigate('/emp/emphome');
          } else if (data.role === 'admin') {
            navigate('/adm/admhome');
          }
        }, 1000); // Add slight delay before navigating
      } else {
        setIsLoading(false);
        setError('Invalid email or password');
      }
    } catch (error) {
      clearInterval(interval);
      setIsLoading(false);
      setError('An error occurred. Please check your network connection and try again.');
    }
  };

  return (
    <div className="login-container">
      <div>
        <Card id="login-card" className="bg-transparent">
          <CardHeader className="flex flex-col">
            <div>
              <Image
                id="Logo"
                width={80}
                radius="full"
                src="https://cdn4.iconfinder.com/data/icons/online-shop-7/128/team-people-group-256.png"
              />
              <p className="pl-4 mt-2 text-lg font-bold text-white">Hrify</p>
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleLogin}>
              <Input
                type="email"
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
              <button type="submit" className="btnM" disabled={isLoading}>
                <p>{isLoading ? 'Processing...' : 'Login'}</p>
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          </CardBody>
          {isLoading && (
            <div className="loader">
              <Progress isIndeterminate  />
              <p className="text-center text-xl mt-2 text-white">{loadingMessage}</p>
            </div>
          )}
          <CardFooter className="grid text-white font-semibold">
            <div>
              <p>Employee email: john.doe@example.com</p>
              <p>Password: password123</p>
            </div>
            <div>
              <p>Admin email: jane.doe@example.com</p>
              <p>Password: password123</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
