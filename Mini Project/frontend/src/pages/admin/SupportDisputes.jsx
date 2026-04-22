import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search, Filter, MessageSquare, AlertCircle, CheckCircle, Clock, Send, MoreVertical, Paperclip } from 'lucide-react';

const SupportDisputes = () => {
    // Mock Data
    const [tickets, setTickets] = useState([
        { id: 'TKT-1045', subject: 'Refund Request for missed meals', user: 'Rahul Sharma (Student)', type: 'Refund', status: 'open', priority: 'high', date: '2 hours ago' },
        { id: 'TKT-1044', subject: 'Mess listing rejected without reason', user: 'Vikas Singh (Owner)', type: 'Verification', status: 'open', priority: 'medium', date: '5 hours ago' },
        { id: 'TKT-1043', subject: 'QR Scanner not working on my device', user: 'Shree Ganesh Dining', type: 'Technical', status: 'in-progress', priority: 'high', date: '1 day ago' },
        { id: 'TKT-1042', subject: 'Update FSSAI license details', user: 'Spice Route Mess', type: 'Account', status: 'resolved', priority: 'low', date: '2 days ago' },
        { id: 'TKT-1041', subject: 'Payment deducted but subscription not active', user: 'Priya Patel (Student)', type: 'Payment', status: 'resolved', priority: 'high', date: '3 days ago' },
    ]);

    const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
    const [replyText, setReplyText] = useState('');

    const getStatusStyle = (status) => {
        switch (status) {
            case 'open': return 'bg-red-100 text-red-700 border-red-200';
            case 'in-progress': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return <AlertCircle size={14} className="text-red-500" />;
            case 'medium': return <Clock size={14} className="text-orange-500" />;
            case 'low': return <CheckCircle size={14} className="text-blue-500" />;
            default: return null;
        }
    };

    const handleSendReply = () => {
        if (!replyText.trim()) return;
        setReplyText('');
        // Mock sending reply
    };

    const handleStatusChange = (status) => {
        const updated = { ...selectedTicket, status };
        setSelectedTicket(updated);
        setTickets(tickets.map(t => t.id === updated.id ? updated : t));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 flex-shrink-0">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Support & Disputes</h1>
                        <p className="text-gray-500 mt-1">Resolve user issues, moderate disputes, and manage platform support tickets.</p>
                    </div>
                </div>

                <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden min-h-[500px]">
                    {/* Left List */}
                    <Card className="lg:col-span-1 shadow-sm border border-gray-200 h-full flex flex-col">
                        <div className="p-4 border-b border-gray-100 flex gap-2">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search tickets..."
                                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white text-sm"
                                />
                            </div>
                            <Button variant="outline" className="px-3 border-gray-200 bg-gray-50 text-gray-500">
                                <Filter size={16} />
                            </Button>
                        </div>

                        <div className="flex-grow overflow-y-auto no-scrollbar">
                            <div className="divide-y divide-gray-100">
                                {tickets.map(ticket => (
                                    <div
                                        key={ticket.id}
                                        onClick={() => setSelectedTicket(ticket)}
                                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedTicket?.id === ticket.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                                            <span className="text-[10px] text-gray-400">{ticket.date}</span>
                                        </div>
                                        <h3 className={`font-semibold text-sm mb-1 ${selectedTicket?.id === ticket.id ? 'text-primary' : 'text-gray-900'}`}>{ticket.subject}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{ticket.user}</p>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="flex items-center gap-1 font-medium">{getPriorityIcon(ticket.priority)} <span className="capitalize text-gray-600">{ticket.priority}</span></span>
                                            <span className={`px-2 py-0.5 rounded-full uppercase tracking-wider font-bold text-[10px] border ${getStatusStyle(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Right Details */}
                    <Card className="lg:col-span-2 shadow-sm border border-gray-200 h-full flex flex-col">
                        {selectedTicket ? (
                            <>
                                {/* Ticket Header */}
                                <div className="p-6 border-b border-gray-100 bg-white">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold uppercase tracking-wider">{selectedTicket.type}</span>
                                                <span className="text-sm font-mono text-gray-400">{selectedTicket.id}</span>
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">{selectedTicket.subject}</h2>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                className={`text-sm font-semibold rounded-lg border-2 px-3 py-1.5 outline-none cursor-pointer uppercase tracking-wider ${getStatusStyle(selectedTicket.status)}`}
                                                value={selectedTicket.status}
                                                onChange={(e) => handleStatusChange(e.target.value)}
                                            >
                                                <option value="open">Open</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                            <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                                                <MoreVertical size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                            {selectedTicket.user.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{selectedTicket.user}</p>
                                            <p className="text-gray-500 text-xs">Reported {selectedTicket.date}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat / Messages Area */}
                                <div className="flex-grow bg-gray-50 p-6 overflow-y-auto space-y-6">
                                    {/* Mock original message */}
                                    <div className="flex gap-4 max-w-[80%]">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-xs">{selectedTicket.user.charAt(0)}</div>
                                        <div>
                                            <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                                                <p className="text-sm text-gray-700">Hello support team, I missed 3 consecutive meals due to a medical emergency. The mess owner asked me to contact platform support for a refund. Can you please help?</p>
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-1 ml-1">{selectedTicket.date}</p>
                                        </div>
                                    </div>

                                    {selectedTicket.status !== 'open' && (
                                        <div className="flex gap-4 max-w-[80%] ml-auto justify-end">
                                            <div>
                                                <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-sm shadow-sm">
                                                    <p className="text-sm">Hi {selectedTicket.user.split(' ')[0]}, we are looking into this with the mess owner. We will process a prorated refund to your original payment method once verified.</p>
                                                </div>
                                                <p className="text-[10px] text-gray-400 mt-1 text-right mr-1">Admin • 1 hour ago</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gray-900 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">AD</div>
                                        </div>
                                    )}
                                </div>

                                {/* Reply Box */}
                                <div className="p-4 bg-white border-t border-gray-200">
                                    <div className="relative flex items-end gap-2">
                                        <button className="p-3 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                                            <Paperclip size={20} />
                                        </button>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Type your reply here..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-primary focus:bg-white resize-none text-sm transition-colors min-h-[50px] max-h-[150px]"
                                            rows="1"
                                            onInput={(e) => {
                                                e.target.style.height = 'auto';
                                                e.target.style.height = (e.target.scrollHeight) + 'px';
                                            }}
                                        />
                                        <Button onClick={handleSendReply} disabled={!replyText.trim()} className="px-5 py-3 rounded-xl flex items-center justify-center">
                                            <Send size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <MessageSquare size={48} className="mb-4 text-gray-300" />
                                <p>Select a ticket to view details</p>
                            </div>
                        )}
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default SupportDisputes;
