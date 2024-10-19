import React, { useState, useEffect } from 'react';
import { verifyEmailOtp, verifyMobileOtp } from '../services/verificationService.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { ReactComponent as Logo } from '../imagelogo.svg'; // Importing the logo

const OtpVerification = () => {
    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setEmail(params.get('email'));

        const mobileNumber = params.get('mobile')?.trim();
        if (mobileNumber) {
            setMobile(`+${mobileNumber}`);
        }
        console.log(mobile,mobileOtp);
    }, [location.search]);

    const handleEmailOtpChange = (e) => {
        setEmailOtp(e.target.value);
    };

    const handleMobileOtpChange = (e) => {
        setMobileOtp(e.target.value);
        console.log("Mobile OTP changed:", e.target.value); // Log input changes
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Log the state values before sending
        console.log("Current state values:", { email, emailOtp, mobile, mobileOtp });
        
        try {
            console.log("Sending email data:", { email, otp: emailOtp });
            const emailResponse = await verifyEmailOtp({ email, otp: emailOtp });
            if (emailResponse.success) {
                alert('You have successfully verified your email.'); // Success pop-up for email
            } else {
                alert(emailResponse.message || 'Email OTP verification failed.');
                return; // Exit if email verification fails
            }
    
            // Log the mobile data to check if it's populated
            console.log("Sending mobile data:", { mobile, otp: mobileOtp });
            const mobileResponse = await verifyMobileOtp({ mobile, otp: mobileOtp });
            if (mobileResponse.success) {
                alert('You have successfully verified your mobile number.'); // Success pop-up for mobile
                navigate('/login'); // Navigate to login after successful verification
            } else {
                alert(mobileResponse.message || 'Mobile OTP verification failed.');
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            alert('Error occurred during OTP verification. Please try again.');
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

            <div className="flex-grow flex items-center justify-between bg-gray-50">
                {/* Left Section */}
                <div className="flex flex-col justify-center items-start pl-8 md:pl-16 lg:pl-24 w-full md:w-1/2">
                    <p className="mt-6 text-lg text-gray-500">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley.
                    </p>
                </div>

                {/* Right Section with Form */}
                <div className="flex items-center justify-center p-6 bg-white w-full md:w-1/2">
                    <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
                        <p className="text-center text-gray-400 mt-1">Lorem Ipsum is simply dummy text</p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            {/* Email OTP */}
                            <div>
                                <label htmlFor="email-otp" className="sr-only">Email OTP</label>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <div className="flex-shrink-0 px-4 py-2">
                                        <FaEnvelope className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="email-otp"
                                        placeholder="Email OTP"
                                        onChange={handleEmailOtpChange}
                                        value={emailOtp}
                                        className="w-full px-4 py-2 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Mobile OTP */}
                            <div>
                                <label htmlFor="mobile-otp" className="sr-only">Mobile OTP</label>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <div className="flex-shrink-0 px-4 py-2">
                                        <FaPhone className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="mobile-otp"
                                        placeholder="Mobile OTP"
                                        onChange={handleMobileOtpChange}
                                        value={mobileOtp}
                                        className="w-full px-4 py-2 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div>
                                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
