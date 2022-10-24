//@ts-nocheck

import clsx from 'clsx'

export default function Features({
    title,
    titleClass,
    titleOnRight = false,
    features,
    ...rest
}: {
    title?: string
    titleClass: string
    titleOnRight?: boolean
    class: string
    features: { title: string; description: string }[]
}) {
    return (
        <section
            class={clsx('px-4 md:px-[10%] lg:px-[20%] grid gap-12', rest.class)}
        >
            {title && (
                <div
                    class={clsx('grid', titleOnRight && 'justify-end pr-[10%]')}
                >
                    <h1
                        class={clsx(
                            'max-w-lg font-display text-4xl underline decoration-primary-300',
                            titleClass
                        )}
                    >
                        {title}
                    </h1>
                </div>
            )}

            <div class="grid gap-8 md:grid-cols-3">
                {features.map(feature => (
                    <div class="grid gap-2 grid-rows-[max-content,auto]">
                        <h2 class="font-medium text-xl underline decoration-gray-200">
                            {feature.title}
                        </h2>
                        <p class="text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
