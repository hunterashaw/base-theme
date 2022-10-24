const context = {
    categories: true,
    category: true,
    contactForm: 'forms.contact',
    brand: true,
    brands: 'shop_by_brand',
    breadcrumbs: true,
    pages: true,
    pagination: true,
    product_results: true,
    filters: 'forms.search',
    urls: true,
    token: 'settings.storefront_api.token'
}

export default function () {
    const template = Object.entries(context)
        .map(([key, value]) => {
            if (value === true)
                return `"${key}":{{#if ${key}}} {{{json ${key}}}} {{else}} null {{/if}}`
            return `"${key}":{{#if ${value}}} {{{json ${value}}}} {{else}} null {{/if}}`
        })
        .join(',')
    return (
        <script
            id="theme-context"
            type="application/json"
            dangerouslySetInnerHTML={{
                __html: `{ ${template} }`
            }}
        />
    )
}
