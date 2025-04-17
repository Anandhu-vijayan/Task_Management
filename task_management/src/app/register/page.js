'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            header: { 'content-type': 'application/json' },
            body: JSON.stringify(form),
        })
        const data = await res.json();
        alert(data.message);
        console.log(form);
    };

    return (
        <div className="p-6 max-w-md mx-auto mt-10 border rounded shadow">
            <h1 className="text-xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit}>
                <input name="username" onChange={handleChange} placeholder="Username" className="w-full mb-2 p-2 border" />
                <input name="email" onChange={handleChange} placeholder="Email" type="email" className="w-full mb-2 p-2 border" />
                <input name="password" onChange={handleChange} placeholder="Password" type="password" className="w-full mb-4 p-2 border" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
            </form>
            <p className="mt-2 text-sm">
                Have an account?{' '}
                <Link href="/login" className="text-blue-600 underline">
                    Login
                </Link>
            </p>
        </div>
    );
}
