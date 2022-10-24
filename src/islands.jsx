import { hydrate } from 'preact'
import context from './utils/context'

const islands = {}

document.addEventListener('DOMContentLoaded', () => {
    for (const [selector, Component] of Object.entries(islands)) {
        const targets = document.querySelectorAll(selector)
        for (const target of targets)
            hydrate(<Component {...context} />, target)
    }
})
