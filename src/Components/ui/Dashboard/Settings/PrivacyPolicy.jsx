import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import {
        useAddPrivacyPolicyMutation,
        useGetPrivacyPolicyQuery,
        useUpdatePrivacyPolicyMutation,
} from '../../../../redux/features/ruleApi';
import toast from 'react-hot-toast';

const PrivacyPolicy = () => {
        const editor = useRef(null);
        const [content, setContent] = useState('');
        const { data: privacyPolicy } = useGetPrivacyPolicyQuery([]);
        const [updatePrivacyPolicy] = useUpdatePrivacyPolicyMutation();
        const [addPrivacyPolicy] = useAddPrivacyPolicyMutation();

        useEffect(() => {
                if (privacyPolicy) {
                        setContent(privacyPolicy.content);
                }
        }, [privacyPolicy]);
        const handleSubmit = async () => {
                if (privacyPolicy?.content) {
                        const data = {
                                content: content,
                        };

                        try {
                                const res = await updatePrivacyPolicy(data).unwrap();
                                if (res.success) {
                                        toast.success(res.message);
                                }
                        } catch (error) {
                                toast.error(error?.data?.message || 'Something went wrong');
                        }
                } else {
                        const data = {
                                content: content,
                        };
                        try {
                                const res = await addPrivacyPolicy(data).unwrap();
                                if (res.success) {
                                        toast.success(res.message);
                                }
                        } catch (error) {
                                toast.error(error?.data?.message || 'Something went wrong');
                        }
                }
        };

        return (
                <div>
                        <JoditEditor
                                ref={editor}
                                value={content}
                                onBlur={(newContent) => setContent(newContent)}
                                onChange={() => {}}
                                config={{
                                        height: 500,
                                        readonly: false,
                                }}
                                className=""
                        />

                        <div className="flex justify-center items-center mt-5">
                                <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="bg-primary bg-[#173616] text-white w-[160px] h-[42px] rounded-lg"
                                >
                                        Submit
                                </button>
                        </div>
                </div>
        );
};

export default PrivacyPolicy;
