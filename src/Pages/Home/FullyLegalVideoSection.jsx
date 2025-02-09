import herbsVideo from '../../assets/herbsVideo.mp4';
import leafImg from '../../assets/leaves1.png';

const FullyLegalVideoSection = () => {
        return (
                <div className="p-8 mx-auto max-w-7xl text-center md:p-36">
                        <h1 className="text-2xl font-bold md:text-4xl clash">
                                TCHA Is <span className="text-[#00863D]">Fully Legal</span>
                        </h1>
                        <p className="my-5 text-lg">
                                Thanks to the 2018 Farm Bill, THCA is completely legal to purchase and use, as long as
                                it contains less than 0.3% Delta-9 THC by dry weight. This makes THCA a compliant and
                                accessible product for both consumers and businesses. You can confidently purchase and
                                sell THCA flower knowing that it meets federal guidelines.
                        </p>
                        <div className="relative">
                                <video autoPlay loop muted className="mx-auto my-5 mt-14 w-full rounded-2xl shadow-xl">
                                        <source src={herbsVideo} type="video/mp4" />
                                </video>
                                <div className="absolute -left-10 -top-12 md:-top-12 md:-left-16">
                                        <img className="w-24 h-24 md:w-40 md:h-40" src={leafImg} alt="" />
                                </div>
                        </div>
                </div>
        );
};

export default FullyLegalVideoSection;
