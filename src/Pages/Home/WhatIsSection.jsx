import { Button } from 'antd';

import buttonLogo from '../../assets/Frame 1000011842.png';
import { Link } from 'react-router';
import { useGetAllCategoriesQuery } from '../../redux/features/categoryApi';
import getImageUrl from '../../utils/getImageUrl';

const WhatIsSection = () => {
        const { data: categoryData, isLoading } = useGetAllCategoriesQuery([]);

        if (isLoading) {
                return <div className="flex justify-center items-center my-20 text-lg text-secondary">Loading...</div>;
        }

        const singleCategory = categoryData?.data[0];
        return (
                <div className="relative p-8 md:p-16">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#eaf7ea] -z-10"></div>
                        <div className="relative gap-5 justify-center items-center py-20 mx-auto max-w-7xl md:flex md:px-16">
                                <img
                                        className="w-[500px] md:h-[320px] mb-5 md:mb-0 shadow-xl"
                                        src={getImageUrl(singleCategory?.image)}
                                        alt=""
                                />
                                <div>
                                        <h1 className="text-2xl font-bold text-center md:text-4xl md:text-start clash">
                                                <span className="text-[#00863D]">{singleCategory?.name}</span>
                                        </h1>
                                        <p className="my-5 text-lg text-justify">{singleCategory?.description}</p>
                                        <div className="my-2 w-full md:my-5">
                                                <Link to={`/shop/category/${singleCategory?._id}`}>
                                                        <Button className="bg-[#FFC313] w-full md:w-[35%] text-lg py-5 md:py-5 border-[#FFC313] font-bold">
                                                                Shop Now
                                                                <span>
                                                                        <img src={buttonLogo} alt="" />
                                                                </span>
                                                        </Button>
                                                </Link>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default WhatIsSection;
