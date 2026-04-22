import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody, CardHeader, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { ArrowLeft, ArrowRight, CreditCard, CheckCircle, QrCode } from 'lucide-react';

const CheckoutFlow = () => {
    const { messId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // The plan info should preferably be passed from MessDetail via navigation state.
    const planFromState = location.state?.plan;

    const [step, setStep] = useState(1);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [generatedQr, setGeneratedQr] = useState('');

    // Fallback if no plan is available in state (e.g. user refreshed the page)
    const activePlan = planFromState || {
        name: 'Standard Monthly',
        price: 2500,
        type: 'Veg',
        duration: '1 Month'
    };

    const handleConfirmDetails = () => {
        if (!startDate) return;
        setStep(2);
    };

    const handlePayment = () => {
        if (!paymentMethod) return;
        setIsSubmitting(true);
        // Simulate API call for payment & subscription creation
        setTimeout(() => {
            setIsSubmitting(false);
            setGeneratedQr(`MESS_SUB_${messId}_${Date.now()}`);
            setStep(3);
        }, 1500);
    };

    const handleGoToDashboard = () => {
        navigate('/student/dashboard');
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="flex-1 flex flex-col items-center py-12 px-4">

                {/* Progress Indicators */}
                <div className="w-full max-w-2xl mb-8">
                    <div className="flex justify-between relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                        <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>

                        {['Details', 'Payment', 'Success'].map((label, index) => {
                            const stepNum = index + 1;
                            const isActive = step >= stepNum;
                            return (
                                <div key={label} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${isActive ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>
                                        {step > stepNum ? <CheckCircle size={16} /> : stepNum}
                                    </div>
                                    <span className={`text-xs mt-2 font-medium ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Area */}
                <Card className="w-full max-w-2xl shadow-lg border-t-4 border-t-primary animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {step === 1 && (
                        <>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                                        <ArrowLeft size={20} />
                                    </button>
                                    <div>
                                        <h2 className="text-2xl font-bold text-text-primary">Confirm Subscription</h2>
                                        <p className="text-text-secondary text-sm">Review your selected plan</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                {/* Plan Details Summary */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-lg text-text-primary">{activePlan.name}</h3>
                                        <p className="text-sm text-text-secondary">{activePlan.type} • {activePlan.duration}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-text-secondary">Total Amount</p>
                                        <p className="font-bold text-xl text-primary">₹{activePlan.price}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-text-primary">Start Date</label>
                                    <Input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <p className="text-xs text-text-secondary">Your subscription will be active starting from this date.</p>
                                </div>
                            </CardBody>
                            <CardFooter className="flex justify-end pt-4 border-t border-gray-100">
                                <Button onClick={handleConfirmDetails} className="flex gap-2 items-center">
                                    Proceed to Payment <ArrowRight size={16} />
                                </Button>
                            </CardFooter>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <CardHeader>
                                <h2 className="text-2xl font-bold text-text-primary">Payment Details</h2>
                                <p className="text-text-secondary text-sm">Select your preferred payment method</p>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                {/* Amount to Pay */}
                                <div className="text-center py-6 bg-orange-50 rounded-xl border border-orange-100">
                                    <p className="text-sm text-orange-800 font-medium mb-1">Amount to Pay</p>
                                    <p className="text-4xl font-bold text-primary">₹{activePlan.price}</p>
                                </div>

                                {/* Payment Methods selection (Mock UI) */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-text-primary">Payment Method</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {['UPI', 'Credit/Debit Card', 'Net Banking', 'Cash on Delivery'].map((method) => (
                                            <div
                                                key={method}
                                                onClick={() => setPaymentMethod(method)}
                                                className={`border rounded-lg p-4 cursor-pointer flex items-center gap-3 transition-colors duration-200 ${paymentMethod === method ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                <CreditCard size={20} className={paymentMethod === method ? 'text-primary' : 'text-gray-400'} />
                                                <span className={`font-medium ${paymentMethod === method ? 'text-primary' : 'text-text-primary'}`}>{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <button onClick={() => setStep(1)} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                                    Back
                                </button>
                                <Button onClick={handlePayment} isLoading={isSubmitting} disabled={!paymentMethod} className="flex gap-2 items-center">
                                    Pay ₹{activePlan.price}
                                </Button>
                            </CardFooter>
                        </>
                    )}

                    {step === 3 && (
                        <div className="text-center py-10 px-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} className="text-green-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-text-primary mb-2">Payment Successful!</h2>
                            <p className="text-text-secondary mb-8">Your subscription to {activePlan.name} is now active starting {startDate}.</p>

                            {/* Simulated QR Code Area */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mx-auto inline-block mb-8 shadow-sm">
                                <div className="bg-white p-4 rounded-lg shadow-inner mb-3 flex items-center justify-center w-48 h-48 border border-gray-100">
                                    {/* Placeholder for actual QR code - using an icon for now */}
                                    <QrCode size={120} className="text-gray-800" />
                                </div>
                                <p className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">Your ID Code</p>
                                <p className="font-mono bg-gray-200 px-3 py-1 rounded text-sm text-gray-700">{generatedQr}</p>
                            </div>

                            <div>
                                <Button onClick={handleGoToDashboard} className="w-full sm:w-auto min-w-[200px]">
                                    Go to Dashboard
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CheckoutFlow;
