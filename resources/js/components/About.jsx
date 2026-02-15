import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextType from './TextType';

export default function About({ data }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Use a default string if data is missing, but prefer data.bio
    const bio = data?.bio || "Software Engineer Student passionate about Web Technologies, AI, & Prompting.";
    const status = data?.status || "Currently in my 4th year (2nd year of Engineering Cycle).";

    return (
        <section ref={ref} id="about" className="py-32 px-6 md:px-16 relative z-10 flex flex-col md:flex-row justify-between items-start gap-20 overflow-hidden">

            {/* Background Depth */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-neutral-900 rounded-full blur-[120px] opacity-20 -z-10 pointer-events-none" />

            <motion.div
                style={{ y: yParallax }}
                className="md:w-1/4 relative md:sticky md:top-32"
            >
                <div className="w-full h-[1px] bg-gradient-to-r from-black/10 to-transparent dark:from-white/20 mb-6" />
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400 mb-2">The Architect</h2>
                <h3 className="text-3xl font-light text-black dark:text-white mb-8">Who I Am</h3>

                {/* Profile Image moved here */}
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img
                        src={data?.image || "/images/profile.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            <div className="md:w-3/4 flex flex-col gap-16 relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <div className="flex flex-col gap-6 relative">
                        {/*
                            Ghost Element for Layout Sizing
                            This contains the full text but is invisible, ensuring the container
                            is always the full correct height from the start.
                         */}
                        <div
                            className="text-4xl md:text-6xl font-extralight leading-[1.1] tracking-tight opacity-0 select-none pointer-events-none whitespace-pre-wrap"
                            aria-hidden="true"
                        >
                            {bio}
                        </div>

                        {/* Actual Typing Animation Overlay */}
                        <div className="absolute top-0 left-0 w-full h-full text-4xl md:text-6xl font-extralight leading-[1.1] text-black dark:text-white tracking-tight">
                            <TextType
                                text={[bio]}
                                typingSpeed={50}
                                pauseDuration={5000}
                                showCursor={true}
                                cursorCharacter="|"
                                loop={false}
                                variableSpeedEnabled={true}
                                variableSpeedMin={30}
                                variableSpeedMax={70}
                            />
                        </div>

                        <p className="text-xl text-neutral-500 dark:text-neutral-400 font-light max-w-2xl mt-8">
                            {status}
                        </p>
                    </div>
                </motion.div>

                {/* Removed Backend Mastery and Design & UI cards as requested */}
            </div>
        </section>
    );
}
