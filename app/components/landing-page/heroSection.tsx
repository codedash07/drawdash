import { motion } from "framer-motion";

const HeroSection = () => {
  // Animation variants for the text and image sections
  const sectionVariants = {
    hidden: (direction: number) => ({ x: direction * 100, opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  // Animation variants for the buttons
  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.5 } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="pt-8 flex w-full items-center justify-between">
        <motion.div
          className="flex flex-col gap-4 max-w-[700px]"
          initial="hidden"
          animate="visible"
          custom={-1}
          variants={sectionVariants}
        >
          <p className="text-7xl font-borel leading-[90px]">
            Welcome to <span className="font-semibold ">Drawdash</span>
          </p>
          <p className="text-3xl">
            Your personal digital canvas for creativity and collaboration.
          </p>
          <p>
            Drawdash is a platform born from the passion for art and design.
            It&apos;s a space where creativity meets technology, allowing
            artists and designers of all levels to explore and express their
            talents.
          </p>
          <motion.button
            className="rounded-full bg-[#6F1A07] text-white py-4 px-12 max-w-max"
            whileHover="hover"
            variants={buttonVariants}
          >
            Start Drawing
          </motion.button>
        </motion.div>

        <motion.div
          className="flex justify-end"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={sectionVariants}
        >
          <img
            src="/landing-page3.png"
            alt="landing-page"
            width="550"
            height="800"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
