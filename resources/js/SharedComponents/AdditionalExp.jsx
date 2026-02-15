import React from 'react';
import { motion } from 'framer-motion';

const defaultExtraExp = [
    {
        title: "Freelance Web Developer",
        type: "Freelance",
        description: "Assisting small businesses in their digital transition by creating custom landing pages and SEO-optimized sites.",
        icon: "briefcase"
    },
    {
        title: "IT Workshop Lead",
        type: "Association",
        description: "Organized weekly workshops on web basics (HTML/CSS) for junior students in our engineering club.",
        icon: "book"
    }
];

const IconMap = {
    briefcase: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    book: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    )
};

export default function AdditionalExp({ data }) {
    const extraExpItems = data && data.length > 0 ? data : defaultExtraExp;
    return (
        <section id="additional" className="py-32 px-6 md:px-16 relative z-10 bg-neutral-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="md:w-1/2">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2 block">Beyond Academy</span>
                        <h2 className="text-5xl font-light text-black leading-tight">Expériences Complémentaires</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1">
                    {extraExpItems.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="p-12 border-b border-black/5 bg-white group hover:bg-neutral-900 transition-all duration-500 overflow-hidden relative"
                        >
                            <div className="relative z-10">
                                <span className="p-3 inline-flex bg-neutral-100 rounded-xl mb-8 group-hover:bg-white transition-colors duration-500 text-black">
                                    {IconMap[exp.icon] || IconMap.briefcase}
                                </span>
                                <h3 className="text-3xl font-medium text-black group-hover:text-white transition-colors mb-2">
                                    {exp.title}
                                </h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6 group-hover:text-white/40">{exp.type}</p>
                                <p className="text-lg text-neutral-500 group-hover:text-white/70 font-light leading-relaxed max-w-sm">
                                    {exp.description}
                                </p>
                            </div>

                            {/* Visual highlight on hover */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
