import { motion } from 'framer-motion';
import { FloatingPaths } from '@/components/ui/background-paths';
import { Gravity, MatterBody } from '@/components/ui/gravity';
import { DottedSurface } from '@/components/ui/dotted-surface';

const defaultCategories = [
    {
        title: "Programming Languages",
        skills: ["JavaScript (ES6+)", "PHP", "Python", "Java", "C++", "SQL"]
    },
    {
        title: "Frameworks & Libraries",
        skills: ["React.js", "Laravel", "Tailwind CSS", "Node.js", "Flask", "Bootstrap"]
    },
    {
        title: "Bases de données",
        skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
        title: "Outils & DevOps",
        skills: ["Git / GitHub", "Docker", "Postman", "Jira", "Figma", "Vercel"]
    }
];

export default function Skills({ data }) {
    // ... existing logic ...

    // We can remove the logic related to grouping etc if it's already done elsewhere,
    // but the instruction is to focus on integrating FloatingPaths and fixing theme.

    // ... logic ...

    // ... technicalCategories definition ...

    // ... softSkills definition ...

    // (I will keep the logic and just update the returned JSX)

    let technicalCategories = [];
    let softSkills = [];

    if (data) {
        Object.entries(data).forEach(([categoryName, skills]) => {
            if (!skills || skills.length === 0) return;
            const type = skills[0].type || 'technical';
            if (type === 'soft') {
                softSkills.push(...skills);
            } else {
                technicalCategories.push({
                    title: categoryName,
                    skills: skills.map(s => s.name)
                });
            }
        });
    } else {
        technicalCategories = defaultCategories;
    }

    return (
        <section id="skills" className="relative z-10 w-full bg-white dark:bg-black transition-colors duration-700">

            {/* --- Technical Skills Section with Background Paths --- */}
            <div className="relative py-32 px-6 md:px-16 overflow-hidden">
                {/* Background Paths Integration - Only for Capabilities Section */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-70">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                        <div className="md:w-1/3">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-900 dark:text-neutral-100 mb-2 block">Technical Stack</span>
                            <h2 className="text-5xl font-light text-black dark:text-white leading-tight">Capabilities</h2>
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-xl text-neutral-900 dark:text-neutral-200 font-light leading-relaxed">
                                Focusing on scalable web architectures, AI integration, and modern frontend frameworks. I prioritize clean code and performance.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {technicalCategories.map((category, index) => (
                            <div key={index} className="flex flex-col gap-6 p-6 rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-neutral-100 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20 transition-colors duration-300">
                                <h3 className="text-sm font-bold border-b border-black/10 dark:border-white/10 pb-4 text-black dark:text-white uppercase tracking-widest leading-none">
                                    {category.title}
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {category.skills.map((skill, sIndex) => (
                                        <li key={sIndex} className="text-neutral-900 dark:text-neutral-100 font-medium text-sm flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                                            <span>{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* --- Soft Skills Section (with Gravity) --- */}
            {softSkills.length > 0 && (
                <div className="bg-white dark:bg-black pt-20 pb-0 border-t border-neutral-200 dark:border-white/10 overflow-hidden relative">
                    {/* Background Dotted Surface */}
                    <DottedSurface className="opacity-100" />

                    <div className="max-w-7xl mx-auto px-6 md:px-16 mb-8 relative z-10">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400 mb-2 block">Interpersonal</span>
                        <h2 className="text-4xl font-light text-black dark:text-white leading-tight">Soft Skills</h2>
                    </div>

                    <div className="w-full h-[500px] relative font-sans z-10">
                        <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
                            {softSkills.map((skill, index) => (
                                <MatterBody
                                    key={index}
                                    matterBodyOptions={{ friction: 0.5, restitution: 0.8 }}
                                    x={`${30 + (index * 20) % 40}%`}
                                    y={`${(index * 10) % 20}%`}
                                    angle={(Math.random() - 0.5) * 45}
                                >
                                    <div className="px-6 py-3 rounded-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/20 shadow-sm text-sm font-medium tracking-wide select-none whitespace-nowrap">
                                        {skill.name}
                                    </div>
                                </MatterBody>
                            ))}
                        </Gravity>
                    </div>
                </div>
            )}
        </section>
    );
}
