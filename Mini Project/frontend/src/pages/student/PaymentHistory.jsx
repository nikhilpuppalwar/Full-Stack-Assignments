import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Download, RefreshCw, FileText } from 'lucide-react';

const PaymentHistory = () => {
    const [payments] = useState([
        {
            id: 'TXN-9821831',
            date: 'Nov 01, 2023',
            messName: 'Annapurna Veg Mess',
            plan: 'Standard Monthly (Veg)',
            amount: 2500,
            status: 'Success'
        },
        {
            id: 'TXN-7128384',
            date: 'Oct 01, 2023',
            messName: 'Spice Route Non-Veg',
            plan: 'Weekly Trial (Non-Veg)',
            amount: 800,
            status: 'Success'
        },
        {
            id: 'TXN-4122111',
            date: 'Sep 15, 2023',
            messName: 'Healthy Bites Delivery',
            plan: '15 Days Package',
            amount: 1500,
            status: 'Failed'
        }
    ]);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 max-w-5xl mx-auto w-full p-4 py-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Payment History</h1>
                        <p className="text-text-secondary mt-1">View past transactions and download invoices.</p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <RefreshCw size={16} /> Refresh
                    </Button>
                </div>

                <Card className="overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                                    <th className="p-4 rounded-tl-xl whitespace-nowrap">Transaction ID</th>
                                    <th className="p-4 whitespace-nowrap">Date</th>
                                    <th className="p-4 whitespace-nowrap">Details</th>
                                    <th className="p-4 whitespace-nowrap">Amount</th>
                                    <th className="p-4 whitespace-nowrap">Status</th>
                                    <th className="p-4 rounded-tr-xl text-center whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {payments.map((txn, index) => (
                                    <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-mono text-gray-600">{txn.id}</td>
                                        <td className="p-4 text-text-secondary">{txn.date}</td>
                                        <td className="p-4">
                                            <p className="font-bold text-text-primary">{txn.messName}</p>
                                            <p className="text-text-secondary text-xs">{txn.plan}</p>
                                        </td>
                                        <td className="p-4 font-bold text-text-primary">₹{txn.amount}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${txn.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                className={`p-2 rounded-lg transition-colors inline-block ${txn.status === 'Success' ? 'text-primary hover:bg-primary/10' : 'text-gray-300 cursor-not-allowed'}`}
                                                disabled={txn.status !== 'Success'}
                                                title={txn.status === 'Success' ? 'Download Invoice' : 'N/A'}
                                            >
                                                <Download size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {payments.length === 0 && (
                            <div className="p-12 pl-0 pr-0 text-center text-text-secondary flex flex-col items-center justify-center">
                                <FileText size={48} className="text-gray-300 mb-4" />
                                <p>No transaction history found.</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaymentHistory;
