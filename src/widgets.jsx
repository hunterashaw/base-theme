import { schemaSection, schemaTextSetting, widgetSchema } from './utils/widgets'
import render from 'preact-render-to-string'

// Import components from ./components directory
function SampleWidget({ title, subtitle, buttonText }) {
    return (
        <section>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <button>{buttonText}</button>
        </section>
    )
}

// Define commonly used schema settings
const title = schemaTextSetting(
    'title',
    'Title',
    'Lorem ipsum dolor sit amet, consectetur'
)
const subtitle = schemaTextSetting(
    'subtitle',
    'Feature Subtitle',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
)
const label = schemaTextSetting('label', 'Button Label', 'Get Started')

// Define commonly used props from schema settings
const props = {
    title: '{{title}}',
    subtitle: '{{subtitle}}',
    label: '{{label}}'
}

// Export widgets, then call `npm run push-widgets` to publish widgets to store
export default {
    Sample: {
        schema: [
            widgetSchema(
                'Sample',
                schemaSection('Settings', title, subtitle, label)
            )
        ],
        template: render(<SampleWidget {...props} />)
    }
}
