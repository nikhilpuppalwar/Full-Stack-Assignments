import React from 'react';

const Card = ({ children, className = '', hoverable = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`bg-surface rounded-xl border border-gray-100 shadow-sm overflow-hidden ${hoverable ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
        {children}
    </div>
);

export const CardBody = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const CardFooter = ({ children, className = '' }) => (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${className}`}>
        {children}
    </div>
);

export default Card;
