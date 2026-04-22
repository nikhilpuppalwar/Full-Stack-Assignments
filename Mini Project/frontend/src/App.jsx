import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Public Imports
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Student Imports
import StudentDashboard from './pages/student/StudentDashboard';
import ExploreMesses from './pages/student/ExploreMesses';
import MessDetail from './pages/student/MessDetail';
import CheckoutFlow from './pages/student/CheckoutFlow';
import SubscriptionManagement from './pages/student/SubscriptionManagement';
import PaymentHistory from './pages/student/PaymentHistory';
import ReviewForm from './pages/student/ReviewForm';
import ProfileSettings from './pages/student/ProfileSettings';

// Owner Imports
import OwnerDashboard from './pages/owner/OwnerDashboard';
import MenuManagement from './pages/owner/MenuManagement';
import QRScanner from './pages/owner/QRScanner';
import SubscriberManagement from './pages/owner/SubscriberManagement';
import RevenueAnalytics from './pages/owner/RevenueAnalytics';
import ReviewManagement from './pages/owner/ReviewManagement';
import OwnerProfileSettings from './pages/owner/OwnerProfileSettings';

// Admin Imports
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import VerificationHub from './pages/admin/VerificationHub';
import FinancialSettlements from './pages/admin/FinancialSettlements';
import SupportDisputes from './pages/admin/SupportDisputes';
import PlatformAnalytics from './pages/admin/PlatformAnalytics';
import SystemSettings from './pages/admin/SystemSettings';

function App() {
  return (
    <div className="min-h-screen bg-background font-inter text-text-primary">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="explore" element={<ExploreMesses />} />
                <Route path="mess/:id" element={<MessDetail />} />
                <Route path="checkout/:messId" element={<CheckoutFlow />} />
                <Route path="subscriptions" element={<SubscriptionManagement />} />
                <Route path="history" element={<PaymentHistory />} />
                <Route path="review/:messId" element={<ReviewForm />} />
                <Route path="profile" element={<ProfileSettings />} />
                {/* Add other student paths here */}
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Owner Routes */}
        <Route
          path="/owner/*"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <Routes>
                <Route path="dashboard" element={<OwnerDashboard />} />
                <Route path="menu" element={<MenuManagement />} />
                <Route path="scanner" element={<QRScanner />} />
                <Route path="subscribers" element={<SubscriberManagement />} />
                <Route path="revenue" element={<RevenueAnalytics />} />
                <Route path="reviews" element={<ReviewManagement />} />
                <Route path="profile" element={<OwnerProfileSettings />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="verifications" element={<VerificationHub />} />
                <Route path="settlements" element={<FinancialSettlements />} />
                <Route path="support" element={<SupportDisputes />} />
                <Route path="analytics" element={<PlatformAnalytics />} />
                <Route path="settings" element={<SystemSettings />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<div className="p-8">404 - Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
