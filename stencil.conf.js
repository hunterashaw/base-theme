const esbuild = require('esbuild')
const { spawn } = require('child_process')

const createSpawn = command => {
    const [alias, ...args] = command.split(' ')
    const process = spawn(alias, args)
    process.stdout.on('data', data => {
        const message = data.toString().trim()
        if (message) console.log(message)
    })
    process.stderr.on('data', data => {
        const message = data.toString().trim()
        if (message) console.error(message)
    })
    return process
}

const completeProcess = process =>
    new Promise(resolve => {
        process.on('close', () => {
            resolve()
        })
    })

// Watch and rebuild during development
function development() {
    esbuild.build({
        outfile: 'assets/dist/bundle.js',
        entryPoints: ['src/islands.jsx'],
        minify: true,
        bundle: true,
        sourcemap: true,
        format: 'iife',
        watch: {
            onRebuild(error) {
                if (error) console.error(error)
            }
        },
        jsx: 'automatic',
        jsxImportSource: 'preact'
    })

    const processes = [
        createSpawn(`npx es-static-build -w -i src/index.jsx -o templates`),
        createSpawn(
            `npx tailwindcss -i src/style.css -o assets/dist/style.css --watch --minify`
        )
    ]

    process.on('beforeExit', () => processes.forEach(p => p.kill()))
}

// Build theme
async function production() {
    await esbuild.build({
        outfile: 'assets/dist/bundle.js',
        entryPoints: ['src/islands.jsx'],
        bundle: true,
        minify: true,
        format: 'iife',
        jsx: 'automatic',
        jsxImportSource: 'preact'
    })
    await completeProcess(
        createSpawn(`npx es-static-build -i src/index.jsx -o templates`)
    )
    await completeProcess(
        createSpawn(
            `npx tailwindcss -i src/style.css -o assets/dist/style.css --minify`
        )
    )

    process.send('done')
}

if (process.send) {
    process.on('message', message => {
        if (message === 'development') development()
        if (message === 'production') production()
    })
    process.send('ready')
}

module.exports = {
    files: ['/templates', '/lang', '/assets/dist'],
    ignored: []
}
