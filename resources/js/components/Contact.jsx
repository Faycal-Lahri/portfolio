import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact({ about }) {
    const [showToast, setShowToast] = useState(false);
    const [domReady, setDomReady] = useState(false);
    const email = about?.email || 'contact@portfolio.com';

    useEffect(() => {
        setDomReady(true);
    }, []);

    const handleCopyEmail = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(email);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <section id="contact" className="min-h-screen flex flex-col justify-between py-24 px-6 md:px-16 relative z-20 overflow-hidden backdrop-blur-sm">

            {/* Toast Notification - Portaled to Body to escape parent stacking context */}
            {domReady && createPortal(
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 50, x: "-50%" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="fixed bottom-8 left-1/2 z-[99999] flex items-center gap-2.5 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-none whitespace-nowrap"
                            style={{ translateX: "-50%" }}
                        >
                            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-white dark:bg-black text-black dark:text-white shrink-0">
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-[13px] font-semibold pr-1">Copied to clipboard</span>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Massive Background Text */}
            <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[13vw] font-black leading-none text-black/[0.05] dark:text-white/[0.05] select-none pointer-events-none whitespace-nowrap w-full text-center">
                STAY IN TOUCH
            </h1>

            <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 mb-12" />

            <div className="flex flex-col md:flex-row justify-between items-start gap-20 relative z-10">
                <div className="md:w-1/2">
                    <h2 className="text-6xl md:text-8xl font-black text-black dark:text-white leading-tight mb-8">
                        Where to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-black dark:from-neutral-400 dark:to-white">Find Me</span>
                    </h2>
                </div>

                <div className="md:w-1/3 flex flex-col gap-8">
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                        I am always interested in discussing new projects, opportunities in tech, or just having a chat about design.
                    </p>

                    <div className="space-y-4">
                        <a
                            href={about?.cv || "/storage/cv_de_faycal.pdf"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-4 border border-black/20 dark:border-white/20 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-xs"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Télécharger mon CV
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8">
                        {/* LinkedIn */}
                        <a
                            href={about?.linkedin || 'https://linkedin.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider py-2 border-b border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white cursor-pointer"
                        >
                            LinkedIn
                        </a>

                        {/* Email - Copy Action */}
                        <button
                            onClick={handleCopyEmail}
                            className="text-left text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider py-2 border-b border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white cursor-pointer outline-none focus:outline-none"
                        >
                            Copy Email
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end mt-24 text-neutral-600 dark:text-neutral-400 text-[10px] uppercase tracking-widest font-mono">
                <span>Casablanca, Morocco</span>
                <span>&copy; {new Date().getFullYear()} Faycal Lahri</span>
                <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                <a href="/dashboard" className="opacity-0 hover:opacity-10 cursor-default">Admin</a>
            </div>
        </section>
    );
}
