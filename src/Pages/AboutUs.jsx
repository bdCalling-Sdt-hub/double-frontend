import TitleBg from '../Components/ui/TitleBg';

import { Helmet } from 'react-helmet-async';
import { useGetAboutQuery } from '../redux/features/aboutApi';
import getImageUrl from '../utils/getImageUrl';

const AboutUs = () => {
        const { data: aboutData } = useGetAboutQuery([]);

        return (
                <>
                        <Helmet>
                                <title>About Us - Doublet24</title>
                        </Helmet>
                        <TitleBg title="About Us" />
                        <div className="font-fontTwo">
                                <div className="px-7 md:px-20">
                                        {aboutData?.data?.map((section, index) => (
                                                <div
                                                        key={index}
                                                        className={`${
                                                                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                                                        } gap-10 justify-center items-center py-20 mx-auto max-w-7xl md:flex`}
                                                >
                                                        <div className="text-justify md:text-start">
                                                                <h1 className="text-4xl font-bold clash">
                                                                        <span className="text-[#00863D] font-semibold">
                                                                                {section?.title}
                                                                        </span>{' '}
                                                                </h1>
                                                                <p className="my-5 text-lg">{section?.description}</p>
                                                        </div>
                                                        <img
                                                                className={`w-[450px] md:h-[350px] shadow-xl rounded-2xl ${
                                                                        index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                                                                }`}
                                                                src={getImageUrl(section?.image)}
                                                                alt=""
                                                        />
                                                </div>
                                        ))}
                                </div>
                        </div>
                </>
        );
};

export default AboutUs;
