
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Mail, 
  ShoppingCart, 
  TrendingUp, 
  Activity,
  Settings,
  BarChart3
} from 'lucide-react';
import {useAdminStats, useProduct} from '@/hooks/useQueries';
import { cn } from '@/lib/utils';
import AdminProducts from './AdminProducts.tsx';
import AdminUsers from './AdminUsers';
import AdminReservations from './AdminReservations';

const AdminDashboard: React.FC = () => {
    const location = useLocation();
    const { data: stats, isLoading } = useAdminStats();

    const sidebarItems = [
        { path: '/admin', label: 'Overview', icon: BarChart3 },
        { path: '/admin/products', label: 'Products', icon: BookOpen },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/reservations', label: 'Reservations', icon: ShoppingCart },
        { path: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    const DashboardOverview = () => (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-gray-400">Manage your platform</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {isLoading ? '...' : stats?.totalUsers || 0}
                        </div>
                        <p className="text-xs text-gray-400">+10.1% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Total Products</CardTitle>
                        <Mail className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {isLoading ? '...' : stats?.totalProductCards || 0}
                        </div>
                        <p className="text-xs text-gray-400">+12.5% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">Active Reservations</CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {isLoading ? '...' : stats?.activeReservations || 0}
                        </div>
                        <p className="text-xs text-gray-400">+8.3% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <Activity className="h-5 w-5 mr-2" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stats?.recentActivity?.map((activity, index) => (
                            <div key={activity.id || index} className="flex items-center space-x-4">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-white">{activity.message}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(activity.timestamp).toLocaleString()}
                                    </p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    {activity.type.replace('_', ' ')}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 min-h-screen">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
                        <nav className="space-y-2">
                            {sidebarItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all",
                                            isActive
                                                ? "bg-purple-600 text-white"
                                                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<DashboardOverview />} />
                        <Route path="/products" element={<AdminProducts />} />
                        <Route path="/users" element={<AdminUsers />} />
                        <Route path="/reservations" element={<AdminReservations />} />
                        <Route path="/settings" element={
                            <div className="text-center py-16">
                                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
                                <p className="text-gray-400">Settings panel coming soon...</p>
                            </div>
                        } />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

