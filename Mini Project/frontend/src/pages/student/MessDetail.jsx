import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import Card, { CardBody } from '../../components/ui/Card';
import { Star, MapPin, CheckCircle, Clock, Info, ShieldCheck, ChevronRight } from 'lucide-react';
import api from '../../services/api';

const MessDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mess, setMess] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('menu');

    useEffect(() => {
        const fetchMessDetails = async () => {
            try {
                // Fetch mess by id from API
                const response = await api.get(`/messes/${id}`);
                const dbMess = response.data.data;

                // Map DB schema to Component state structure
                setMess({
                    _id: dbMess._id,
                    name: dbMess.name,
                    location: `${dbMess.location?.address || ''}, ${dbMess.location?.city || ''}`,
                    rating: dbMess.rating?.average || 0,
                    reviewsCount: dbMess.rating?.count || 0,
                    type: dbMess.type,
                    images: dbMess.photos?.length ? dbMess.photos : ['https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1200'],
                    features: dbMess.features || [],
                    timings: dbMess.timings || { breakfast: '', lunch: '', dinner: '' },
                    menu: dbMess.menu?.[0] || { breakfast: [], lunch: [], dinner: [] },
                    plans: (dbMess.subscriptionPlans || []).map(p => ({
                        _id: p._id,
                        name: p.name,
                        days: p.durationDays,
                        price: p.price,
                        meals: p.mealsIncluded || []
                    }))
                });
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to fetch mess details", err);
                setIsLoading(false);
            }
        };

        fetchMessDetails();
    }, [id]);

    if (isLoading) return <div className="min-h-screen bg-background flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    if (!mess) return <div className="p-8 text-center text-red-500 min-h-screen">Mess not found</div>;

    return (
        <div className="min-h-screen bg-background flex flex-col pb-20 md:pb-0">
            <Navbar />

            {/* Header Image */}
            <div className="w-full h-[300px] sm:h-[400px] relative">
                <img
                    src={mess.images[0]}
                    alt={mess.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{mess.type}</span>
                            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-sm">
                                <ShieldCheck size={14} className="text-green-400" /> FSSAI Verified
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">{mess.name}</h1>
                        <p className="flex items-center text-gray-200 text-sm sm:text-base">
                            <MapPin size={16} className="mr-1" />
                            {mess.location}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-3 flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center bg-green-50 text-green-700 p-2 rounded-lg min-w-[60px]">
                            <span className="font-bold text-xl flex items-center">{mess.rating} <Star size={16} className="ml-0.5 fill-current" /></span>
                        </div>
                        <div>
                            <p className="font-bold text-text-primary text-sm">Very Good</p>
                            <a href="#reviews" className="text-xs text-text-secondary underline">{mess.reviewsCount} reviews</a>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">

                {/* Left Content Area (Menu & Info) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Tabs */}
                    <div className="flex space-x-1 sm:space-x-4 border-b border-gray-200 overflow-x-auto no-scrollbar">
                        {['menu', 'about', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-2 sm:px-4 text-sm font-medium whitespace-nowrap capitalize transition-colors ${activeTab === tab
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === 'menu' && (
                            <div className="space-y-6 animate-fade-in text-text-primary">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Clock className="text-primary" size={24} />
                                    Today's Menu
                                </h2>

                                <Card className="border-none shadow-sm mb-4">
                                    <CardBody className="p-5 flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <h3 className="font-bold border-b border-gray-100 pb-2 mb-3">Lunch <span className="text-xs font-normal text-text-secondary ml-2">{mess.timings.lunch}</span></h3>
                                            <ul className="space-y-2 text-sm">
                                                {mess.menu.lunch.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="hidden md:block w-px bg-gray-100"></div>
                                        <div className="flex-1">
                                            <h3 className="font-bold border-b border-gray-100 pb-2 mb-3">Dinner <span className="text-xs font-normal text-text-secondary ml-2">{mess.timings.dinner}</span></h3>
                                            <ul className="space-y-2 text-sm">
                                                {mess.menu.dinner.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="space-y-6 animate-fade-in text-text-primary">
                                <div>
                                    <h3 className="font-bold text-lg mb-3">About Setup</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        Providing hygienic and authentic meals to students since 2018. We focus on daily fresh ingredients and maintain a clean eating environment.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-3">Amenities & Features</h3>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        {mess.features.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 text-text-secondary">
                                                <CheckCircle size={16} className="text-green-500" /> {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-6 animate-fade-in text-text-primary p-8 text-center bg-gray-50 rounded-xl">
                                <Star className="mx-auto text-gray-300 mb-2" size={48} />
                                <h3 className="font-bold text-lg">Reviews coming soon</h3>
                                <p className="text-text-secondary">Be the first to leave a review after subscribing.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side Sticky Area (Subscriptions) */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-text-primary mb-4">Choose a Plan</h2>

                        <div className="space-y-4">
                            {mess.plans.map(plan => (
                                <div key={plan._id} className="border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">{plan.name}</h3>
                                        <span className="font-bold text-lg">₹{plan.price}</span>
                                    </div>
                                    <p className="text-xs text-text-secondary mb-4 flex items-center gap-1">
                                        <Info size={12} /> Valid for {plan.days} days
                                    </p>
                                    <Button
                                        className="w-full text-sm"
                                        onClick={() => navigate(`/student/checkout/${mess._id}?plan=${plan._id}`)}
                                    >
                                        Subscribe Now
                                    </Button>
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {plan.meals.map(m => (
                                            <span key={m} className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MessDetail;
