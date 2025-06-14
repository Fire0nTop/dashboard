// Export route keys for validation
import {ROUTE_DEFINITIONS, ROUTES} from "@/lib/routes";

export type StaticRoutes = typeof ROUTES
export type RouteKey = keyof StaticRoutes

export type RouteParams = {
    // Static routes (no params)
    '/': never
    '/dashboard': never
    '/login': never
    '/signup': never
    '/settings': never

    // Dynamic routes with required params
    // '/profile/[id]': { id: string }
    // '/posts/[slug]': { slug: string }
    // '/categories/[category]': { category: string }
    // '/users/[userId]/settings': { userId: string }
    // '/posts/[slug]/edit': { slug: string }
    // '/users/[userId]/posts': { userId: string }
}

export type RoutePath = keyof RouteParams
export type RouteWithParams<T extends RoutePath> = RouteParams[T] extends never
    ? T
    : (params: RouteParams[T]) => string

// Auto-generated types
export type RouteDefinitionsKey = keyof typeof ROUTE_DEFINITIONS
export type RouteDefinitionsPath = typeof ROUTE_DEFINITIONS[RouteKey]['path']