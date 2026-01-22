import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const yI = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yName = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section ref={ref} className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden perspective-1000">

            {/* Nav Pills - Name */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-8 left-4 md:left-8 z-50 mix-blend-difference"
            >
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/10 pr-5 pl-1 py-1.5 rounded-full shadow-2xl scale-75 md:scale-100 origin-left">
                    <div className="w-9 h-9 rounded-full overflow-hidden relative border border-white/10 bg-black">
                        <img src="/images/profile.png" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-semibold tracking-widest text-black dark:text-white uppercase">Faycal Lahri</span>
                    <span className="flex h-2 w-2 relative ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white"></span>
                    </span>
                </div>
            </motion.div>





            {/* Floating Text Layers */}
            <div className="z-10 text-center relative max-w-[90vw] flex flex-col justify-center items-center mix-blend-screen">
                <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.5em" }}
                    animate={{ opacity: 0.5, letterSpacing: "0.2em" }}
                    transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
                    className="text-[10px] md:text-sm font-medium text-black dark:text-white uppercase mb-4 md:mb-12"
                >
                    Antigravity Portfolio
                </motion.p>

                <div className="relative perspective-text">
                    <motion.h1
                        style={{ y: yI }}
                        className="text-[20vw] md:text-[15vw] leading-[0.8] font-bold text-black dark:text-white tracking-tighter mix-blend-overlay opacity-50 blur-[2px]"
                    >
                        I AM
                    </motion.h1>

                    <motion.h1
                        style={{ y: yName }}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[20vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-black via-black to-neutral-400 dark:from-white dark:via-white dark:to-neutral-500"
                    >
                        FAYCAL
                    </motion.h1>
                </div>
            </div>

            {/* Scroll Interaction */}
            <motion.div
                className="absolute bottom-12 flex flex-col items-center gap-4 cursor-pointer mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.1 }}
            >
                <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 w-full h-1/2 bg-white"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
