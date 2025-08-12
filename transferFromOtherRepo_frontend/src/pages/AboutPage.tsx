
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Heart, Star, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-6">About Us</h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        Discover epic games from around the world through our carefully curated collection based in Galați, Romania.
                    </p>
                </div>

                <div className="grid gap-8 mb-12">
                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-600 p-3 rounded-lg">
                                    <Globe className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                                    <p className="text-gray-300 leading-relaxed">
                                        From our headquarters in Galați, Romania, we bridge cultures by games from every corner
                                        of the world. Our location at the crossroads of Eastern Europe gives us unique insights into diverse traditions.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-pink-600 p-3 rounded-lg">
                                    <Heart className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
                                    <p className="text-gray-300 leading-relaxed">
                                        We carefully research, curate, and showcase greatest hits. Our team in Galați works with
                                        experts worldwide to ensure authenticity and accuracy in every piece.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-violet-600 p-3 rounded-lg">
                                    <Star className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Why Choose Us</h2>
                                    <p className="text-gray-300 leading-relaxed">
                                        Every product is imported for authenticity.
                                        We're not just selling games –
                                        we're sharing stories, passion, fun, and connections across the community from our home in Galați.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-pink-400 mb-2">500+</div>
                        <div className="text-gray-300">Games</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-violet-400 mb-2">1000+</div>
                        <div className="text-gray-300">Happy Customers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">25+</div>
                        <div className="text-gray-300">Countries Served</div>
                    </div>
                </div>

                {/* Team */}
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                        <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Based in beautiful Galați, Romania, our diverse team includes artists, collectioners,
                            Twitch celebrities and technology enthusiasts. Our strategic location in Eastern Europe provides
                            unique access to both Western and Eastern cultural traditions. Each of our team members brings
                            cultural perspective and expertise to ensure our collection is authentic, varied, and
                            well acclaimed.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AboutPage;

