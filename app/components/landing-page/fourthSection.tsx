import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const FourthSection = () => {
  const openingEffect = {
    closed: { scale: 0 },
    open: { scale: 1, transition: { duration: 0.8, ease: "backOut" } },
  };
  const controlsText = useAnimation();
  const controlsImage = useAnimation();
  const refText = useRef(null);
  const refImage = useRef(null);

  useEffect(() => {
    const currentRefText = refText.current;
    const currentRefImage = refImage.current;

    const observerText = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controlsText.start("visible");
        }
      },
      { threshold: 0.3 }
    );

    const observerImage = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controlsImage.start("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (currentRefText) {
      observerText.observe(currentRefText);
    }

    if (currentRefImage) {
      observerImage.observe(currentRefImage);
    }

    return () => {
      if (currentRefText) {
        observerText.unobserve(currentRefText);
      }
      if (currentRefImage) {
        observerImage.unobserve(currentRefImage);
      }
    };
  }, [controlsText, controlsImage]);

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const slideInVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="max-w-7xl mx-auto py-20">
      <motion.div
        className="flex items-center text-[#ECF0F1] shadow-2xl rounded-3xl bg-[#6F1A07] p-8 justify-between max-w-6xl mx-auto"
        animate="open"
        variants={openingEffect}
      >
        <motion.div
          className="max-w-xl z-50 flex flex-col gap-6"
          ref={refText}
          initial="hidden"
          animate={controlsText}
          variants={fadeInVariants}
        >
          <p className="text-5xl pb-4">Cloud Saving and Accessibility</p>
          <p>
            Never worry about losing your work again. Drawdash offers seamless
            cloud saving, ensuring that your drawings are safely stored and
            accessible from any device. Log in to your account from anywhere to
            access your art, making it easy to continue your work on the go or
            share it with others.
          </p>
          <button className="rounded-full bg-[#ECF0F1] text-[#6F1A07] py-4 px-12 max-w-max">
            Learn More
          </button>
        </motion.div>
        <motion.div
          ref={refImage}
          initial="hidden"
          className="z-50"
          animate={controlsImage}
          variants={slideInVariants}
        >
          {/* Update or replace the image to match the new theme */}
          <img
            src="/cloud-storage.svg" // Replace with the appropriate image
            className="rounded-2xl"
            alt="Cloud Saving and Accessibility"
            width="400"
            height="400"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FourthSection;
