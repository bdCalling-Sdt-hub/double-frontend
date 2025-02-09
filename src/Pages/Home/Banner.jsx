import bannerBg from '../../assets/Background.png';

import bannerLogo from '../../assets/Group 24899.png';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { BsArrowDown } from 'react-icons/bs';

const Banner = () => {
        return (
                <div className="relative md:h-[700px]">
                        <div>
                                <img className="md:h-[700px] w-full object-cover" src={bannerBg} alt="" />
                        </div>
                        <div className="absolute top-0 md:pt-56 pt-6 bg-[#0c2919] bg-opacity-80 h-full w-full">
                                <div className="text-center text-white">
                                        <h1
                                                className="md:text-6xl text-2xl clash
           text-[#FFC313]"
                                        >
                                                Premium Hemp Products
                                        </h1>
                                        <h1 className="mb-1 text-2xl md:text-6xl clash md:my-4">
                                                for a Healthier Lifestyle
                                        </h1>
                                        <p className="md:text-xl text-sm mx-auto font-fontThree w-[70%] md:w-[40%]">
                                                Explore our wide selection of high-quality bulk hemp flower, packaged
                                                products, and more. Experience the natural benefits of hemp today!
                                        </p>
                                        {/* <div className="my-2 md:my-5">
            <Link to={"/shop/category/1"}>
              <Button className="bg-[#FFC313] text-lg md:py-6 border-[#FFC313] font-semibold">
                Shop Now
                <span>
                  <img src={buttonLogo} alt="" />
                </span>
              </Button>
            </Link>
          </div> */}
                                </div>
                        </div>
                        <div className="hidden absolute top-0 right-20 flex-col gap-10 justify-center items-center pt-28 mx-auto max-w-7xl text-white md:visible md:flex">
                                <motion.img
                                        className="w-32 h-32"
                                        src={bannerLogo}
                                        alt=""
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 360 }}
                                        transition={{
                                                duration: 10,
                                                repeat: Infinity,
                                                ease: 'linear',
                                        }}
                                />
                                <p className="transform origin-center rotate-90">Follow Us</p>
                                <motion.div
                                        initial={{ y: 0 }}
                                        animate={{ y: 20 }}
                                        transition={{
                                                duration: 0.6,
                                                repeat: Infinity,
                                                repeatType: 'reverse',
                                        }}
                                >
                                        <BsArrowDown size={26} />
                                </motion.div>
                                <div className="flex flex-col gap-3">
                                        <FaFacebook size={24} />
                                        <FaTwitter size={24} />
                                        <FaLinkedin size={24} />
                                </div>
                        </div>
                </div>
        );
};

export default Banner;
