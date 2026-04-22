import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search, Filter, ShieldCheck, XCircle, FileText, Check, X, ExternalLink, MapPin } from 'lucide-react';

const VerificationHub = () => {
    // Mock Data
    const [applications, setApplications] = useState([
        { id: 'app_1', messName: 'Spice Route Mess', ownerName: 'Vikas Singh', submittedOn: '2026-02-27', fssaiNo: '11520036000456', status: 'pending', type: 'Pure Veg', city: 'Pune' },
        { id: 'app_2', messName: 'Annapurna Kitchen', ownerName: 'Sunita Devi', submittedOn: '2026-02-26', fssaiNo: '11520036000789', status: 'pending', type: 'Both', city: 'Mumbai' },
        { id: 'app_3', messName: 'Healthy Bites Delivery', ownerName: 'Rohan Joshi', submittedOn: '2026-02-25', fssaiNo: 'INVALID_999', status: 'rejected', type: 'Pure Veg', city: 'Nagpur', reason: 'FSSAI document unreadable.' },
        { id: 'app_4', messName: 'Shree Ganesh Dining', ownerName: 'Shubham Rao', submittedOn: '2025-11-05', fssaiNo: '11520036000123', status: 'approved', type: 'Pure Veg', city: 'Pune' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('pending');
    const [selectedApp, setSelectedApp] = useState(null);

    const filteredApps = applications.filter(app => {
        const matchesSearch = app.messName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleAction = (id, actionType) => {
        setApplications(applications.map(app => {
            if (app.id === id) {
                return { ...app, status: actionType };
            }
            return app;
        }));
        setSelectedApp(null);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><ShieldCheck size={14} /> Approved</span>;
            case 'rejected': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><XCircle size={14} /> Rejected</span>;
            case 'pending': return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-max"><FileText size={14} /> Pending Review</span>;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Verification Hub</h1>
                        <p className="text-gray-500 mt-1">Review and approve new mess listings to ensure quality and compliance.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left List */}
                    <div className="lg:col-span-1 border-r border-gray-200 pr-0 lg:pr-6 space-y-4 h-[calc(100vh-200px)] overflow-y-auto no-scrollbar">

                        <div className="sticky top-0 bg-gray-50 z-10 pb-4">
                            <div className="relative w-full mb-3">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search applications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm"
                                />
                            </div>

                            <div className="flex bg-gray-200/50 p-1 rounded-lg">
                                {['pending', 'approved', 'rejected', 'all'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`flex-1 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${filterStatus === status
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filteredApps.length > 0 ? (
                            filteredApps.map((app) => (
                                <div
                                    key={app.id}
                                    onClick={() => setSelectedApp(app)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedApp?.id === app.id ? 'border-primary bg-primary/5 shadow-sm scale-[1.02]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 truncate pr-2">{app.messName}</h3>
                                        {getStatusBadge(app.status)}
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">Owner: <span className="text-gray-700 font-medium">{app.ownerName}</span></p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100">
                                        <span className="flex items-center gap-1"><MapPin size={12} /> {app.city}</span>
                                        <span>Applied {app.submittedOn}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200 border-dashed">
                                <p>No applications found.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Details Panel */}
                    <div className="lg:col-span-2">
                        {selectedApp ? (
                            <Card className="shadow-lg border border-gray-200 bg-white h-full sticky top-8">
                                <CardBody className="p-0">
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50 rounded-t-xl">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedApp.messName}</h2>
                                            <p className="text-gray-500 font-medium">{selectedApp.ownerName} • {selectedApp.type}</p>
                                        </div>
                                        {getStatusBadge(selectedApp.status)}
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {selectedApp.status === 'rejected' && (
                                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3">
                                                <XCircle className="text-red-500 mt-0.5" size={20} />
                                                <div>
                                                    <h3 className="font-bold text-red-800">Application Rejected</h3>
                                                    <p className="text-sm text-red-700 mt-1">Reason: {selectedApp.reason}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">FSSAI License No.</p>
                                                <p className="font-medium text-gray-900 font-mono tracking-wider">{selectedApp.fssaiNo}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Submission Date</p>
                                                <p className="font-medium text-gray-900">{selectedApp.submittedOn}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Location</p>
                                                <p className="font-medium text-gray-900 flex items-center gap-2"><MapPin size={16} className="text-primary" /> {selectedApp.city}, Maharashtra, India</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2"><FileText size={18} className="text-primary" /> Uploaded Documents</h3>

                                            {/* Mock Document Viewer */}
                                            <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 group hover:border-primary transition-colors">
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 bg-primary/10 rounded items-center justify-center flex text-primary font-bold">PDF</div>
                                                        <div>
                                                            <p className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">fssai_certificate.pdf</p>
                                                            <p className="text-xs text-gray-500">245 KB • Scanned Document</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-primary p-2">
                                                        <ExternalLink size={18} />
                                                    </button>
                                                </div>
                                                <div className="w-full h-40 bg-gray-300 rounded overflow-hidden flex items-center justify-center text-gray-500 text-sm">
                                                    [Document Preview Mock]
                                                </div>
                                            </div>

                                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex justify-between items-center group hover:border-primary transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-blue-100 rounded items-center justify-center flex text-blue-600 font-bold">JPG</div>
                                                    <div>
                                                        <p className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">owner_id_proof.jpg</p>
                                                        <p className="text-xs text-gray-500">1.2 MB • Aadhar Card</p>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 hover:text-primary p-2">
                                                    <ExternalLink size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {selectedApp.status === 'pending' && (
                                            <div className="pt-6 border-t border-gray-100 flex gap-4 mt-8">
                                                <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 py-3" onClick={() => handleAction(selectedApp.id, 'rejected')}>
                                                    <X size={18} className="mr-2" /> Reject Application
                                                </Button>
                                                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white cursor-pointer py-3" onClick={() => handleAction(selectedApp.id, 'approved')}>
                                                    <Check size={18} className="mr-2" /> Approve & Verify
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        ) : (
                            <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                                <FileText size={64} className="mb-4 text-gray-300" />
                                <p className="text-lg font-medium">Select an application</p>
                                <p className="text-sm">Click on a mess from the left list to review details.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VerificationHub;
