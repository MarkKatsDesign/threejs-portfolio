const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
    return (
        <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-500 flex gap-2">
                <p>Terms & Conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>
            <div className="flex gap-3">
                <a href="https://github.com/MarkKatsDesign" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src="/assets/github.svg" alt="GitHub" className="w-1/2 h-1/2" />
                </a>
                <a href="https://linkedin.com/in/mark-kats" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img src="/assets/linkedln.png" alt="LinkedIn" className="w-1/2 h-1/2" />
                </a>
            </div>

            <p className="text-white-500">© {CURRENT_YEAR} Mark. All rights reserved.</p>
        </section>
    );
};

export default Footer;