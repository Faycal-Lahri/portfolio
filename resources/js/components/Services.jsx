import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
    {
        id: '01',
        title: 'Full Stack Development',
        desc: 'End-to-end custom software solutions.',
        skills: ['Laravel', 'React', 'Node.js', 'SQL']
    },
    {
        id: '02',
        title: 'Interactive Design',
        desc: 'Websites that feel alive and responsive.',
        skills: ['Framer Motion', 'WebGL', 'GSAP', 'Canvas']
    },
    {
        id: '03',
        title: 'Product Strategy',
        desc: 'Turning vague ideas into concrete roadmaps.',
        skills: ['MVP Planning', 'Architecture', 'UI/UX', 'Consulting']
    },
    {
        id: '04',
        title: 'Performance Tuning',
        desc: 'Optimizing for speed, SEO, and scale.',
        skills: ['Optimization', 'Server Config', 'Caching', 'Auditing']
    },
];

export default function Services() {
    return (
        <section id="services" className="py-32 px-6 md:px-16 relative z-10 border-t border-white/5 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 my-4 block">Capabilities</span>
                    <h2 className="text-5xl md:text-7xl font-light text-black tracking-tighter">What I Do</h2>
                </div>
                <p className="text-neutral-500 max-w-sm text-right mt-6 md:mt-0 font-light">
                    Comprehensive solutions for the modern web.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-px bg-black/10 border border-black/10">
                {services.map((s, i) => (
                    <ServiceCard key={i} service={s} index={i} />
                ))}
            </div>
        </section>
    );
}

function ServiceCard({ service, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative bg-black/5 p-10 md:p-16 hover:bg-black/10 transition-colors duration-500 cursor-default overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-6 opacity-20 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-black to-transparent group-hover:opacity-100 transition-opacity duration-700">
                {service.id}
            </div>

            <h3 className="text-3xl font-light text-black mb-4 group-hover:translate-x-2 transition-transform duration-500">{service.title}</h3>
            <p className="text-neutral-600 mb-8 max-w-md group-hover:text-black transition-colors duration-500">{service.desc}</p>

            <div className="flex flex-wrap gap-2">
                {service.skills.map((skill, si) => (
                    <span key={si} className="text-[10px] uppercase tracking-wider border border-black/10 px-3 py-1 rounded-full text-neutral-500 group-hover:border-black/30 group-hover:text-black transition-all duration-300">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </motion.div>
    );
}
