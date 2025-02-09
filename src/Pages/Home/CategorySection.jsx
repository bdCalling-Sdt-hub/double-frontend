import { Button } from 'antd';
import { Link } from 'react-router';
import { useGetAllCategoriesQuery } from '../../redux/features/categoryApi';
import getImageUrl from '../../utils/getImageUrl';

const CategorySection = () => {
        const { data: categoryData } = useGetAllCategoriesQuery();

        return (
                <div className="mx-auto max-w-7xl md:p-20 md:px-28">
                        <h1 className="my-8 text-2xl font-bold text-center md:text-4xl md:text-start clash">
                                Browse <span className="text-[#00863D]">Categories</span>
                        </h1>
                        <div>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                        {categoryData?.data?.slice(0, 3)?.map((category) => (
                                                <div
                                                        key={category._id}
                                                        className="p-3 rounded-2xl border shadow-xl hover:shadow-2xl"
                                                >
                                                        <img
                                                                className="w-full h-56 rounded-2xl"
                                                                src={getImageUrl(category?.image)}
                                                                alt={category?.name}
                                                        />
                                                        <p className="bg-[#FFC313]  py-1 px-3 my-3 rounded-3xl w-[40%]">
                                                                {'WHOLE SALE'}
                                                        </p>
                                                        <h1 className="text-xl font-bold md:text-2xl">
                                                                {category?.name}
                                                        </h1>
                                                        <p className="my-3 line-clamp-1">{category?.description}</p>
                                                        <Link to={`/shop/category/${category._id}`}>
                                                                <Button className="bg-[#00863D] w-full font-semibold text-white text-xl py-5 rounded-xl">
                                                                        SHOP NOW
                                                                </Button>
                                                        </Link>
                                                </div>
                                        ))}
                                </div>
                        </div>
                </div>
        );
};

export default CategorySection;
