import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { IndianRupee, Download, Search, CheckCircle, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const FinancialSettlements = () => {
    // Mock Data
    const [settlements, setSettlements] = useState([
        { id: 'SET_101', messName: 'Shree Ganesh Dining', amount: 45000, commission: 2250, netPayout: 42750, status: 'pending', date: '2026-02-28', period: '15 Feb - 28 Feb' },
        { id: 'SET_102', messName: 'Spice Route Mess', amount: 32000, commission: 1600, netPayout: 30400, status: 'pending', date: '2026-02-28', period: '15 Feb - 28 Feb' },
        { id: 'SET_103', messName: 'Green Bowl Salads', amount: 15000, commission: 750, netPayout: 14250, status: 'completed', date: '2026-02-14', period: '01 Feb - 14 Feb', ref: 'UTR_7654321' },
        { id: 'SET_104', messName: 'Annapurna Veg', amount: 55000, commission: 2750, netPayout: 52250, status: 'completed', date: '2026-02-14', period: '01 Feb - 14 Feb', ref: 'UTR_8901234' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('pending');
    const [isProcessing, setIsProcessing] = useState(false);

    const filteredList = settlements.filter(s => {
        const matchesSearch = s.messName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const pendingTotal = settlements.filter(s => s.status === 'pending').reduce((acc, s) => acc + s.netPayout, 0);

    const handlePayout = (id) => {
        setIsProcessing(true);
        setTimeout(() => {
            setSettlements(settlements.map(s =>
                s.id === id ? { ...s, status: 'completed', ref: `UTR_${Math.floor(1000000 + Math.random() * 9000000)}` } : s
            ));
            setIsProcessing(false);
        }, 800);
    };

    const handleBatchPayout = () => {
        if (pendingTotal === 0) return;
        setIsProcessing(true);
        setTimeout(() => {
            setSettlements(settlements.map(s =>
                s.status === 'pending' ? { ...s, status: 'completed', ref: `UTR_BATCH_${Math.floor(1000 + Math.random() * 9000)}` } : s
            ));
            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Financial Settlements</h1>
                        <p className="text-gray-500 mt-1">Manage payouts to mess owners and track platform commission.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Download size={18} /> Export CSV
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="shadow-sm border border-gray-100 bg-orange-50/50">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-orange-800">Pending Payouts</p>
                                <div className="p-1.5 bg-orange-200 rounded text-orange-700">
                                    <IndianRupee size={16} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-orange-900">₹{(pendingTotal).toLocaleString()}</h3>
                            <div className="mt-4">
                                <Button
                                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={pendingTotal === 0 || isProcessing}
                                    onClick={handleBatchPayout}
                                >
                                    {isProcessing ? 'Processing Batch...' : 'Process All Pending'}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm border border-gray-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-gray-500">Platform Commission (5%)</p>
                                <div className="p-1.5 bg-green-100 rounded text-green-600">
                                    <TrendingUp size={16} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">₹77,000</h3>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-gray-500">Total revenue this month</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="shadow-sm border border-gray-100">
                        <CardBody className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-gray-500">Total Gross Value (GMV)</p>
                                <div className="p-1.5 bg-blue-100 rounded text-blue-600">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900">₹15.4L</h3>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <span>Across 87 active messes</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <Card className="shadow-sm border border-gray-200 overflow-hidden bg-white">
                    <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by mess name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm"
                            />
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                {['pending', 'completed', 'all'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${filterStatus === status
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200">Date/Period</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200">Mess Details</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200 text-right">Gross Amount</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200 text-right">Fee (5%)</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200 text-right">Net Payout</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200 text-center">Status</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredList.length > 0 ? (
                                    filteredList.map((st) => (
                                        <tr key={st.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-900">{st.date}</p>
                                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Calendar size={12} /> {st.period}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-900">{st.messName}</p>
                                                <p className="text-xs text-gray-500 font-mono">{st.id}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-600 font-medium">
                                                ₹{st.amount.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right text-red-500 font-medium flex items-center justify-end">
                                                <ArrowDownRight size={14} className="mr-0.5" /> ₹{st.commission.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <p className="font-bold text-lg text-gray-900">₹{st.netPayout.toLocaleString()}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {st.status === 'completed' ? (
                                                    <div>
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
                                                            <CheckCircle size={12} className="mr-1" /> Paid
                                                        </span>
                                                        <p className="text-[10px] text-gray-400 mt-1 font-mono">{st.ref}</p>
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {st.status === 'pending' ? (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handlePayout(st.id)}
                                                        disabled={isProcessing}
                                                    >
                                                        Payout
                                                    </Button>
                                                ) : (
                                                    <Button variant="outline" size="sm" className="text-gray-500 border-gray-200">
                                                        Receipt
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                            No settlements found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default FinancialSettlements;
