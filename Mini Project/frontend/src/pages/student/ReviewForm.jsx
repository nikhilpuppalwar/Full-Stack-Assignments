import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Star, MessageSquare } from 'lucide-react';

const ReviewForm = () => {
    const { messId } = useParams();
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Mock Mess Data based on ID
    const messName = id => id === '1' ? 'Annapurna Veg Mess' : 'Spice Route Non-Veg';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1200);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4">
                    <Card className="max-w-md w-full text-center py-10 shadow-lg">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <Star size={32} fill="currentColor" />
                        </div>
                        <h2 className="text-2xl font-bold text-text-primary mb-2">Review Submitted!</h2>
                        <p className="text-text-secondary mb-8 px-4">Thank you for sharing your experience. Your feedback helps other students find the perfect mess.</p>
                        <Button onClick={() => navigate('/student/dashboard')}>Return to Dashboard</Button>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 max-w-2xl mx-auto w-full p-4 py-8">

                <div className="mb-6">
                    <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors mb-4 inline-block">
                        &larr; Back
                    </button>
                    <h1 className="text-3xl font-bold text-text-primary">Rate your Experience</h1>
                    <p className="text-text-secondary mt-1">Reviewing <strong>{messName(messId)}</strong></p>
                </div>

                <Card className="shadow-sm">
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center justify-center py-8 border-b border-gray-100 mb-6">
                                <p className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">Overall Rating</p>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                        >
                                            <Star
                                                size={48}
                                                className={`transition-colors duration-200 ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-4 h-4">
                                    {rating === 1 && 'Terrible'}
                                    {rating === 2 && 'Poor'}
                                    {rating === 3 && 'Average'}
                                    {rating === 4 && 'Very Good'}
                                    {rating === 5 && 'Excellent'}
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="flex gap-2 items-center text-sm font-bold text-text-primary mb-3">
                                    <MessageSquare size={16} className="text-primary" /> Additional Feedback (Optional)
                                </label>
                                <textarea
                                    className="w-full border-2 border-gray-100 rounded-xl p-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none bg-gray-50"
                                    rows="5"
                                    placeholder="What did you like or dislike about the food, hygiene, or service?"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={rating === 0}
                                isLoading={isSubmitting}
                            >
                                Submit Review
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ReviewForm;
