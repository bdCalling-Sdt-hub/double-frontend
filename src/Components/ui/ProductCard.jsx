/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from 'antd';

import { FaHeart } from 'react-icons/fa';
import getImageUrl from '../../utils/getImageUrl';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
        return (
                <div className="border md:min-w-[300px] shadow-xl md:max-w-[600px] md:min-h-[455px] rounded-2xl md:m-10 m-5 p-3 flex items-start flex-col">
                        <div className="relative w-full">
                                <img
                                        className="w-full h-48 rounded-t-2xl"
                                        src={getImageUrl(product?.image[0])}
                                        alt={''}
                                />
                        </div>
                        <p className="bg-[#FFC313] px-2 py-1 text-sm mt-3 rounded-3xl w-[45%]">{'WHOLESALE'}</p>
                        <h1 className="text-lg font-semibold md:text-2xl line-clamp-1">{product?.name}</h1>
                        <p className="my-1 text-lg text-start line-clamp-1">{product?.description}</p>
                        <p className="text-2xl font-semibold">${product?.price}</p>

                        {/* Spacer to push the button to the bottom */}
                        <div className="flex-grow"></div>
                        <div className="w-full">
                                <Link to={`/shop/category/${product?.category?._id}/${product?._id}`}>
                                        <Button className="bg-[#00863D] w-full py-5 mb-1 rounded-xl font-bold text-white">
                                                SHOP NOW
                                        </Button>
                                </Link>
                        </div>
                </div>
        );
};

export default ProductCard;
