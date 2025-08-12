// src/pages/ResetPasswordPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/utils/constants';

const ResetPasswordPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-white">Reset Password</CardTitle>
                        <CardDescription className="text-gray-300">Our kind concierge administrator can help with all your password issues</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-gray-400 mb-4">Please contact him at the shop, he will gladly assist by resetting your password</p>
                        <Button asChild variant="outline">
                            <Link to={ROUTES.LOGIN}>Back to Login</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

