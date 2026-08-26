export const routes = {
    home: '/',
    about: '/about',
    services: '/services',
    work: '/work',
    contact: '/contact',
    dashboard: '/dashboard',
    login: '/login',
} as const;

export type AppRoutes = typeof routes;
export type AppRouteKey = keyof AppRoutes;
