import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
    {
        id: '01',
        name: 'Etherial',
        tag: 'Financial App',
        image: 'linear-gradient(to bottom right, #111, #222)',
        link: '#'
    },
    {
        id: '02',
        name: 'Void',
        tag: 'E-Commerce',
        image: 'linear-gradient(to bottom right, #000, #333)',
        link: '#'
    },
    {
        id: '03',
        name: 'Nexus',
        tag: 'Dashboard',
        image: 'linear-gradient(to bottom right, #1a1a1a, #000)',
        link: '#'
    },
    {
        id: '04',
        name: 'Solstice',
        tag: 'Social Media',
        image: 'linear-gradient(to bottom right, #222, #111)',
        link: '#'
    },
];

export default function Projects() {
    return (
        <section id="work" className="py-0 relative z-10 w-full">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 pointer-events-none">
                <h2 className="text-[12vw] font-black opacity-[0.03] text-black dark:text-white absolute">WORKS</h2>
            </div>

            <div className="relative -mt-[100vh] pt-32 pb-32 px-6 md:px-16">
                <div className="flex flex-col gap-32">
                    <div className="border-b border-black/10 dark:border-white/10 pb-8 mb-8 flex justify-between items-end">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 dark:text-white my-2 block">Selected Projects</span>
                            <h2 className="text-5xl font-light text-black dark:text-white">Recent Work</h2>
                        </div>
                    </div>

                    {projects.map((project, index) => (
                        <ProjectItem key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectItem({ project, index }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the "image"
    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity }}
            className={`flex flex-col md:flex-row gap-12 items-center w-full group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="md:w-3/5 w-full aspect-video overflow-hidden relative border border-black/5 dark:border-white/5 bg-neutral-100 dark:bg-neutral-900">
                <div className="absolute inset-0 bg-white/20 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <motion.div
                    style={{ background: project.image, y }}
                    className="w-full h-[120%] absolute top-[-10%]"
                />
                {/* Simulated UI details */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="md:w-2/5 flex flex-col gap-6">
                <span className="text-sm font-mono text-neutral-500">0{index + 1} / {project.tag}</span>
                <h3 className="text-6xl font-black text-black dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-neutral-500 dark:group-hover:from-white dark:group-hover:to-neutral-500 transition-all duration-500 cursor-pointer">
                    {project.name}
                </h3>
                <div className="w-12 h-1 bg-black/10 dark:bg-white/10 group-hover:w-full transition-all duration-700 ease-out" />
                <a href={project.link} className="text-sm uppercase tracking-widest text-black dark:text-white mt-4 border border-black/20 dark:border-white/20 px-6 py-3 self-start hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 rounded-full">
                    View Case Study
                </a>
            </div>
        </motion.div>
    );
}
