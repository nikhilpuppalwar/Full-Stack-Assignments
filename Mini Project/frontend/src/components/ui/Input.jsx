import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    id,
    type = 'text',
    error,
    className = '',
    helperText,
    ...props
}, ref) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && (
                <label htmlFor={id} className="mb-1 text-sm font-medium text-text-primary">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                type={type}
                className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary focus:border-primary'
                    }`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {!error && helperText && <p className="mt-1 text-sm text-text-secondary">{helperText}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
