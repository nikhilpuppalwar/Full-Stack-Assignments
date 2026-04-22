import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { IndianRupee, TrendingUp, TrendingDown, Calendar, Download, Building } from 'lucide-react';

const RevenueAnalytics = () => {
    // Mock Data
    const metrics = {
        totalRevenue: 310500,
        monthlyGrowth: 12.5,
        activeSubscriptions: 124,
        averagePlanValue: 2500,
        pendingSettlements: 45000
    };

    const monthlyData = [
        { month: 'Sep', revenue: 180 },
        { month: 'Oct', revenue: 210 },
        { month: 'Nov', revenue: 250 },
        { month: 'Dec', revenue: 280 },
        { month: 'Jan', revenue: 260 },
        { month: 'Feb', revenue: 310 } // Current month
    ];

    const recentTransactions = [
        { id: 'TXN-001', student: 'Rahul Sharma', plan: 'Monthly Lunch+Dinner', amount: 3200, date: '2026-02-27', status: 'completed' },
        { id: 'TXN-002', student: 'Priya Patel', plan: 'Weekly Breakfast', amount: 800, date: '2026-02-26', status: 'completed' },
        { id: 'TXN-003', student: 'Amit Kumar', plan: 'Monthly Full Day', amount: 4500, date: '2026-02-25', status: 'refunded' },
        { id: 'TXN-004', student: 'Neha Gupta', plan: '15 Days Trial', amount: 1600, date: '2026-02-25', status: 'completed' },
        { id: 'TXN-005', student: 'Vikas Singh', plan: 'Monthly Lunch+Dinner', amount: 3200, date: '2026-02-24', status: 'completed' }
    ];

    // Find max value for chart scaling
    const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Revenue Analytics</h1>
                        <p className="text-text-secondary mt-1">Track your financial performance and settlements.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Calendar size={18} /> This Month
                        </Button>
                        <Button className="flex items-center gap-2">
                            <Download size={18} /> Export Report
                        </Button>
                    </div>
                </div>

                {/* Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="shadow-sm border border-gray-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-text-secondary">Gross Revenue</p>
                                <div className="p-1.5 bg-green-100 rounded text-green-600">
                                    <IndianRupee size={16} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-text-primary">₹{(metrics.totalRevenue / 1000).toFixed(1)}k</h3>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-green-500 font-medium flex items-center">
                                    <TrendingUp size={14} className="mr-1" /> {metrics.monthlyGrowth}%
                                </span>
                                <span className="text-text-secondary ml-1">vs last month</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm border border-gray-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-text-secondary">Avg. Plan Value</p>
                                <div className="p-1.5 bg-blue-100 rounded text-blue-600">
                                    <TrendingUp size={16} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-text-primary">₹{metrics.averagePlanValue}</h3>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-text-secondary">Per active subscriber</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm border border-gray-100 bg-orange-50/50">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-orange-800">Pending Settlement</p>
                                <div className="p-1.5 bg-orange-200 rounded text-orange-700">
                                    <Building size={16} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-orange-900">₹{(metrics.pendingSettlements / 1000).toFixed(1)}k</h3>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-orange-700">Expect transfer in 2 days</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Revenue Chart (Mocked with CSS) */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-sm border border-gray-100 h-full">
                            <CardBody className="p-6 flex flex-col h-full">
                                <h2 className="text-xl font-bold text-text-primary mb-6">Revenue Trends (6 Months)</h2>

                                <div className="flex-grow flex items-end gap-2 sm:gap-6 pt-4 mt-auto min-h-[250px] relative">
                                    {/* Y-axis guidelines */}
                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                                        {[4, 3, 2, 1, 0].map(tier => (
                                            <div key={tier} className="w-full border-b border-gray-100 border-dashed flex items-end">
                                                <span className="text-[10px] text-gray-400 -translate-y-2 bg-white pr-2">
                                                    {(maxRevenue * (tier / 4)).toFixed(0)}k
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bars */}
                                    {monthlyData.map((data, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center justify-end z-10 group">
                                            {/* Tooltip */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs py-1 px-2 rounded mb-2 whitespace-nowrap pointer-events-none">
                                                ₹{data.revenue}k
                                            </div>
                                            {/* Bar */}
                                            <div
                                                className={`w-full max-w-[40px] rounded-t-md transition-all duration-500 ease-in-out ${i === monthlyData.length - 1 ? 'bg-primary' : 'bg-primary/30 group-hover:bg-primary/50'}`}
                                                style={{ height: `${(data.revenue / maxRevenue) * 100}%`, minHeight: '4px' }}
                                            ></div>
                                            {/* X-axis label */}
                                            <span className="text-xs text-text-secondary mt-3">{data.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Recent Transactions List */}
                    <div className="lg:col-span-1">
                        <Card className="shadow-sm border border-gray-100 h-full">
                            <CardBody className="p-0">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-text-primary">Recent Payments</h2>
                                    <button className="text-sm text-primary font-medium hover:underline">View All</button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {recentTransactions.map(txn => (
                                        <div key={txn.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="font-bold text-text-primary text-sm">{txn.student}</p>
                                                <p className="font-bold text-text-primary text-sm flex items-center">
                                                    {txn.status === 'refunded' ? '-' : '+'}₹{txn.amount}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <p className="text-text-secondary">{txn.plan}</p>
                                                <span className={`px-2 py-0.5 rounded font-medium uppercase tracking-wider text-[10px] ${txn.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {txn.status}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-2">{txn.date} • {txn.id}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RevenueAnalytics;
