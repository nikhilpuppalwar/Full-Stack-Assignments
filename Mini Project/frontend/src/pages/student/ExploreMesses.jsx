import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MessCard from '../../components/student/MessCard';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import api from '../../services/api';

const ExploreMesses = () => {
    const [messes, setMesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchMesses = async () => {
            try {
                // Fetch messes from API
                const response = await api.get('/messes');
                setMesses(response.data.data);
            } catch (err) {
                console.error("Failed to fetch messes", err);
                // MOCK DATA for layout testing if backend is down or empty
                setMesses([
                    {
                        _id: '1',
                        name: 'Authentic Maharashtrian Thali',
                        location: 'Kothrud, Pune',
                        rating: 4.8,
                        type: 'Pure Veg',
                        plans: [{ price: 2500 }],
                        images: ['https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop']
                    },
                    {
                        _id: '2',
                        name: 'Protein Box Kitchen',
                        location: 'Viman Nagar, Pune',
                        rating: 4.5,
                        type: 'Veg & Non-Veg',
                        plans: [{ price: 3200 }],
                        images: ['https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=1000&auto=format&fit=crop']
                    },
                    {
                        _id: '3',
                        name: 'Home Style Meals',
                        location: 'Shivaji Nagar, Pune',
                        rating: 4.2,
                        type: 'Pure Veg',
                        plans: [{ price: 2200 }],
                        images: ['https://plus.unsplash.com/premium_photo-1694141253763-209b4c8f8ace?q=80&w=1000&auto=format&fit=crop']
                    },
                    {
                        _id: '4',
                        name: 'Spice Route Mess',
                        location: 'Wakad, Pune',
                        rating: 4.9,
                        type: 'Veg & Non-Veg',
                        plans: [{ price: 2800 }],
                        images: ['https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=1000&auto=format&fit=crop']
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMesses();
    }, []);

    const filteredMesses = messes.filter(mess =>
        mess.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mess.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mess.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="bg-primary/5 py-12 border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 text-center">
                        Find Your Perfect Mess
                    </h1>
                    <p className="text-text-secondary text-center max-w-2xl mx-auto mb-8">
                        Discover verified and hygienic mess operators near your college. Compare menus, read reviews, and subscribe online.
                    </p>

                    <div className="max-w-3xl mx-auto bg-white p-2 rounded-xl shadow-lg flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by mess name..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-primary/20 bg-gray-50 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="hidden sm:block w-px bg-gray-200 my-2"></div>
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Location (e.g. Pune)"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-primary/20 bg-gray-50 outline-none"
                            />
                        </div>
                        <Button className="py-3 px-6 rounded-lg whitespace-nowrap">
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex gap-8">
                {/* Filters Sidebar - Desktop */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                            <h2 className="font-bold text-lg flex items-center gap-2">
                                <SlidersHorizontal size={18} /> Filters
                            </h2>
                            <button className="text-sm text-primary hover:underline font-medium">Clear All</button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-text-primary mb-3">Dietary Preference</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                        <span className="text-sm">Pure Veg</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                        <span className="text-sm">Veg & Non-Veg</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-text-primary mb-3">Rating</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="rating" className="text-primary focus:ring-primary" />
                                        <span className="text-sm">4.5 & Above</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="rating" className="text-primary focus:ring-primary" />
                                        <span className="text-sm">4.0 & Above</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-text-primary mb-3">Monthly Price</h3>
                                <div className="space-y-2">
                                    <input type="range" className="w-full accent-primary" min="1500" max="6000" />
                                    <div className="flex justify-between text-xs text-text-secondary">
                                        <span>₹1.5k</span>
                                        <span>₹6k+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-text-primary">
                            {filteredMesses.length} Messes found
                        </h2>

                        {/* Mobile filter button */}
                        <button className="lg:hidden flex items-center gap-1 text-sm font-medium border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50">
                            <SlidersHorizontal size={16} /> Filters
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-[340px] bg-gray-100 animate-pulse rounded-xl"></div>
                            ))}
                        </div>
                    ) : filteredMesses.length > 0 ? (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredMesses.map(mess => (
                                <MessCard key={mess._id} mess={mess} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary mb-2">No messes found</h3>
                            <p className="text-text-secondary">We couldn't find any messes matching your specific filters.</p>
                            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>Clear search</Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ExploreMesses;
