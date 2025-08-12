
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; */

import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import Home from '@/pages/Home/Home';
import StorePage from '@/pages/StorePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AccountPage from '@/pages/AccountPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import { ROUTES } from '@/utils/constants';
import { UserRole } from '@/types';
import './App.css';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
});

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           children,
                                                           requiredRole
                                                       }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (user) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <>{children}</>;
};

const AppContent: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
                <Routes>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.STORE} element={<StorePage />} />
                    <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                    <Route path={ROUTES.CONTACT} element={<ContactPage />} />

                    {/* Public Routes */}
                    <Route
                        path={ROUTES.LOGIN}
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path={ROUTES.REGISTER}
                        element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path={ROUTES.FORGOT_PASSWORD}
                        element={
                            <PublicRoute>
                                <ForgotPasswordPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path={ROUTES.RESET_PASSWORD}
                        element={
                            <PublicRoute>
                                <ResetPasswordPage />
                            </PublicRoute>
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path={ROUTES.ACCOUNT}
                        element={
                            <ProtectedRoute>
                                <AccountPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={`${ROUTES.ADMIN}/*`}
                        element={
                            <ProtectedRoute requiredRole={UserRole.ADMIN}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                </Routes>
            </main>
            <Footer />
            <Toaster />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </Router>
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    );
};

export default App;

