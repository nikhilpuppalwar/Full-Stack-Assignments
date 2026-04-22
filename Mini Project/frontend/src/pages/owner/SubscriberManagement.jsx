import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search, Filter, MoreVertical, Download, Clock } from 'lucide-react';

const SubscriberManagement = () => {
    // Mock Data
    const [subscribers, setSubscribers] = useState([
        { id: '1', name: 'Rahul Sharma', email: 'rahul.s@example.com', plan: 'Monthly Lunch + Dinner', startDate: '2026-02-01', endDate: '2026-02-28', status: 'active', mealsLeft: 42 },
        { id: '2', name: 'Priya Patel', email: 'priya.p@example.com', plan: 'Weekly Breakfast', startDate: '2026-02-15', endDate: '2026-02-22', status: 'active', mealsLeft: 5 },
        { id: '3', name: 'Amit Kumar', email: 'amit.k@example.com', plan: 'Monthly Full Day', startDate: '2026-01-10', endDate: '2026-02-10', status: 'expired', mealsLeft: 0 },
        { id: '4', name: 'Neha Gupta', email: 'neha.g@example.com', plan: '15 Days Trial', startDate: '2026-02-25', endDate: '2026-03-12', status: 'upcoming', mealsLeft: 30 },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredSubs = subscribers.filter(sub => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || sub.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || sub.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'expired': return 'bg-red-100 text-red-700';
            case 'upcoming': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Subscribers</h1>
                        <p className="text-text-secondary mt-1">Manage your customers and their active plans.</p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download size={18} /> Export List
                    </Button>
                </div>

                <Card className="shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                            />
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                            {['all', 'active', 'upcoming', 'expired'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${filterStatus === status
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 text-text-secondary">
                                <tr>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-100">Student</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-100">Plan</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-100">Duration</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-100">Status</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-100 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSubs.length > 0 ? (
                                    filteredSubs.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {sub.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-text-primary">{sub.name}</p>
                                                        <p className="text-xs text-text-secondary">{sub.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-text-primary">{sub.plan}</p>
                                                <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5"><Clock size={12} /> {sub.mealsLeft} meals remaining</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-text-primary">{sub.startDate} <span className="text-gray-400 mx-1">to</span> {sub.endDate}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(sub.status)}`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-text-secondary bg-gray-50/30">
                                            No subscribers found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-text-secondary flex justify-between items-center">
                        <p>Showing {filteredSubs.length} of {subscribers.length} total subscribers</p>
                        <div className="flex gap-2">
                            <button className="px-2 py-1 rounded border border-gray-200 bg-white hover:bg-gray-100 opacity-50 cursor-not-allowed">Previous</button>
                            <button className="px-2 py-1 rounded border border-gray-200 bg-white hover:bg-gray-100 opacity-50 cursor-not-allowed">Next</button>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default SubscriberManagement;
