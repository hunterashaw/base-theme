//@ts-nocheck
import clsx from 'clsx'
import { block } from '../../utils/template'
import Button from '../common/button'

export default function Promo({
    title,
    titleClass,
    subtitle,
    subtitleClass,
    label,
    ssr = false,
    href,
    image,
    imageOnLeft = false,
    center = false,
    imageClass,
    ...rest
}: {
    title: string
    titleClass: string
    subtitle: string
    subtitleClass: string
    label: string
    ssr?: boolean
    href: string
    class?: string
    imageOnLeft?: boolean
    center?: boolean
    imageClass: string
}) {
    const imageElement = image && (
        <div class="grid items-center justify-center px-8">
            <img class={clsx('max-w-full', imageClass)} src={image} />
        </div>
    )

    const buttonElement = (
        <div
            class={clsx(
                'flex mx-4 my-2 justify-center',
                image
                    ? imageOnLeft
                        ? 'md:justify-start'
                        : 'md:justify-end'
                    : ''
            )}
        >
            <Button variant="solid" color="primaryDark" href={href}>
                {label}
            </Button>
        </div>
    )

    return (
        <section class={clsx('flex h-max justify-center', rest.class)}>
            <div
                class={clsx(
                    'grid items-center gap-6',
                    image && 'md:grid-cols-2'
                )}
            >
                {imageOnLeft && imageElement}
                <div class={`h-full grid items-center justify-center`}>
                    <div
                        class={clsx(
                            'grid gap-6 max-w-lg text-center',
                            image
                                ? imageOnLeft
                                    ? 'md:text-left'
                                    : 'md:text-right'
                                : ''
                        )}
                    >
                        <h1
                            class={clsx(
                                'font-display mx-2',
                                image ? 'text-4xl' : 'text-6xl',
                                titleClass
                            )}
                        >
                            {title}
                        </h1>
                        <p class={clsx('text-sm mx-4', subtitleClass)}>
                            {subtitle}
                        </p>
                        {Boolean(label) &&
                            (ssr
                                ? block(
                                      'if',
                                      `show_button '===' 'true'`,
                                      () => buttonElement
                                  )
                                : buttonElement)}
                    </div>
                </div>
                {!imageOnLeft && imageElement}
            </div>
        </section>
    )
}
