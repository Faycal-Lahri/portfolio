import React from 'react';
import { motion } from 'framer-motion';

const defaultInternships = [
    {
        company: "Tech Solutions Inc.",
        role: "Fullstack Developer Intern",
        period: "June 2023 - Sept 2023",
        missions: [
            "Participated in the redesign of the internal CRM using React and Laravel.",
            "Integrated Third-party APIs for automated data synchronization.",
            "Optimized SQL queries, reducing page load time by 30%."
        ],
        techs: ["React", "Laravel", "MySQL", "Docker"],
        learned: "Professional workflow (Gitflow), agile methodology (Scrum), and code review practices."
    },
    {
        company: "Digital Agency X",
        role: "Backend Intern",
        period: "May 2022 - Aug 2022",
        missions: [
            "Developed custom WordPress plugins for specific client needs.",
            "Maintained and updated legacy PHP applications.",
            "Implemented security patches and performance fixes."
        ],
        techs: ["PHP", "WordPress", "jQuery"],
        learned: "Debugging complex systems and client requirement analysis."
    }
];

export default function Internships({ data }) {
    const experiences = data && data.length > 0 ? data : defaultInternships;

    return (
        <section id="stages" className="py-32 px-6 md:px-16 relative z-10 bg-white dark:bg-black text-black dark:text-white transition-colors duration-700">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-8 mb-20 border-b border-black/5 dark:border-white/10 pb-12 transition-colors duration-700">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-2 block">Career Path</span>
                    <h2 className="text-5xl md:text-7xl font-bold italic tracking-tighter text-black dark:text-white">Professional Experience</h2>
                </div>

                <div className="space-y-32">
                    {experiences.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                        >
                            <div className="lg:col-span-4 self-start sticky top-32">
                                <div className="mb-6">
                                    {job.logo ? (
                                        <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-lg shadow-black/5 dark:shadow-white/5 overflow-hidden mb-6 flex items-center justify-center border border-black/5 dark:border-transparent">
                                            <img src={job.logo} alt={job.title} className="w-full h-full object-contain" />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-6 text-black/20 dark:text-white/20">
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    )}
                                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded border ${job.type === 'freelance' ? 'border-amber-500/30 text-amber-600 dark:text-amber-500' :
                                        job.type === 'work' ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-500' :
                                            'border-blue-500/30 text-blue-600 dark:text-blue-500'
                                        }`}>
                                        {job.type || 'Internship'}
                                    </span>
                                </div>
                                <h3 className="text-4xl font-light mb-2 text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-default leading-tight">
                                    {job.role}
                                </h3>
                                <p className="text-xl text-black/60 dark:text-white/60 mb-8 font-medium">
                                    {job.title || job.company}
                                </p>
                                <span className="text-sm font-mono border border-black/10 dark:border-white/20 px-4 py-2 rounded-full uppercase tracking-widest text-black/60 dark:text-white/80">
                                    {job.start_date ? (
                                        <>
                                            {job.start_date} <span className="mx-2 text-black/20 dark:text-white/30">—</span> {job.end_date || 'Present'}
                                        </>
                                    ) : (
                                        job.period
                                    )}
                                </span>
                            </div>

                            <div className="lg:col-span-8 space-y-12">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-black/30 dark:text-white/30 tracking-[0.2em] mb-6">Missions & Responsibilities</h4>
                                    <ul className="space-y-6">
                                        {Array.isArray(job.missions) ? job.missions.map((mission, mIndex) => (
                                            <li key={mIndex} className="text-xl md:text-2xl font-light leading-relaxed border-l-2 border-black/5 dark:border-white/10 pl-8 hover:border-black dark:hover:border-white transition-all duration-500 text-black/80 dark:text-white/90">
                                                {mission}
                                            </li>
                                        )) : (
                                            <li className="text-xl md:text-2xl font-light leading-relaxed border-l-2 border-black/5 dark:border-white/10 pl-8 text-black/80 dark:text-white/90">
                                                {job.missions}
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="pt-12 border-t border-black/5 dark:border-white/5 transition-colors duration-700">
                                    <h4 className="text-xs font-bold uppercase text-black/30 dark:text-white/30 tracking-[0.2em] mb-4">Technologies</h4>
                                    <p className="text-black/60 dark:text-white/80 font-mono text-sm leading-relaxed">
                                        {Array.isArray(job.techs) ? job.techs.join(" / ") : job.techs}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
