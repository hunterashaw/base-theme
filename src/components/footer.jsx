import { template } from '../utils/template'
import Button from './common/button'

export default function Footer() {
    return (
        <footer class="bg-gray-800 text-white py-24 px-[10%] grid gap-4 md:grid-cols-2">
            <div class="grid gap-2 order-2 auto-rows-max">
                <div>
                    <a href="/" class="p-2 flex items-center">
                        <span class="mr-2">©</span>
                    </a>
                </div>

                {template.pages.each(({ name, url }) => (
                    <div>
                        <a href={url} class="p-2">
                            {name}
                        </a>
                    </div>
                ))}
            </div>
            <div class="grid justify-end order-1 md:order-3">
                <h1 class="font-display text-4xl text-right max-w-lg">
                    Tagline
                </h1>
                <div class="flex justify-end p-4 gap-4">
                    <Button href="/contact-us/" color="primaryDark">
                        Get Connected
                    </Button>
                </div>
            </div>
        </footer>
    )
}
