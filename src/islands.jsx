import { hydrate } from 'preact'
import context from './utils/context'

const islands = {}
const initializers = {}

document.addEventListener('DOMContentLoaded', () => {
    for (const [selector, Component] of Object.entries(islands)) {
        const targets = document.querySelectorAll(selector)
        for (const target of targets) {
            try {
                hydrate(<Component {...context} />, target)
            } catch (e) {
                console.error(e)
            }
        }
    }

    for (const [selector, init] of Object.entries(initializers)) {
        if (Boolean(document.querySelector(selector))) {
            try {
                init()
            } catch (e) {
                console.error(e)
            }
        }
    }
})
