'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push('/profile');
    else alert('Login failed');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #b2dfdb 100%)'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '2.5rem 2rem',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '340px',
          gap: '1.4rem'
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#00796b', marginBottom: '0.5rem', fontWeight: 700, fontSize: '2rem' }}>
          🌳 Welcome Back!
        </h2>
        <p style={{ textAlign: 'center', color: '#009688', marginBottom: '1rem', fontSize: '1.1rem' }}>
          Sign in to join and grow your green community.
        </p>
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{
            padding: '0.9rem',
            borderRadius: '8px',
            border: '1.5px solid #b2dfdb',
            fontSize: '1rem',
            color: '#222', // Make input text visible
            background: '#f7fafc'
          }}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{
            padding: '0.9rem',
            borderRadius: '8px',
            border: '1.5px solid #b2dfdb',
            fontSize: '1rem',
            color: '#222', // Make input text visible
            background: '#f7fafc'
          }}
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          style={{
            padding: '0.9rem',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #009688 0%, #43cea2 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(67,206,162,0.08)',
            transition: 'background 0.2s'
          }}
        >
          Login
        </button>
        <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#888', fontSize: '0.95rem' }}>
          New here? <a href="/register" style={{ color: '#009688', textDecoration: 'underline' }}>Create an account</a>
        </div>
      </form>
    </div>
  );
}