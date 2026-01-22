import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={ref} id="about" className="py-32 px-6 md:px-16 relative z-10 flex flex-col md:flex-row justify-between items-start gap-20 overflow-hidden">

            {/* Background Depth */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-neutral-900 rounded-full blur-[120px] opacity-20 -z-10 pointer-events-none" />

            <motion.div
                style={{ y: yParallax }}
                className="md:w-1/4 sticky top-32"
            >
                <div className="w-full h-[1px] bg-gradient-to-r from-white/50 to-transparent mb-6" />
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 dark:text-white/60 mb-2">The Architect</h2>
                <h3 className="text-3xl font-light text-black dark:text-white">Who I Am</h3>
            </motion.div>

            <div className="md:w-3/4 flex flex-col gap-16 relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <p className="text-4xl md:text-6xl font-extralight leading-[1.1] text-black dark:text-white tracking-tight">
                        Crafting digital <span className="text-neutral-500 font-serif italic">experiences</span> that exist somewhere between <span className="border-b border-black/20 dark:border-white/20 pb-1">poetry</span> and <span className="border-b border-black/20 dark:border-white/20 pb-1">precision</span>.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="p-8 border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] backdrop-blur-sm rounded-none hover:bg-black/10 dark:hover:bg-white/[0.04] transition-colors duration-500"
                    >
                        <h4 className="text-black dark:text-white text-lg mb-4 font-medium flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full" />
                            Engineering
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                            I build robust, scalable architectures using Laravel and React. Code is my medium, cleaner and more efficient with every iteration.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="p-8 border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02] backdrop-blur-sm rounded-none hover:bg-black/10 dark:hover:bg-white/[0.04] transition-colors duration-500"
                    >
                        <h4 className="text-black dark:text-white text-lg mb-4 font-medium flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full" />
                            Design
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                            Minimalism isn't just about less. It's about enough. I adhere to strict aesthetic principles inspired by Swiss design and modern interface patterns.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
