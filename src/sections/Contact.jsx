import {useRef, useState} from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {

    const formRef = useRef();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleChange = ({target:{name,value}}) => {
        setForm({...form, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: 'Mark',
                    from_email: form.email,
                    to_email: 'mark.kats.career@gmail.com',
                    message: form.message
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                )

            setLoading(false)

            alert('Your message has been sent')

            setForm({
                name: '',
                email: '',
                message: ''
            });

        } catch (error) {
            setLoading(false)

            console.error(error)

            alert('Something went wrong')
        }
    }

    return (
        <section className="c-space my-20">
            <div className="relative min-h-screen flex items-center justify-center flex-col">
            <img src="/assets/terminal.png" alt="" className="absolute inset-0 min-h-screen"/>
                <div className="contact-container">
                    <h3 className="head-text">Get in touch</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Always happy to talk about AI in software engineering, developer experience, or building agentic
                        tools people actually want to use.
                    </p>
                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className='space-y-3'>
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                autoComplete="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="John Doe"
                            />
                        </label>
                        <label className='space-y-3'>
                            <span className="field-label">Email</span>
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="johndoe@gmail.com"
                            />
                        </label>
                        <label className='space-y-3'>
                            <span className="field-label">Your message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder="Hi Mark, ..."
                            />
                        </label>
                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending ...' : 'Send Message'}
                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
