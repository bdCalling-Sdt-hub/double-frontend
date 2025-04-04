import { useState } from 'react';
import { useGetFaqQuery } from '../redux/features/faqApi'; // Assuming you're using RTK Query
import { BsChevronDown } from 'react-icons/bs';

const FAQ = () => {
        const { data: faqsData, isLoading, error } = useGetFaqQuery();
        const [openPanel, setOpenPanel] = useState(null);

        const togglePanel = (id) => {
                setOpenPanel(openPanel === id ? null : id);
        };

        if (isLoading) return <p className="text-center">Loading FAQs...</p>;
        if (error) return <p className="text-center text-red-500">Failed to load FAQs.</p>;

        return (
                <div className="p-8 mx-auto max-w-7xl md:p-20 md:px-40">
                        <h1 className="mb-10 text-3xl font-bold text-center md:text-4xl">
                                Frequently Asked <span className="text-[#00863D]">Questions</span>
                        </h1>
                        <div className="space-y-4">
                                {faqsData?.map((faq) => (
                                        <div
                                                key={faq._id}
                                                className="overflow-hidden rounded-xl border border-[#54B781]"
                                        >
                                                <button
                                                        onClick={() => togglePanel(faq._id)}
                                                        className={`w-full flex justify-between items-center p-4 text-lg font-semibold transition-all ${
                                                                openPanel === faq._id
                                                                        ? 'bg-[#EAFBE7] text-[#033F1B] border-t-[10px] border-[#033F1B]'
                                                                        : 'bg-white text-black'
                                                        }`}
                                                >
                                                        {faq.question}
                                                        <span
                                                                className={`transform transition-transform ${
                                                                        openPanel === faq._id
                                                                                ? 'rotate-180'
                                                                                : 'rotate-0'
                                                                }`}
                                                        >
                                                                <BsChevronDown />
                                                        </span>
                                                </button>
                                                {openPanel === faq._id && (
                                                        <div className="p-4 text-gray-700 bg-white">{faq.answer}</div>
                                                )}
                                        </div>
                                ))}
                        </div>
                </div>
        );
};

export default FAQ;
