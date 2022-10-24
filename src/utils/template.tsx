// @ts-nocheck

const hb = (value: string, raw?: boolean) =>
    raw ? `{{{${value}}}}` : `{{${value}}}`
const iF = (value: string, check?: string) =>
    `{{#if ${check ?? value}}}{{${value}}}{{/if}}`
const unless = (value: string, check?: string) =>
    `{{#unless ${check ?? value}}}{{${value}}}{{/unless}}`
const ea = (array: string, Component, data: any) => (
    <>
        {hb(`#each ${array}`)}
        <Component {...data} />
        {hb('/each')}
    </>
)

// const staticImage = (path: string, size: string) =>
//     `{{getImage ${path} ${size}}}`

const staticImage = (path: string, size: string) =>
    `{{{join (split ${path} '{:size}') '${size}' }}}`

const ifLast = Component => (
    <>
        {hb('#if @last')}
        <Component />
        {hb('/if')}
    </>
)
const unlessLast = Component => (
    <>
        {hb('#unless @last')}
        <Component />
        {hb('/unless')}
    </>
)

const block = (
    type: 'each' | 'if' | 'unless' | 'page',
    check: string,
    Component
) => (
    <>
        {hb(`#${type} ${check}`)}
        <Component />
        {hb(`/${type}`)}
    </>
)

const imageURL = (url: string, width: number) =>
    url.split('{:size}').join(`${width}x${width}`)

type CategoryT = {
    count: number
    id: number
    image: {
        alt: string
        data: string
    }
    name: string
    description?: string
    url: string
    children: CategoryT[]
}

type BrandT = {
    count: number
    id: number
    name: string
    url: string
}

type ProductT = {
    id: number
    availability: string
    brand: {
        name: string | null
    }
    category: string[]
    has_options: boolean
    image: {
        alt: string
        data: string
    }
    images: {
        alt: string
        data: string
    }[]
    name: string
    price: {
        without_tax: {
            formatted: string
        }
    }
    qty_in_cart: number
    rating: number
    num_reviews: number
    sku: string
    stock_level: number | null
    low_stock_level: number | null
    summary: string
    url: string
    weight: {
        formatted: string
    }
}

type ProductResultsT = {
    faceted_search_enabled: boolean
    facets: any[]
    pagination: {
        current: number
        links: any[]
        sort: string
        total: number
    }
    products: ProductT[]
}

type FormsSearchCategoryT = {
    attr: {
        id: string
        title: string
    }
    data: string
    metadata: {
        id: number
    }
    selected?: true
}

type FormsSearchT = {
    brands_list: {
        id: number
        name: string
    }[]
    category_options: FormsSearchCategoryT[]
    has_suggestions: boolean
    query: string
    search_error: boolean
    suggested_query: {
        query: string
        url: string
    }
    values: {
        brand: number
    }
}

type PaginationT = {
    product_results: {
        current: number
        sort: string
        total: number
    }
}

