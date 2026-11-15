import {professionalRecommendations} from "../constants/index.js";

const Referees = () => {
    return (
        <section className="c-space my-20">
            <h3 className="head-text">What colleagues say</h3>

            <div className="client-container">
                {professionalRecommendations.map(({id, name, review, img, position}) => (
                    <div key={id} className="client-review">
                        <p className="text-white font-light">{review}</p>
                        <div className="client-content">
                            <div className="flex gap-3">
                                <img src={img} alt={name} className="w-12 h-12 rounded-full" />
                                <div className="flex flex-col">
                                    <p className="font-semibold text-white-800">{name}</p>
                                    <p className="text-white-500 md:text-base text-sm font-light">{position}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2" aria-label="5 out of 5 stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <img key={star} src="/assets/star.png" alt="" className="w-5 h-5" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Referees;
