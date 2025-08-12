// src/pages/AccountPage.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AccountPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-8">My Account</h1>

                <div className="grid gap-6">
                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Profile Settings</CardTitle>
                            <CardDescription className="text-gray-300">Account page implementation needed</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-400">Account management features coming soon...</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">My Reservations</CardTitle>
                            <CardDescription className="text-gray-300">View your product reservations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-400">Reservations list coming soon...</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;

