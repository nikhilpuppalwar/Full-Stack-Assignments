import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="bg-surface shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-2xl font-bold text-primary tracking-tight">Mess<span className="text-text-primary">Connect</span></span>
                    </div>

                    {/* Navigation / Actions */}
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <>
                                <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                                    Login
                                </Link>
                                <Button size="sm" onClick={() => navigate('/signup')}>
                                    Sign Up
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* Conditional Dashboard Link based on role */}
                                {user.role === 'student' && <Link to="/student/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>}
                                {user.role === 'owner' && <Link to="/owner/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>}
                                {user.role === 'admin' && <Link to="/admin/dashboard" className="text-sm font-medium hover:text-primary">Admin</Link>}

                                {user.role === 'student' ? (
                                    <Link to="/student/profile" className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold hover:bg-orange-200 transition-colors">
                                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                    </Link>
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                )}
                                <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
