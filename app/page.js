"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://nextjs-quiz-backend.onrender.com/api/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200) {
        toast.success(data.message, {
          className: 'success',
        });
        window.location.href = '/login';

      } else {
        toast.error(data.message, {
          className: 'error',
        });
      }

      // Clear the text fields after login attempt
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Server error', {
        className: 'error',
      });

      // Clear the text fields in case of error
      setEmail('');
      setPassword('');
    }
  };

  return (
    <main className="login-container">
      <Toaster
        toastOptions={{
          className: 'toaster',
        }}
      />
      <div className='login-box'>
        <h1 className='login-title'>Login</h1>
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
