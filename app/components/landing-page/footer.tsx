import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const Footer = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  // Animation variants
  const slideUpVariants = {
    hidden: { y: 100, opacity: 1 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  // Check if the footer is in the viewport
  useEffect(() => {
    const footerElement = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      variants={slideUpVariants}
      initial="hidden"
      animate={controls}
      className="bg-[#2B2118] rounded-t-3xl text-[#ECF0F1] px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-5 py-28">
          <div className="relative flex col-span-3 flex-col gap-4">
            <div className="h-20 w-20 z-0 absolute rounded-md -mt-1 bg-[#f7f3e3]"></div>
            <img
              className="z-20 ml-3"
              src="/logo.png"
              alt="Drawdash"
              width="56"
              height="60"
            />
            <p className="text-sm mt-6">
              Join our community for the latest updates and creative tips
            </p>
            <input
              className="w-full text-[#ECF0F1] max-w-sm px-6 py-3 rounded-full placeholder:text-[#ECF0F1] placeholder:opacity-50 focus:outline-none"
              placeholder="Enter your email"
            />
            <p className="pt-8 text-sm">
              Explore and express your artistic talents with Drawdash.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="/mail-icon.png"
                alt="mail-icon"
                width={40}
                height={40}
              />
              <p className="text-3xl">support@drawdash.com</p>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 text-sm">
            <div className="space-y-4">
              <h3 className="font-semibold">COMPANY</h3>
              <div className="text-sm space-y-4">
                <p className="opacity-50 hover:opacity-75">ABOUT US</p>
                <p className="opacity-50 hover:opacity-75">CONTACT</p>
                <p className="opacity-50 hover:opacity-75">BLOG</p>
                <p className="opacity-50 hover:opacity-75">FAQ</p>
                <p className="opacity-50 hover:opacity-75">TERMS OF SERVICE</p>
                <p className="opacity-50 hover:opacity-75">PRIVACY POLICY</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">PRODUCT</h3>
              <div className="space-y-4 text-sm">
                <p className="opacity-50 hover:opacity-75">FEATURES</p>
                <p className="opacity-50 hover:opacity-75">PRICING</p>
                <p className="opacity-50 hover:opacity-75">TESTIMONIALS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full py-10 border-t justify-center gap-28 text-xs">
          <p>2024 Drawdash. All rights reserved</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
