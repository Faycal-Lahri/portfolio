import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiquidEther from './components/LiquidEther';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import StaggeredMenu from './components/StaggeredMenu';

const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
    { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
    { label: 'Services', ariaLabel: 'View our services', link: '#services' },
    { label: 'Work', ariaLabel: 'View our work', link: '#work' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function Portfolio() {
    const [isDark, setIsDark] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Liquid Colors based on Theme
    const darkColors = ['#ffffff', '#808080', '#222222']; // Silver/White on Black
    const lightColors = ['#cccccc', '#666666', '#000000']; // Dark Grey/Black on White

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="min-h-screen w-full relative">
            <main ref={containerRef} className="bg-white text-black dark:bg-black dark:text-white min-h-screen w-full relative transition-colors duration-700">

                {/* Staggered Menu - New Implementation */}
                <StaggeredMenu
                    position="right"
                    items={menuItems}
                    socialItems={socialItems}
                    displaySocials
                    displayItemNumbering={true}
                    menuButtonColor={isDark ? "#ffffff" : "#000000"}
                    openMenuButtonColor={isDark ? "#ffffff" : "#000000"}
                    changeMenuColorOnOpen={true}
                    colors={isDark ? ['#000000', '#333333'] : ['#ffffff', '#cccccc']}
                    accentColor={isDark ? "#ffffff" : "#000000"}
                    isFixed={true}
                    darkMode={isDark}
                />

                {/* Theme Toggle Button - Bottom Right Redesign */}
                {/* Theme Toggle Button - Minimalist & Premium */}
                <motion.button
                    onClick={() => setIsDark(!isDark)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-8 right-8 z-[60] w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center transition-colors duration-500 overflow-hidden"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    <motion.div
                        initial={false}
                        animate={{
                            rotate: isDark ? 0 : 90,
                            scale: 1
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="relative w-6 h-6 flex items-center justify-center text-black dark:text-white"
                    >
                        {isDark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41 1.41"></path>
                                <path d="m19.07 4.93-1.41 1.41"></path>
                            </svg>
                        )}
                    </motion.div>
                </motion.button>

                {/* Global Fluid Background */}
                <div className="fixed inset-0 z-0 transition-colors duration-1000">
                    <LiquidEther
                        colors={isDark ? darkColors : lightColors}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>

                {/* Scroll Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white origin-left z-50 mix-blend-difference"
                    style={{ scaleX: scrollYProgress }}
                />

                <div className="relative z-10 w-full overflow-hidden">
                    <Hero />
                    <TechMarquee />
                    <About />
                    <Services />
                    <Projects />
                    <Contact />
                </div>

                {/* Deep Background Parallax Element */}
                <motion.div
                    className="fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay"
                    style={{ y: backgroundY }}
                >
                    <div className="absolute top-[20%] left-[10%] w-[80vw] h-[80vw] border border-black/5 dark:border-white/5 rounded-full transition-colors duration-700" />
                    <div className="absolute top-[40%] right-[10%] w-[60vw] h-[60vw] border border-black/5 dark:border-white/5 rounded-full transition-colors duration-700" />
                </motion.div>
            </main>
        </div>
    );
}
