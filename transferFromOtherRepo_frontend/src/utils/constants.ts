
export interface NavigationItem {
    path: string;
    label: string;
}

export interface AppConfig {
    appAbbreviation: string;
    appName: string;
    version: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
    { path: '/', label: 'Home' },
    { path: '/store', label: 'Store' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin', label: 'Log in' },
];

export const APP_CONFIG: AppConfig = {
    appAbbreviation: 'WOGG',
    appName: 'World Of Gaming [at] Galați',
    version: '1.0.0',
};

// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    PRODUCTS: '/products',
    USERS: '/users',
    RESERVATIONS: '/reservations',
    PRODUCTS_CARDS: '/products/cards',
    RENTALS_CARDS: '/rentals/cards',
} as const;

// Form Validation
export const VALIDATION_RULES = {
    EMAIL: {
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        MESSAGE: 'Please enter a valid email address',
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MESSAGE: 'Password must be at least 8 characters long',
    },
    NAME: {
        MIN_LENGTH: 2,
        MESSAGE: 'Name must be at least 2 characters long',
    },
} as const;

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    STORE: '/store',
    ABOUT: '/about',
    CONTACT: '/contact',
    ADMIN: '/admin',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_USERS: '/admin/users',
    ADMIN_REPORTS: '/admin/reports',
    ACCOUNT: '/account',
    RESERVATIONS: '/reservations',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
} as const;

// Theme Colors
export const THEME_COLORS = {
    PRIMARY: 'hsl(var(--primary))',
    SECONDARY: 'hsl(var(--secondary))',
    ACCENT: 'hsl(var(--accent))',
    MUTED: 'hsl(var(--muted))',
} as const;

