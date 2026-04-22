import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { AlertCircle } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginError, setLoginError] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            emailOrPhone: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            emailOrPhone: Yup.string().required('Email or Phone is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setLoginError(null);
                const res = await api.post('/auth/login', values);

                if (res.data.success) {
                    const { user, accessToken, refreshToken } = res.data;
                    login(user, accessToken, refreshToken);

                    // Route based on role
                    if (user.role === 'admin') navigate('/admin/dashboard');
                    else if (user.role === 'owner') navigate('/owner/dashboard');
                    else navigate('/student/dashboard');
                }
            } catch (err) {
                setLoginError(err.response?.data?.message || 'Server login failed');
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleGoogleLogin = () => {
        // Redirect to backend passport auth
        window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/google`;
    };

    return (
        <div className="bg-background-light text-[#1d110c] h-screen overflow-hidden flex flex-col font-display">
            {/* Main Container */}
            <div className="flex flex-1 w-full h-full">

                {/* Left Side: Hero / Illustration (40%) */}
                <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-primary to-[#ff8f66] flex-col justify-between p-12 relative overflow-hidden">
                    {/* Decorative circle */}
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 rounded-full bg-black/5 blur-3xl"></div>

                    <div className="z-10">
                        <Link to="/" className="flex items-center gap-2 mb-8 cursor-pointer">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">restaurant_menu</span>
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight">MessConnect</span>
                        </Link>
                    </div>

                    <div className="z-10 flex flex-col gap-6">
                        <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-2xl bg-black/10 backdrop-blur-sm border border-white/20">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYxdRlT-zUmHBxcM_v4nrwTrgnaDay8eA4JAZDSxvxj2HSiTlA-5dxjDVpKshDgCFvRSYT7T-ludr95aMnBs4PN7QTPNbQc97GaDNJc1dkq7KiLkiOpOT1Oxqjrm6cRwG563S8BqWFnKUlC8z8Kid3SBt0U42LFKew26C6-4fglGyzupwmWBEK48d8MQso0SZ-adghZEBvar3rDDLJaK53cp5TrCxKFzL97ZR8gZkuORHVt9dphLWd7IS0Ghi1WnLHzYISVCkVkCU')" }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <p className="text-sm font-medium uppercase tracking-wider opacity-90 mb-2">Student Life</p>
                                <p className="text-lg font-semibold leading-snug">"Finding a healthy meal near campus used to be a struggle. Now it's the highlight of my day."</p>
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <h1 className="text-4xl font-black text-white leading-tight">Welcome Back!</h1>
                            <p className="text-white/90 text-lg font-medium">Continue your food journey with real-time menus and transparent pricing.</p>
                        </div>
                    </div>

                    <div className="z-10 text-white/60 text-sm mt-8">
                        © 2026 MessConnect. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Login Form (60%) */}
                <div className="w-full lg:w-[60%] bg-white flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                    <div className="w-full max-w-md space-y-8">

                        {/* Mobile Logo (Visible only on small screens) */}
                        <div className="lg:hidden flex justify-center mb-6">
                            <Link to="/" className="flex items-center gap-2 text-primary cursor-pointer">
                                <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
                                <span className="font-bold text-2xl tracking-tight text-[#1d110c]">MessConnect</span>
                            </Link>
                        </div>

                        <div className="text-center lg:text-left space-y-2">
                            <h2 className="text-3xl font-black tracking-tight text-[#1d110c]">Login to Your Account</h2>
                            <p className="text-gray-500">Welcome back! Please enter your details.</p>
                        </div>

                        {loginError && (
                            <div className="bg-red-50 p-3 rounded-lg flex items-start gap-3 border border-red-100">
                                <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">{loginError}</p>
                            </div>
                        )}

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            {/* Email/Phone Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#1d110c]" htmlFor="emailOrPhone">Email or Phone Number</label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <span className="material-symbols-outlined text-[20px]">mail</span>
                                    </div>
                                    <input
                                        className={`block w-full rounded-lg border-gray-200 bg-background-light pl-10 py-3 text-sm focus:border-primary focus:ring-primary sm:text-sm ${formik.touched.emailOrPhone && formik.errors.emailOrPhone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                                            }`}
                                        id="emailOrPhone"
                                        name="emailOrPhone"
                                        placeholder="student@university.edu"
                                        type="text"
                                        {...formik.getFieldProps('emailOrPhone')}
                                    />
                                </div>
                                {formik.touched.emailOrPhone && formik.errors.emailOrPhone ? (
                                    <p className="text-sm text-red-600 mt-1">{formik.errors.emailOrPhone}</p>
                                ) : null}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#1d110c]" htmlFor="password">Password</label>
                                <div className="relative rounded-lg shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                    <input
                                        className={`block w-full rounded-lg border-gray-200 bg-background-light pl-10 py-3 text-sm focus:border-primary focus:ring-primary sm:text-sm ${formik.touched.password && formik.errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                                            }`}
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        {...formik.getFieldProps('password')}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-[20px] select-none">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </div>
                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
                                ) : null}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary bg-transparent"
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        {...formik.getFieldProps('rememberMe')}
                                        checked={formik.values.rememberMe}
                                    />
                                    <label className="ml-2 block text-sm text-gray-600" htmlFor="rememberMe">Remember for 30 days</label>
                                </div>
                                <div className="text-sm">
                                    <Link className="font-medium text-primary hover:text-primary-dark" to="/forgot-password">Forgot password?</Link>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    className="flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200 disabled:opacity-70"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-gray-500 font-medium">OR</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
                                type="button"
                                onClick={handleGoogleLogin}
                            >
                                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-4.6667-3.7833-8.45-8.45-8.45-4.6667 0-8.45 3.7833-8.45 8.45 0 4.6667 3.7833 8.45 8.45 8.45Z" fill="#fff" fillOpacity="0" stroke="none"></path>
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                                <span className="truncate">Google</span>
                            </button>
                            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1877F2] px-3 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#1864D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2] transition-colors" type="button">
                                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                                </svg>
                                <span className="truncate">Facebook</span>
                            </button>
                        </div>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link className="font-bold text-primary hover:text-primary-dark transition-colors" to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
