// src/pages/ContactPage.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        alert('Message sent! We\'ll get back to you soon.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
                    <p className="text-xl text-gray-300">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-white">Send us a message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="Your first name"
                                            className="bg-gray-700 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Your last name"
                                            className="bg-gray-700 border-gray-600 text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-200">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className="bg-gray-700 border-gray-600 text-white"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-gray-200">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="What's this about?"
                                        className="bg-gray-700 border-gray-600 text-white"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-gray-200">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us more..."
                                        className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-600 p-3 rounded-lg">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                                        <p className="text-gray-300">contact@wogg.ro</p>
                                        <p className="text-gray-300">support@wogg.ro</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-pink-600 p-3 rounded-lg">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                                        <p className="text-gray-300">+40 236 412 789</p>
                                        <p className="text-gray-300">+40 724 856 321</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-violet-600 p-3 rounded-lg">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                                        <p className="text-gray-300">Strada Domnească 45</p>
                                        <p className="text-gray-300">Galați 800008</p>
                                        <p className="text-gray-300">Romania</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-600 p-3 rounded-lg">
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Business Hours</h3>
                                        <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-300">Sunday: Closed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* FAQ */}
                        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-white mb-2">How long does shipping take?</h4>
                                    <p className="text-gray-300 text-sm">Standard shipping takes 3-5 business days within EUROPE, 7-14 days internationally.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Do you offer bulk discounts?</h4>
                                    <p className="text-gray-300 text-sm">Yes! Contact us for pricing on orders of 50+ products.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Can I suggest a game or merchandise?</h4>
                                    <p className="text-gray-300 text-sm">Absolutely! We love community suggestions. Send us your favorite games/merchandise that you want us to import.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

