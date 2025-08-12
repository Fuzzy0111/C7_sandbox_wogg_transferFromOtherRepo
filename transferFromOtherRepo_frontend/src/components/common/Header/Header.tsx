

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';



import { NAVIGATION_ITEMS, APP_CONFIG } from '@/utils/constants';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = (): void => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10",
                "bg-black/95 backdrop-blur-lg",
                isScrolled && "bg-black/98 shadow-2xl py-2",
                !isScrolled && "py-4"
            )}
        >
            <div className="container mx-auto px-4">
                <nav className="flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent transition-transform hover:scale-105"
                        onClick={closeMobileMenu}
                    >
                        {APP_CONFIG.appAbbreviation}
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-8">
                        {NAVIGATION_ITEMS.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={cn(
                                        "relative text-white font-medium transition-colors hover:text-purple-400 py-2",
                                        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-400 after:to-pink-500 after:transition-all after:duration-300",
                                        "hover:after:w-full",
                                        location.pathname === item.path && "text-purple-400 after:w-full"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA Button */}
                    <Button
                        asChild
                        className="hidden md:inline-flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                        <Link to="/admin">
                        <a href="#join">Join Now</a>
                        </Link>
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-white hover:bg-white/10"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-full bg-black/98 backdrop-blur-xl border-white/10"
                        >
                            <div className="flex flex-col items-center justify-center h-full space-y-8">
                                <nav className="flex flex-col items-center space-y-6">
                                    {NAVIGATION_ITEMS.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={cn(
                                                "text-2xl font-medium transition-all hover:text-purple-400 hover:scale-110",
                                                location.pathname === item.path ? "text-purple-400" : "text-white"
                                            )}
                                            onClick={closeMobileMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                    <a href="#join" onClick={closeMobileMenu}>Join Now</a>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </header>
    );
};

export default Header;

