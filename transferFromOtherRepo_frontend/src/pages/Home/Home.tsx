// src/pages/Home/Home.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    Trophy,
    Star,
    Gamepad2,
    Headphones,
    Shield,
    Zap,
    ArrowRight,
    Play
} from 'lucide-react';
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    const features = [
        {
            icon: <Gamepad2 className="h-8 w-8" />,
            title: 'Latest Games',
            description: 'Discover the newest releases and upcoming titles'
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: 'Gaming Community',
            description: 'Connect with gamers worldwide and join tournaments'
        },
        {
            icon: <Headphones className="h-8 w-8" />,
            title: 'VR Experience',
            description: 'Immerse yourself in virtual reality gaming'
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: 'Secure Gaming',
            description: 'Safe and secure gaming environment for everyone'
        },
        {
            icon: <Trophy className="h-8 w-8" />,
            title: 'Tournaments',
            description: 'Compete in exciting tournaments and win prizes'
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: 'High Performance',
            description: 'Optimized gaming experience with zero lag'
        }
    ];

    const stats = [
        { label: 'Active Players', value: '2.5M+', icon: <Users className="h-6 w-6" /> },
        { label: 'Games Available', value: '10K+', icon: <Gamepad2 className="h-6 w-6" /> },
        { label: 'Tournaments', value: '500+', icon: <Trophy className="h-6 w-6" /> },
        { label: 'User Rating', value: '4.9', icon: <Star className="h-6 w-6" /> }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10" />
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center space-y-8">
                        <Badge
                            variant="outline"
                            className="bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors"
                        >
                            <Zap className="h-4 w-4 mr-2" />
                            Welcome to the Future of Gaming
                        </Badge>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                World of
              </span>
                            <br />
                            <span className="text-white">Gaming</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Experience the ultimate gaming platform where passion meets technology.
                            Join millions of gamers in epic adventures and unforgettable moments.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 group"
                            >
                                <Link to="/admin">
                                    <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                                    Start Gaming
                                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>

                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Card key={index} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors group">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-3 text-purple-400 group-hover:text-purple-300 transition-colors">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-400 text-sm">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="bg-cyan-500/10 border-cyan-500/20 text-cyan-300 mb-4"
                        >
                            Features
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">WOGG</span>?
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Discover what makes our gaming platform the ultimate destination for gamers worldwide
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="bg-slate-900/30 border-slate-700/30 backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 group hover:scale-105"
                            >
                                <CardHeader>
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-300 group-hover:text-purple-200 transition-colors">
                                            {feature.icon}
                                        </div>
                                        <CardTitle className="text-white group-hover:text-purple-200 transition-colors">
                                            {feature.title}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <Card className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-purple-500/20 backdrop-blur-sm">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Level Up?
                            </h2>
                            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                                Join our community today and experience gaming like never before.
                                Your epic adventure awaits!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25"
                                >
                                    <Link to="/admin">
                                    Join Now - Free
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                                >
                                    Learn More
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Home;

