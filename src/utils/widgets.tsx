//@ts-nocheck
import { block } from './template'
import { render } from 'preact-render-to-string'

export function widgetSchema(name: string, ...sections) {
    return {
        type: 'tab',
        label: name,
        sections
    }
}

export function schemaArray(
    name: string,
    label: string,
    entryLabel: string,
    defaultCount: number,
    ...schema: array
) {
    return {
        label,
        type: 'array',
        entryLabel,
        id: name,
        defaultCount,
        schema
    }
}

export function schemaSection(name: string, ...settings) {
    return {
        label: name,
        settings
    }
}

export function schemaBooleanSetting(
    name: string,
    label: string,
    defaultValue = true
) {
    return {
        type: 'boolean',
        label,
        id: name,
        default: defaultValue
    }
}

export function schemaTextSetting(
    name: string,
    label: string,
    defaultValue = ''
) {
    return {
        type: 'text',
        label,
        id: name,
        default: defaultValue
    }
}

export function schemaSelectSetting(
    name: string,
    label: string,
    options: Record<string, string>
) {
    return {
        type: 'select',
        label,
        id: name,
        default: options.Default,
        typeMeta: {
            selectOptions: Object.entries(options).map(([label, value]) => ({
                label,
                value
            }))
        }
    }
}

export function schemaImageSetting(name: string, label: string) {
    return {
        type: 'imageManager',
        id: name,
        label,
        default: {
            src: 'https://images.unsplash.com/photo-1667520939383-66419fc62c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=100',
            type: 'IMAGE_MANAGER'
        }
    }
}

export function templateVariants(variants: Record<string, any>) {
    return render(
        <>
            {Object.entries(variants).map(([name, component]) =>
                block('if', `variant '===' '${name}'`, () => component)
            )}
        </>
    )
}
