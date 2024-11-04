import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/auth/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('token', data.token);
            Cookies.set('token', data.token, { expires: 7 });

            Router.push('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
                <p className="register-link">
                    Don’t have an account? <Link href="/reg">Register here</Link>
                </p>
            </form>
            <style jsx>{`
                .login-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background-color: #f0f4f8;
                    color: black;
                }

                .login-form {
                    width: 100%;
                    max-width: 400px;
                    padding: 2rem;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .login-form h2 {
                    margin-bottom: 1.5rem;
                    color: #333;
                }

                .login-input {
                    width: 100%;
                    padding: 0.75rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                }

                .login-input:focus {
                    outline: none;
                    border-color: #0070f3;
                    box-shadow: 0 0 4px rgba(0, 112, 243, 0.2);
                }

                .login-button {
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

                .login-button:hover {
                    background-color: #005bb5;
                }

                .register-link {
                    margin-top: 1rem;
                    color: #555;
                    font-size: 0.9rem;
                }

                .register-link a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .register-link a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}
