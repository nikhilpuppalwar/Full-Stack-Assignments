import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Settings, Percent, Activity, Bell, FileText, Database } from 'lucide-react';

const SystemSettings = () => {
    const [settings, setSettings] = useState({
        commissionRate: 5,
        settlementDays: 3,
        autoApproveStudents: true,
        maintenanceMode: false,
        platformAnnouncement: '',
        databaseBackups: 'daily'
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setSaved(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
                    <p className="text-gray-500 mt-1">Configure global platform parameters, financial rates, and system states.</p>
                </div>

                <form onSubmit={handleSave}>
                    <div className="space-y-6">

                        {/* Financial Settings */}
                        <Card className="shadow-sm border border-gray-200 bg-white">
                            <CardBody className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <Percent size={20} className="text-primary" /> Financial & Billing Rules
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Platform Commission Rate (%)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="commissionRate"
                                                value={settings.commissionRate}
                                                onChange={handleChange}
                                                min="0" max="100" step="0.5"
                                                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1.5">Percentage deducted from gross mess payouts.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Settlement Cycle (Days)</label>
                                        <input
                                            type="number"
                                            name="settlementDays"
                                            value={settings.settlementDays}
                                            onChange={handleChange}
                                            min="1" max="30"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                                        />
                                        <p className="text-xs text-gray-500 mt-1.5">Days required before payout is marked "due".</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Operational Flags */}
                        <Card className="shadow-sm border border-gray-200 bg-white">
                            <CardBody className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <Activity size={20} className="text-orange-500" /> Operational Flags
                                </h2>

                                <div className="space-y-4">
                                    <label className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className="mt-0.5">
                                            <input
                                                type="checkbox"
                                                name="autoApproveStudents"
                                                checked={settings.autoApproveStudents}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Auto-Approve Student Accounts</p>
                                            <p className="text-sm text-gray-500 mt-0.5">If disabled, all new student signups require manual admin verification before login.</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-4 p-4 border border-red-100 bg-red-50/30 rounded-xl cursor-pointer">
                                        <div className="mt-0.5">
                                            <input
                                                type="checkbox"
                                                name="maintenanceMode"
                                                checked={settings.maintenanceMode}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-red-600 rounded border-red-300 focus:ring-red-500"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-red-900">Maintenance Mode</p>
                                            <p className="text-sm text-red-700/80 mt-0.5">Suspends all login and registration activities. Displays a "Site under maintenance" banner.</p>
                                        </div>
                                    </label>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Global Announcements */}
                        <Card className="shadow-sm border border-gray-200 bg-white">
                            <CardBody className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                                    <Bell size={20} className="text-blue-500" /> Global Announcement
                                </h2>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Display Banner Text</label>
                                    <textarea
                                        name="platformAnnouncement"
                                        value={settings.platformAnnouncement}
                                        onChange={handleChange}
                                        placeholder="Leaving this blank disables the global banner..."
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm resize-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1.5">This text will appear at the top of all user dashboards (Students & Owners).</p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="mt-8 flex justify-end items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky bottom-4">
                        {saved && <span className="text-green-600 font-bold flex items-center text-sm mr-2"><CheckCircle size={16} className="mr-1" /> Variables updated successfully</span>}
                        <Button type="button" variant="outline" className="text-gray-600 border-gray-300">Reset Defaults</Button>
                        <Button type="submit" disabled={isSaving} className="px-8 flex items-center gap-2">
                            <Settings size={18} className={isSaving ? 'animate-spin' : ''} />
                            {isSaving ? 'Applying Changes...' : 'Save Configuration'}
                        </Button>
                    </div>

                </form>

            </main>
        </div>
    );
};

export default SystemSettings;
