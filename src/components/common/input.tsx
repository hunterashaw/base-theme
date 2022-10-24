// @ts-nocheck
import clsx from 'clsx'
import {
    useEffect,
    useErrorBoundary,
    useMemo,
    useRef,
    useState
} from 'preact/hooks'
import { Search } from '../../icons'

export default function Input({
    id,
    type = 'text',
    label = '',
    options = [],
    limitWidth = true,
    ...rest
}: {
    id?: string
    type?:
        | 'text'
        | 'number'
        | 'search'
        | 'select'
        | 'radio'
        | 'email'
        | 'text-area'
    label?: string
    options: string[] | { name: string; value: string }[]
    class?: string
}) {
    const classes = useMemo(
        () =>
            clsx(
                type === 'search' && 'pl-11',
                !limitWidth && '!max-w-full',
                rest.class
            ),
        [type, rest.class]
    )

    const input = useMemo(() => {
        if (type === 'select')
            return (
                <select id={id} name={id} type={type} class={classes} {...rest}>
                    {options.map(option => {
                        if (typeof option === 'string')
                            return <option>{option}</option>
                        const { name, value } = option
                        return <option value={value}>{name}</option>
                    })}
                </select>
            )
        if (type === 'radio') {
            return (
                <fieldset class="bg-gray-50 rounded-lg p-2 gap-2 flex max-w-max flex-wrap">
                    {options.map((option, i) => {
                        if (typeof option === 'string')
                            return (
                                <div class="grid" key={option}>
                                    <input
                                        type="radio"
                                        id={`${id}-${i}`}
                                        name={`${id}`}
                                        class="hidden"
                                        checked={i === 0}
                                        value={option}
                                    />
                                    <label for={`${id}-${i}`}>{option}</label>
                                </div>
                            )
                    })}
                </fieldset>
            )
        }

        if (type === 'text-area')
            return (
                <textarea
                    id={id}
                    name={id}
                    type={type}
                    class={classes}
                    rows="4"
                    {...rest}
                />
            )

        return <input id={id} name={id} type={type} class={classes} {...rest} />
    }, [type])

    return (
        <div class={clsx('w-full grid gap-2', limitWidth && 'max-w-sm')}>
            {type === 'search' ? (
                <label
                    for={id}
                    class="absolute py-[0.625rem] px-3 cursor-pointer text-gray-500"
                    onclick="if (this.control.value) this.form.submit()"
                    aria-label="Search"
                >
                    <Search />
                </label>
            ) : (
                <label for={id}>{label}</label>
            )}

            {input}
        </div>
    )
}
