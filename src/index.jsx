import 'preact/debug'
import Base from './layout/base'
import Home from './pages/home'
import { render } from 'preact-render-to-string'

const page = (component, directives = '') =>
    `---
categories: true
${directives}
---
{{#partial 'page'}}${component}{{/partial}}{{> layout/base}}`

export default {
    layout: {
        base: render(<Base />)
    },
    pages: {
        home: page(render(<Home />))
    }
}
