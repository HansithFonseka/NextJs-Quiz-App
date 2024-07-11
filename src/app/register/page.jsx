"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, confirmPassword })
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      // Clear form fields on success
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <main className="register-container">
      <div className='register-box'>
        <h1 className='register-title'>Create Account</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} className='register-form'>
          <div className='input-group'>
            <label htmlFor='username'>Username</label>
            <input 
              type='text' 
              id='username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder="Enter your Username"
            />
          </div>
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
          <div className='input-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input 
              type='password' 
              id='confirmPassword' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="Confirm your password"
            />
          </div>
          <button type='submit' className='register-button'>Create Account</button>
        </form>
        <div className='footer'>
          <p>Already have an account? <Link href=''>Login</Link></p>
        </div>
      </div>
    </main>
  );
}