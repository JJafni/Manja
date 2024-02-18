"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";


import {
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Divider,
    CardHeader,
    Card,
    CardFooter,
    Button,
} from '@nextui-org/react'

const HeroParallax = ({
    products,
}: {
    products: {
        title: string;

        thumbnail: string;
    }[];
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
        springConfig
    );
    return (
        <div
            ref={ref}
            className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"

        >

            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row  mb-20 space-x-20 ">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {

    return (
        <>
            <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full"  >
                <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
                    Discover <br /> Manja Manga
                </h1>
                <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200 ">
                    Immerse yourself in captivating stories brought to life with stunning artwork.
                    Manja Manga brings you the latest manga titles and genres, curated by passionate enthusiasts
                    dedicated to delivering an unparalleled reading experience.
                </p>
                {/* <div className="video-container" style={{
                    width: "100%",
                    height: "100%",
                    boxShadow: "0px 0px 10px 8px rgba(0, 0, 0, 1) inset"
                }}>
                    <video className="h-full w-full " autoPlay muted style={{
                        boxShadow: " 0px 0px 10px 8px rgba(0,0,0,1) inset    "

                    }}>
                        <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                    </video>
                </div> */}

                {/* <div
                    style={{
                        backgroundImage: "url('https://cloudfront-eu-central-1.images.arcpublishing.com/diarioas/EORS27TG5VDRJGXXIJYQBHTQKA.jpg')", backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "fixed",
                        marginTop: "20vh",
                        width: "100vh",
                        height: "40vh",
                        zIndex: -1,
                    }}
                ></div> */}

            </div >
        </>
    );
};


export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (

        <motion.div
            style={{
                x: translate,


            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-96 w-[30rem] relative flex-shrink-0"
        >

            <Image

                onClick={onOpen}
                src={product.thumbnail}
                height="600"
                width="500"
                alt={product.title}
                style={{
                    cursor: "pointer",
                    filter: "grayscale(100%)", // Set image to black and white
                    transition: "filter 0.3s ease", // Add transition for smooth hover effect

                }}
                onMouseEnter={(e) => { (e.target as HTMLImageElement).style.filter = "grayscale(0%)"; }} // Change filter on hover
                onMouseLeave={(e) => { (e.target as HTMLImageElement).style.filter = "grayscale(100%)"; }} // Revert filter when not hovering
            />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <>


                        <Card isFooterBlurred className="col-span-12 sm:col-span-4">

                            <Image
                                removeWrapper
                                alt={product.title}
                                className="z-0 w-full h-full object-cover"
                                src={product.thumbnail}
                            />  <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                            <div className="flex flex-grow gap-2 items-center">
                              <Image
                                alt="Get Icon"
                                className="rounded-full w-10 h-11 bg-black"
                                src="/images/breathing-app-icon.jpeg"
                              />
                              <div className="flex flex-col">
                                <p className="text-tiny text-white/60">{product.title}</p>
                                <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                              </div>
                            </div>
                            <Button radius="full" size="sm">Get App</Button>
                          </CardFooter>
                        </Card>




                    </>
                </ModalContent>
            </Modal>


        </motion.div >
    );
};

export { HeroParallax }

