import { useParams } from 'react-router';
import TitleBg from '../../Components/ui/TitleBg';

import ProductCard from '../../Components/ui/ProductCard';
import { useSingleCategoryQuery } from '../../redux/features/categoryApi';
import getImageUrl from '../../utils/getImageUrl';
import { useGetAllProductsQuery } from '../../redux/features/productApi';
import { Pagination } from 'antd';
import { useState } from 'react';

const Shop = () => {
        const { id } = useParams();
        const [page, setPage] = useState(1);
        const { data: singleCategory, isFetching } = useSingleCategoryQuery(id);
        const { data: productData, isFetching: isProductFetching } = useGetAllProductsQuery(
                [
                        {
                                name: 'category',
                                value: singleCategory?._id,
                        },
                        {
                                name: 'page',
                                value: page,
                        },
                ],
                {
                        skip: !singleCategory,
                },
        );

        if (isFetching || isProductFetching) {
                return <div className="flex justify-center items-center my-20 text-lg text-secondary">Loading...</div>;
        }

        return (
                <>
                        <TitleBg title={singleCategory?.name} />
                        <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#eaf7ea] -z-10"></div>
                                <div className="gap-5 justify-center items-center p-8 mx-auto max-w-7xl md:flex md:py-24 md:px-32">
                                        <img
                                                className="w-[400px] md:h-[300px]"
                                                src={getImageUrl(singleCategory?.image)}
                                                alt=""
                                        />
                                        <div>
                                                <h1 className="mt-5 mb-3 text-2xl font-bold md:text-4xl md:mb-5">
                                                        <span className="text-[#00863D]">{singleCategory?.name}</span>
                                                </h1>
                                                <p className="text-lg">{singleCategory?.description}</p>
                                        </div>
                                </div>
                        </div>

                        {productData?.data?.length === 0 ? (
                                <div className="flex justify-center items-center my-20 text-lg text-secondary">
                                        No products found in this category
                                </div>
                        ) : (
                                <div className="container grid grid-cols-1 gap-5 mx-auto md:grid-cols-4">
                                        {productData?.data?.map((product) => (
                                                <ProductCard key={product._id} product={product} />
                                        ))}
                                </div>
                        )}

                        <div className="flex justify-center items-center my-10">
                                <Pagination
                                        defaultCurrent={1}
                                        total={productData?.meta?.total}
                                        pageSize={productData?.meta?.limit}
                                        onChange={(page) => setPage(page)}
                                />
                        </div>
                </>
        );
};

export default Shop;
