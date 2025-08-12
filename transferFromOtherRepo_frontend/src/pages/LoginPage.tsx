// src/pages/LoginPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials } from '@/types';
import { ROUTES, VALIDATION_RULES } from '@/utils/constants';

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .matches(VALIDATION_RULES.EMAIL.PATTERN, VALIDATION_RULES.EMAIL.MESSAGE),
    password: yup
        .string()
        .required('Password is required')
        .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH, VALIDATION_RULES.PASSWORD.MESSAGE),
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginError, setLoginError] = React.useState<string>('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginCredentials>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginCredentials) => {
        try {
            setLoginError('');
            const success = await login(data);
            if (success) {
                navigate(ROUTES.HOME);
            }
        } catch (error: any) {
            setLoginError(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to home */}
                <div className="mb-6">
                    <Link
                        to={ROUTES.HOME}
                        className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold text-white">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                            Sign in to your account to continue
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            {loginError && (
                                <Alert variant="destructive">
                                    <AlertDescription>{loginError}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-200">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        {...register('email')}
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-400">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-200">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        {...register('password')}
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-400">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="rounded border-gray-600 bg-gray-700"
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-300">
                                        Remember me
                                    </Label>
                                </div>
                                <Link
                                    to={ROUTES.FORGOT_PASSWORD}
                                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>

                            <div className="text-center text-sm text-gray-300">
                                Don't have an account?{' '}
                                <Link
                                    to={ROUTES.REGISTER}
                                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                {/* Demo credentials */}
                <Card className="mt-4 bg-gray-800/30 border-gray-700/50">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-400 mb-2">Demo Credentials:</p>
                        <div className="text-xs space-y-1">
                            <p className="text-gray-300">
                                <strong>User:</strong> user@demo.com / password123
                            </p>
                            <p className="text-gray-300">
                                <strong>Admin:</strong> admin@wogg.ro / password1234
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;

