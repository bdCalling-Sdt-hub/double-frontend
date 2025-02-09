// import { Helmet } from 'react-helmet-async';
import AboutUsSection from './AboutUsSection';
import Banner from './Banner';
import CategorySection from './CategorySection';
import ContactUsSection from './ContactUsSection';
import FAQSection from './FAQSection';
import FullyLegalVideoSection from './FullyLegalVideoSection';
import WhatIsSection from './WhatIsSection';

const Home = () => {
        return (
                <div>
                        {/* <Helmet>
                                <title title>Home - Cannasseurs Club</title>
                        </Helmet> */}
                        <Banner />
                        <AboutUsSection />
                        <CategorySection />
                        <WhatIsSection />
                        <FullyLegalVideoSection />
                        <ContactUsSection />
                        <FAQSection />
                </div>
        );
};

export default Home;
