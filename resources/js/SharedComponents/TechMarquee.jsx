import React from 'react';
import { motion } from 'framer-motion';

// SVG Icons for High-Fidelity "Logo" look
const Icons = {
    n8n: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.03 0L3.58 4.22v9.17L12 24l8.47-4.22V8.44L12.03 0zm-.03 2.14l6.35 3.19v5.99L12 14.5l-6.3-3.17V5.33l6.3-3.19zM12 16.89l-6.35-3.19v4.27L12 21.14l6.35-3.2v-4.24L12 16.89z" />
        </svg>
    ),
    github: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.045.66-3.72-1.455-3.72-1.455-.54-1.365-1.335-1.725-1.335-1.725-1.005-.675.075-.66.075-.66 1.11.075 1.695 1.125 1.695 1.125.99 1.665 2.58 1.185 3.21.9.105-.705.39-1.185.705-1.455-2.565-.285-5.265-1.275-5.265-5.67 0-1.245.42-2.265 1.11-3.075-.105-.285-.48-1.455.105-3.015 0 0 .96-.3 3.15 1.185A10.97 10.97 0 0112 6.81c.975.015 1.935.135 2.85.405 2.19-1.485 3.15-1.185 3.15-1.185.585 1.56.21 2.73.105 3.015.69.81 1.11 1.83 1.11 3.075 0 4.41-2.7 5.37-5.295 5.655.405.345.75 1.035.75 2.085 0 1.5-.015 2.7-.015 3.06 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    ),
    react: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c4.34 0 8.082 2.805 9.38 6.727-2.67-.866-5.59-1.09-8.38-1.09-1.99 0-3.92.115-5.78.337 1.705-3.79 5.385-6.31 9.78-5.974zm-9.593 6.9c1.9 0 3.86.13 5.86.38-1.635 2.56-2.525 5.56-2.525 8.71 0 .285.008.57.022.85C2.642 16.94.887 13.56 2.407 9.08zm10.593 10.54c-2.4 0-4.66-1.57-5.59-4.22 2.83.6 5.8 1.57 9.04 2.18-1.42 1.53-3.41 2.37-5.45 2.04zm6.75-2.82c-2.68-.45-5.18-1.32-7.53-2.6 1.83-2.39 2.82-5.31 2.82-8.39 0-.61-.04-1.21-.11-1.81 2.76 1.48 4.7 4.29 4.82 7.54z" />
        </svg>
    ),
    laravel: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M8.6 1.6C8.2 1.4 7.7 1.6 7.5 2v.1l-1.4 5.2c-.3 1 0 2.1.8 2.8.2.2.5.3.7.3h.1l5.4 1.4c.5.1.8-.1 1-.5.1-.3 0-.7-.3-.9L8.4 9 9.6 4.7c.1-.4-.1-.8-.5-1l-.5-.1zM6.9 8.2l-1.7 6.3c-.6 2.3.8 4.6 3.1 5.2l.1.1 6.8 1.8c.4.1.8-.1.9-.5.1-.4-.1-.8-.5-.9l-6.8-1.8h-.1c-.9-.2-1.5-1.1-1.2-2l1.6-6-2.2-2.2z" />
        </svg>
    ),
    nextjs: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.25h-1.5l-6-9v9H7.5v-12h1.5l6 9v-9h1.5v12z" />
        </svg>
    ),
    tailwind: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.001 7.002c-1.5-.75-3-1.5-4.501-.75-1.95 1.05-1.95 4.5 0 5.25.75.25 2.25.25 3 .25s2.25 0 3-.25c1.95-.75 1.95-4.2 0-5.25-1.5-.75-3-1.5-4.5-.75zM6.001 13.002c-1.5-.75-3-1.5-4.501-.75-1.95 1.05-1.95 4.5 0 5.25.75.25 2.25.25 3 .25s2.25 0 3-.25c1.95-.75 1.95-4.2 0-5.25-1.5-.75-3-1.5-4.501-.75zM18.001 13.002c-1.5-.75-3-1.5-4.501-.75-1.95 1.05-1.95 4.5 0 5.25.75.25 2.25.25 3 .25s2.25 0 3-.25c1.95-.75 1.95-4.2 0-5.25-1.5-.75-3-1.5-4.501-.75z" />
        </svg>
    ),
    docker: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M2.25 10.5h1.75v1.75H2.25V10.5zm2.5 0h1.75v1.75H4.75V10.5zm2.5 0H9v1.75H7.25V10.5zm2.5 0h1.75v1.75H9.75V10.5zm2.5 0H14v1.75h-1.75V10.5zm2.5 0h1.75v1.75h-1.75V10.5zm-12.5-2.5h1.75v1.75H2.25V8zm2.5 0h1.75v1.75H4.75V8zm2.5 0H9v1.75H7.25V8zm2.5 0h1.75v1.75H9.75V8zM1.5 13.5h21v1.5H1.5v-1.5zm0 2.5h21a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-21a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 011.5-1.5z" />
        </svg>
    ),
    python: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M14.25.75l-.16.03c-1.55.22-3.14.22-4.66.07C7.3.7 6.5.94 5.92 1.5c-1.53 1.5-1.39 3.97-1.39 3.97h3.75v.56H3.34c-1.6 0-3.34 1.15-3.34 4.09 0 2.91 1.63 4.25 4.19 4.25h1.94v-2.34c0-2.09 1.81-2.88 3.84-2.88h2.94v3.91h-3.91v-1.5h-.56v4.6c0 1.56 1.48 2.87 3.32 2.87 1.88 0 3.32-1.31 3.32-2.87v-1.16h4.94c1.6 0 3.34-1.15 3.34-4.09 0-2.91-1.63-4.25-4.19-4.25h-1.94v2.34c0 2.09-1.81 2.88-3.84 2.88h-2.94V7.96h3.91v1.5h.56V4.86c0-1.56-1.48-2.87-3.32-2.87-1.38 0-2.55.72-3.04 1.76l-.26-.14c-.03-2.09-1.24-2.73-2.98-2.86z" />
        </svg>
    )
};

