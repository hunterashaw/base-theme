import { render } from 'preact-render-to-string'
import Features from '../components/cms/features'
import {
    schemaSection,
    schemaSelectSetting,
    schemaTextSetting,
    templateVariants,
    widgetSchema
} from '../utils/widgets'

const defaultProps = {
    class: '{{bg_color}}',
    features: [
        { title: '{{title_1}}', description: '{{description_1}}' },
        { title: '{{title_2}}', description: '{{description_2}}' },
        { title: '{{title_3}}', description: '{{description_3}}' }
    ]
}

const FeaturesWidget = {
    schema: widgetSchema(
        'Promo',
        schemaSection(
            'Settings',
            schemaSelectSetting(
                'variant',
                'Variation',
                {
                    'No Title': 'default',
                    Title: 'title'
                },
                'default'
            ),
            schemaSelectSetting(
                'bg_color',
                'Background Color',
                {
                    White: 'bg-white',
                    Gray: 'bg-gray-25',
                    'Dark Gray': 'bg-gray-700 text-white',
                    Primary: 'bg-primary-25'
                },
                'bg-white'
            ),
            schemaTextSetting('title', 'Title', 'Features'),
            schemaTextSetting('title_1', 'Feature 1 Title', 'Feature 1'),
            schemaTextSetting(
                'description_1',
                'Feature 1 description.',
                'Description 1'
            ),
            schemaTextSetting('title_2', 'Feature 2 Title', 'Feature 2'),
            schemaTextSetting(
                'description_2',
                'Feature 2 description.',
                'Description 2'
            ),
            schemaTextSetting('title_3', 'Feature 3 Title', 'Feature 3'),
            schemaTextSetting(
                'description_3',
                'Feature 3 description.',
                'Description 3'
            )
        )
    ),
    template: templateVariants({
        default: <Features {...defaultProps} />,
        title: <Features {...defaultProps} title="{{title}}" />
    })
}

export default FeaturesWidget
