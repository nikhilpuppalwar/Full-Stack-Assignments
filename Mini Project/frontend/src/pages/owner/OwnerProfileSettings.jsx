import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Camera, MapPin, Phone, Mail, Clock, ShieldCheck, Check } from 'lucide-react';

const OwnerProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);

    // Mock Data
    const [profile, setProfile] = useState({
        messName: 'Shree Ganesh Dining Hall',
        description: 'Providing hygienic and authentic meals to students since 2018. We focus on daily fresh ingredients.',
        type: 'Pure Veg',
        address: '123 Main St',
        city: 'Pune',
        phone: '+91 9876543210',
        email: 'contact@shreeganesh.com',
        timings: {
            breakfast: '08:00 AM - 10:30 AM',
            lunch: '12:30 PM - 02:30 PM',
            dinner: '07:30 PM - 09:30 PM'
        },
        features: 'Air Conditioned, RO Water, Digital Payment, Parking',
        fssaiNumber: '11520036000123'
    });

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setProfile(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-text-primary">Business Profile</h1>
                    <p className="text-text-secondary mt-1">Manage your mess details visible to students.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 border-r border-gray-100 pr-4">
                        <nav className="space-y-2">
                            {['general', 'location & times', 'images', 'documents'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text-secondary hover:bg-gray-50'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <Card className="shadow-sm border border-gray-100">
                            <CardBody className="p-6">
                                <form onSubmit={handleSave}>

                                    {activeTab === 'general' && (
                                        <div className="space-y-6 animate-fade-in">
                                            <h2 className="text-xl font-bold border-b border-gray-100 pb-2">General Information</h2>

                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">Mess Name</label>
                                                <input required name="messName" value={profile.messName} onChange={handleChange} className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                                                <textarea rows="4" required name="description" value={profile.description} onChange={handleChange} className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none mb-1" />
                                                <p className="text-xs text-gray-400 text-right">Visible on your public page.</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-1">Food Type</label>
                                                    <select name="type" value={profile.type} onChange={handleChange} className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                                                        <option value="Pure Veg">Pure Veg</option>
                                                        <option value="Non-Veg">Non-Veg</option>
                                                        <option value="Both">Both (Veg & Non-Veg)</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-1">Amenities (Comma separated)</label>
                                                    <input required name="features" value={profile.features} onChange={handleChange} className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1"><Phone size={14} /> Phone Number</label>
                                                    <input required type="tel" name="phone" value={profile.phone} onChange={handleChange} className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1"><Mail size={14} /> Public Email</label>
                                                    <input required type="email" name="email" value={profile.email} onChange={handleChange} className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'location & times' && (
                                        <div className="space-y-6 animate-fade-in">
                                            <h2 className="text-xl font-bold border-b border-gray-100 pb-2">Location & Timings</h2>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="col-span-2">
                                                    <label className="block text-sm font-medium text-text-secondary mb-1 flex items-center gap-1"><MapPin size={14} /> Street Address</label>
                                                    <input required name="address" value={profile.address} onChange={handleChange} className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-text-secondary mb-1">Locality / City</label>
                                                    <input required name="city" value={profile.city} onChange={handleChange} className="w-full text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                                </div>
                                            </div>

                                            <div className="border border-gray-100 p-4 rounded-xl bg-gray-50/50 mt-6">
                                                <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2"><Clock size={16} className="text-primary" /> Meal Servings</h3>
                                                <div className="space-y-4">
                                                    {['breakfast', 'lunch', 'dinner'].map(meal => (
                                                        <div key={meal} className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                            <label className="w-24 text-sm font-medium text-text-secondary capitalize">{meal}</label>
                                                            <input name={`timings.${meal}`} value={profile.timings[meal]} onChange={handleChange} placeholder="e.g. 08:00 AM - 10:30 AM" className="flex-1 text-sm rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'images' && (
                                        <div className="space-y-6 animate-fade-in">
                                            <h2 className="text-xl font-bold border-b border-gray-100 pb-2 flex items-center gap-2"><Camera size={20} /> Cover & Photos</h2>

                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-primary transition-colors cursor-pointer group">
                                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <Camera size={32} />
                                                </div>
                                                <p className="font-medium text-text-primary mb-1">Click to upload photos</p>
                                                <p className="text-xs text-text-secondary">PNG, JPG up to 5MB. First image will be the cover.</p>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                {/* Mock existing photos */}
                                                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group">
                                                    <img src="https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=400" alt="Mess" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white text-xs font-medium cursor-pointer">
                                                        Remove
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'documents' && (
                                        <div className="space-y-6 animate-fade-in">
                                            <h2 className="text-xl font-bold border-b border-gray-100 pb-2 flex items-center gap-2"><ShieldCheck size={20} className="text-green-500" /> Verification Documents</h2>

                                            <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-start gap-3 mb-6">
                                                <Check className="text-green-600 mt-0.5" size={18} />
                                                <div>
                                                    <p className="font-bold text-green-800 text-sm">Account Verified</p>
                                                    <p className="text-xs text-green-700 mt-1">Your business documents have been reviewed and approved by administrators.</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-text-secondary mb-1">FSSAI License Number</label>
                                                <input disabled value={profile.fssaiNumber} className="w-full text-sm rounded-lg border border-gray-200 px-3 py-2 bg-gray-50 text-gray-500 outline-none cursor-not-allowed" />
                                                <p className="text-xs text-orange-500 mt-1 italic">Contact platform support to update your primary license details.</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
                                        <Button type="button" variant="outline">Discard</Button>
                                        <Button type="submit" disabled={isSaving || activeTab === 'documents'}>
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>

                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default OwnerProfileSettings;
