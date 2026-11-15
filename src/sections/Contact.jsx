import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';

const LIMITS = { name: 100, email: 254, message: 4000 };
// Basic abuse protection. EmailJS keys are public by design, so the real
// limits (allowed origins, rate limit, fixed recipient) belong in the EmailJS
// dashboard; these checks just stop casual bots and accidental resubmits.
const MIN_FILL_TIME_MS = 3000;
const COOLDOWN_MS = 60_000;
const LAST_SENT_KEY = 'contact:lastSentAt';

const EMPTY_FORM = { name: '', email: '', message: '' };

const STATUS_TEXT = {
    sent: 'Thanks, your message has been sent. I will get back to you soon.',
    error: 'Something went wrong. Please try again, or email me directly.',
    cooldown: 'Your message was sent a moment ago. Please wait a minute before sending another.',
};

const Contact = () => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error | cooldown
    const openedAtRef = useRef(0);

    useEffect(() => {
        openedAtRef.current = Date.now();
    }, []);

    const handleChange = ({ target: { name, value } }) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        if (status !== 'sending') setStatus('idle');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Bots tend to fill every field and submit instantly; pretend it worked.
        if (honeypot || Date.now() - openedAtRef.current < MIN_FILL_TIME_MS) {
            setStatus('sent');
            setForm(EMPTY_FORM);
            return;
        }

        const lastSentAt = Number(localStorage.getItem(LAST_SENT_KEY) || 0);
        if (Date.now() - lastSentAt < COOLDOWN_MS) {
            setStatus('cooldown');
            return;
        }

        setStatus('sending');
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name.trim(),
                    to_name: 'Mark',
                    from_email: form.email.trim(),
                    to_email: 'mark.kats.career@gmail.com',
                    message: form.message.trim(),
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            );
            localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
            setStatus('sent');
            setForm(EMPTY_FORM);
        } catch (error) {
            console.error('Could not send message:', error);
            setStatus('error');
        }
    };

    const isSending = status === 'sending';

    return (
        <section className="c-space my-20">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-black-200 shadow-2xl shadow-black/80">
                {/* macOS-style title bar */}
                <div className="relative flex h-11 items-center border-b border-black-300 bg-linear-to-b from-[#26262c] to-[#1c1c21] px-4">
                    <div className="flex gap-2" aria-hidden="true">
                        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    <p className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-white-500">New Message</p>
                </div>

                <div className="sm:p-10 p-5">
                    <h3 className="head-text">Get in touch</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Always happy to talk about AI in software engineering, developer experience, or building agentic
                        tools people actually want to use.
                    </p>

                    <form onSubmit={handleSubmit} className="relative mt-10 flex flex-col space-y-7">
                        <p className="flex items-center gap-3 border-b border-black-300 pb-3 text-white-500">
                            <span className="text-sm">To:</span>
                            <span className="rounded-full bg-black-300 px-3 py-1 text-sm text-white-700">Mark Kats</span>
                        </p>

                        {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
                        <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                            <label>
                                Company
                                <input
                                    type="text"
                                    name="company"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={honeypot}
                                    onChange={(e) => setHoneypot(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-7">
                            <label className="space-y-3">
                                <span className="field-label">Full name</span>
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    maxLength={LIMITS.name}
                                    className="field-input"
                                    placeholder="Jane Smith"
                                />
                            </label>
                            <label className="space-y-3">
                                <span className="field-label">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    maxLength={LIMITS.email}
                                    className="field-input"
                                    placeholder="jane@company.com"
                                />
                            </label>
                        </div>
                        <label className="space-y-3">
                            <span className="field-label">Message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                minLength={10}
                                maxLength={LIMITS.message}
                                rows={5}
                                className="field-input"
                                placeholder="Hi Mark, ..."
                            />
                        </label>

                        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                            <p
                                role="status"
                                className={`text-sm min-h-5 ${status === 'error' || status === 'cooldown' ? 'text-[#ff8a80]' : 'text-[#3fb950]'}`}
                            >
                                {STATUS_TEXT[status] ?? ''}
                            </p>
                            <button className="field-btn sm:min-w-48 disabled:opacity-60" type="submit" disabled={isSending}>
                                {isSending ? 'Sending…' : 'Send message'}
                                <img src="/assets/arrow-up.png" alt="" className="field-btn_arrow" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
