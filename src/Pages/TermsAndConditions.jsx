import TitleBg from '../Components/ui/TitleBg';
import { Helmet } from 'react-helmet-async';
import { useGetTermsAndConditionsQuery } from '../redux/features/ruleApi';

const TermsAndConditionsPage = () => {
        const { data: termsAndConditionsData } = useGetTermsAndConditionsQuery([]);
        return (
                <>
                        <Helmet>
                                <title>Terms and Conditions - Doublet24</title>
                        </Helmet>
                        <TitleBg title="Terms and Conditions" />
                        <div className="p-8 mx-auto max-w-7xl md:p-20 md:px-40 min-h-[80vh]">
                                <div dangerouslySetInnerHTML={{ __html: termsAndConditionsData?.content }} />
                        </div>
                </>
        );
};

export default TermsAndConditionsPage;
