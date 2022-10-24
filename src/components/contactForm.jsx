import { useCallback, useState } from 'preact/hooks'
import Button from './common/button'
import Input from './common/input'

export default function ContactForm({ contactForm, urls }) {
    const [submitMessage, setSubmitMessage] = useState('Submit')
    const [isSent, setIsSent] = useState(false)
    const delaySetSubmitMessage = message =>
        setTimeout(() => setSubmitMessage(message), 3000)

    const submit = useCallback(async e => {
        e.preventDefault()
        setSubmitMessage('Loading...')
        const data = new FormData(e.target)

        if (!data.get('g-recaptcha-response')) {
            setSubmitMessage(`Click "I'm not a robot"`)
            delaySetSubmitMessage('Submit')
            return
        }

        const requestData = new FormData()
        for (const [name, value] of data.entries())
            requestData.append(name, value)
        requestData.append('page_id', contactForm.page_id)

        try {
            const response = await fetch(urls.contact_us_submit, {
                method: 'post',
                body: requestData
            })
            if (response.ok) {
                setIsSent(true)
            } else
                throw new Error(`${response.status} - ${response.statusText}`)
        } catch (e) {
            console.error(e)
            setSubmitMessage('Error')
            delaySetSubmitMessage('Submit')
        }
    })

    return isSent ? (
        <div class="grid gap-4">
            <h2 class="font-medium underline decoration-gray-200 text-xl">
                Contact Submitted
            </h2>
            <p class="text-sm">
                Thank you for reaching out! We'll be in touch shortly.
            </p>
        </div>
    ) : (
        <form action="#" onSubmit={submit} class="grid gap-8">
            <div class="grid gap-4">
                <h2 class="font-medium text-2xl underline decoration-gray-200">
                    Contact Information
                </h2>
                <div class="grid gap-4 md:grid-cols-2">
                    <Input
                        id="contact_companyname"
                        label="Name"
                        required
                        autofocus
                    />
                    <Input id="contact_email" label="Contact Email" required />
                    <Input
                        id="contact_question"
                        label="Question/Comment"
                        type="text-area"
                        required
                    />
                </div>
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: contactForm.recaptcha.markup
                }}
            />
            <div class="flex justify-center py-8">
                <Button
                    submit
                    variant="solid"
                    color="primaryDark"
                    disabled={submitMessage !== 'Submit'}
                >
                    {submitMessage}
                </Button>
            </div>
        </form>
    )
}
