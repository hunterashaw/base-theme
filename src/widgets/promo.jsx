import { render } from 'preact-render-to-string'
import Promo from '../components/cms/promo'
import {
    schemaImageSetting,
    schemaSection,
    schemaSelectSetting,
    schemaTextSetting,
    templateVariants,
    widgetSchema
} from '../utils/widgets'

const defaultProps = {
    title: '{{title}}',
    titleClass: '{{title_size}}',
    subtitle: '{{subtitle}}',
    label: '{{label}}',
    ssr: true,
    href: '{{link}}',
    class: '{{bg_color}}'
}

const PromoWidget = {
    schema: widgetSchema(
        'Promo',
        schemaSection(
            'Settings',
            schemaSelectSetting(
                'variant',
                'Variation',
                {
                    'No Image': 'default',
                    'Image on Left': 'image_left',
                    'Image on Right': 'image_right'
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
            schemaTextSetting('title', 'Title', 'Promotional section title'),
            schemaSelectSetting(
                'title_size',
                'Title Size',
                { Large: '!text-6xl', Small: '!text-4xl' },
                '!text-6xl'
            ),
            schemaTextSetting(
                'subtitle',
                'Subtitle',
                'Promotional section subtitle.'
            ),
            schemaSelectSetting(
                'show_button',
                'Show Button',
                { Yes: 'true', No: 'false' },
                'true'
            ),
            schemaTextSetting('label', 'Button Label', 'Button Text'),
            schemaTextSetting('link', 'Button Link', '/'),
            schemaImageSetting('image', 'Image')
        )
    ),
    template: templateVariants({
        default: <Promo {...defaultProps} />,
        image_left: (
            <Promo {...defaultProps} imageOnLeft image="{{image.src}}" />
        ),
        image_right: <Promo {...defaultProps} image="{{image.src}}" />
    })
}

export default PromoWidget
