// @ts-nocheck
import {
    BrandT,
    CategoryT,
    FormsSearchT,
    PaginationT,
    ProductResultsT
} from './template'

type ContextT = {
    categories: CategoryT[]
    brands: BrandT[]
    product_results: ProductResultsT
    filters: FormsSearchT
    pagination: PaginationT
    token: string
}

const context: ContextT = JSON.parse(
    document.getElementById('theme-context')?.innerText
)

//console.log(context)

export default context

export { ContextT }
