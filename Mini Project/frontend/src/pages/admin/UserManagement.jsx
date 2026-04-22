import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search, Filter, MoreVertical, ShieldAlert, CheckCircle, Ban, Mail } from 'lucide-react';

const UserManagement = () => {
    // Mock Data
    const [users, setUsers] = useState([
        { id: 'usr_1', name: 'Rahul Sharma', email: 'rahul.s@example.com', role: 'student', joinDate: '2026-02-01', status: 'active', reports: 0 },
        { id: 'usr_2', name: 'Priya Patel', email: 'priya.p@example.com', role: 'student', joinDate: '2026-02-15', status: 'active', reports: 0 },
        { id: 'usr_3', name: 'Shree Ganesh Dining', email: 'contact@sgdining.com', role: 'owner', joinDate: '2025-11-10', status: 'active', reports: 1 },
        { id: 'usr_4', name: 'Amit Kumar', email: 'amit.k@example.com', role: 'student', joinDate: '2026-01-05', status: 'suspended', reports: 3 },
        { id: 'usr_5', name: 'Spice Route Mess', email: 'hello@spiceroute.in', role: 'owner', joinDate: '2026-02-20', status: 'pending', reports: 0 },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'suspended': return 'bg-red-100 text-red-700';
            case 'pending': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleAction = (id, actionType) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                if (actionType === 'suspend') return { ...u, status: 'suspended' };
                if (actionType === 'activate') return { ...u, status: 'active' };
            }
            return u;
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
                        <p className="text-gray-500 mt-1">Manage platform accounts, roles, and access.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Mail size={18} /> Broadcast Email
                        </Button>
                        <Button className="flex items-center gap-2">
                            + Add User Manually
                        </Button>
                    </div>
                </div>

                <Card className="shadow-sm border border-gray-200 overflow-hidden bg-white">
                    <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-white">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                            />
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                {['all', 'student', 'owner'].map(role => (
                                    <button
                                        key={role}
                                        onClick={() => setFilterRole(role)}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${filterRole === role
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        {role}s
                                    </button>
                                ))}
                            </div>
                            <Button variant="outline" className="px-3" title="Advanced Filters">
                                <Filter size={18} className="text-gray-500" />
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200">User Details</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200">Role</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200">Joined</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200">Status</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200">Flags</th>
                                    <th className="px-6 py-4 font-semibold border-b border-gray-200 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white ${user.role === 'owner' ? 'bg-orange-500' : 'bg-primary'}`}>
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{user.name}</p>
                                                        <p className="text-xs text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 font-medium ${user.role === 'owner' ? 'text-orange-700' : 'text-blue-700'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'owner' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-gray-700 font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusStyle(user.status)}`}>
                                                    {user.status === 'suspended' && <Ban size={12} className="mr-1" />}
                                                    {user.status === 'active' && <CheckCircle size={12} className="mr-1" />}
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.reports > 0 ? (
                                                    <span className="inline-flex items-center text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium text-xs">
                                                        <ShieldAlert size={14} className="mr-1" /> {user.reports} Reports
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 text-gray-400">
                                                    {user.status === 'active' ? (
                                                        <button onClick={() => handleAction(user.id, 'suspend')} className="hover:text-red-600 p-1.5 rounded hover:bg-red-50" title="Suspend User">
                                                            <Ban size={16} />
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => handleAction(user.id, 'activate')} className="hover:text-green-600 p-1.5 rounded hover:bg-green-50" title="Reactivate User">
                                                            <CheckCircle size={16} />
                                                        </button>
                                                    )}
                                                    <button className="hover:text-gray-900 p-1.5 rounded hover:bg-gray-100" title="More details">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No users found matching your search criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default UserManagement;
