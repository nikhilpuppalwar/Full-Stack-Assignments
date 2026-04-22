import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar as CalendarIcon, Save, Plus, Trash2, Edit2 } from 'lucide-react';

const MenuManagement = () => {
    // Determine today's date in YYYY-MM-DD format for default state
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);

    // Mock Menu State
    const [menu, setMenu] = useState({
        breakfast: ['Poha', 'Upma', 'Tea', 'Coffee'],
        lunch: ['3 Chapati', 'Paneer Butter Masala', 'Dal Tadka', 'Jeera Rice', 'Salad', 'Papad'],
        dinner: ['2 Dal Baati', 'Gatte Ki Sabzi', 'Gulab Jamun', 'Salad']
    });

    const [newItem, setNewItem] = useState({ meal: 'breakfast', text: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!newItem.text.trim()) return;

        setMenu(prev => ({
            ...prev,
            [newItem.meal]: [...prev[newItem.meal], newItem.text.trim()]
        }));
        setNewItem(prev => ({ ...prev, text: '' }));
    };

    const handleRemoveItem = (meal, index) => {
        setMenu(prev => ({
            ...prev,
            [meal]: prev[meal].filter((_, i) => i !== index)
        }));
    };

    const handleSaveMenu = () => {
        setIsSaving(true);
        setSaveMessage('');

        // Mock API call
        setTimeout(() => {
            setIsSaving(false);
            setSaveMessage(`Menu for ${selectedDate} saved successfully!`);
            setTimeout(() => setSaveMessage(''), 3000);
        }, 1000);
    };

    const MealSection = ({ title, mealType, items }) => (
        <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-text-primary capitalize">{title}</h3>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded">
                        {items.length} items
                    </span>
                </div>

                <ul className="space-y-2 mb-4 min-h-[100px]">
                    {items.length === 0 ? (
                        <li className="text-text-secondary text-sm italic text-center py-4">No items added yet.</li>
                    ) : (
                        items.map((item, index) => (
                            <li key={index} className="flex justify-between items-center group p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                                    <span className="text-sm font-medium text-text-primary">{item}</span>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(mealType, index)}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </li>
                        ))
                    )}
                </ul>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (newItem.meal === mealType && newItem.text) handleAddItem(e);
                }} className="flex gap-2">
                    <input
                        type="text"
                        placeholder={`Add item to ${title}...`}
                        className="flex-1 text-sm rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        value={newItem.meal === mealType ? newItem.text : ''}
                        onChange={(e) => setNewItem({ meal: mealType, text: e.target.value })}
                        onFocus={() => setNewItem({ meal: mealType, text: '' })}
                    />
                    <Button type="submit" variant="outline" size="sm" className="px-3" disabled={newItem.meal !== mealType || !newItem.text.trim()}>
                        <Plus size={16} />
                    </Button>
                </form>
            </CardBody>
        </Card>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Menu Manager</h1>
                        <p className="text-text-secondary mt-1">Plan and update your daily meals.</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <CalendarIcon size={24} />
                        </div>
                        <div>
                            <p className="font-semibold text-text-primary text-sm">Select Date</p>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="text-lg font-bold text-text-primary border-none outline-none bg-transparent cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        {saveMessage && (
                            <span className="text-sm text-green-600 font-medium animate-fade-in text-right">
                                {saveMessage}
                            </span>
                        )}
                        <Button
                            onClick={handleSaveMenu}
                            disabled={isSaving}
                            className="flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <Save size={18} />
                            {isSaving ? 'Saving...' : 'Save Menu'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MealSection title="Breakfast" mealType="breakfast" items={menu.breakfast} />
                    <MealSection title="Lunch" mealType="lunch" items={menu.lunch} />
                    <MealSection title="Dinner" mealType="dinner" items={menu.dinner} />
                </div>
            </main>
        </div>
    );
};

export default MenuManagement;