const topRow = [
    { name: "n8n", Icon: Icons.n8n, color: "#FF6D5A" },
    { name: "Github", Icon: Icons.github, color: "#181717" },
    { name: "React", Icon: Icons.react, color: "#61DAFB" },
    { name: "Laravel", Icon: Icons.laravel, color: "#FF2D20" },
    { name: "Next.js", Icon: Icons.nextjs, color: "#000000" },
    { name: "Tailwind", Icon: Icons.tailwind, color: "#38B2AC" },
];

const bottomRow = [
    { name: "Docker", Icon: Icons.docker, color: "#2496ED" },
    { name: "Python", Icon: Icons.python, color: "#3776AB" },
    { name: "Github", Icon: Icons.github, color: "#ffffff" },
    { name: "n8n", Icon: Icons.n8n, color: "#FF6D5A" },
    { name: "React", Icon: Icons.react, color: "#61DAFB" },
    { name: "Laravel", Icon: Icons.laravel, color: "#FF2D20" },
];

export default function TechMarquee({ technologies = [] }) {

    // Prepare data
    let finalTopRow = topRow;
    let finalBottomRow = bottomRow;

    if (technologies && technologies.length > 0) {
        // Map DB data to component format
        const formattedTechs = technologies.map(t => ({
            name: t.name,
            color: t.color || '#000000',
            // Create a component that renders the image
            Icon: (props) => (
                <img
                    src={t.icon}
                    alt={t.name}
                    className="w-full h-full object-contain"
                    {...props}
                    // Remove fill since it's an image, or use CSS filter if needed
                    style={{ filter: t.color ? 'none' : 'grayscale(100%)' }}
                />
            )
        }));

        // Split into two rows
        const midpoint = Math.ceil(formattedTechs.length / 2);
        finalTopRow = formattedTechs.slice(0, midpoint);
        finalBottomRow = formattedTechs.slice(midpoint);

        // If only a few items, duplicate them to ensure marquee fills width
        if (finalTopRow.length < 5) finalTopRow = [...finalTopRow, ...finalTopRow, ...finalTopRow];
        if (finalBottomRow.length < 5) finalBottomRow = [...finalBottomRow, ...finalBottomRow, ...finalBottomRow];
    }

    return (
        <section className="py-0 relative z-20 overflow-hidden">
            {/* Horizontal Container */}
            <div className="relative z-20 w-full">

                {/* Row 1 */}
                <div className="bg-white dark:bg-black py-4 border-y border-neutral-100 dark:border-white/5 relative z-20 overflow-hidden">
                    <MarqueeTrack items={finalTopRow} direction="left" theme="light" />
                </div>

                {/* Row 2 */}
                <div className="bg-white dark:bg-black py-4 border-b border-neutral-100 dark:border-white/5 relative z-10 overflow-hidden -mt-[1px]">
                    <MarqueeTrack items={finalBottomRow} direction="right" theme="light" />
                </div>

            </div>
        </section>
    );
}

function MarqueeTrack({ items, direction, theme }) {
    return (
        <motion.div
            className="flex gap-8 md:gap-24 whitespace-nowrap min-w-max px-6 md:px-12"
            animate={{
                x: direction === 'left' ? [0, -1000] : [-1000, 0]
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            {/* Repeat to ensure infinite scroll illusion */}
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-8 md:gap-24 items-center">
                    {items.map((tech, index) => (
                        <div key={index} className="flex items-center gap-4 group cursor-default">
                            {/* Logo Icon */}
                            <div style={{ color: tech.color }} className="text-black dark:text-white transition-colors duration-300">
                                <tech.Icon className={`w-10 h-10 md:w-12 md:h-12 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
                            </div>

                            {/* Text Label - Always Dark in Light Mode for Apple feel */}
                            <span className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-neutral-800 dark:text-neutral-200">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </motion.div>
    );
}
