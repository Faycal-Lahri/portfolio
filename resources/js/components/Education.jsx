import React from 'react';
import { motion } from 'framer-motion';

const defaultEducation = [
    {
        degree: "Master in Software Engineering",
        school: "Engineering School (Sample)",
        period: "2023 - Present",
        specialty: "Fullstack Architecture & Cloud Computing",
        description: "Specializing in distributed systems, security, and advanced web technologies."
    },
    {
        degree: "Bachelor in Computer Science",
        school: "University of Science (Sample)",
        period: "2020 - 2023",
        specialty: "Core Programming & Algorithms",
        description: "Focus on data structures, operating systems, and object-oriented design."
    }
];

// Helper to format dates
const formatDate = (dateString, isEnd = false) => {
    if (!dateString) return isEnd ? "Present" : "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
};

export default function Education({ data }) {
    // If no data, use default but aligned to new structure if possible, or just mapped correctly.
    // Assuming data comes from DB with new fields.
    const educationItems = data && data.length > 0 ? data : defaultEducation;

    return (
        <section id="education" className="py-32 px-6 md:px-16 relative z-10 bg-neutral-50 dark:bg-black transition-colors duration-700">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    <div className="md:w-1/3">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400 mb-2 block">Academic Path</span>
                        <h2 className="text-5xl font-light text-black dark:text-white leading-tight">Formation</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-1">
                    {educationItems.map((item, index) => {
                        // Fallback logic if using old data structure in defaultEducation
                        const period = item.period || `${formatDate(item.start_date)} — ${formatDate(item.end_date, true)}`;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-black/5 dark:border-white/10 hover:px-4 transition-all duration-500"
                            >
                                <div className="md:w-1/2">
                                    <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500 mb-2 block tracking-wider uppercase">
                                        {period}
                                    </span>
                                    <h3 className="text-3xl font-medium text-black dark:text-white group-hover:text-neutral-500 dark:group-hover:text-neutral-300 transition-colors duration-300">
                                        {item.degree}
                                    </h3>
                                    <div className="flex flex-col mt-2">
                                        <p className="text-lg text-neutral-700 dark:text-neutral-300 font-light">{item.school}</p>
                                        {item.address && (
                                            <p className="text-sm text-neutral-400 dark:text-neutral-500 font-light mt-1 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                {item.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="md:w-1/2 mt-4 md:mt-0 flex flex-col items-start md:items-end text-left md:text-right">
                                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">Specialty</p>
                                    <p className="text-black dark:text-white font-light leading-relaxed max-w-md italic">
                                        "{item.specialty}"
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
