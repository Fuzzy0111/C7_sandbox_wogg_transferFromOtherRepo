
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { APP_CONFIG, ROUTES } from '@/utils/constants';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                            {APP_CONFIG.appAbbreviation}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Discover the thrill through epic, collectible games featuring timeless releases.
                        </p>
                        <div className="flex items-center text-sm text-gray-400">
                            <Heart className="h-4 w-4 mr-2 text-red-400" />
                            Made with love for bold adventurers
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Quick Links</h3>
                        <nav className="space-y-2">
                            <Link
                                to={ROUTES.HOME}
                                className="block text-sm text-gray-300 hover:text-purple-400 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                to={ROUTES.STORE}
                                className="block text-sm text-gray-300 hover:text-purple-400 transition-colors"
                            >
                                Store
                            </Link>
                            <Link
                                to={ROUTES.ABOUT}
                                className="block text-sm text-gray-300 hover:text-purple-400 transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                to={ROUTES.CONTACT}
                                className="block text-sm text-gray-300 hover:text-purple-400 transition-colors"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Support</h3>
                        <nav className="space-y-2">
                            <a
                                href="#"
                                className="block text-sm text-gray-300 hover:text-purple-400 transition-colors"
                            >
                                Help Center
                            </a>
                            <a
                                href="#"
                                className="block text-sm text-gray-300 hover:text-purple-400 transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="block text-sm text-gray-300 hover:text-purple-400 transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="block text-sm text-gray-300 hover:text-purple-400 transition-colors"
                            >
                                Shipping Info
                            </a>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Get in Touch</h3>
                        <div className="space-y-3">
                            <div className="flex items-center text-sm text-gray-300">
                                <Mail className="h-4 w-4 mr-3 text-purple-400" />
                                contact@wogg.ro
                            </div>
                            <div className="flex items-center text-sm text-gray-300">
                                <Phone className="h-4 w-4 mr-3 text-purple-400" />
                                +40 236 412 789, +40 724 856 321
                            </div>
                            <div className="flex items-center text-sm text-gray-300">
                                <MapPin className="h-4 w-4 mr-3 text-purple-400" />
                                Galați 800008, Romania
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white"
                            >
                                Subscribe to Newsletter
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-gray-800" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="text-sm text-gray-400">
                        © {currentYear} {APP_CONFIG.appName}. All rights reserved.
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition-colors"
                            aria-label="Facebook"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition-colors"
                            aria-label="Twitter"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-400 transition-colors"
                            aria-label="Instagram"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

