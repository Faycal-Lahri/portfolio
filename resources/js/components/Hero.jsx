import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CircularText from './CircularText';
import Particles from './Particles';

export default function Hero({ isDarkMode }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Particle colors based on isDarkMode prop
    const particleColors = isDarkMode ? ["#ffffff"] : ["#000000"];

    return (
        <section ref={ref} className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-white dark:bg-black transition-colors duration-700">

            {/* Particles Background - Layered Behind */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles
                    particleColors={particleColors}
                    particleCount={1200}
                    particleSpread={15}
                    speed={0.2}
                    particleBaseSize={180}
                    moveParticlesOnHover={true}
                    alphaParticles={true}
                    disableRotation={false}
                    pixelRatio={2}
                />
            </div>

            {/* Background Gradient/Glow - Very Subtle Apple Style */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-neutral-100 dark:bg-zinc-900 rounded-full blur-[100px] -z-10 opacity-60" />



            {/* Main Text Content */}
            <div className="z-10 text-center relative max-w-[95vw] flex flex-col justify-center items-center">
                <motion.div
                    style={{ y: yText, opacity: opacityText }}
                    initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-neutral-900 dark:text-white">
                        Hello There.
                    </h1>
                    <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-neutral-400 dark:text-neutral-500">
                        I am Faycal.
                    </h1>
                </motion.div>
            </div>

            {/* Bottom Left Circular Text */}
            <motion.div
                className="absolute bottom-6 left-6 md:bottom-10 md:left-20 z-40 block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <CircularText
                    text="WEB ENGINEER * AI ENTHUSIAST * "
                    spinDuration={25}
                    className="text-neutral-900 dark:text-white"
                />
            </motion.div>

            {/* Bottom Middle Scroll Indicator - Apple Style */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }}
            >
                <span className="text-[9px] uppercase tracking-[0.4em] font-extrabold text-black dark:text-white transition-colors">
                    Scroll Down
                </span>

                {/* Minimalist Mouse Pill */}
                <div className="w-[18px] h-[30px] rounded-full border border-black/10 dark:border-white/10 flex justify-center p-1.5 backdrop-blur-[2px]">
                    <motion.div
                        className="w-[1.5px] h-[4px] bg-black/40 dark:bg-white/40 rounded-full"
                        animate={{
                            y: [0, 10, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </motion.div>

        </section>
    );
}
