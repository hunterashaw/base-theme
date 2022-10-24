const esbuild = require('esbuild')
const BigCommerceClient = require('bigcommerce-client')
const fs = require('fs')
const { hash, accessToken } = JSON.parse(
    fs.readFileSync('./secrets.stencil.json', 'utf8')
)
const store = new BigCommerceClient(hash, accessToken, true)

async function run() {
    console.log('Starting.')
    await esbuild.build({
        outfile: 'temp/widgets.js',
        entryPoints: ['src/widgets.jsx'],
        sourcemap: 'inline',
        bundle: true,
        format: 'cjs',
        jsx: 'automatic',
        jsxImportSource: 'preact'
    })

    delete require.cache[require.resolve(`../temp/widgets.js`)]
    const widgets = require(`../temp/widgets.js`).default

    const existingWidgets = await store.getAll('v3/content/widget-templates')

    for (const [name, payload] of Object.entries(widgets)) {
        console.log('Pushing', name)
        const existingWidget = existingWidgets.find(
            widget => widget.name === name
        )
        const body = {
            name,
            ...payload
        }

        if (existingWidget)
            await store.put(
                `v3/content/widget-templates/${existingWidget.uuid}`,
                body
            )
        else await store.post('v3/content/widget-templates', body)
    }
    console.log('Finished.')
}

run()
