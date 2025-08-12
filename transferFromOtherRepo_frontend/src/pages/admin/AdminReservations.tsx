
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useReservations } from '@/hooks/useQueries';
import { FilterParams, ReservationStatus } from '@/types';

const AdminReservations: React.FC = () => {
    const [filters, setFilters] = useState<FilterParams>({
        page: 1,
        limit: 10,
        search: '',
    });

  const { data: reservationsData } = useReservations(filters);

    const getStatusIcon = (status: ReservationStatus) => {
        switch (status) {
            case ReservationStatus.CONFIRMED:
                return <CheckCircle className="h-4 w-4 text-green-400" />;
            case ReservationStatus.CANCELLED:
                return <XCircle className="h-4 w-4 text-red-400" />;
            case ReservationStatus.EXPIRED:
                return <XCircle className="h-4 w-4 text-gray-400" />;
            default:
                return <Clock className="h-4 w-4 text-yellow-400" />;
        }
    };

    const getStatusVariant = (status: ReservationStatus) => {
        switch (status) {
            case ReservationStatus.CONFIRMED:
                return "default";
            case ReservationStatus.CANCELLED:
            case ReservationStatus.EXPIRED:
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Reservations Management</h1>
                    <p className="text-gray-400">Manage customer reservations</p>
                </div>
            </div>

            {/* Filters */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search reservations..."
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                                className="pl-10 bg-gray-700 border-gray-600"
                            />
                        </div>

                        <Select value={filters.status} onValueChange={(value) =>
                            setFilters(prev => ({ ...prev, status: value, page: 1 }))
                        }>
                            <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Statuses</SelectItem>
                                <SelectItem value={ReservationStatus.PENDING}>Pending</SelectItem>
                                <SelectItem value={ReservationStatus.CONFIRMED}>Confirmed</SelectItem>
                                <SelectItem value={ReservationStatus.CANCELLED}>Cancelled</SelectItem>
                                <SelectItem value={ReservationStatus.EXPIRED}>Expired</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Reservations Table */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-white">
                        Reservations ({reservationsData?.total || 0})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-700">
                                <TableHead className="text-gray-300">Customer</TableHead>
                                <TableHead className="text-gray-300">Product</TableHead>
                                <TableHead className="text-gray-300">Quantity</TableHead>
                                <TableHead className="text-gray-300">Total</TableHead>
                                <TableHead className="text-gray-300">Status</TableHead>
                                <TableHead className="text-gray-300">Date</TableHead>
                                <TableHead className="text-gray-300">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reservationsData?.data?.map((reservation) => (
                                <TableRow key={reservation.id} className="border-gray-700">
                                    <TableCell className="text-white">
                                        {reservation.user.firstName} {reservation.user.lastName}
                                        <div className="text-sm text-gray-400">{reservation.user.email}</div>
                                    </TableCell>
                                    <TableCell className="text-white">
                                        <div className="max-w-xs truncate" title={reservation.product.prodDetail.text}>
                                            {reservation.product.prodDetail.text}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {reservation.product.prodDetail.productType}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-white">{reservation.quantity}</TableCell>
                                    <TableCell className="text-white">
                                        ${reservation.totalPrice.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            {getStatusIcon(reservation.status)}
                                            <Badge variant={getStatusVariant(reservation.status)}>
                                                {reservation.status}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-300">
                                        {new Date(reservation.reservedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            {reservation.status === ReservationStatus.PENDING && (
                                                <>
                                                    <Button size="sm" variant="outline" className="text-green-400">
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-400">
                                                        <XCircle className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {reservationsData && reservationsData.totalPages > 1 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page! - 1 }))}
                                disabled={filters.page === 1}
                            >
                                Previous
                            </Button>
                            <span className="flex items-center text-white">
                Page {filters.page} of {reservationsData.totalPages}
              </span>
                            <Button
                                variant="outline"
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page! + 1 }))}
                                disabled={filters.page === reservationsData.totalPages}
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

export default AdminReservations;

