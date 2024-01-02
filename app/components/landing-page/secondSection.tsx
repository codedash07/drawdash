import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

const SecondSection = () => {
  const controlsText = useAnimation();
  const controlsButton = useAnimation();
  const refText = useRef(null);
  const refButton = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (entry.target) {
            case refText.current:
              controlsText.start("visible");
              break;
            case refButton.current:
              controlsButton.start("visible");
              break;
          }
        }
      });
    }, observerOptions);

    [refText, refButton].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      [refText, refButton].forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [controlsButton, controlsText]);
  const sectionVariants = {
    hidden: (direction: number) => ({ x: direction * 100, opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  // Animation variants
  const fadeInUpVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-[#2B2118] flex items-center">
      <div className="max-w-7xl mx-auto py-24">
        <div className="flex items-center justify-between w-full">
          <div className="text-[#ECF0F1] flex flex-col gap-8 max-w-xl">
            <motion.p
              className="rounded-full capitalize py-2 px-4 max-w-max bg-[#A8763E] text-sm text-white"
              ref={refText}
              initial="hidden"
              animate={controlsText}
              variants={fadeInUpVariants}
            >
              Advanced Drawing Tools
            </motion.p>
            <motion.p
              className="text-6xl text-[#F7F3E3]"
              ref={refText}
              initial="hidden"
              animate={controlsText}
              variants={fadeInUpVariants}
            >
              Discover a comprehensive suite of drawing tools
            </motion.p>
            <motion.p
              className="max-w-md"
              ref={refText}
              initial="hidden"
              animate={controlsText}
              variants={fadeInUpVariants}
            >
              Catering to both beginners and professionals, enjoy a variety of
              brushes, pencils, and pens, each with adjustable sizes and
              opacity. Whether you&apos;re sketching, inking, or painting,
              Drawdash provides the perfect tools for your artistic journey.
            </motion.p>
            <motion.button
              className="font-semibold mt-16 rounded-full bg-[#6F1A07] text-white py-4 px-12 max-w-max"
              ref={refButton}
              initial="hidden"
              animate={controlsButton}
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
            >
              Learn More
            </motion.button>
          </div>
          <div>
            <motion.div
              className="flex justify-end"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={sectionVariants}
            >
              <img
                src="/second-section.jpg"
                className="rounded-lg"
                alt="landing-page"
                width="550"
                height="800"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
