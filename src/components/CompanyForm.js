import React, { useState } from 'react';
import { registerCompany } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaMobileAlt, FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons
import { ReactComponent as Logo } from '../imagelogo.svg';

const CompanyForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        try {
            console.log("Form Data:", formData);
            const response = await registerCompany(formData);
            if (response.success) {
                console.log("Company registered successfully");
                navigate(`/otp-verification?email=${formData.email}&mobile=${formData.mobile}`);
            } else {
                alert(response.message || 'Error occurred during registration.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('An error occurred during registration. Please try again.');
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
                <div className="container mx-auto px-6 md:flex md:items-center md:justify-between ">
                    {/* Left section with text */}
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 mr-10 p-6">
                        <p className="mt-4 text-gray-600">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus ab quas illo ea praesentium architecto officia soluta adipisci vitae laboriosam dolores ullam est, reiciendis quae recusandae ex possimus! Accusantium, praesentium.
                        </p>
                    </div>

                    {/* Right section with form */}
                    <div className="md:w-1/2 bg-white p-8 shadow-lg rounded-lg max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 text-center">Register Company</h2>
                        <p className="text-center text-gray-500 mb-6">Please fill in the details below to register</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <label htmlFor="name" className="sr-only">Company Name</label>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <FaBuilding className="h-5 w-5 text-gray-500 mx-2" /> {/* Company icon */}
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Company Name"
                                        onChange={handleChange}
                                        value={formData.name}
                                        required
                                        className="w-full px-4 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <FaMobileAlt className="h-5 w-5 text-gray-500 mx-2" /> {/* Mobile icon */}
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        placeholder="Mobile Number"
                                        onChange={handleChange}
                                        value={formData.mobile}
                                        required
                                        className="w-full px-4 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <FaEnvelope className="h-5 w-5 text-gray-500 mx-2" /> {/* Email icon */}
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        value={formData.email}
                                        required
                                        className="w-full px-4 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <FaLock className="h-5 w-5 text-gray-500 mx-2" /> {/* Lock icon */}
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={formData.password}
                                        required
                                        className="w-full px-4 py-2 border-0 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-500 text-xs">
                                    By clicking on Register, you agree to our{' '}
                                    <a href="#" className="text-blue-500 underline">Terms & Conditions</a>
                                </p>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        {/* Button to navigate to Login page */}
                        <div className="mt-4 text-center">
                            <p className="text-gray-500 text-sm">
                                Already have an account?{' '}
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-blue-500 underline"
                                >
                                    Login here
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyForm;
