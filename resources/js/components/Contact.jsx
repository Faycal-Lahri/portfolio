import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [hovered, setHovered] = useState(false);

    return (
        <section id="contact" className="min-h-screen flex flex-col justify-between py-24 px-6 md:px-16 relative relative z-20 overflow-hidden backdrop-blur-sm">

            {/* Massive Background Text */}
            <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[30vw] font-black leading-none text-black/[0.03] dark:text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
                SAY HELLO
            </h1>

            <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 mb-12" />

            <div className="flex flex-col md:flex-row justify-between items-start gap-20 relative z-10">
                <div className="md:w-1/2">
                    <h2 className="text-6xl md:text-8xl font-black text-black dark:text-white leading-tight mb-8">
                        Let's start a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-black dark:to-white">Project?</span>
                    </h2>
                </div>

                <div className="md:w-1/3 flex flex-col gap-8">
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                        I am always interested in discussing new projects, opportunities in tech, or just having a chat about design.
                    </p>

                    <motion.a
                        href="mailto:contact@portfolio.com"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="relative w-full aspect-[4/1] bg-black dark:bg-white rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
                    >
                        <motion.div
                            className="absolute inset-0 bg-neutral-800 dark:bg-neutral-200"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                        <span className="relative z-10 text-white dark:text-brand-black text-xl font-bold uppercase tracking-widest">Get in Touch</span>
                    </motion.a>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {['Instagram', 'Twitter', 'LinkedIn', 'Github'].map((social) => (
                            <a key={social} href="#" className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider py-2 border-b border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end mt-24 text-neutral-600 text-[10px] uppercase tracking-widest font-mono">
                <span>Casablanca, Morocco</span>
                <span>&copy; {new Date().getFullYear()} Faycal Lahri</span>
                <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </section>
    );
}
