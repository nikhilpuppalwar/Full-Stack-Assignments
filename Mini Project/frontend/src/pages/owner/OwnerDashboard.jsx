import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Users, IndianRupee, QrCode, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

const OwnerDashboard = () => {
    const navigate = useNavigate();

    // Mock Dashboard Data
    const stats = {
        activeSubscribers: 124,
        todaysExpectedAttendance: 95,
        actualCheckIns: 42,
        monthlyRevenue: 310000,
        pendingReviews: 5
    };

    const recentActivity = [
        { id: 1, text: 'Rahul Sharma checked in for Lunch', time: '10 mins ago', type: 'checkin' },
        { id: 2, text: 'Sneha Patel subscribed to Standard Monthly', time: '2 hours ago', type: 'subscription' },
        { id: 3, text: 'New 4-star review from Amit Kumar', time: '4 hours ago', type: 'review' },
        { id: 4, text: 'Suresh Raina checked in for Breakfast', time: '6 hours ago', type: 'checkin' },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Business Overview</h1>
                        <p className="text-text-secondary mt-1">Here's what's happening at your mess today.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => navigate('/owner/menu')} className="flex items-center gap-2">
                            <Calendar size={18} /> Menu
                        </Button>
                        <Button onClick={() => navigate('/owner/scanner')} className="flex items-center gap-2">
                            <QrCode size={18} /> Scanner
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-text-secondary">Expected Today</p>
                                    <h3 className="text-3xl font-bold text-text-primary mt-1">{stats.todaysExpectedAttendance}</h3>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Users size={24} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 font-medium flex items-center">
                                    <TrendingUp size={14} className="mr-1" /> {stats.actualCheckIns}
                                </span>
                                <span className="text-text-secondary ml-1">checked in so far</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border-t-4 border-t-green-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-text-secondary">Monthly Revenue</p>
                                    <h3 className="text-3xl font-bold text-text-primary mt-1">₹{(stats.monthlyRevenue / 1000).toFixed(1)}k</h3>
                                </div>
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <IndianRupee size={24} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm cursor-pointer hover:underline text-primary" onClick={() => navigate('/owner/revenue')}>
                                View detailed analytics <ChevronRight size={14} />
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-text-secondary">Active Subs</p>
                                    <h3 className="text-3xl font-bold text-text-primary mt-1">{stats.activeSubscribers}</h3>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Calendar size={24} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm cursor-pointer hover:underline text-blue-600" onClick={() => navigate('/owner/subscribers')}>
                                Manage subscribers <ChevronRight size={14} />
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border-t-4 border-t-orange-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-text-secondary">Pending Reviews</p>
                                    <h3 className="text-3xl font-bold text-text-primary mt-1">{stats.pendingReviews}</h3>
                                </div>
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <Users size={24} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm cursor-pointer hover:underline text-orange-600" onClick={() => navigate('/owner/reviews')}>
                                Reply to feedback <ChevronRight size={14} />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-text-primary">Recent Activity</h2>
                        <Card className="shadow-sm border border-gray-100 overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {recentActivity.map(activity => (
                                    <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${activity.type === 'checkin' ? 'bg-green-500' :
                                                activity.type === 'subscription' ? 'bg-blue-500' : 'bg-orange-500'
                                            }`}></div>
                                        <div className="flex-grow">
                                            <p className="text-text-primary font-medium text-sm">{activity.text}</p>
                                            <p className="text-text-secondary text-xs mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                                <button className="text-sm font-medium text-primary hover:underline">View All Logs</button>
                            </div>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-text-primary">Quick Actions</h2>
                        <div className="flex flex-col gap-3">
                            <div onClick={() => navigate('/owner/scanner')} className="bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-colors group">
                                <div className="bg-white p-3 rounded-lg shadow-sm text-primary group-hover:scale-110 transition-transform">
                                    <QrCode size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">Open Scanner</h3>
                                    <p className="text-xs text-text-secondary">Log student meals</p>
                                </div>
                            </div>

                            <div onClick={() => navigate('/owner/menu')} className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-colors group">
                                <div className="bg-gray-100 p-3 rounded-lg text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">Update Menu</h3>
                                    <p className="text-xs text-text-secondary">Edit today's meals</p>
                                </div>
                            </div>

                            <div onClick={() => navigate('/owner/profile')} className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-colors group">
                                <div className="bg-gray-100 p-3 rounded-lg text-gray-600 group-hover:bg-gray-200 transition-colors">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary">Profile Settings</h3>
                                    <p className="text-xs text-text-secondary">Update mess info</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default OwnerDashboard;
