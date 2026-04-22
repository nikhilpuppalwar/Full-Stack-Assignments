import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import Card, { CardBody } from '../../components/ui/Card';
import { QrCode, Calendar, Clock, MapPin, Search } from 'lucide-react';
import api from '../../services/api';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                // Fetch user subscriptions
                // This is a placeholder for the actual API call
                // const response = await api.get('/subscriptions/my-subscriptions');
                // setSubscriptions(response.data.data);

                // MOCK DATA for layout building since backend might not have active subs
                setSubscriptions([
                    {
                        _id: 'sub_123',
                        mess: { _id: 'm1', name: 'Shree Ganesh Dining Hall', location: 'Navi Peth, Pune' },
                        plan: { name: 'Lunch + Dinner (Monthly)' },
                        startDate: '2026-02-01',
                        endDate: '2026-02-28',
                        status: 'active',
                        remainingDays: 3
                    }
                ]);
            } catch (err) {
                setError('Failed to load dashboard data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'expired': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (isLoading) return <div className="min-h-screen bg-background flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Welcome back!</h1>
                        <p className="text-text-secondary mt-1">Here is your meal overview for today.</p>
                    </div>
                    <Button onClick={() => navigate('/student/explore')} className="flex items-center gap-2">
                        <Search size={18} />
                        Explore Messes
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {subscriptions.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-primary">
                            <Calendar size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-text-primary mb-2">No Active Subscriptions</h2>
                        <p className="text-text-secondary max-w-md mb-8">
                            You don't have any active meal plans right now. Explore nearby messes and subscribe to start enjoying delicious meals.
                        </p>
                        <Button size="lg" onClick={() => navigate('/student/explore')}>
                            Find a Mess
                        </Button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Active Subscriptions Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                <Calendar className="text-primary" size={24} />
                                Your Active Plans
                            </h2>

                            <div className="grid gap-6">
                                {subscriptions.map(sub => (
                                    <div key={sub._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${getStatusColor(sub.status)}`}>
                                                        {sub.status}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-text-primary">{sub.mess.name}</h3>
                                                    <p className="text-text-secondary text-sm flex items-center mt-1">
                                                        <MapPin size={14} className="mr-1" />
                                                        {sub.mess.location}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 mb-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-text-secondary mb-1">Plan type</p>
                                                    <p className="font-semibold text-text-primary text-sm">{sub.plan.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-text-secondary mb-1">Validity</p>
                                                    <p className="font-semibold text-text-primary text-sm">
                                                        {new Date(sub.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-sm font-medium text-orange-600">
                                                {sub.remainingDays} days remaining
                                            </p>
                                        </div>

                                        <div className="sm:w-48 flex flex-col justify-center gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                                            <Button className="w-full flex items-center justify-center gap-2">
                                                <QrCode size={18} />
                                                Show QR Code
                                            </Button>
                                            <Button variant="outline" className="w-full text-sm py-1.5 h-auto" onClick={() => navigate('/student/subscriptions')}>
                                                View All Subs
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Today's Meals Column */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                <Clock className="text-blue-500" size={24} />
                                Today's Meals
                            </h2>

                            <Card className="border-none shadow-sm">
                                <CardBody className="p-0">
                                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-text-primary">Lunch</p>
                                            <p className="text-xs text-text-secondary">12:30 PM - 2:30 PM</p>
                                        </div>
                                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded font-medium">Upcoming</span>
                                    </div>
                                    <div className="p-4 bg-gray-50 text-sm border-b border-gray-100">
                                        <p className="font-medium text-text-primary mb-1">Menu at Shree Ganesh:</p>
                                        <p className="text-text-secondary">Chapati, Paneer Masala, Dal Fry, Jeera Rice, Salad</p>
                                    </div>

                                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-text-primary">Dinner</p>
                                            <p className="text-xs text-text-secondary">7:30 PM - 9:30 PM</p>
                                        </div>
                                        <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded font-medium">Upcoming</span>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default StudentDashboard;
