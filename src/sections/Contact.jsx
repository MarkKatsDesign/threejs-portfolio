import { useEffect, useRef, useState } from "react";

const EMAIL = 'mark.kats.career@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Hello from your portfolio')}`;

const MailIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
    </svg>
);

const CopyIcon = ({ copied }) => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied ? (
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        ) : (
            <>
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V6a2 2 0 0 1 2-2h9" />
            </>
        )}
    </svg>
);

const LINKS = [
    { href: 'https://www.linkedin.com/in/mark-kats/', label: 'LinkedIn', icon: '/assets/linkedln.png' },
    { href: 'https://github.com/MarkKatsDesign', label: 'GitHub', icon: '/assets/github.svg' },
];

/**
 * Contact links in a macOS-style window. There is deliberately no form: no
 * third-party email service, keys or spam handling to maintain.
 */
const Contact = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const copyTimeoutRef = useRef(null);

    useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

    const handleCopy = () => {
        navigator.clipboard
            .writeText(EMAIL)
            .then(() => {
                setHasCopied(true);
                clearTimeout(copyTimeoutRef.current);
                copyTimeoutRef.current = setTimeout(() => setHasCopied(false), 2000);
            })
            .catch((error) => console.error('Could not copy email address:', error));
    };

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
                    <p className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-white-500">Contact</p>
                </div>

                <div className="sm:p-10 p-6">
                    <h3 className="head-text">Get in touch</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Always happy to talk about AI in software engineering, developer experience, or building agentic
                        tools people actually want to use.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-black-300 bg-black-100 p-3">
                        <a
                            href={MAILTO}
                            className="flex flex-1 items-center gap-3 rounded-md px-3 py-2 text-white-800 hover:bg-black-300 transition-colors min-w-0"
                        >
                            <span className="text-white-500"><MailIcon /></span>
                            <span className="text-base sm:text-lg font-medium whitespace-nowrap">{EMAIL}</span>
                        </a>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="flex items-center justify-center gap-2 rounded-md border border-black-500 px-4 py-2 text-sm text-white-600 hover:text-white hover:border-white-500 transition-colors"
                            aria-live="polite"
                        >
                            <CopyIcon copied={hasCopied} />
                            {hasCopied ? 'Copied' : 'Copy'}
                        </button>
                    </div>

                    <div className="mt-6 grid sm:grid-cols-3 gap-3">
                        <a href={MAILTO} className="field-btn">
                            <MailIcon />
                            Email me
                        </a>
                        {LINKS.map(({ href, label, icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="field-btn bg-black-300 hover:bg-black-500 transition-colors"
                            >
                                <img src={icon} alt="" className="w-5 h-5" />
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
