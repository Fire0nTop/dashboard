"use client"
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { ROUTE_DEFINITIONS } from '@/lib/routes'

// Helper to convert route key to method name (HOME -> goHome)
type RouteMethodName<K extends keyof typeof ROUTE_DEFINITIONS> =
    `go${Capitalize<Lowercase<string & K>>}`

// Auto-generate navigation method types
type NavigationMethods = {
    [K in keyof typeof ROUTE_DEFINITIONS as RouteMethodName<K>]: () => void
}

export function useNavigation(): NavigationMethods & {
    push: (path: string) => void
    replace: (path: string) => void
    back: () => void
    forward: () => void
} {
    const router = useRouter()

    const push = useCallback((path: string) => router.push(path), [router])
    const replace = useCallback((path: string) => router.replace(path), [router])
    const back = useCallback(() => router.back(), [router])
    const forward = useCallback(() => router.forward(), [router])

    const navigationMethods = {} as Record<string, () => void>

    // Build all goX methods dynamically
    for (const key of Object.keys(ROUTE_DEFINITIONS) as Array<keyof typeof ROUTE_DEFINITIONS>) {
        const methodName = `go${key.charAt(0)}${key.slice(1).toLowerCase()}`
        const path = ROUTE_DEFINITIONS[key].path
        navigationMethods[methodName] = () => router.push(path)
    }

    // Return with proper typing
    return {
        push,
        replace,
        back,
        forward,
        ...navigationMethods,
    } as NavigationMethods & {
        push: typeof push
        replace: typeof replace
        back: typeof back
        forward: typeof forward
    }
}
