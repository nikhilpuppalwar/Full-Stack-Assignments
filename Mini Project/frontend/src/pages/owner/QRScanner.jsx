import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { QrCode, CheckCircle, XCircle, Search, User, Clock, Check } from 'lucide-react';

const QRScanner = () => {
    const [scanMethod, setScanMethod] = useState('camera'); // 'camera' or 'manual'
    const [manualId, setManualId] = useState('');
    const [scanResult, setScanResult] = useState(null); // { success: boolean, message: string, user?: object }
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock verification
    const handleVerify = (id) => {
        setIsProcessing(true);
        setScanResult(null);

        setTimeout(() => {
            setIsProcessing(false);
            if (id.startsWith('MESS_SUB_')) {
                setScanResult({
                    success: true,
                    message: 'Meal authorized successfully.',
                    user: {
                        name: 'Rahul Sharma',
                        plan: 'Lunch + Dinner (Monthly)',
                        remainingMeals: 42,
                        scanTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                });
            } else {
                setScanResult({
                    success: false,
                    message: 'Invalid or expired QR code.'
                });
            }
        }, 800);
    };

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (manualId.trim()) {
            handleVerify(manualId);
        }
    };

    const resetScanner = () => {
        setScanResult(null);
        setManualId('');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-lg mx-auto w-full px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text-primary">QR Scanner</h1>
                    <p className="text-text-secondary mt-1">Scan student QR codes to log meals.</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        onClick={() => setScanMethod('camera')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${scanMethod === 'camera' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Camera Scanner
                    </button>
                    <button
                        onClick={() => setScanMethod('manual')}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${scanMethod === 'manual' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Manual Entry
                    </button>
                </div>

                <Card className="shadow-md overflow-hidden relative">
                    <CardBody className="p-8 flex flex-col items-center">

                        {!scanResult ? (
                            <>
                                {scanMethod === 'camera' ? (
                                    <div className="flex flex-col items-center w-full">
                                        {/* Mock Camera Viewfinder */}
                                        <div className="relative w-full max-w-[280px] aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-inner mb-6 border-4 border-gray-800 flex items-center justify-center">
                                            <div className="absolute inset-x-0 h-0.5 bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.5)] animate-[scan_2s_ease-in-out_infinite]" style={{ top: '50%' }}></div>
                                            <QrCode size={48} className="text-white/20" />

                                            {/* Corner Markers */}
                                            <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-white opacity-50 rounded-tl-sm"></div>
                                            <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-white opacity-50 rounded-tr-sm"></div>
                                            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-white opacity-50 rounded-bl-sm"></div>
                                            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-white opacity-50 rounded-br-sm"></div>
                                        </div>
                                        <p className="text-text-secondary text-sm text-center">Point camera at the student's QR code.</p>
                                        <Button variant="outline" className="mt-4" onClick={() => handleVerify('MESS_SUB_123')}>Mock Scan Success</Button>
                                        <Button variant="outline" className="mt-2 text-red-500 border-red-200 hover:bg-red-50" onClick={() => handleVerify('INVALID_123')}>Mock Scan Fail</Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleManualSubmit} className="w-full">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                                            <Search size={32} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-text-secondary mb-2">Enter Subscription ID Code</label>
                                            <input
                                                type="text"
                                                autoFocus
                                                required
                                                placeholder="e.g. MESS_SUB_"
                                                className="w-full p-4 font-mono text-center text-lg uppercase tracking-wider rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-0 outline-none transition-colors"
                                                value={manualId}
                                                onChange={(e) => setManualId(e.target.value.toUpperCase())}
                                                disabled={isProcessing}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full py-4 text-base" disabled={isProcessing || !manualId}>
                                            {isProcessing ? 'Verifying...' : 'Verify ID'}
                                        </Button>
                                    </form>
                                )}
                            </>
                        ) : (
                            <div className="w-full flex flex-col items-center py-4 animate-fade-in text-center">
                                {scanResult.success ? (
                                    <>
                                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle size={48} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-text-primary mb-1">Approved</h2>
                                        <p className="text-green-600 font-medium mb-8 bg-green-50 px-4 py-1 rounded-full">{scanResult.message}</p>

                                        <div className="w-full bg-gray-50 rounded-xl p-4 text-left border border-gray-100 mb-8 space-y-3">
                                            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500"><User size={20} /></div>
                                                <div>
                                                    <p className="text-xs text-text-secondary">Student Name</p>
                                                    <p className="font-bold text-text-primary">{scanResult.user.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-secondary">Plan</span>
                                                <span className="font-medium text-text-primary">{scanResult.user.plan}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-secondary">Meals Left</span>
                                                <span className="font-bold text-orange-600">{scanResult.user.remainingMeals}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-text-secondary">Time</span>
                                                <span className="font-medium text-text-primary flex items-center gap-1"><Clock size={14} /> {scanResult.user.scanTime}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                                            <XCircle size={48} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-text-primary mb-1">Unauthorized</h2>
                                        <p className="text-red-500 font-medium mb-8">{scanResult.message}</p>
                                    </>
                                )}

                                <Button onClick={resetScanner} className="w-full flex justify-center items-center gap-2 py-3">
                                    <QrCode size={18} /> Scan Next Student
                                </Button>
                            </div>
                        )}

                    </CardBody>
                </Card>
            </main>

            {/* CSS Animation for scanning line */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { top: 0%; box-shadow: 0 0 8px 2px rgba(74,222,128,0); }
                    10% { box-shadow: 0 0 8px 2px rgba(74,222,128,0.8); }
                    50% { top: 100%; box-shadow: 0 0 8px 2px rgba(74,222,128,0.8); }
                    90% { box-shadow: 0 0 8px 2px rgba(74,222,128,0); }
                    100% { top: 0%; box-shadow: 0 0 8px 2px rgba(74,222,128,0); }
                }
            `}} />
        </div>
    );
};

export default QRScanner;
