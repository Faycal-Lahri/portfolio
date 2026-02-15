import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Code, List, User, Image as IconImage } from 'lucide-react';

const defaultProjects = [
    {
        id: '01',
        name: 'Nexus Cloud',
        tag: 'Academic / Cloud Storage',
        description: 'A decentralized cloud storage platform focusing on user privacy and encrypted data transfer.',
        techs: ['Laravel', 'React', 'AWS S3', 'Redis'],
        role: 'Lead Fullstack Developer',
        features: [
            'End-to-end AES-256 encryption',
            'Real-time folder synchronization',
            'Multi-regional bucket management'
        ],
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        link: '#',
        created_at: '2025-01-01'
    }
];

import EtheralShadow from './ui/etheral-shadow';

export default function Projects({ data }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = data && data.length > 0 ? data : defaultProjects;

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedProject]);

    return (
        <section id="work" className="py-32 relative z-10 w-full overflow-hidden bg-white dark:bg-black">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <EtheralShadow
                    className="w-full h-full"
                    color="var(--etheral-color)"
                    animation={{ scale: 100, speed: 80 }}
                    noise={{ scale: 1.2 }}
                    sizing="fill"
                />
            </div>

            <div className="px-6 md:px-16 container mx-auto relative z-10">
                <div className="flex flex-col gap-24">
                    {/* Header */}
                    <div className="border-b border-black/10 dark:border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 dark:text-white/60 my-2 block">Academics & Personal</span>
                            <h2 className="text-5xl md:text-6xl font-light text-black dark:text-white tracking-tighter">Selected Work</h2>
                        </div>
                        <p className="text-neutral-500 max-w-sm font-light leading-relaxed italic text-right">
                            Curated projects showcasing technical depth and creative solutions.
                        </p>
                    </div>

                    {/* List of Horizontal Cards */}
                    <div className="flex flex-col gap-20">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id || index} project={project} onClick={() => setSelectedProject(project)} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Full Screen Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}

