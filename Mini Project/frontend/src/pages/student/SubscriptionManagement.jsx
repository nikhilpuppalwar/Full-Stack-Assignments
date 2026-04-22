import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, MapPin, QrCode, Clock, X } from 'lucide-react';

const SubscriptionManagement = () => {
    const navigate = useNavigate();
    // Mock Subscriptions
    const [subscriptions, setSubscriptions] = useState([
        {
            id: 'sub_123',
            messId: 'mess_1',
            messName: 'Annapurna Veg Mess',
            location: 'Koramangala, Bangalore',
            planName: 'Standard Monthly',
            type: 'Veg',
            startDate: '2023-11-01',
            endDate: '2023-11-30',
            status: 'active',
            remainingDays: 14,
            qrCodeData: 'MESS_SUB_mess_1_123456789'
        },
        {
            id: 'sub_098',
            messId: 'mess_2',
            messName: 'Spice Route Non-Veg',
            location: 'HSR Layout, Bangalore',
            planName: 'Weekly Trial',
            type: 'Non-Veg',
            startDate: '2023-10-01',
            endDate: '2023-10-07',
            status: 'expired',
            remainingDays: 0,
            qrCodeData: null
        }
    ]);

    const [activeQrData, setActiveQrData] = useState(null);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 max-w-5xl mx-auto w-full p-4 py-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-text-primary">My Subscriptions</h1>
                    <p className="text-text-secondary mt-1">Manage your active plans and access your QR codes</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {subscriptions.map((sub) => (
                        <Card key={sub.id} className={`overflow-hidden transition-all ${sub.status === 'expired' ? 'opacity-75 grayscale-[0.2]' : 'hover:shadow-md'}`}>
                            <div className="flex flex-col md:flex-row">
                                <div className={`p-6 md:w-2/3 flex flex-col justify-between ${sub.status === 'active' ? 'border-l-4 border-primary' : 'border-l-4 border-gray-300'}`}>
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-text-primary">{sub.messName}</h3>
                                            <span className={`px-2 py-1 text-xs font-bold rounded uppercase tracking-wide ${sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {sub.status}
                                            </span>
                                        </div>
                                        <p className="flex items-center text-text-secondary text-sm mb-4">
                                            <MapPin size={16} className="mr-1" /> {sub.location}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <p className="text-xs text-text-secondary mb-1 uppercase tracking-tight">Plan</p>
                                                <p className="font-medium text-sm text-text-primary">{sub.planName} ({sub.type})</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <p className="text-xs text-text-secondary mb-1 uppercase tracking-tight">Remaining</p>
                                                <p className="font-medium text-sm text-text-primary">
                                                    {sub.status === 'active' ? `${sub.remainingDays} Days` : 'Ended'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-sm text-text-secondary gap-4">
                                        <span className="flex items-center"><Calendar size={16} className="mr-1" /> {sub.startDate}</span>
                                        <span className="flex items-center"><ArrowRight size={14} className="mx-1" /></span>
                                        <span className="flex items-center"><Calendar size={16} className="mr-1" /> {sub.endDate}</span>
                                    </div>
                                </div>

                                <div className="p-6 md:w-1/3 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col items-center justify-center text-center">
                                    {sub.status === 'active' ? (
                                        <>
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                                <QrCode size={32} />
                                            </div>
                                            <p className="text-sm font-medium text-text-primary mb-4">Scan for today's meal check-in</p>
                                            <Button onClick={() => setActiveQrData(sub.qrCodeData)} className="w-full flex justify-center items-center gap-2">
                                                <QrCode size={18} /> Show QR Code
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-500">
                                                <Clock size={32} />
                                            </div>
                                            <p className="text-sm text-text-secondary mb-4">This subscription has ended.</p>
                                            <Button variant="outline" className="w-full mb-2" onClick={() => navigate(`/student/review/${sub.messId}`)}>Review Mess</Button>
                                            <Button variant="outline" className="w-full mt-2" onClick={() => navigate(`/student/checkout/${sub.messId}`)}>Renew Plan</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* QR Code Modal Overlay */}
            {activeQrData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <Card className="w-full max-w-sm animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <div className="h-2 bg-primary w-full absolute top-0 left-0"></div>
                        <button
                            onClick={() => setActiveQrData(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1"
                        >
                            <X size={24} />
                        </button>

                        <CardBody className="flex flex-col items-center py-10 px-6 text-center">
                            <h3 className="text-2xl font-bold text-text-primary mb-2">Meal Check-in</h3>
                            <p className="text-text-secondary text-sm mb-8">Present this QR code to the mess owner at the counter.</p>

                            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-sm mb-6 inline-block">
                                {/* Placeholder for actual QR rendering library */}
                                <QrCode size={180} className="text-gray-800" />
                            </div>

                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">ID Code</p>
                            <p className="font-mono bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">{activeQrData}</p>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default SubscriptionManagement;
