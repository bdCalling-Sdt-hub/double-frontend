import TitleBg from '../Components/ui/TitleBg';
import { Helmet } from 'react-helmet-async';
import { useGetPrivacyPolicyQuery } from '../redux/features/ruleApi';

const PrivacyPolicyPage = () => {
        const { data: privacyPolicyData } = useGetPrivacyPolicyQuery([]);
        return (
                <>
                        <Helmet>
                                <title>Privacy Policy - Doublet24</title>
                        </Helmet>
                        <TitleBg title="Privacy Policy" />
                        <div className="p-8 mx-auto max-w-7xl md:p-20 md:px-40 min-h-[80vh]">
                                <div className="p-8 mx-auto max-w-7xl md:p-20 md:px-40">
                                        <div dangerouslySetInnerHTML={{ __html: privacyPolicyData?.content }} />
                                </div>
                        </div>
                </>
        );
};

export default PrivacyPolicyPage;
