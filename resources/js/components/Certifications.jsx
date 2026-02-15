import React from 'react';
import { motion } from 'framer-motion';
import { PixelTrail } from "@/Components/ui/pixel-trail";
import { useScreenSize } from "@/Components/hooks/use-screen-size";

const defaultCertifications = [
    {
        title: "Frontend Development Libraries",
        org: "freeCodeCamp",
        date: "2023",
        link: "#",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "PHP & Laravel Mastery",
        org: "Udemy Professional",
        date: "2022",
        link: "#",
        image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Agile Project Management",
        org: "Google Career",
        date: "2023",
        link: "#",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function Certifications({ data }) {
    const certItems = data && data.length > 0 ? data : defaultCertifications;
    const screenSize = useScreenSize();

    return (
        <section id="certifications" className="py-24 md:py-32 px-6 relative z-10 bg-neutral-50 dark:bg-black overflow-hidden">
            {/* Pixel Trail Background */}
            <div className="absolute inset-0 z-0 select-none">
                <PixelTrail
                    pixelSize={screenSize.lessThan('md') ? 48 : 80}
                    fadeDuration={500}
                    delay={100}
                    pixelClassName="bg-orange-500/70 dark:bg-orange-400/80 rounded-full"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 md:gap-8">
                    <div>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-3 block">Validation</span>
                        <h2 className="text-3xl md:text-5xl font-medium text-neutral-900 dark:text-white leading-tight">
                            Certifications
                        </h2>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {certItems.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 rounded-[2rem] overflow-hidden hover:shadow-2xl dark:hover:shadow-neutral-900/50 transition-all duration-300"
                        >
                            {/* Image/Preview Area - Framed Look */}
                            <div className="relative aspect-[1.4] w-full bg-neutral-100 dark:bg-[#121212] flex items-center justify-center p-6 md:p-8 overflow-hidden">
                                {cert.image ? (
                                    cert.image.toLowerCase().endsWith('.pdf') ? (
                                        <div className="w-full h-full relative shadow-lg bg-white">
                                            <iframe
                                                src={`${cert.image}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                                                className="w-full h-full border-0 pointer-events-none select-none"
                                                title={cert.title}
                                                tabIndex="-1"
                                                scrolling="no"
                                            />
                                            <div className="absolute inset-0 z-10 bg-transparent" />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full relative shadow-lg bg-white group-hover:scale-[1.02] transition-transform duration-500">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white shadow-sm">
                                        <span className="text-sm text-neutral-300 font-mono">No Preview</span>
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-5 md:p-8 flex flex-col gap-3 flex-1 bg-white dark:bg-neutral-900">
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {cert.title}
                                    </h3>

                                    <div className="flex items-center justify-between mt-4">
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                                            {cert.org}
                                        </p>
                                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600 dark:bg-white/5 dark:text-neutral-300">
                                            {cert.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
