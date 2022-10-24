//@ts-nocheck
import { block } from './template'
import { render } from 'preact-render-to-string'

export function widgetSchema(name: string, ...sections) {
    return [
        {
            type: 'tab',
            label: name,
            sections
        }
    ]
}

export function schemaSection(name: string, ...settings) {
    return {
        label: name,
        settings
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
    options: Record<string, string>,
    defaultValue: string
) {
    return {
        type: 'select',
        label,
        id: name,
        default: defaultValue,
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
            src: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=100',
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
