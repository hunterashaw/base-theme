// @ts-nocheck
import { useMemo } from 'preact/hooks'
import clsx from 'clsx'

const variantLookup = {
    plain: '',
    solid: '',
    outline: 'border-gray-200 bg-transparent',
    link: 'underline'
}

const colorLookup = {
    plain: {
        gray: 'hover:bg-gray-25 active:bg-gray-50',
        primary: 'hover:bg-primary-25 active:bg-primary-50',
        success: 'hover:bg-success-25 active:bg-success-50',
        error: 'hover:bg-error-25 active:bg-error-50'
    },
    solid: {
        gray: 'bg-gray-100 hover:bg-gray-150 active:bg-gray-200',
        primary: 'bg-primary-100 hover:bg-primary-150 active:bg-primary-200',
        primaryDark:
            'bg-primary-400 text-white hover:bg-primary-450 active:bg-primary-500',
        success: 'bg-success-100 hover:bg-success-150 active:bg-success-200',
        error: 'bg-error-100 hover:bg-error-150 active:bg-error-200'
    },
    outline: {
        gray: 'border-gray-300 hover:bg-gray-50 active:bg-gray-100',
        primary: 'border-primary-300 hover:bg-primary-50 active:bg-primary-100',
        success: 'border-success-300 hover:bg-success-50 active:bg-success-100',
        error: 'border-error-300 hover:bg-error-50 active:bg-error-100'
    },
    link: {
        gray: 'decoration-gray-300 hover:bg-gray-25 active:bg-gray-50',
        primary:
            'decoration-primary-300 hover:bg-primary-25 active:bg-primary-50',
        success:
            'decoration-success-300 hover:bg-success-25 active:bg-success-50',
        error: 'decoration-error-300 hover:bg-error-25 active:bg-error-50'
    }
}

export default function Button({
    children,
    variant = 'solid',
    color = 'primary',
    submit = false,
    small = false,
    href,
    isOpen,
    openClass = 'bg-primary-25',
    ...rest
}: {
    variant?: 'plain' | 'solid' | 'outline' | 'link'
    color?: 'primary' | 'primaryDark' | 'gray' | 'success' | 'error'
    small?: boolean
    submit?: boolean
    class?: string
    isOpen?: boolean
    href: string
    openClass?: string
}) {
    const classes = useMemo(() => {
        return clsx(
            variantLookup[variant],
            colorLookup[variant][color],
            isOpen && openClass,
            rest.class
        )
    }, [variant, color, rest.class, isOpen, openClass])

    const button = (
        <button
            type={submit ? 'submit' : 'button'}
            {...rest}
            onClick={e => {
                e.stopPropagation()
                if (rest.onClick) rest.onClick(e)
            }}
            class={classes}
        >
            <>{children}</>
        </button>
    )

    return href ? <a href={href}>{button}</a> : button
}
