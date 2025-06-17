import Link from 'next/link'
import { ReactNode } from 'react'
import { RouteDefinitionsPath } from '@/types/routes'

interface SafeLinkProps {
    href: RouteDefinitionsPath
    children: ReactNode
    className?: string
    replace?: boolean
    scroll?: boolean
    prefetch?: boolean
}

export function SafeLink({ href, children, ...props }: SafeLinkProps) {
    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    )
}