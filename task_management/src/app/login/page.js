'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Later: Send data to your /api/auth/login route
    console.log('Logging in with:', form);
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full mb-2 p-2 border"
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="w-full mb-4 p-2 border"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-2 text-sm">
        Don't have an account?{' '}
        <Link href="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
}
