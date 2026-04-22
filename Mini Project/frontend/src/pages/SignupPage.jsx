import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { AlertCircle } from 'lucide-react';

const SignupPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [step, setStep] = useState(1);
    const [signupError, setSignupError] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Timer state for OTP
    const [timer, setTimer] = useState(114); // 01:54 remaining

    useEffect(() => {
        let interval;
        if (step === 3 && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = formik.values.otp.split('');
        newOtp[index] = value;
        const joinedOtp = newOtp.join('');

        formik.setFieldValue('otp', joinedOtp);

        if (value && index < 5) {
            otpRefs[index + 1].current.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
            otpRefs[index - 1].current.focus();
        }
    };

    const validationSchema = React.useMemo(() => {
        if (step === 1) {
            return Yup.object({
                fullName: Yup.string().required('Full Name is required'),
                email: Yup.string().email('Invalid email').required('Email is required'),
                phone: Yup.string().matches(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian phone number').required('Phone is required'),
                password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
            });
        }
        if (step === 2) {
            return Yup.object({
                role: Yup.string().required('Please select a role'),
            });
        }
        if (step === 3) {
            return Yup.object({
                otp: Yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
            });
        }
        return Yup.object({});
    }, [step]);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            role: 'student', // default for UI binding
            otp: ''
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSignupError(null);

            try {
                if (step === 1) {
                    const res = await api.post('/auth/signup/step1', {
                        fullName: values.fullName,
                        email: values.email,
                        phone: values.phone,
                        password: values.password
                    });
                    if (res.data.success) setStep(2);
                }
                else if (step === 2) {
                    const res = await api.post('/auth/signup/step2', { role: values.role });
                    if (res.data.success) {
                        await api.post('/auth/send-otp', { email: values.email, userName: values.fullName });
                        setIsOtpSent(true);
                        setStep(3);
                        setTimer(114);
                    }
                }
                else if (step === 3) {
                    const res = await api.post('/auth/verify-otp', {
                        email: values.email,
                        otp: values.otp,
                        fullName: values.fullName,
                        phone: values.phone,
                        password: values.password,
                        role: values.role
                    });

                    if (res.data.success) {
                        login(res.data.user, res.data.accessToken, res.data.refreshToken);
                        if (res.data.user.role === 'owner') {
                            navigate('/owner/dashboard');
                        } else {
                            navigate('/student/dashboard');
                        }
                    }
                }
            } catch (err) {
                setSignupError(err.response?.data?.message || 'Something went wrong');
            } finally {
                setSubmitting(false);
            }
        }
    });

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            setSignupError(null);
        }
    };

    const handleResendOtp = async () => {
        try {
            setSignupError(null);
            await api.post('/auth/send-otp', { email: formik.values.email, userName: formik.values.fullName });
            setTimer(114);
        } catch (err) {
            setSignupError('Could not resend OTP. Please try again later.');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/auth/google`;
    };

    const renderProgressBar = () => {
        const getStyles = (stepNum) => {
            if (step > stepNum) {
                return "w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/30 ring-4 ring-white transition-transform hover:scale-105";
            } else if (step === stepNum) {
                if (stepNum === 3) {
                    return "w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/30 ring-4 ring-white transition-colors cursor-default";
                }
                return "w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/30 ring-4 ring-white transition-transform hover:scale-105 cursor-pointer";
            } else {
                return "w-10 h-10 rounded-full bg-white border-2 border-[#f4eae6] text-[#a15d45] flex items-center justify-center font-bold ring-4 ring-white transition-colors cursor-default";
            }
        };

        const getIconStr = (stepNum) => {
            if (step > stepNum) return "check";
            if (stepNum === 1) return "person";
            if (stepNum === 2) return "assignment_ind";
            if (stepNum === 3) return "verified_user";
        };

        const getTextStyles = (stepNum) => {
            if (step === stepNum) return "text-xs font-bold text-primary absolute top-12 whitespace-nowrap";
            if (step > stepNum) return "text-xs font-semibold text-primary absolute top-12 whitespace-nowrap";
            return "text-xs font-medium text-[#a15d45] absolute top-12 whitespace-nowrap";
        };

        const barWidth = step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full';

        return (
            <div className="w-full max-w-3xl mb-12 px-4 relative z-0">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#f4eae6] z-[-1] rounded-full"></div>
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 ${barWidth} h-1 bg-primary z-[-1] rounded-full transition-all duration-300`}></div>

                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex flex-col items-center gap-2 group relative z-10 bg-[#fcf9f8] px-2" onClick={() => step > num && setStep(num)}>
                            <div className={getStyles(num)}>
                                <span className="material-symbols-outlined text-xl">{getIconStr(num)}</span>
                            </div>
                            <span className={getTextStyles(num)}>
                                {num === 1 ? 'Personal Details' : num === 2 ? 'Choose Role' : 'Verification'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <style>
                {`
                body { font-family: 'Inter', sans-serif; }
                h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; }
                .step-content { animation: fadeIn 0.4s ease-in-out; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #ead5cd; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #dcb8ac; }
                .role-radio:checked + div {
                    border-color: #ff6933;
                    background-color: #fffaf8;
                    box-shadow: 0 4px 20px -2px rgba(255, 105, 51, 0.1);
                }
                .role-radio:checked + div .check-icon {
                    opacity: 1;
                    transform: scale(1);
                }
                .check-icon {
                    opacity: 0;
                    transform: scale(0.8);
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .otp-input:focus {
                    box-shadow: 0 0 0 2px rgba(255, 105, 51, 0.2);
                }
                `}
            </style>
            <div className="bg-[#fcf9f8] min-h-screen flex flex-col text-[#1d110c] overflow-x-hidden">
                <header className="w-full border-b border-[#f4eae6] bg-white/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-primary cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
                            <span className="text-[#1d110c] text-xl font-bold tracking-tight">MessConnect</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:inline text-sm text-[#a15d45] font-medium">Already have an account?</span>
                            <Link to="/login" className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">Log In</Link>
                        </div>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6">
                    <div className="w-full max-w-[960px] flex flex-col items-center">

                        {renderProgressBar()}

                        <div className={`w-full ${step === 3 ? 'max-w-xl' : 'max-w-2xl'} bg-white rounded-2xl shadow-xl border border-[#f4eae6] overflow-hidden flex flex-col`}>

                            {signupError && (
                                <div className="m-8 mb-0 bg-red-50 p-4 rounded-lg flex items-start gap-3 border border-red-100">
                                    <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-700">{signupError}</p>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="p-8 sm:p-12 step-content">
                                    <div className="mb-8 text-center">
                                        <h2 className="text-3xl font-bold text-[#1d110c] mb-2 tracking-tight">Create your account</h2>
                                        <p className="text-[#a15d45] text-base">Join MessConnect to discover the best messes around you.</p>
                                    </div>
                                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); formik.validateForm().then(errors => { if (Object.keys(errors).length === 0) formik.handleSubmit() }) }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-[#1d110c]" htmlFor="fullName">Full Name</label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className={`material-symbols-outlined text-[20px] transition-colors ${formik.touched.fullName && formik.errors.fullName ? 'text-red-500' : 'text-[#a15d45] group-focus-within:text-primary'}`}>person</span>
                                                    </div>
                                                    <input
                                                        className={`block w-full pl-10 pr-3 py-3 rounded-lg border bg-[#fcf9f8] text-[#1d110c] placeholder-[#a15d45]/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-[#ead5cd]'}`}
                                                        id="fullName"
                                                        placeholder="John Doe"
                                                        type="text"
                                                        {...formik.getFieldProps('fullName')}
                                                    />
                                                </div>
                                                {formik.touched.fullName && formik.errors.fullName && <p className="text-xs text-red-500">{formik.errors.fullName}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-[#1d110c]" htmlFor="email">Email Address</label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className={`material-symbols-outlined text-[20px] transition-colors ${formik.touched.email && formik.errors.email ? 'text-red-500' : 'text-[#a15d45] group-focus-within:text-primary'}`}>mail</span>
                                                    </div>
                                                    <input
                                                        className={`block w-full pl-10 pr-3 py-3 rounded-lg border bg-[#fcf9f8] text-[#1d110c] placeholder-[#a15d45]/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-[#ead5cd]'}`}
                                                        id="email"
                                                        placeholder="john@example.com"
                                                        type="email"
                                                        {...formik.getFieldProps('email')}
                                                    />
                                                </div>
                                                {formik.touched.email && formik.errors.email && <p className="text-xs text-red-500">{formik.errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-[#1d110c]" htmlFor="phone">Phone Number</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className={`material-symbols-outlined text-[20px] transition-colors ${formik.touched.phone && formik.errors.phone ? 'text-red-500' : 'text-[#a15d45] group-focus-within:text-primary'}`}>phone_iphone</span>
                                                </div>
                                                <input
                                                    className={`block w-full pl-10 pr-3 py-3 rounded-lg border bg-[#fcf9f8] text-[#1d110c] placeholder-[#a15d45]/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-[#ead5cd]'}`}
                                                    id="phone"
                                                    placeholder="10-digit mobile number"
                                                    type="tel"
                                                    {...formik.getFieldProps('phone')}
                                                />
                                            </div>
                                            {formik.touched.phone && formik.errors.phone && <p className="text-xs text-red-500">{formik.errors.phone}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-[#1d110c]" htmlFor="password">Password</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className={`material-symbols-outlined text-[20px] transition-colors ${formik.touched.password && formik.errors.password ? 'text-red-500' : 'text-[#a15d45] group-focus-within:text-primary'}`}>lock</span>
                                                </div>
                                                <input
                                                    className={`block w-full pl-10 pr-10 py-3 rounded-lg border bg-[#fcf9f8] text-[#1d110c] placeholder-[#a15d45]/60 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm outline-none ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-[#ead5cd]'}`}
                                                    id="password"
                                                    placeholder="Create a password"
                                                    type={showPassword ? "text" : "password"}
                                                    {...formik.getFieldProps('password')}
                                                />
                                                <div
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-primary transition-colors text-[#a15d45]"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <span className="material-symbols-outlined text-[20px] select-none">{showPassword ? 'visibility' : 'visibility_off'}</span>
                                                </div>
                                            </div>
                                            {formik.touched.password && formik.errors.password && <p className="text-xs text-red-500">{formik.errors.password}</p>}
                                            <div className="pt-1">
                                                <div className="flex gap-1.5 h-1.5 w-full">
                                                    <div className={`h-full w-1/4 rounded-full transition-colors duration-300 ${formik.values.password.length > 0 ? 'bg-red-400' : 'bg-[#ead5cd]'}`}></div>
                                                    <div className={`h-full w-1/4 rounded-full transition-colors duration-300 ${formik.values.password.length >= 6 ? 'bg-yellow-400' : 'bg-[#ead5cd]'}`}></div>
                                                    <div className={`h-full w-1/4 rounded-full transition-colors duration-300 ${formik.values.password.length >= 8 && /\d/.test(formik.values.password) ? 'bg-green-400' : 'bg-[#ead5cd]'}`}></div>
                                                    <div className={`h-full w-1/4 rounded-full transition-colors duration-300 ${formik.values.password.length >= 8 && /\d/.test(formik.values.password) && /[!@#$%^&*]/.test(formik.values.password) ? 'bg-green-500' : 'bg-[#ead5cd]'}`}></div>
                                                </div>
                                                <p className="text-xs text-[#a15d45] mt-2 flex items-start gap-1">
                                                    <span className="material-symbols-outlined text-[14px] mt-px">info</span>
                                                    Must contain at least 8 characters. Add numbers and symbols for strength.
                                                </p>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="mt-8">
                                        <div className="bg-[#fcf9f8]/50 border-t border-[#f4eae6] -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-6 sm:px-12 flex justify-end items-center">
                                            <button
                                                className="bg-primary hover:bg-[#e65a2b] text-white text-sm font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 flex items-center gap-2 group transform active:scale-95 duration-200"
                                                onClick={() => {
                                                    // Only validate Step 1 fields
                                                    formik.setTouched({ fullName: true, email: true, phone: true, password: true });
                                                    formik.validateForm().then(errors => {
                                                        if (!errors.fullName && !errors.email && !errors.phone && !errors.password) {
                                                            formik.handleSubmit();
                                                        }
                                                    });
                                                }}
                                                disabled={formik.isSubmitting}
                                            >
                                                {formik.isSubmitting ? 'Processing...' : 'Next Step'}
                                                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="p-8 sm:p-12 step-content flex flex-col h-full">
                                    <div className="mb-8 text-center border-b-0">
                                        <h2 className="text-3xl font-bold text-[#1d110c] mb-2 tracking-tight">How will you use MessConnect?</h2>
                                        <p className="text-[#a15d45] text-base">Select your role to get a tailored experience.</p>
                                    </div>
                                    <form className="space-y-6 flex-grow" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <label className="relative cursor-pointer group">
                                                <input
                                                    className="peer sr-only role-radio"
                                                    name="role"
                                                    type="radio"
                                                    value="student"
                                                    checked={formik.values.role === 'student'}
                                                    onChange={formik.handleChange}
                                                />
                                                <div className="h-full border-2 border-[#f4eae6] bg-white rounded-xl p-6 hover:border-primary/40 transition-all flex flex-col items-center text-center">
                                                    <div className="absolute top-4 right-4 text-primary check-icon">
                                                        <span className="material-symbols-outlined">check_circle</span>
                                                    </div>
                                                    <div className="w-16 h-16 rounded-full bg-orange-100 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                        <span className="material-symbols-outlined text-3xl">school</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-[#1d110c] mb-2">Student</h3>
                                                    <p className="text-sm text-[#a15d45] leading-relaxed">
                                                        I want to discover messes, view daily menus, and subscribe to meal plans.
                                                    </p>
                                                </div>
                                            </label>
                                            <label className="relative cursor-pointer group">
                                                <input
                                                    className="peer sr-only role-radio"
                                                    name="role"
                                                    type="radio"
                                                    value="owner"
                                                    checked={formik.values.role === 'owner'}
                                                    onChange={formik.handleChange}
                                                />
                                                <div className="h-full border-2 border-[#f4eae6] bg-white rounded-xl p-6 hover:border-primary/40 transition-all flex flex-col items-center text-center">
                                                    <div className="absolute top-4 right-4 text-primary check-icon">
                                                        <span className="material-symbols-outlined">check_circle</span>
                                                    </div>
                                                    <div className="w-16 h-16 rounded-full bg-orange-100 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                        <span className="material-symbols-outlined text-3xl">storefront</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold text-[#1d110c] mb-2">Mess Owner</h3>
                                                    <p className="text-sm text-[#a15d45] leading-relaxed">
                                                        I want to list my mess, manage menus, and track student subscriptions.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                        {formik.touched.role && formik.errors.role && <p className="text-sm text-red-500text-center mt-2">{formik.errors.role}</p>}
                                    </form>

                                    <div className="mt-8">
                                        <div className="bg-[#fcf9f8]/50 border-t border-[#f4eae6] -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-6 sm:px-12 flex justify-between items-center">
                                            <button
                                                className="text-[#a15d45] font-semibold text-sm hover:text-[#1d110c] px-4 py-2 rounded-lg transition-colors flex items-center gap-2 group"
                                                onClick={handleBack}
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
                                                Back
                                            </button>
                                            <button
                                                className="bg-primary hover:bg-[#e65a2b] text-white text-sm font-bold py-3 px-8 rounded-lg shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 flex items-center gap-2 group"
                                                onClick={() => {
                                                    formik.setTouched({ role: true });
                                                    if (!formik.errors.role) formik.handleSubmit();
                                                }}
                                                disabled={formik.isSubmitting}
                                            >
                                                {formik.isSubmitting ? 'Processing...' : 'Next Step'}
                                                <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="p-8 sm:p-12 step-content flex flex-col items-center text-center pb-0 border-b-0">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                                        <span className="material-symbols-outlined text-3xl">phonelink_lock</span>
                                    </div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-[#1d110c] mb-2 tracking-tight">Verify Phone Number</h2>
                                        <p className="text-[#a15d45] text-base">We have sent a verification code to <br /><span className="font-bold text-[#1d110c]">{formik.values.phone || formik.values.email}</span></p>
                                        <button onClick={() => setStep(1)} className="text-xs text-primary font-semibold mt-2 hover:underline">Change details</button>
                                    </div>
                                    <form className="space-y-8 w-full" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                                        <div className="flex gap-2 sm:gap-3 justify-center">
                                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                                <input
                                                    key={index}
                                                    ref={otpRefs[index]}
                                                    autoFocus={index === 0}
                                                    className={`otp-input w-10 sm:w-12 h-12 sm:h-14 text-center text-xl font-bold border ${formik.touched.otp && formik.errors.otp ? 'border-red-500' : 'border-[#ead5cd]'} rounded-lg bg-[#fcf9f8] focus:border-primary outline-none transition-all text-[#1d110c]`}
                                                    inputMode="numeric"
                                                    maxLength="1"
                                                    type="text"
                                                    value={formik.values.otp[index] || ''}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                />
                                            ))}
                                        </div>
                                        {formik.touched.otp && formik.errors.otp && <p className="text-xs text-red-500 text-center">{formik.errors.otp}</p>}

                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-2 text-sm text-[#a15d45] font-medium bg-neutral-100 px-3 py-1 rounded-full">
                                                <span className="material-symbols-outlined text-sm">timer</span>
                                                <span>{formatTime(timer)} remaining</span>
                                            </div>
                                            <div className="text-sm text-[#a15d45] mt-2">
                                                Didn't receive the code?
                                                <button type="button" onClick={handleResendOtp} className="text-primary font-bold hover:text-primary-hover hover:underline ml-1 transition-colors">Resend OTP</button>
                                            </div>
                                        </div>
                                        <div className="pt-4 w-full mb-8">
                                            <button
                                                type="submit"
                                                className="w-full bg-primary hover:bg-[#e65a2b] text-white text-base font-bold py-3.5 px-8 rounded-lg shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
                                                disabled={formik.isSubmitting}
                                            >
                                                {formik.isSubmitting ? 'Verifying...' : 'Verify & Create Account'}
                                                {!formik.isSubmitting && <span className="material-symbols-outlined text-xl">check_circle</span>}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="w-full">
                                        <div className="bg-[#fcf9f8]/50 border-t border-[#f4eae6] -mx-8 sm:-mx-12 p-4 sm:px-8 flex justify-center items-center">
                                            <button
                                                className="text-[#a15d45] font-semibold text-sm hover:text-[#1d110c] px-4 py-2 rounded-lg transition-colors flex items-center gap-2 group"
                                                onClick={() => setStep(2)}
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
                                                Back to Role Selection
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {step === 1 && (
                            <div className="mt-8 text-center w-full max-w-sm">
                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-[#ead5cd]"></div>
                                    <span className="flex-shrink-0 mx-4 text-[#a15d45] text-xs font-semibold uppercase tracking-wider">Or continue with</span>
                                    <div className="flex-grow border-t border-[#ead5cd]"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
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
                            </div>
                        )}

                        {step === 3 && (
                            <p className="mt-8 text-sm text-[#a15d45] text-center max-w-sm">
                                By verifying, you agree to MessConnect's <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default SignupPage;
