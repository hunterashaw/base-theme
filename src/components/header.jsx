import template, { block } from '../utils/template'

export default function Header() {
    return (
        <header class="fixed top-0 left-0 right-0 h-[72px] z-50 grid gap-4 cols-c bg-white bg-opacity-80 backdrop-blur font-brand">
            <div class="flex items-center">
                <a href={template.links.home} class="flex items-center">
                    <img src={template.settings.store.logo} />
                    <span>{template.settings.store.name}</span>
                </a>
            </div>
        </header>
    )
}