const types = {
    pages: {
        name: hb('name'),
        url: hb('url')
    },
    categories: {
        count: hb('count'),
        id: hb('id'),
        image: {
            alt: iF('image.alt', 'image'),
            data: iF('image.data', 'image')
        },
        name: hb('name'),
        url: hb('url'),
        children: {
            each: (Component: (category: CategoryT) => any) =>
                ea('children', Component, types.categories)
        }
    },
    cartegory: {
        id: hb('category.id'),
        description: hb('category.description'),
        name: hb('category.name'),
        total_products: hb('category.total_products')
    },
    breadcrumbs: {
        name: hb('name'),
        url: hb('url')
    },
    brands: {
        count: hb('count'),
        id: hb('id'),
        name: hb('name'),
        url: hb('url')
    },
    product: {
        id: hb('product.id'),
        availability: hb('product.availability'),
        brand: {
            name: hb('product.brand.name'),
            url: hb('product.brand.url')
        },
        can_purchase: hb('product.can_purchase'),
        category: {
            each: (Component: (category: string) => any) =>
                ea('product.category', Component, hb('.'))
        },
        description: hb('product.description', true),
        images: {
            each: (Component: (category: string) => any) =>
                ea('product.images', Component, {
                    alt: hb('alt'),
                    src: staticImage('product.main_image.data', '800x800')
                })
        },
        main_image: {
            alt: hb('product.main_image.alt'),
            src: staticImage('product.main_image.data', '800x800')
        },
        max_purchase_quantity: hb('product.max_purchase_quantity'),
        meta_description: hb('product.meta_description'),
        meta_keywords: hb('product.meta_keywords'),
        min_purchase_quantity: hb('product.min_purchase_quantity'),
        mpn: hb('product.mpn'),
        num_reviews: hb('product.num_reviews'),
        options: hb('product.options'),
        page_title: hb('product.page_title'),
        price: hb('product.price.without_tax.formatted'),
        rating: hb('product.rating'),
        show_quantity_input: hb('product.show_quantity_input'),
        sku: hb('product.sku'),
        tags: hb('product.tags'),
        title: hb('product.title'),
        upc: hb('product.upc'),
        warranty: hb('product.warranty')
    },
    products: {
        id: hb('id'),
        brand: iF('brand.name'),
        categories: {
            each: (Component: (category: string) => any) =>
                ea('category', Component, hb('.'))
        },
        image: {
            alt: hb('image.alt'),
            src: staticImage('image.data', '200x200')
        },
        images: {
            each: (Component: (image: { alt: string; src: string }) => any) =>
                ea('images', Component, {
                    alt: hb('image.alt'),
                    src: hb('image.data')
                })
        },
        name: hb('name'),
        price: hb('price.without_tax.formatted'),
        qty_in_cart: hb('qty_in_cart'),
        rating: hb('rating'),
        sku: hb('sku'),
        summary: hb('summary'),
        href: hb('url'),
        stock_level: iF('stock_level')
    },
    api_token: hb('settings.storefront_api.token'),
    settings: {
        address: hb('settings.address'),
        base_url: hb('settings.base_url'),
        channel_id: hb('settings.channel_id'),
        measurements: {
            length: hb('settings.measurements.length'),
            weight: hb('settings.measurements.weight')
        },
        money: {
            currency_symbol: hb('settings.money.currency_token'),
            decimal_places: hb('settings.money.decimal_places')
        },
        phone_number: hb('settings.phone_number'),
        store: {
            name: hb('settings.store_name'),
            logo_text: hb('settings.store_logo.title'),
            logo: staticImage('settings.store_logo.image.data', '42x26')
        }
    },
    links: {
        create_account: hb('urls.auth.create_account'),
        login: hb('urls.auth.login'),
        logout: hb('urls.auth.logout'),
        cart: hb('urls.cart'),
        home: hb('urls.home'),
        search: hb('urls.search'),
        contact_submit: hb('urls.contact_us_submit')
    }
}

const template = {
    brands: {
        each: (Component: (brand: typeof types.brands) => any) =>
            ea('shop_by_brand', Component, types.brands),
        json: hb('json shop_by_brand')
    },
    brand_results: {
        json: hb('json brand_results')
    },
    breadcrumbs: {
        each: (Component: (breadcrumb: typeof types.breadcrumbs) => any) =>
            ea('breadcrumbs', Component, types.breadcrumbs)
    },
    categories: {
        each: (Component: (category: CategoryT) => any) =>
            ea('categories', Component, types.categories),
        json: hb('json categories')
    },
    category_results: {
        json: hb('json category_results')
    },
    content_results: {
        json: hb('json content_results')
    },
    forms: {
        search: {
            json: hb('json forms.search')
        },
        contact: {
            page_id: hb('forms.contact.page_id'),
            recaptcha: hb('forms.contact.recaptcha.markup', true)
        }
    },
    pages: {
        each: (Component: (page: typeof types.pages) => any) =>
            ea('pages', Component, types.pages)
    },
    product: types.product,
    products: {
        new: {
            each: (Component: (product: typeof types.products) => any) =>
                ea('products.new', Component, types.products)
        },
        top_sellers: {
            each: (Component: (product: typeof types.products) => any) =>
                ea('products.top_sellers', Component, types.products)
        }
    },
    product_results: {
        each: (Component: (product: ProductT) => any) =>
            ea('product_results.products', Component, types.products),
        json: hb('json product_results')
    },
    links: types.links,
    api_token: types.api_token,
    settings: types.settings
}

export default template

export {
    hb,
    iF,
    ifLast,
    unlessLast,
    ea,
    staticImage,
    imageURL,
    block,
    CategoryT,
    BrandT,
    ProductT,
    ProductResultsT,
    FormsSearchT,
    FormsSearchCategoryT,
    template,
    PaginationT
}
