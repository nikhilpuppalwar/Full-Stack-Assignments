import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Users, Store, IndianRupee, FileCheck, TrendingUp, AlertTriangle, ChevronRight, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Mock Dashboard Data
    const stats = {
        totalStudents: 1254,
        activeMesses: 87,
        pendingVerifications: 12,
        monthlyRevenue: 1540000,
        platformCommission: 77000, // Assuming 5%
        activeDisputes: 5
    };

    const recentActivity = [
        { id: 1, text: 'New mess "Annapurna Veg" applied for verification', time: '10 mins ago', type: 'verification', icon: FileCheck, color: 'text-blue-500', bg: 'bg-blue-100' },
        { id: 2, text: 'Payout of ₹45,000 processed for "Spice Route"', time: '2 hours ago', type: 'finance', icon: IndianRupee, color: 'text-green-500', bg: 'bg-green-100' },
        { id: 3, text: 'User account "Rahul S" flagged for multiple refunds', time: '4 hours ago', type: 'alert', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-100' },
        { id: 4, text: 'Daily platform snapshot generated successfully', time: '6 hours ago', type: 'system', icon: Activity, color: 'text-gray-500', bg: 'bg-gray-100' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Platform Command Center</h1>
                        <p className="text-gray-500 mt-1">Global overview of MessConnect operations.</p>
                    </div>
                </div>

                {/* Primary KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/users')}>
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Registered Students</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalStudents}</h3>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Users size={24} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium flex items-center">
                                    <TrendingUp size={14} className="mr-1" /> 12%
                                </span>
                                <span className="text-gray-500 ml-1">this month</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border-t-4 border-t-orange-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/users')}>
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Active Messes</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.activeMesses}</h3>
                                </div>
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <Store size={24} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium flex items-center">
                                    <TrendingUp size={14} className="mr-1" /> 5
                                </span>
                                <span className="text-gray-500 ml-1">new this week</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/verifications')}>
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Pending Verifications</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.pendingVerifications}</h3>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <FileCheck size={24} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="text-blue-600 font-medium hover:underline">Review applications <ChevronRight size={14} className="inline" /></span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border-t-4 border-t-green-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settlements')}>
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Platform Revenue</p>
                                    <h3 className="text-3xl font-bold text-gray-900 mt-1">₹{(stats.platformCommission / 1000).toFixed(1)}k</h3>
                                </div>
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <IndianRupee size={24} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>Based on ₹{(stats.monthlyRevenue / 100000).toFixed(2)}L gross volume</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Global Activity Log</h2>
                            <button className="text-sm font-medium text-primary hover:underline">View All</button>
                        </div>
                        <Card className="shadow-sm border border-gray-200 overflow-hidden bg-white">
                            <div className="divide-y divide-gray-100">
                                {recentActivity.map(activity => {
                                    const Icon = activity.icon;
                                    return (
                                        <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                                            <div className={`p-2 rounded-lg ${activity.bg} ${activity.color} flex-shrink-0`}>
                                                <Icon size={18} />
                                            </div>
                                            <div className="flex-grow pt-1">
                                                <p className="text-gray-900 font-medium text-sm">{activity.text}</p>
                                                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-700">
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* Quick Tools & Alerts */}
                    <div className="space-y-6">
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-orange-500 flex-shrink-0" size={20} />
                                <div>
                                    <h3 className="font-bold text-orange-800">Action Required</h3>
                                    <p className="text-sm text-orange-700 mt-1">{stats.activeDisputes} support tickets require admin intervention.</p>
                                    <Button variant="outline" className="mt-3 bg-white border-orange-200 text-orange-700 hover:bg-orange-100" size="sm" onClick={() => navigate('/admin/support')}>
                                        Resolve Disputes
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">Admin Modules</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { name: 'Analytics', icon: Activity, path: '/admin/analytics', color: 'bg-purple-50 text-purple-600' },
                                { name: 'Settlements', icon: IndianRupee, path: '/admin/settlements', color: 'bg-green-50 text-green-600' },
                                { name: 'Settings', icon: Store, path: '/admin/settings', color: 'bg-gray-100 text-gray-600' },
                                { name: 'Onboarding', icon: FileCheck, path: '/admin/verifications', color: 'bg-blue-50 text-blue-600' },
                            ].map(module => (
                                <button
                                    key={module.name}
                                    onClick={() => navigate(module.path)}
                                    className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:border-primary hover:shadow-sm transition-all group"
                                >
                                    <div className={`p-3 rounded-xl mb-3 ${module.color} group-hover:scale-110 transition-transform`}>
                                        <module.icon size={20} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-primary">{module.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default AdminDashboard;
