import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Download, Users, Store, TrendingUp, IndianRupee, PieChart, BarChart3, Activity } from 'lucide-react';

const PlatformAnalytics = () => {
    // Mock Data
    const metrics = {
        totalUsers: 1450,
        studentGrowth: 15,
        totalMesses: 87,
        messGrowth: 8,
        monthlyGMV: 1540000,
        gmvGrowth: 22,
        activeSubscriptions: 890,
    };

    const monthlyGrowthData = [
        { month: 'Sep', students: 450, messes: 30 },
        { month: 'Oct', students: 600, messes: 45 },
        { month: 'Nov', students: 850, messes: 55 },
        { month: 'Dec', students: 1000, messes: 65 },
        { month: 'Jan', students: 1150, messes: 75 },
        { month: 'Feb', students: 1254, messes: 87 } // Current
    ];

    const planDistribution = [
        { name: 'Monthly Lunch + Dinner', value: 45, color: 'bg-primary' },
        { name: 'Monthly Lunch Only', value: 25, color: 'bg-blue-500' },
        { name: 'Weekly Passes', value: 20, color: 'bg-orange-500' },
        { name: 'Trial Offers', value: 10, color: 'bg-gray-400' },
    ];

    const maxStudents = Math.max(...monthlyGrowthData.map(d => d.students));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
                        <p className="text-gray-500 mt-1">Deep dive into user growth, engagement, and financial metrics.</p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download size={18} /> Export Report
                    </Button>
                </div>

                {/* Top Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="shadow-sm border border-gray-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-gray-500">Gross Merchandise Value</p>
                                <div className="p-1.5 bg-green-100 rounded text-green-600"><IndianRupee size={16} /></div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">₹{(metrics.monthlyGMV / 100000).toFixed(2)}L</h3>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-green-500 font-medium flex items-center"><TrendingUp size={14} className="mr-1" /> {metrics.gmvGrowth}%</span>
                                <span className="text-gray-500 ml-1">vs last month</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm border border-gray-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-gray-500">Total Students</p>
                                <div className="p-1.5 bg-blue-100 rounded text-blue-600"><Users size={16} /></div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">{metrics.totalUsers}</h3>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-green-500 font-medium flex items-center"><TrendingUp size={14} className="mr-1" /> {metrics.studentGrowth}%</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm border border-gray-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-gray-500">Active Messes</p>
                                <div className="p-1.5 bg-orange-100 rounded text-orange-600"><Store size={16} /></div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">{metrics.totalMesses}</h3>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-green-500 font-medium flex items-center"><TrendingUp size={14} className="mr-1" /> {metrics.messGrowth}%</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm border border-gray-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-gray-500">Active Subscriptions</p>
                                <div className="p-1.5 bg-purple-100 rounded text-purple-600"><Activity size={16} /></div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">{metrics.activeSubscriptions}</h3>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-gray-500">Currently generating revenue</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Growth Chart (CSS implementation) */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-sm border border-gray-100 h-full">
                            <CardBody className="p-6 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><BarChart3 size={20} className="text-primary" /> User Growth Trend</h2>
                                    <div className="flex gap-4 text-xs font-medium">
                                        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-primary/70"></div> Students</span>
                                        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-400"></div> Messes</span>
                                    </div>
                                </div>

                                <div className="flex-grow flex items-end gap-2 sm:gap-6 pt-6 mt-auto min-h-[300px] relative mt-8">
                                    {/* Y-axis guidelines */}
                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                                        {[4, 3, 2, 1, 0].map(tier => (
                                            <div key={tier} className="w-full border-b border-gray-100 border-dashed flex items-end">
                                                <span className="text-[10px] text-gray-400 -translate-y-2 bg-white pr-2">
                                                    {Math.ceil(maxStudents * (tier / 4))}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bars */}
                                    {monthlyGrowthData.map((data, i) => (
                                        <div key={i} className="flex-1 flex justify-center items-end gap-1 sm:gap-2 z-10 group h-full">
                                            {/* Tooltip */}
                                            <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1.5 px-3 rounded whitespace-nowrap pointer-events-none z-20 shadow-lg -translate-y-full mb-2">
                                                {data.month}: {data.students} Students, {data.messes} Messes
                                            </div>

                                            {/* Student Bar */}
                                            <div
                                                className="w-full max-w-[24px] bg-primary/80 rounded-t-md hover:bg-primary transition-colors"
                                                style={{ height: `${(data.students / maxStudents) * 100}%`, minHeight: '4px' }}
                                            ></div>
                                            <div
                                                className="w-full max-w-[24px] bg-orange-400/80 rounded-t-md hover:bg-orange-500 transition-colors"
                                                style={{ height: `${(data.messes / 100) * 100}%`, minHeight: '4px' }}
                                            ></div>

                                            {/* X-axis label */}
                                            <span className="absolute bottom-0 translate-y-6 text-xs text-gray-500 font-medium">{data.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Subscription Distribution */}
                    <div className="lg:col-span-1">
                        <Card className="shadow-sm border border-gray-100 h-full">
                            <CardBody className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><PieChart size={20} className="text-blue-500" /> Plan Distribution</h2>

                                {/* Mock CSS Pie Chart via compound progress bars */}
                                <div className="space-y-6 mt-8">
                                    {planDistribution.map(plan => (
                                        <div key={plan.name}>
                                            <div className="flex justify-between text-sm mb-1.5">
                                                <span className="text-gray-700 font-medium">{plan.name}</span>
                                                <span className="font-bold text-gray-900">{plan.value}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden flex">
                                                <div className={`h-full ${plan.color} rounded-full`} style={{ width: `${plan.value}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <h4 className="font-bold text-blue-900 text-sm mb-1">Weekly Insight</h4>
                                    <p className="text-xs text-blue-800 leading-relaxed">Most students prefer the Monthly Lunch + Dinner package. Consider advising new mess owners to offer aggressive pricing on this specific tier to drive initial volume.</p>
                                </div>
                            </CardBody>
                        </Card>
                    </div >
                </div >
            </main >
        </div >
    );
};

export default PlatformAnalytics;
