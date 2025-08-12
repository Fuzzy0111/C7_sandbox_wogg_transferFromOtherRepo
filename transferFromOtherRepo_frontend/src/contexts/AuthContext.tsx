
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '@/types';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (credentials: RegisterCredentials) => Promise<boolean>;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('refresh_token');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        try {
            setIsLoading(true);
            const response = await authService.login(credentials);
            setUser(response.user);
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('refresh_token', response.refreshToken);

            toast({
                title: "Success",
                description: "Logged in successfully!",
            });

            return true;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Login failed",
                variant: "destructive",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials): Promise<boolean> => {
        try {
            setIsLoading(true);
            const response = await authService.register(credentials);
            setUser(response.user);
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('refresh_token', response.refreshToken);

            toast({
                title: "Success",
                description: "Account created successfully!",
            });

            return true;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Registration failed",
                variant: "destructive",
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');

        toast({
            title: "Success",
            description: "Logged out successfully!",
        });
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const value: AuthContextType = {
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

