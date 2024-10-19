import React, { useState } from 'react';
import { loginCompany } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ReactComponent as Logo } from '../imagelogo.svg'; // Importing the logo

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        
        const existingToken = localStorage.getItem('token');
        
        if (existingToken) {
            console.log('Existing token found, removing it.');
            localStorage.removeItem('token');
        }
        
        try {
            const response = await loginCompany(formData);
            if (response.success) {
                localStorage.setItem('token', response.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    console.log('Token expired and removed');
                    navigate('/login');
                }, 3600000);
                navigate('/dashboard');
            } else if (response.message.includes('not verified')) {
                navigate(`/otp-verification?email=${formData.email}&mobile=${formData.mobile}`);
            } else {
                setError(response.message || 'Login failed, please try again.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Login failed, please try again.');
            }
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header with logo and contact */}
            <header className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-sm">
                <div className="flex items-center">
                    <Logo className="h-10 w-auto" /> {/* SVG Logo */}
                </div>
                <div>
                    <a href="/contact" className="text-gray-600 text-2xl hover:underline">
                        Contact
                    </a>
                </div>
            </header>

            <div className="flex-grow flex items-center justify-center bg-gray-50">
                <div className="container mx-auto px-6 md:flex md:items-center md:justify-between">
                    {/* Left section with logo and text */}
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 mr-10 p-6">
                        <p className="mt-4 mr-4 text-normal text-gray-600 leading-relaxed">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the
                            1500s, when an unknown printer took a galley.
                        </p>
                    </div>

                    {/* Right section with form */}
                    <div className="md:w-1/2 bg-white p-8 shadow-lg rounded-lg max-w-xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 text-center">Login</h2>
                        <p className="text-center text-gray-500 mb-6">Please enter your credentials to log in</p>

                        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <FaEnvelope className="h-5 w-5 text-gray-500 mx-2" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        value={formData.email}
                                        required
                                        className="w-full px-4 py-3 border-0 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <FaLock className="h-5 w-5 text-gray-500 mx-2" />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={formData.password}
                                        required
                                        className="w-full px-4 py-3 border-0 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="text-blue-500 hover:underline">Forgot your password?</a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-blue-500 hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
