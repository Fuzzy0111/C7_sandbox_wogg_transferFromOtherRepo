
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ShoppingCart, Heart } from 'lucide-react';
import { useProductCards, 
	 // useProductTypes, useCategories, 
	 useCreateReservation } from '@/hooks/useQueries';
import { FilterParams } from '@/types';

const StorePage: React.FC = () => {

    const [filters, setFilters] = useState<FilterParams>({
        page: 1,
        limit: 12,
        search: '',
        productType: '',
        category: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    const { data: productCardsData, isLoading, error } = useProductCards(filters);
    // const { data: productTypes } = useProductTypes();
    // const { data: categories } = useCategories();
    const createReservationMutation = useCreateReservation();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters(prev => ({ ...prev, page: 1 }));
    };

    const handleFilterChange = (key: keyof FilterParams, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    };

    const handleReserve = (prodCardId: string) => {
        createReservationMutation.mutate({
            productId: prodCardId,
            quantity: 1,
            notes: ''
        });
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">Failed to load products</p>
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Our Collection
                    </h1>
                    <p className="text-xl text-gray-300">
                        <h2>Discover epic products from around the world.</h2>
                        We're building an amazing games and merch catalog featuring the latest releases,
                        indie gems, and timeless classics.
                    </p>
                </div>

                {/* Filters */}
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mb-8">
                    <CardContent className="p-6">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search products..."
                                            value={filters.search}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                            className="pl-10 bg-gray-700 border-gray-600 text-white"
                                        />
                                    </div>
                                </div>

                                {/*<Select*/}
                                {/*    value={filters.productType}*/}
                                {/*    onValueChange={(value) => handleFilterChange('productType', value)}*/}
                                {/*>*/}
                                {/*    <SelectTrigger className="w-full lg:w-48 bg-gray-700 border-gray-600 text-white">*/}
                                {/*        <SelectValue placeholder="All product types" />*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent>*/}
                                {/*        <SelectItem value="">All product types</SelectItem>*/}
                                {/*        {productTypes?.map(lang => (*/}
                                {/*            <SelectItem key={lang} value={lang}>{lang}</SelectItem>*/}
                                {/*        ))}*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}

                                {/*<Select*/}
                                {/*    value={filters.category}*/}
                                {/*    onValueChange={(value) => handleFilterChange('category', value)}*/}
                                {/*>*/}
                                {/*    <SelectTrigger className="w-full lg:w-48 bg-gray-700 border-gray-600 text-white">*/}
                                {/*        <SelectValue placeholder="All Categories" />*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent>*/}
                                {/*        <SelectItem value="">All Categories</SelectItem>*/}
                                {/*        {categories?.map(cat => (*/}
                                {/*            <SelectItem key={cat} value={cat}>{cat}</SelectItem>*/}
                                {/*        ))}*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}

                                {/*<Select*/}
                                {/*    value={`${filters.sortBy}-${filters.sortOrder}`}*/}
                                {/*    onValueChange={(value) => {*/}
                                {/*        const [sortBy, sortOrder] = value.split('-');*/}
                                {/*        setFilters(prev => ({ ...prev, sortBy, sortOrder: sortOrder as 'asc' | 'desc' }));*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <SelectTrigger className="w-full lg:w-48 bg-gray-700 border-gray-600 text-white">*/}
                                {/*        <SelectValue placeholder="Sort by" />*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent>*/}
                                {/*        <SelectItem value="createdAt-desc">Newest First</SelectItem>*/}
                                {/*        <SelectItem value="createdAt-asc">Oldest First</SelectItem>*/}
                                {/*        <SelectItem value="price-asc">Price: Low to High</SelectItem>*/}
                                {/*        <SelectItem value="price-desc">Price: High to Low</SelectItem>*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}

                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Results */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Card key={i} className="bg-gray-800/50 border-gray-700">
                                <Skeleton className="h-48 w-full rounded-t-lg" />
                                <CardContent className="p-4">
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-2/3 mb-2" />
                                    <Skeleton className="h-6 w-16" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) }

                {!isLoading && (

                    <>
                        {/* Results count */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-300">
                                {productCardsData?.total || 0} products found
                            </p>
                        </div>

                        {/* ProductCards grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {productCardsData?.data?.map((prodCard) => {
                                return (
                                    <Card key={prodCard.id}
                                          className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-700/50 transition-all group">
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            <img
                                                src={prodCard.photoUrl}
                                                alt={prodCard.prodDetail.text}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="bg-black/50 hover:bg-black/70 text-white"
                                                >
                                                    <Heart className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                            {!prodCard.isAvailable && (
                                                <div
                                                    className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                    <Badge variant="secondary">Out of Stock</Badge>
                                                </div>
                                            )}
                                        </div>

                                        <CardContent className="p-4">
                                            <div className="mb-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {prodCard.prodDetail.productType}
                                                </Badge>
                                                {prodCard.prodDetail.category && (
                                                    <Badge variant="outline" className="text-xs ml-2">
                                                        {prodCard.prodDetail.category}
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-white font-medium mb-2 line-clamp-2">
                                                {prodCard.prodDetail.text}
                                            </p>

                                            {prodCard.prodDetail.meaning && (
                                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                                    {prodCard.prodDetail.meaning}
                                                </p>
                                            )}

                                            <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-purple-400">
                        ${ prodCard.price>=0 ? (
                          prodCard.price.toFixed(2)
                       ) :
                          prodCard.price===-111 ? (
                              <span className="text-gray-400 text-sm"> WOGGers only (In-App Purchases)</span>
                          ) : prodCard.price===-222 ? (
                              <span className="text-gray-400 text-sm"> ?? unknown (ask in shop)</span>
                          ):(<></>)
                      }
                      </span>

                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-4 pt-0">
                                            <Button
                                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                                onClick={() => handleReserve(prodCard.id)}
                                                disabled={!prodCard.isAvailable || createReservationMutation.isPending}
                                            >
                                                <ShoppingCart className="h-4 w-4 mr-2"/>
                                                {prodCard.isAvailable ? 'Reserve Now' : 'Out of Stock'}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {productCardsData && productCardsData.totalPages > 1 && (
                            <div className="flex justify-center mt-8 space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page! - 1 }))}
                                    disabled={filters.page === 1}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                >
                                    Previous
                                </Button>

                                <div className="flex items-center space-x-2">
                                    {Array.from({ length: Math.min(5, productCardsData.totalPages) }, (_, i) => {
                                        const page = i + 1;
                                        return (
                                            <Button
                                                key={page}
                                                variant={filters.page === page ? "default" : "outline"}
                                                onClick={() => setFilters(prev => ({ ...prev, page }))}
                                                className="w-10 h-10"
                                            >
                                                {page}
                                            </Button>
                                        );
                                    })}
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page! + 1 }))}
                                    disabled={filters.page === productCardsData.totalPages}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}

                {/*/!* Empty state *!/*/}
                {/*{!isLoading && (!productCardsData?.data || productCardsData.data.length === 0) && (*/}
                {/*    <div className="text-center py-16">*/}
                {/*        <div className="text-gray-400 text-6xl mb-4">📮</div>*/}
                {/*        <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>*/}
                {/*        <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>*/}
                {/*        <Button*/}
                {/*            onClick={() => setFilters({*/}
                {/*                page: 1,*/}
                {/*                limit: 12,*/}
                {/*                search: '',*/}
                {/*                productType: '',*/}
                {/*                category: '',*/}
                {/*                sortBy: 'createdAt',*/}
                {/*                sortOrder: 'desc'*/}
                {/*            })}*/}
                {/*            variant="outline"*/}
                {/*        >*/}
                {/*            Clear All Filters*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default StorePage;

