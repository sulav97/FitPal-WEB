import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/Logo/Logo3.png';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("isVerified");
            localStorage.removeItem("isAdmin");
            setIsAuthenticated(false);
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md border-b">
            {/* Logo Section (Moved Right & Lowered) */}
            <div className="md:block">
                <Link to="/" className="flex items-center ml-12 mt-2">
                    <img src={Logo} alt="logo" className="w-20 h-20 object-contain" />
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="text-gray-800 md:hidden focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                    />
                </svg>
            </button>

            {/* Navigation Links with Increased Spacing */}
            <div
                className={`${
                    menuOpen ? 'block' : 'hidden'
                } md:flex md:items-center md:space-x-12 md:text-lg`}  // Adjusted space-x-12
            >
                {[
                    { path: "/home", label: "Home" },
                    { path: "/calc", label: "Caloric Calculator" },
                    { path: "/workout", label: "Workout Log" },
                    { path: "/Calories", label: "Caloric Counter" },
                    { path: "/profile", label: "Profile" },
                    { path: "/AI", label: "AI" },
                    { path: "/FitBit", label: "FitBit" }
                ].map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className="text-gray-700 hover:text-blue-600 transition-all py-2 block"
                        onClick={handleLinkClick}
                    >
                        {label}
                    </Link>
                ))}
            </div>

            {/* Auth Buttons */}
            <div>
                {isAuthenticated ? (
                    <button
                        className={`bg-blue-600 text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-blue-700 transition-all focus:outline-none ${
                            isLoading ? 'cursor-not-allowed bg-blue-400' : ''
                        }`}
                        onClick={handleLogout}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging Out...' : 'Logout'}
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-blue-600 text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-blue-700 transition-all focus:outline-none"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
