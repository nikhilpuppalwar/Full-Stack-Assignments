import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Logged in but wrong role
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'owner') return <Navigate to="/owner" replace />;
        return <Navigate to="/student/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
