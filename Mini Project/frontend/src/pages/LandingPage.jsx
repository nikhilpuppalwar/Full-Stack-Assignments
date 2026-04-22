import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light text-slate-800 font-display selection:bg-primary selection:text-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 glass-nav border-b border-gray-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <span className="material-icons text-primary text-3xl">restaurant_menu</span>
                            <span className="font-bold text-2xl tracking-tight text-secondary-blue">
                                Mess<span className="text-primary">Connect</span>
                            </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a className="text-slate-600 hover:text-primary font-medium transition-colors" href="#">Home</a>
                            <a className="text-slate-600 hover:text-primary font-medium transition-colors" href="#how-it-works">How it Works</a>
                            <a className="text-slate-600 hover:text-primary font-medium transition-colors" href="#">For Owners</a>
                            <a className="text-slate-600 hover:text-primary font-medium transition-colors" href="#">Contact</a>
                        </div>
                        <div className="hidden md:flex items-center space-x-4">
                            <button onClick={() => navigate('/login')} className="text-slate-900 font-medium hover:text-primary transition-colors cursor-pointer">Login</button>
                            <button onClick={() => navigate('/signup')} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-medium shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 cursor-pointer">Sign Up</button>
                        </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button className="text-gray-500 hover:text-primary focus:outline-none">
                                <span className="material-icons text-2xl">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 flex items-center min-h-[85vh] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Delicious Indian Thali spread with various curries"
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop"
                    />
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-left">
                    <div className="lg:w-2/3">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md">
                            Find Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100">Perfect Mess</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed drop-shadow">
                            Discover home-style food near your college. Subscribe to messes with real-time menus, transparent pricing, and zero hassle.
                        </p>

                        {/* Search Component */}
                        <div className="bg-white p-3 rounded-xl shadow-2xl max-w-2xl transform transition-all hover:scale-[1.01] mx-auto lg:mx-0">
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-grow relative">
                                    <span className="material-icons absolute left-3 top-3.5 text-gray-400">location_on</span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/20 rounded-lg outline-none text-slate-700 transition-all placeholder-gray-400"
                                        placeholder="Enter your college or area (e.g. Kota, Bangalore)"
                                        type="text"
                                    />
                                </div>
                                <button onClick={() => navigate('/signup')} className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
                                    <span>Get Started</span>
                                    <span className="material-icons text-sm">arrow_forward</span>
                                </button>
                            </div>
                            <div className="mt-3 flex gap-4 text-xs text-gray-500 px-2 justify-center lg:justify-start">
                                <span>Popular:</span>
                                <a className="hover:text-primary transition-colors underline decoration-dotted" href="#">Kota</a>
                                <a className="hover:text-primary transition-colors underline decoration-dotted" href="#">Pune</a>
                                <a className="hover:text-primary transition-colors underline decoration-dotted" href="#">Delhi</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-background-light relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-secondary-blue mb-4">Everything You Need to Eat Better</h3>
                        <p className="text-slate-600 max-w-2xl mx-auto">We bridge the gap between hungry students and quality food providers with technology that makes sense.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                                <span className="material-icons text-primary text-2xl group-hover:text-white transition-colors">restaurant</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Real-Time Menus</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">Know exactly what's cooking before you step out. Daily updates from mess owners.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                                <span className="material-icons text-primary text-2xl group-hover:text-white transition-colors">payments</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Transparent Pricing</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">No hidden charges. Compare meal prices and monthly subscription rates easily.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                                <span className="material-icons text-primary text-2xl group-hover:text-white transition-colors">calendar_month</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Monthly Subs</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">Manage your monthly mess cards digitally. Pause or cancel anytime.</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                                <span className="material-icons text-primary text-2xl group-hover:text-white transition-colors">verified_user</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Verified Reviews</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">Honest feedback from students like you to help you make the best choice.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white border-t border-gray-100" id="how-it-works">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-secondary-blue">How It Works</h3>
                        <p className="mt-4 text-slate-500">Get your food sorted in 3 simple steps</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-orange-100 via-primary to-orange-100 -translate-y-1/2 rounded-full opacity-20"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            {/* Step 1 */}
                            <div className="text-center group cursor-pointer">
                                <div className="bg-white border-4 border-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:border-primary transition-colors duration-300 relative">
                                    <span className="material-icons text-primary text-4xl">search</span>
                                    <div className="absolute -top-2 -right-2 bg-secondary-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">1</div>
                                </div>
                                <h4 className="text-xl font-bold text-slate-800 mb-2">Browse Location</h4>
                                <p className="text-slate-500 text-sm px-6">Find top-rated messes near your PG or hostel.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="text-center group cursor-pointer">
                                <div className="bg-white border-4 border-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:border-primary transition-colors duration-300 relative">
                                    <span className="material-icons text-primary text-4xl">touch_app</span>
                                    <div className="absolute -top-2 -right-2 bg-secondary-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">2</div>
                                </div>
                                <h4 className="text-xl font-bold text-slate-800 mb-2">Subscribe Online</h4>
                                <p className="text-slate-500 text-sm px-6">Choose a plan that fits your budget and pay securely.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="text-center group cursor-pointer">
                                <div className="bg-white border-4 border-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:border-primary transition-colors duration-300 relative">
                                    <span className="material-icons text-primary text-4xl">qr_code_scanner</span>
                                    <div className="absolute -top-2 -right-2 bg-secondary-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">3</div>
                                </div>
                                <h4 className="text-xl font-bold text-slate-800 mb-2">Scan &amp; Eat</h4>
                                <p className="text-slate-500 text-sm px-6">Visit the mess, scan your QR code, and enjoy your meal.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Messes Section */}
            <section className="py-24 bg-orange-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary-blue">Featured Messes</h2>
                            <p className="text-slate-500 mt-2">Top rated by students this week</p>
                        </div>
                        <a className="hidden md:flex items-center text-primary font-semibold hover:text-primary-dark transition-colors" href="#">
                            View All <span className="material-icons ml-1 text-sm">arrow_forward</span>
                        </a>
                    </div>

                    {/* Horizontal Carousel Container */}
                    <div className="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-6 scrollbar-hide snap-x">
                        {/* Mess Card 1 */}
                        <div className="min-w-[300px] md:min-w-[340px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-center border border-gray-100 relative">
                            <div className="relative h-48">
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop"
                                    alt="Indian thali"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center shadow-sm">
                                    <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
                                    <span className="text-xs font-bold text-slate-800">4.8</span>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-white text-xs">
                                    <span className="material-icons text-[10px] mr-1 align-middle">place</span>0.5 km away
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-800 truncate">Annapurna Mess</h3>
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Veg</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">Authentic North Indian thali with paneer special on Wednesdays.</p>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <span className="text-xs text-slate-400 block">Price per meal</span>
                                        <span className="font-bold text-lg text-secondary-blue">₹80</span>
                                    </div>
                                    <button className="text-primary hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-primary/20 cursor-pointer">
                                        View Menu
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mess Card 2 */}
                        <div className="min-w-[300px] md:min-w-[340px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-center border border-gray-100 relative">
                            <div className="relative h-48">
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop"
                                    alt="Bowl of salad"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center shadow-sm">
                                    <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
                                    <span className="text-xs font-bold text-slate-800">4.5</span>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-white text-xs">
                                    <span className="material-icons text-[10px] mr-1 align-middle">place</span>1.2 km away
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-800 truncate">Spice Junction</h3>
                                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">Mixed</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">Spicy Andhra style meals. Non-veg available on weekends.</p>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <span className="text-xs text-slate-400 block">Price per meal</span>
                                        <span className="font-bold text-lg text-secondary-blue">₹110</span>
                                    </div>
                                    <button className="text-primary hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-primary/20 cursor-pointer">
                                        View Menu
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mess Card 3 */}
                        <div className="min-w-[300px] md:min-w-[340px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-center border border-gray-100 relative">
                            <div className="relative h-48">
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop"
                                    alt="Fried rice"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center shadow-sm">
                                    <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
                                    <span className="text-xs font-bold text-slate-800">4.2</span>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-white text-xs">
                                    <span className="material-icons text-[10px] mr-1 align-middle">place</span>0.8 km away
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-800 truncate">Mom's Kitchen</h3>
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Veg</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">Homely food with less oil. Best for daily eating.</p>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <span className="text-xs text-slate-400 block">Price per meal</span>
                                        <span className="font-bold text-lg text-secondary-blue">₹70</span>
                                    </div>
                                    <button className="text-primary hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-primary/20 cursor-pointer">
                                        View Menu
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mess Card 4 */}
                        <div className="min-w-[300px] md:min-w-[340px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-center border border-gray-100 relative">
                            <div className="relative h-48">
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop"
                                    alt="Dosa with sambar"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center shadow-sm">
                                    <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
                                    <span className="text-xs font-bold text-slate-800">4.9</span>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-white text-xs">
                                    <span className="material-icons text-[10px] mr-1 align-middle">place</span>0.2 km away
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-800 truncate">Udupi Bhavan</h3>
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Veg</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">Famous for breakfast and South Indian thalis.</p>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <span className="text-xs text-slate-400 block">Price per meal</span>
                                        <span className="font-bold text-lg text-secondary-blue">₹90</span>
                                    </div>
                                    <button className="text-primary hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-primary/20 cursor-pointer">
                                        View Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden mt-6 text-center">
                        <a className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors" href="#">
                            View All Messes <span className="material-icons ml-1 text-sm">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Call to Action Banner */}
            <section className="py-16 bg-background-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-secondary-blue rounded-2xl overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="grid md:grid-cols-2 gap-10 items-center p-10 md:p-16 relative z-10">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">Own a Mess?</h2>
                                <p className="text-blue-100 mb-8 text-lg">Partner with us to digitize your menu, manage subscriptions, and reach thousands of students effortlessly.</p>
                                <div className="flex gap-4">
                                    <button onClick={() => navigate('/signup')} className="bg-white text-secondary-blue hover:bg-gray-50 px-6 py-3 rounded-lg font-bold transition-colors cursor-pointer">Register Mess</button>
                                    <button className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-bold transition-colors cursor-pointer">Learn More</button>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <img
                                    className="rounded-lg shadow-lg rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/20"
                                    alt="Happy chef presenting food"
                                    src="https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-secondary-blue text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-icons text-primary text-3xl">restaurant_menu</span>
                                <span className="font-bold text-2xl tracking-tight">Mess<span className="text-primary">Connect</span></span>
                            </div>
                            <p className="text-blue-100 text-sm leading-relaxed mb-6">
                                Simplifying daily meals for students across India. Good food, happy mood.
                            </p>
                            <div className="flex space-x-4">
                                <a className="text-blue-200 hover:text-white transition-colors" href="#"><span className="material-icons text-xl">facebook</span></a>
                                <a className="text-blue-200 hover:text-white transition-colors" href="#"><span className="material-icons text-xl">photo_camera</span></a>
                                <a className="text-blue-200 hover:text-white transition-colors" href="#"><span className="material-icons text-xl">alternate_email</span></a>
                            </div>
                        </div>

                        {/* Links */}
                        <div>
                            <h5 className="font-bold text-lg mb-4 text-primary">Company</h5>
                            <ul className="space-y-3 text-sm text-blue-100">
                                <li><a className="hover:text-white transition-colors" href="#">About Us</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Careers</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Blog</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
                            </ul>
                        </div>

                        {/* Links */}
                        <div>
                            <h5 className="font-bold text-lg mb-4 text-primary">For Users</h5>
                            <ul className="space-y-3 text-sm text-blue-100">
                                <li><a className="hover:text-white transition-colors" href="#">Search Messes</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Student Discounts</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Help Center</a></li>
                                <li><a className="hover:text-white transition-colors" href="#">Mobile App</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h5 className="font-bold text-lg mb-4 text-primary">Contact Us</h5>
                            <ul className="space-y-3 text-sm text-blue-100">
                                <li className="flex items-start gap-2">
                                    <span className="material-icons text-sm mt-1">email</span>
                                    <span>support@messconnect.in</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-icons text-sm mt-1">phone</span>
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-icons text-sm mt-1">location_on</span>
                                    <span>Tech Park, Bangalore, KA</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
                        <p>© 2026 MessConnect. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a className="hover:text-white transition-colors" href="#">Terms</a>
                            <a className="hover:text-white transition-colors" href="#">Privacy</a>
                            <a className="hover:text-white transition-colors" href="#">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
