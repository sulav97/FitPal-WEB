import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import SignupImage from "../../Assets/signupphoto.png"; // ✅ Background Image

const baseURL = 'http://localhost:8080/';

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        nickName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordValidations, setPasswordValidations] = useState({
        hasUpperCase: false,
        hasSpecialChar: false,
        hasMinLength: false,
        hasNumber: false,
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
        if (input.name === "password") {
            validatePassword(input.value);
        }
    };

    const validatePassword = (password) => {
        setPasswordValidations({
            hasUpperCase: /[A-Z]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasMinLength: password.length >= 6,
            hasNumber: /\d/.test(password),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { hasUpperCase, hasSpecialChar, hasMinLength, hasNumber } = passwordValidations;
        if (!hasUpperCase || !hasSpecialChar || !hasMinLength || !hasNumber) {
            setError("Password does not meet the requirements.");
            return;
        }
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setIsLoading(true);
        try {
            const url = `${baseURL}api/users/register`;
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${SignupImage})` }} // ✅ Background Image
        >
            {/* Transparent Signup Form */}
            <div className="w-[400px] md:w-[500px] p-8 bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">Create an Account</h1>
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter first name"
                                value={data.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                value={data.lastName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Nickname</label>
                        <input
                            type="text"
                            name="nickName"
                            placeholder="Enter nickname"
                            value={data.nickName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={data.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Password Validations */}
                    <ul className="w-full text-sm mb-4">
                        {[
                            { condition: passwordValidations.hasUpperCase, text: "One capital letter" },
                            { condition: passwordValidations.hasSpecialChar, text: "One special character" },
                            { condition: passwordValidations.hasMinLength, text: "At least 6 characters long" },
                            { condition: passwordValidations.hasNumber, text: "At least one number" },
                        ].map(({ condition, text }, index) => (
                            <li key={index} className="flex items-center">
                                {condition ? (
                                    <FaCheck className="text-green-500 mr-2" />
                                ) : (
                                    <FaTimes className="text-red-500 mr-2" />
                                )}
                                {text}
                            </li>
                        ))}
                    </ul>
                    {/* Error & Success Messages */}
                    {error && <div className="w-full p-4 text-sm bg-red-500 text-white text-center rounded">{error}</div>}
                    {msg && <div className="w-full p-4 text-sm bg-blue-500 text-white text-center rounded">{msg}</div>}
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-bold transition duration-200 ${
                            isLoading ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Sign Up"}
                    </button>
                </form>
                {/* Already Have an Account? */}
                <p className="mt-4 text-gray-700 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
