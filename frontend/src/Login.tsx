import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token and user info for Person 3's Auth Middleware
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // M10: Role-Based Redirection logic
        if (data.user.role === 'ADMIN') {
          navigate('/admin/dashboard'); // Your Admin Panel
        } else if (data.user.role === 'OFFICER') {
          navigate('/officer/portal');  // Your Officer Portal
        } else {
          navigate('/citizen/home');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Road Damage System</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <input 
          type="email" placeholder="Email" 
          className="w-full p-2 mb-4 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 mb-6 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;