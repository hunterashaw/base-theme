import ContactForm from '../components/forms/contactForm'
import { hb } from '../utils/template'

export default function Contact() {
    return (
        <div>
            {hb(`region name='contact'`)}
            <ContactForm />
        </div>
    )
}