const ProjectCard = ({ project, onClick, index }) => {
    return (
        <motion.div
            layoutId={`card-container-${project.id}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group cursor-pointer flex flex-col gap-12 items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
        >
            {/* Image Section */}
            <motion.div
                layoutId={`card-image-wrap-${project.id}`}
                className="w-full lg:w-3/5 aspect-[16/9] lg:aspect-[16/10] rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-700"
            >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                <motion.img
                    layoutId={`card-image-${project.id}`}
                    src={project.image || "/images/placeholder.jpg"}
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* Type Indicator */}
                {project.simulation_type === 'video' && (
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-20 border border-white/20">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1" />
                    </div>
                )}
            </motion.div>

            {/* Content Section */}
            <div className={`w-full lg:w-2/5 space-y-6 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'}`}>
                <div className="space-y-2">

                    <motion.h3 layoutId={`card-title-${project.id}`} className="text-4xl font-light text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors tracking-tight">
                        {project.name}
                    </motion.h3>
                </div>

                <p className="text-base text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed font-light">
                    {project.description}
                </p>

                <div className="pt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-white group/btn border-b border-black/20 dark:border-white/20 pb-1">
                        View Details
                        <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectModal = ({ project, onClose }) => {
    // Determine what media to show
    const hasSimulation = !!project.simulation_path;
    const isVideo = project.simulation_type === 'video';
    const mediaSource = project.simulation_path ? project.simulation_path : project.image;

    // Formatting features
    const features = Array.isArray(project.features) ? project.features : (project.features ? project.features.split('\n').filter(Boolean) : []);

    // Tech formatted as paragraphs/multiline
    // AdminController ensures it's an array if coming from DB, but defaults might differ
    let techContent = [];
    if (Array.isArray(project.techs)) {
        techContent = project.techs;
    } else if (typeof project.techs === 'string') {
        techContent = project.techs.split('\n').filter(Boolean);
    }

    if (typeof document === 'undefined') return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950/80 backdrop-blur-md p-4 md:p-8"
        >
            <motion.div
                layoutId={`card-container-${project.id}`}
                className="w-full max-w-4xl h-auto max-h-[85vh] bg-white dark:bg-neutral-900 rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col border border-white/10 my-auto"
            >
                {/* Close Button Inside Modal */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md text-white hover:bg-black/40 hover:scale-110 transition-all border border-white/10"
                >
                    <X className="w-5 h-5" />
                </button>


                {/* Top: Media Header (Slider/Video) */}
                <div className="w-full h-[35vh] md:h-[50vh] flex-shrink-0 bg-black relative group overflow-hidden flex items-center justify-center">
                    {hasSimulation && isVideo ? (
                        <video
                            src={mediaSource}
                            className="w-full h-full object-contain bg-black"
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls={false}
                        />
                    ) : (
                        // Check if mediaSource is a JSON array string (images gallery)
                        (() => {
                            let images = [];
                            try {
                                const parsed = JSON.parse(mediaSource);
                                if (Array.isArray(parsed)) images = parsed;
                            } catch (e) {
                                // Not JSON, single string
                            }

                            if (images.length > 0) {
                                return <ImageGallery images={images} name={project.name} />;
                            } else {
                                return (
                                    <motion.img
                                        layoutId={`card-image-${project.id}`}
                                        src={mediaSource}
                                        alt={project.name}
                                        className="w-full h-full object-contain"
                                    />
                                );
                            }
                        })()
                    )}
                </div>

                {/* Bottom: Content Scrollable */}
                <div className="w-full flex-1 bg-white dark:bg-neutral-900 flex flex-col overflow-y-auto custom-scrollbar relative pb-20">

                    {/* Header Section */}
                    <div className="p-8 md:p-12 pb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >

                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                                {project.name}
                            </h2>
                            <div className="flex flex-wrap gap-6 text-xs font-mono text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 pb-8">
                                <div>
                                    <span className="block text-neutral-300 dark:text-neutral-600 uppercase tracking-widest mb-1">Role</span>
                                    <span className="text-neutral-700 dark:text-neutral-300">{project.role}</span>
                                </div>
                                <div>
                                    <span className="block text-neutral-300 dark:text-neutral-600 uppercase tracking-widest mb-1">Date</span>
                                    <span className="text-neutral-700 dark:text-neutral-300">{project.completion_date || 'Ongoing'}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="p-8 md:p-12 space-y-12">

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 flex items-center gap-2">
                                <List className="w-3 h-3" /> Overview
                            </h3>
                            <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 font-light whitespace-pre-line">
                                {project.description}
                            </p>
                        </motion.div>

                        {/* Technologies */}
                        {techContent.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-6 md:p-8"
                            >
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 flex items-center gap-2">
                                    <Code className="w-3 h-3" /> Stack & Tech
                                </h3>
                                <div className="space-y-4">
                                    {techContent.map((t, i) => {
                                        const parts = t.split(':');
                                        const hasLabel = parts.length > 1;
                                        return (
                                            <div key={i} className={`flex flex-col md:flex-row md:items-baseline gap-2 text-sm leading-relaxed ${i !== techContent.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-700/50 pb-4' : ''}`}>
                                                {hasLabel ? (
                                                    <>
                                                        <span className="font-bold text-neutral-900 dark:text-white min-w-[120px]">{parts[0]}:</span>
                                                        <span className="text-neutral-600 dark:text-neutral-300 font-light flex-1">{parts.slice(1).join(':').trim()}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-neutral-600 dark:text-neutral-300 font-light">{t}</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Objectives */}
                        {features.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> Key Objectives
                                </h3>
                                <ul className="grid grid-cols-1 gap-4">
                                    {features.map((f, i) => (
                                        <li key={i} className="flex gap-4 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors group/item">
                                            <span className="text-neutral-200 dark:text-neutral-800 font-bold text-2xl leading-none group-hover/item:text-neutral-300 dark:group-hover/item:text-neutral-600 transition-colors">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-neutral-600 dark:text-neutral-300 text-sm font-light pt-1">{f.trim()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* CTA */}
                        {project.link && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="pt-8"
                            >
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-between w-full p-4 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all transform hover:scale-[1.01] shadow-xl"
                                >
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] uppercase tracking-widest opacity-60">View Online</span>
                                        <span className="font-bold text-sm">Launch Live Project</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:bg-white/30 dark:group-hover:bg-black/20 transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </a>
                            </motion.div>
                        )}

                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

const ImageGallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images]);

    const next = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="w-full h-full relative group">
            <AnimatePresence mode='wait'>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-contain absolute inset-0 bg-neutral-900"
                />
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                        className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'bg-white w-6 h-2' : 'bg-white/30 w-2 h-2 hover:bg-white/60'}`}
                    />
                ))}
            </div>

            {/* Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 text-white z-30 border border-white/10"
                    >
                        &larr;
                    </button>
                    <button
                        onClick={next}
                        className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40 text-white z-30 border border-white/10"
                    >
                        &rarr;
                    </button>
                </>
            )}
        </div>
    );
};
