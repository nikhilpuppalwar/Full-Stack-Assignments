import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { User, Bell, Shield, LogOut } from 'lucide-react';

const ProfileSettings = () => {
    const { user, logout } = useAuth();

    const [preferences, setPreferences] = useState({
        dietary: 'Veg',
        notifications: true
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            // Simulate toast or success message here
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-4xl mx-auto w-full p-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2 font-medium">
                    <button className="w-full text-left px-4 py-3 bg-primary/10 text-primary rounded-lg flex items-center gap-3">
                        <User size={18} /> Account
                    </button>
                    <button className="w-full text-left px-4 py-3 text-text-secondary hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors">
                        <Bell size={18} /> Notifications
                    </button>
                    <button className="w-full text-left px-4 py-3 text-text-secondary hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors">
                        <Shield size={18} /> Privacy & Security
                    </button>
                    <button onClick={logout} className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-3 transition-colors mt-8">
                        <LogOut size={18} /> Log Out
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Profile Settings</h1>
                        <p className="text-text-secondary mt-1">Manage your account details and dietary preferences.</p>
                    </div>

                    <Card className="shadow-sm">
                        <CardBody className="space-y-6">

                            <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                                    {user?.profilePhoto ? (
                                        <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                            <User size={40} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 mb-2 transition-colors">
                                        Change Photo
                                    </button>
                                    <p className="text-xs text-text-secondary">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                    label="Full Name"
                                    defaultValue={user?.fullName || 'John Doe'}
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    defaultValue={user?.email || 'john@example.com'}
                                    disabled
                                    className="bg-gray-50 opacity-70"
                                />
                                <Input
                                    label="Phone Number"
                                    defaultValue={user?.phone || '9876543210'}
                                />
                            </div>

                            <hr className="border-gray-100" />

                            <div>
                                <h3 className="text-lg font-bold text-text-primary mb-4">Dietary Preference</h3>
                                <div className="flex gap-4">
                                    {['Veg', 'Non-veg', 'Jain'].map((diet) => (
                                        <label key={diet} className={`flex items-center justify-center border-2 rounded-xl py-3 px-6 cursor-pointer font-medium transition-colors ${preferences.dietary === diet ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-text-secondary hover:border-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="diet"
                                                value={diet}
                                                checked={preferences.dietary === diet}
                                                onChange={(e) => setPreferences({ ...preferences, dietary: e.target.value })}
                                                className="hidden"
                                            />
                                            {diet}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
                            </div>

                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
