import { hb } from '../utils/template'
import Header from '../components/header'
import ContextBlock from '../components/contextBlock'
import Footer from '../components/footer'

export default function Base() {
    return (
        <html>
            <head>
                <title>{hb('head.title')}</title>
                <link
                    rel="stylesheet"
                    href={`{{cdn 'assets/dist/style.css'}}`}
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=EB+Garamond&family=Inter:wght@400;600&family=Reem+Kufi:wght@500;600&display=swap"
                    rel="stylesheet"
                />
                {hb('resourceHints', true)}
                {hb('head.meta_tags', true)}
                {hb('head.config', true)}
                <link href="{{head.favicon}}" rel="shortcut icon" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                {hb('head.scripts', true)}
                <ContextBlock />
            </head>
            <body>
                <Header />
                <main>{`{{#block 'page'}}{{/block}}`}</main>
                <Footer />
                <script src={`{{cdn 'assets/dist/bundle.js'}}`}></script>
                {hb('footer.scripts', true)}
            </body>
        </html>
    )
}
