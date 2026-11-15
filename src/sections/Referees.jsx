import {professionalRecommendations} from "../constants/index.js";

const Referees = () => {
    return (
        <section className="c-space my-20">
            <h3 className="head-text">What colleagues say</h3>

            <div className="client-container">
                {professionalRecommendations.map(({id, name, review, img, position}) => (
                    <div key={id} className="client-review">
                        <div>
                            <svg viewBox="0 0 24 24" className="w-7 h-7 mb-4 text-[#e0b052]/70" fill="currentColor" aria-hidden="true">
                                <path d="M9.6 6C6.5 7.4 4.5 10.2 4.5 13.6c0 2.6 1.6 4.4 3.8 4.4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.1-3-3.1-.3 0-.7 0-.9.1.4-1.9 1.9-3.6 3.6-4.5L9.6 6zm9 0c-3.1 1.4-5.1 4.2-5.1 7.6 0 2.6 1.6 4.4 3.8 4.4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.1-3-3.1-.3 0-.7 0-.9.1.4-1.9 1.9-3.6 3.6-4.5L18.6 6z" />
                            </svg>
                            <blockquote className="text-white font-light">{review}</blockquote>
                        </div>
                        <div className="client-content">
                            <div className="flex gap-3">
                                <img src={img} alt={name} className="w-12 h-12 rounded-full" />
                                <div className="flex flex-col">
                                    <p className="font-semibold text-white-800">{name}</p>
                                    <p className="text-white-500 md:text-base text-sm font-light">{position}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Referees;
