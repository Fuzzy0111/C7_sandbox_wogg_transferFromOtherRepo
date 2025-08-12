
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Trash2, UserCheck, UserX } from 'lucide-react';
import { useUsers, useDeleteUser } from '@/hooks/useQueries';
import { FilterParams, UserRole } from '@/types';

const AdminUsers: React.FC = () => {
    const [filters, setFilters] = useState<FilterParams>({
        page: 1,
        limit: 10,
        search: '',
    });

  const { data: usersData } = useUsers(filters);
  const deleteUserMutation = useDeleteUser();

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            deleteUserMutation.mutate(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Users Management</h1>
                    <p className="text-gray-400">Manage platform users</p>
                </div>
            </div>

            {/* Search */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search users..."
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                            className="pl-10 bg-gray-700 border-gray-600"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-white">
                        Users ({usersData?.total || 0})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-700">
                                <TableHead className="text-gray-300">Name</TableHead>
                                <TableHead className="text-gray-300">Email</TableHead>
                                <TableHead className="text-gray-300">Role</TableHead>
                                <TableHead className="text-gray-300">Status</TableHead>
                                <TableHead className="text-gray-300">Joined</TableHead>
                                <TableHead className="text-gray-300">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {usersData?.data?.map((user) => (
                                <TableRow key={user.id} className="border-gray-700">
                                    <TableCell className="text-white">
                                        {user.firstName} {user.lastName}
                                    </TableCell>
                                    <TableCell className="text-gray-300">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === UserRole.ADMIN ? "default" : "secondary"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            {user.isActive ? (
                                                <UserCheck className="h-4 w-4 text-green-400 mr-2" />
                                            ) : (
                                                <UserX className="h-4 w-4 text-red-400 mr-2" />
                                            )}
                                            <Badge variant={user.isActive ? "default" : "secondary"}>
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-300">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-400 hover:text-red-300"
                                            disabled={user.role === UserRole.ADMIN}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {usersData && usersData.totalPages > 1 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page! - 1 }))}
                                disabled={filters.page === 1}
                            >
                                Previous
                            </Button>
                            <span className="flex items-center text-white">
                Page {filters.page} of {usersData.totalPages}
              </span>
                            <Button
                                variant="outline"
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page! + 1 }))}
                                disabled={filters.page === usersData.totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminUsers;

