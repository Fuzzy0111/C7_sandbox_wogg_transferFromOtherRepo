
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import {
    useProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
    useProductTypes,
    useCategories,
} from '@/hooks/useQueries';
import { CreateProductData, UpdateProductData, FilterParams } from '@/types';

const productSchema = yup.object().shape({
    text: yup.string().required('Product text is required'),
    productType: yup.string().required('Product type is required'),
    meaning: yup.string(),
    origin: yup.string(),
    category: yup.string(),
});

const AdminProducts: React.FC = () => {
    const [filters, setFilters] = useState<FilterParams>({
        page: 1,
        limit: 10,
        search: '',
        productType: '',
        category: '',
    });
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data: productsData } = useProducts(filters);
  const { data: productTypes } = useProductTypes();
  const { data: categories } = useCategories();
  
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CreateProductData>({
        resolver: yupResolver(productSchema),
    });

    const handleCreate = (data: CreateProductData) => {
        createProductMutation.mutate(data, {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
                reset();
            },
        });
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setValue('text', product.text);
        setValue('productType', product.productType);
        setValue('meaning', product.meaning || '');
        setValue('origin', product.origin || '');
        setValue('category', product.category || '');
    };

    const handleUpdate = (data: CreateProductData) => {
        if (!editingProduct) return;

        updateProductMutation.mutate({
            id: editingProduct.id,
            data: data as UpdateProductData,
        }, {
            onSuccess: () => {
                setEditingProduct(null);
                reset();
            },
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this Product?')) {
            deleteProductMutation.mutate(id);
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        setIsCreateDialogOpen(false);
        reset();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Products Management</h1>
                    <p className="text-gray-400">Manage your collection of Products</p>
                </div>

                <Dialog open={isCreateDialogOpen || !!editingProduct} onOpenChange={(open) => {
                    if (!open) resetForm();
                    else if (!editingProduct) setIsCreateDialogOpen(true);
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingProduct ? 'Edit Product' : 'Create New Product'}
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(editingProduct ? handleUpdate : handleCreate)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Product type</Label>
                                    <Select onValueChange={(value) => setValue('productType', value)}>
                                        <SelectTrigger className="bg-gray-700 border-gray-600">
                                            <SelectValue placeholder="Select product type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productTypes?.map(lang => (
                                                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.productType && <p className="text-red-400 text-sm">{errors.productType.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select onValueChange={(value) => setValue('category', value)}>
                                        <SelectTrigger className="bg-gray-700 border-gray-600">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Product Text</Label>
                                <Textarea
                                    {...register('text')}
                                    placeholder="Enter the product text"
                                    className="bg-gray-700 border-gray-600"
                                    rows={3}
                                />
                                {errors.text && <p className="text-red-400 text-sm">{errors.text.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Meaning</Label>
                                <Textarea
                                    {...register('meaning')}
                                    placeholder="Enter the meaning or interpretation"
                                    className="bg-gray-700 border-gray-600"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Origin</Label>
                                <Input
                                    {...register('origin')}
                                    placeholder="Enter the origin or source"
                                    className="bg-gray-700 border-gray-600"
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600">
                                    {editingProduct ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search Products..."
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                                className="pl-10 bg-gray-700 border-gray-600"
                            />
                        </div>

                        <Select value={filters.productType} onValueChange={(value) =>
                            setFilters(prev => ({ ...prev, productType: value, page: 1 }))
                        }>
                            <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                                <SelectValue placeholder="All product types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All product types</SelectItem>
                                {productTypes?.map(lang => (
                                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filters.category} onValueChange={(value) =>
                            setFilters(prev => ({ ...prev, category: value, page: 1 }))
                        }>
                            <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Categories</SelectItem>
                                {categories?.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                    <CardTitle className="text-white">
                        Products ({productsData?.total || 0})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-700">
                                <TableHead className="text-gray-300">Text</TableHead>
                                <TableHead className="text-gray-300">Product Type</TableHead>
                                <TableHead className="text-gray-300">Category</TableHead>
                                <TableHead className="text-gray-300">Status</TableHead>
                                <TableHead className="text-gray-300">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productsData?.data?.map((product) => (
                                <TableRow key={product.id} className="border-gray-700">
                                    <TableCell className="text-white max-w-xs">
                                        <div className="truncate" title={product.text}>
                                            {product.text}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{product.productType}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {product.category && (
                                            <Badge variant="outline">{product.category}</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={product.isActive ? "default" : "secondary"}>
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {productsData && productsData.totalPages > 1 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page! - 1 }))}
                                disabled={filters.page === 1}
                            >
                                Previous
                            </Button>
                            <span className="flex items-center text-white">
                Page {filters.page} of {productsData.totalPages}
              </span>
                            <Button
                                variant="outline"
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page! + 1 }))}
                                disabled={filters.page === productsData.totalPages}
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

export default AdminProducts;

