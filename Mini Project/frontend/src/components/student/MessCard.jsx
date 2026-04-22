import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardBody } from '../ui/Card';
import { MapPin, Star, Utensils } from 'lucide-react';

const MessCard = ({ mess }) => {
    const navigate = useNavigate();

    return (
        <Card hoverable className="h-full flex flex-col cursor-pointer" onClick={() => navigate(`/student/mess/${mess._id}`)}>
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <img
                    src={mess.photos?.[0] || 'https://images.unsplash.com/photo-1543353071-087092ec393a?q=80&w=1000&auto=format&fit=crop'}
                    alt={mess.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow-sm text-sm">
                    <Star size={14} className="text-primary fill-primary" />
                    <span className="font-semibold text-text-primary">{mess.rating?.average || 'New'}</span>
                </div>
                <div className="absolute bottom-2 left-2 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium rounded-md text-text-primary">
                        {mess.type || 'Veg'}
                    </span>
                </div>
            </div>

            <CardBody className="flex flex-col flex-grow p-4">
                <h3 className="text-xl font-bold text-text-primary mb-1 line-clamp-1">{mess.name}</h3>

                <div className="flex items-center text-text-secondary text-sm mb-3">
                    <MapPin size={16} className="mr-1 shrink-0" />
                    <span className="line-clamp-1">{mess.location?.city || mess.location?.address || 'Location missing'}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center text-text-secondary text-sm">
                        <Utensils size={16} className="mr-1" />
                        <span>{mess.subscriptionPlans?.length || 0} Plans available</span>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-text-secondary">Starts from</p>
                        <p className="font-bold text-primary">
                            ₹{mess.subscriptionPlans?.length > 0 ? Math.min(...mess.subscriptionPlans.map(p => p.price)) : '---'}
                            <span className="text-xs text-text-secondary font-normal">/mo</span>
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default MessCard;
