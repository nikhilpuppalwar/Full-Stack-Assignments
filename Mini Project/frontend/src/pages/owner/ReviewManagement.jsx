import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Star, MessageSquare, Filter, ThumbsUp, ChevronDown } from 'lucide-react';

const ReviewManagement = () => {
    // Mock Data
    const [reviews, setReviews] = useState([
        { id: '1', author: 'Rahul Sharma', rating: 5, date: '2 days ago', text: 'Excellent food quality and very hygienic environment. The paneer dish on Wednesday was amazing!', status: 'replied', reply: 'Thank you for the kind words Rahul! We strive to maintain top hygiene standards.' },
        { id: '2', author: 'Priya Patel', rating: 4, date: '4 days ago', text: 'Good variety in the menu but sometimes the lunch gets a bit delayed.', status: 'pending', reply: '' },
        { id: '3', author: 'Amit Kumar', rating: 3, date: '1 week ago', text: 'Average food. Not bad for the price, but could use more spice.', status: 'pending', reply: '' },
        { id: '4', author: 'Neha Gupta', rating: 5, date: '2 weeks ago', text: 'Best veg mess in the area. Highly recommend their unlimited thali!', status: 'replied', reply: 'Thanks Neha! Glad you enjoy our unlimited thali.' },
    ]);

    const [filter, setFilter] = useState('all'); // all, pending, replied
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    const filteredReviews = reviews.filter(r => filter === 'all' || r.status === filter);

    const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

    const handleReplySubmit = (id) => {
        if (!replyText.trim()) return;

        setReviews(reviews.map(r =>
            r.id === id ? { ...r, status: 'replied', reply: replyText } : r
        ));
        setReplyingTo(null);
        setReplyText('');
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
        ));
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Reviews & Feedback</h1>
                        <p className="text-text-secondary mt-1">Manage student feedback and build your reputation.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Summary Card */}
                    <Card className="col-span-1 shadow-sm border border-gray-100 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-white to-gray-50 text-center">
                        <h3 className="text-5xl font-extrabold text-text-primary mb-2 flex items-center justify-center gap-2">
                            {averageRating} <Star size={36} className="text-yellow-400 fill-current" />
                        </h3>
                        <p className="text-text-secondary font-medium">Average Rating</p>
                        <p className="text-xs text-gray-400 mt-1">Based on {reviews.length} reviews</p>
                    </Card>

                    {/* Quick Stats */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                        <Card className="shadow-sm border border-gray-100 flex flex-col justify-center p-6 bg-green-50/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><ThumbsUp size={20} /></div>
                                <h4 className="font-bold text-text-primary text-xl">{reviews.filter(r => r.rating >= 4).length}</h4>
                            </div>
                            <p className="text-sm font-medium text-text-secondary">Positive Reviews</p>
                        </Card>
                        <Card className="shadow-sm border border-gray-100 flex flex-col justify-center p-6 bg-orange-50/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><MessageSquare size={20} /></div>
                                <h4 className="font-bold text-text-primary text-xl">{reviews.filter(r => r.status === 'pending').length}</h4>
                            </div>
                            <p className="text-sm font-medium text-text-secondary">Needs Reply</p>
                        </Card>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6 max-w-sm">
                    {['all', 'pending', 'replied'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${filter === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {filteredReviews.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-text-secondary shadow-sm">
                            <MessageSquare className="mx-auto text-gray-300 mb-2" size={48} />
                            <p>No reviews found matching this filter.</p>
                        </div>
                    ) : (
                        filteredReviews.map(review => (
                            <Card key={review.id} className="shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                                <CardBody className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {review.author.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-text-primary">{review.author}</h4>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex">{renderStars(review.rating)}</div>
                                                    <span className="text-xs text-gray-400">• {review.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${review.status === 'replied' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {review.status}
                                        </span>
                                    </div>

                                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{review.text}</p>

                                    {/* Action Area */}
                                    <div className="border-t border-gray-100 pt-4 mt-4 bg-gray-50/50 -mx-6 -mb-6 px-6 pb-6 rounded-b-xl">
                                        {review.status === 'replied' ? (
                                            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm relative">
                                                <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-b border-gray-100 transform rotate-45"></div>
                                                <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Your Reply</p>
                                                <p className="text-sm text-text-secondary">{review.reply}</p>
                                            </div>
                                        ) : replyingTo === review.id ? (
                                            <div className="flex flex-col gap-2">
                                                <textarea
                                                    autoFocus
                                                    className="w-full text-sm rounded-lg border border-gray-300 p-3 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none min-h-[80px]"
                                                    placeholder="Write your public reply here..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                />
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => { setReplyingTo(null); setReplyText(''); }}>Cancel</Button>
                                                    <Button size="sm" onClick={() => handleReplySubmit(review.id)}>Post Reply</Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button variant="outline" size="sm" className="w-full justify-center" onClick={() => setReplyingTo(review.id)}>
                                                <MessageSquare size={14} className="mr-2" /> Write a Reply
                                            </Button>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default ReviewManagement;
