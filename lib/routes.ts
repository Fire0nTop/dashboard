export const ROUTE_DEFINITIONS = {
    HOMEPAGE: { path: '/', params: null },
    PROFILE: { path: '/profile', params: null },
    HOME: { path: '/home', params: null },
    DASHBOARD: { path: '/dashboard', params: null },
    LOGIN: { path: '/login', params: null },
    SIGNUP: { path: '/signup', params: null },
    SETTINGS: { path: '/settings', params: null },
    TEAMS: { path: '/teams', params: null },
    TASKS: { path: '/tasks', params: null },
    DEV: { path: '/dev', params: null },

    // Dynamic routes (uncomment and modify as needed)
    // PROFILE: { path: '/profile/[id]', params: { id: 'string' } },
    // POST: { path: '/posts/[slug]', params: { slug: 'string' } },
} as const

// Auto-generated ROUTES from ROUTE_DEFINITIONS
export const ROUTES = Object.fromEntries(
    Object.entries(ROUTE_DEFINITIONS).map(([key, { path }]) => [key, path])
) as { [K in keyof typeof ROUTE_DEFINITIONS]: typeof ROUTE_DEFINITIONS[K]['path'] }