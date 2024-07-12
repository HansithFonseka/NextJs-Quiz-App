"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200) {
        // Save token to localStorage or handle login success
        localStorage.setItem('token', data.token);
        // Redirect or update state to indicate login success
        console.log('Login successful');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Server error');
    }
  };

  return (
    <main className="login-container">
      <div className='login-box'>
        <h1 className='login-title'>Login</h1>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type='submit' className='login-button'>Login</button>
        </form>
        <div className='footer'>
          <p>Don't have an account? <Link href='/register'>Create Account</Link></p>
        </div>
      </div>
    </main>
  );
}
