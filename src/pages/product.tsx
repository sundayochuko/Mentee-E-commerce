import { GoHeartFill } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router-dom";
import { productData } from "../components/Home/productData";
import { useEffect, useState } from "react";
import { AnimatePresence, scale } from "motion/react";
import * as motion from "motion/react-client";

function Product() {
  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const productId = Number(id);

  // Here you would typically fetch the product details using the id
  const productDetails = productData?.find(
    (product: any) => product.id === productId
  );

  const setNewImage = (image: string) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    if (productDetails?.image) {
      setCurrentImage(productDetails.image[0]);
    }
  }, [productDetails]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const toggleAnimation = () => {
    setIsVisible(false);
    // Wait for a moment before setting it to true to allow the exit animation to complete
    setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Adjust the delay as needed
  };

  // console.log("isVisible:", isVisible);

  return (
    <div className="h-full w-full  flex flex-col p-[12px] ">
      <p>Home - Catalog - Boose - Qiet Place Speakers</p>
      <div className="  flex flex-col lg:flex-row h-auto lg:h-full w-full mt-[12px]">
        <div className=" relative h-[600px] md:h-[700px] lg:h-full w-full lg:w-[60%] flex flex-col items-center justify-center ">
          <AnimatePresence mode="wait">
            {currentImage && (
              <motion.div
                initial="hidden"
                animate="visible"
                key={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
                className="h-[75%] md:h-[75%] w-[72%] md:w-[60%] "
              >
                (
                <img
                  className=" h-full w-full"
                  src={currentImage}
                  alt="products"
                />
                )
              </motion.div>
            )}
          </AnimatePresence>
          <div className=" absolute top-[14px] left-[14px] py-[8px] px-[12px] text-black font-semibold rounded-xl bg-hightlight">
            Bestseller
          </div>
          <div className="  absolute top-[14px] right-[14px] text-xl p-[12px] rounded-full bg-secondary">
            <GoHeartFill />
          </div>
          <div className=" absolute top-[38%] left-[-35px] md:left-[-20px] flex flex-col items-center">
            <div className="p-[15px] rounded-full bg-blue-950" />
            <div className="p-[15px] rounded-full bg-white my-[8px]" />
            <div className="p-[15px] rounded-full bg-gray-700" />
            <button className="py-[4px] px-[12px] rounded-full -rotate-90 my-[45px]">
              DARK GRAY
            </button>
            <div className="p-[15px] rounded-full bg-gray-400" />
          </div>
          <div className=" absolute bottom-[14px] left-[14px] flex flex-row items-center gap-5 ">
            {productDetails?.image?.map((image: string, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setNewImage(image), toggleAnimation();
                  }}
                  className={` h-[50px] w-[50px] rounded-xl ${
                    currentImage === image
                      ? " border-4 border-hightlight"
                      : " border-2 border-hightlight/60"
                  } bg-secondary overflow-hidden`}
                >
                  <img
                    className=" h-full w-full"
                    src={image}
                    alt={`product-thumbnail-${index}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className=" h-auto lg:h-full w-full lg:w-[40%] flex flex-col items-start py-[30px] px-[5%] md:px-[20px] lg:px-[60px] overflow-hidden lg:overflow-y-scroll no-scrollbar  ">
          <p className="text-white/50">{productDetails?.make}</p>
          <h1 className="text-4xl font-semibold mt-[20px]">
            {productDetails?.productName}
          </h1>
          <div className=" w-full flex flex-row items-center justify-between mt-[20px] ">
            <div className="flex flex-row items-center gap-2 ">
              <div className="text-yellow-500">
                <FaStar />
              </div>
              {productDetails?.starRating.toFixed(1)}
            </div>
            <div className="flex flex-row items-center gap-2 ">
              {productDetails?.reviews} reviews{" "}
              <div>
                <IoIosArrowForward />
              </div>
            </div>
          </div>
          <p className="text-gray-500 mt-[30px]">
            {productDetails?.description}
          </p>
          <p className="text-4xl mt-[30px] ">${productDetails?.price}</p>
          <div className="flex flex-col mt-[30px]">
            <p>Key Features</p>
            <ul className="list-disc pl-5 ">
              {productDetails?.keyFeatures?.map(
                (feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                )
              )}
            </ul>
          </div>
          <div className=" w-full flex flex-col gap-5 mt-[50px]">
            <button className=" font-semibold text-primary rounded-full bg-hightlight hover:border-none">
              Buy Now
            </button>
            <button className="flex flex-row items-center justify-center font-semibold rounded-full gap-5">
              <div className="text-xl">
                <FiShoppingCart />
              </div>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
