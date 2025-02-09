import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import {
        useAddTermsAndConditionsMutation,
        useGetTermsAndConditionsQuery,
        useUpdateTermsAndConditionsMutation,
} from '../../../../redux/features/ruleApi';
import toast from 'react-hot-toast';

const TermsAndConditions = () => {
        const editor = useRef(null);
        const [content, setContent] = useState('');
        const { data: termsAndConditions } = useGetTermsAndConditionsQuery([]);
        const [updateTermsAndConditions] = useUpdateTermsAndConditionsMutation();
        const [addTermsAndConditions] = useAddTermsAndConditionsMutation();

        useEffect(() => {
                if (termsAndConditions) {
                        setContent(termsAndConditions.content);
                }
        }, [termsAndConditions]);
        const handleSubmit = async () => {
                if (termsAndConditions?.content) {
                        const data = {
                                content: content,
                        };

                        try {
                                const res = await updateTermsAndConditions(data).unwrap();
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
                                const res = await addTermsAndConditions(data).unwrap();
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

export default TermsAndConditions;
