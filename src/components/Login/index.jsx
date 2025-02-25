import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../Assets/loginphoto.png"; // ✅ Corrected Path for Background Image

const baseURL = 'http://localhost:8080/';

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [resend, setResend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const url = `${baseURL}api/auth`;
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            localStorage.setItem("isVerified", res.verified);
            localStorage.setItem("email", data.email);

            if (!res.verified) {
                setError("Please verify your email to access all features.");
                setResend(true);
            } else {
                // Optionally, you can use both window.location and navigate if needed.
                window.location = "/";
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError("Check Verification Link");
                setResend(false);
            } else if (error.response && error.response.status > 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                setResend(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendVerification = async () => {
        try {
            const { email } = data;
            await axios.post(`${baseURL}api/auth/resend-verification`, { email });
            setError("Verification email resent. Please check your inbox.");
            setResend(false);
        } catch (error) {
            setError("Error resending verification email.");
        }
    };

    return (
        <div 
            className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${loginImage})` }}
        >
            {/* Login Card */}
            <div className="w-[400px] md:w-[500px] p-8 bg-white shadow-lg rounded-lg bg-opacity-90">
                <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">Welcome Back</h1>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div>
                        <label className="block font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {error && (
                        <div className="w-full p-4 text-sm bg-red-500 text-white text-center rounded">
                            {error}
                        </div>
                    )}

                    {resend && (
                        <button
                            type="button"
                            onClick={handleResendVerification}
                            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-200"
                        >
                            Resend Verification Email
                        </button>
                    )}

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-bold transition duration-200 ${isLoading ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Sign In"}
                    </button>
                </form>

                {/* Signup Section */}
                <p className="mt-4 text-gray-700 text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
