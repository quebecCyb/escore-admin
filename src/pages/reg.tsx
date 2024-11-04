import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
            Router.push('/log');
        } else {
            alert('Error registering user');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="register-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="register-input"
                />
                <button type="submit" className="register-button">Register</button>
                <p className="login-link">
                    Already have an account? <Link href="/log">Login here</Link>
                </p>
            </form>
            <style jsx>{`
                .register-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background-color: #f0f4f8;
                }

                .register-form {
                    width: 100%;
                    max-width: 400px;
                    padding: 2rem;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .register-form h2 {
                    margin-bottom: 1.5rem;
                    color: #333;
                }

                .register-input {
                    width: 100%;
                    padding: 0.75rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                }

                .register-input:focus {
                    outline: none;
                    border-color: #0070f3;
                    box-shadow: 0 0 4px rgba(0, 112, 243, 0.2);
                }

                .register-button {
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #0070f3;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .register-button:hover {
                    background-color: #005bb5;
                }

                .login-link {
                    margin-top: 1rem;
                    color: #555;
                    font-size: 0.9rem;
                }

                .login-link a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .login-link a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}
