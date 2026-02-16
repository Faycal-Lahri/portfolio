import { Head, useForm, router, usePage, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidEther from '@/Components/LiquidEther';

// Icons (Simple SVG inline for purity)
const IconApps = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconUser = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconBook = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const IconCode = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const IconBriefcase = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const IconGlobe = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const IconAward = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
const IconCpu = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;

const SidebarItem = ({ active, icon, label, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active
            ? 'bg-white/10 text-white shadow-lg shadow-white/5 backdrop-blur-md border border-white/10'
            : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
    >
        <div className={`p-2 rounded-lg transition-colors ${active ? 'bg-white text-black' : 'bg-transparent text-current group-hover:text-white'}`}>
            {icon}
        </div>
        <span className="text-sm font-medium tracking-wide">{label}</span>
        {active && <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />}
    </button>
);

export default function Dashboard({ auth, about, education, skills, technologies, projects, internships, certifications, additionalExp }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('about');
    const [isLoading, setIsLoading] = useState(true);

    const [editingEdu, setEditingEdu] = useState(null);
    const [editingSkill, setEditingSkill] = useState(null);
    const [editingTech, setEditingTech] = useState(null);
    const [editingInternship, setEditingInternship] = useState(null);
    const [editingCert, setEditingCert] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [editingAdditional, setEditingAdditional] = useState(null);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 800);
    }, []);

    const { data: aboutData, setData: setAboutData, post: postAbout } = useForm({
        bio: about?.bio || '',
        status: about?.status || '',
        image: null,
        cv: null,
        email: about?.email || '',
        linkedin: about?.linkedin || ''
    });
    const { data: eduData, setData: setEduData, post: postEdu, reset: resetEdu } = useForm({ degree: '', school: '', period: '', specialty: '', description: '' });
    const { data: skillData, setData: setSkillData, post: postSkill, reset: resetSkill } = useForm({ category: '', name: '', type: 'technical' });

    // New Tech Form Hook
    const { data: techData, setData: setTechData, post: postTech, reset: resetTech } = useForm({
        name: '',
        icon: null,
        color: ''
    });

    // Internship Form Hook
    const { data: internshipData, setData: setInternshipData, post: postInternship, reset: resetInternship } = useForm({
        type: 'internship',
        title: '', // Company Name or Title
        logo: null,
        role: '',
        start_date: '',
        end_date: '',
        missions: '',
        techs: ''
    });

    // Certification Form Hook
    const { data: certData, setData: setCertData, post: postCert, reset: resetCert } = useForm({
        title: '',
        org: '',
        date: '',
        link: '',
        image: null
    });

    // Project Form Hook
    const { data: projectData, setData: setProjectData, post: postProject, reset: resetProject } = useForm({
        name: '',
        tag: 'Web App',
        description: '',
        techs: '',
        role: '',
        objectives: '',
        completion_date: '',
        image: null,
        simulation: null,
        simulation_type: 'image'
    });

    // Additional Experience Form Hook
    const { data: additionalData, setData: setAdditionalData, post: postAdditional, reset: resetAdditional } = useForm({
        title: '',
        type: '',
        description: '',
        icon: ''
    });

    const submitAbout = (e) => {
        e.preventDefault();
        postAbout(route('admin.about.update'), {
            forceFormData: true
        });
    };

    const submitProject = (e) => {
        e.preventDefault();
        const url = editingProject ? route('admin.projects.update', editingProject.id) : route('admin.projects.store');
        postProject(url, {
            onSuccess: () => {
                resetProject();
                setEditingProject(null);
            },
            forceFormData: true
        });
    };
    const submitEdu = (e) => {
        e.preventDefault();
        const url = editingEdu ? route('admin.education.update', editingEdu.id) : route('admin.education.store');
        postEdu(url, {
            onSuccess: () => {
                resetEdu();
                setEditingEdu(null);
            }
        });
    };
    const submitSkill = (e) => {
        e.preventDefault();
        const url = editingSkill ? route('admin.skills.update', editingSkill.id) : route('admin.skills.store');
        postSkill(url, {
            onSuccess: () => {
                resetSkill();
                setEditingSkill(null);
            }
        });
    };
    const submitTech = (e) => {
        e.preventDefault();
        const url = editingTech ? route('admin.technologies.update', editingTech.id) : route('admin.technologies.store');
        postTech(url, {
            onSuccess: () => {
                resetTech();
                setEditingTech(null);
            },
            forceFormData: true
        });
    };
    const submitInternship = (e) => {
        e.preventDefault();
        const url = editingInternship ? route('admin.internships.update', editingInternship.id) : route('admin.internships.store');
        postInternship(url, {
            onSuccess: () => {
                resetInternship();
                setEditingInternship(null);
            },
            forceFormData: true
        });
    };

    const submitCert = (e) => {
        e.preventDefault();
        const url = editingCert ? route('admin.certifications.update', editingCert.id) : route('admin.certifications.store');
        postCert(url, {
            onSuccess: () => {
                resetCert();
                setEditingCert(null);
            },
            forceFormData: true
        });
    };

    const submitAdditional = (e) => {
        e.preventDefault();
        const url = editingAdditional ? route('admin.additional.update', editingAdditional.id) : route('admin.additional.store');
        postAdditional(url, {
            onSuccess: () => {
                resetAdditional();
                setEditingAdditional(null);
            }
        });
    };

    const startEditEdu = (e) => {
        setEditingEdu(e);
        setEduData({
            degree: e.degree,
            school: e.school,
            period: e.period,
            specialty: e.specialty,
            description: e.description || ''
        });
    };

    const startEditSkill = (s) => {
        setEditingSkill(s);
        setSkillData({
            category: s.category,
            name: s.name,
            type: s.type
        });
    };

    const startEditTech = (t) => {
        setEditingTech(t);
        setTechData({
            name: t.name,
            icon: null, // Keep nul so we don't try to reuse string as file
            color: t.color || ''
        });
    };

    const startEditInternship = (i) => {
        setEditingInternship(i);
        setInternshipData({
            type: i.type,
            title: i.title,
            logo: null,
            role: i.role,
            start_date: i.start_date,
            end_date: i.end_date || '',
            missions: Array.isArray(i.missions) ? i.missions.join('\n') : i.missions,
            techs: Array.isArray(i.techs) ? i.techs.join(', ') : i.techs
        });
    };

    const startEditCert = (c) => {
        setEditingCert(c);
        setCertData({
            title: c.title,
            org: c.org,
            date: c.date,
            link: c.link || '',
            image: null
        });
    };

    const startEditProject = (p) => {
        setProjectData({
            name: p.name,
            tag: p.tag || 'Web App',
            description: p.description,
            techs: Array.isArray(p.techs) ? p.techs.join('\n') : p.techs,
            role: p.role || '',
            objectives: Array.isArray(p.features) ? p.features.join('\n') : (p.objectives || ''),
            completion_date: p.completion_date || '',
            image: null,
            simulation: null,
            simulation_type: p.simulation_type || 'image'
        });
        setEditingProject(p);
    };

    const startEditAdditional = (a) => {
        setEditingAdditional(a);
        setAdditionalData({
            title: a.title,
            type: a.type || '',
            description: a.description || '',
            icon: a.icon || ''
        });
    };

    const handleDelete = (routeName, id) => { if (confirm('Delete item?')) router.delete(route(routeName, id)); };

    const variants = {
        hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
        exit: { opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.2 } }
    };

    return (
        <div className="h-screen w-screen bg-black text-white overflow-hidden relative selection:bg-white/30 selection:text-white font-sans">
            <Head title="Control Deck" />

            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={['#000000', '#111111', '#222222']}
                    mouseForce={30}
                    cursorSize={150}
                    force={1.5}
                    isViscous={true}
                    viscous={25}
                    autoDemo={true}
                    autoSpeed={0.2}
                />
            </div>

            {/* Ambient Noise/Texture for 'Physical' Feel */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150 contrast-150 mix-blend-overlay"></div>

            {/* Main Interface */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8 perspective-1000">

                <motion.div
                    initial={{ opacity: 0, rotateX: 5, y: 50 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-7xl h-full max-h-[90vh] bg-[#0a0a0a]/60 backdrop-blur-[40px] rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex overflow-hidden ring-1 ring-white/5"
                >

                    {/* Sidebar OS Style */}
                    <div className="w-[280px] h-full flex flex-col bg-white/[0.02] border-r border-white/5 p-6 backdrop-blur-xl shrink-0">
                        <div className="mb-10 pl-2 opacity-50 text-[10px] font-mono tracking-[0.2em] uppercase">System v1.0</div>

                        <nav className="flex flex-col gap-2 flex-grow">
                            <SidebarItem onClick={() => setActiveTab('about')} active={activeTab === 'about'} icon={<IconUser className="w-5 h-5" />} label="Identity" />
                            <SidebarItem onClick={() => setActiveTab('education')} active={activeTab === 'education'} icon={<IconBook className="w-5 h-5" />} label="Knowledge" />
                            <SidebarItem onClick={() => setActiveTab('skills')} active={activeTab === 'skills'} icon={<IconApps className="w-5 h-5" />} label="Arsenal" />
                            <SidebarItem onClick={() => setActiveTab('technologies')} active={activeTab === 'technologies'} icon={<IconCpu className="w-5 h-5" />} label="Technologies" />
                            <SidebarItem onClick={() => setActiveTab('projects')} active={activeTab === 'projects'} icon={<IconCode className="w-5 h-5" />} label="Creations" />
                            <SidebarItem onClick={() => setActiveTab('internships')} active={activeTab === 'internships'} icon={<IconBriefcase className="w-5 h-5" />} label="Experience" />
                            <SidebarItem onClick={() => setActiveTab('certifications')} active={activeTab === 'certifications'} icon={<IconAward className="w-5 h-5" />} label="Credentials" />
                            <SidebarItem onClick={() => setActiveTab('additional')} active={activeTab === 'additional'} icon={<IconGlobe className="w-5 h-5" />} label="Extra" />
                        </nav>

                        <div className="mt-auto border-t border-white/10 pt-6">
                            <div className="flex items-center gap-4 px-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-black border border-white/20 flex items-center justify-center text-xs font-bold shadow-inner">Sys</div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-white/90">Local Admin</span>
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Connected</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content View */}
                    <div className="flex-1 h-full relative overflow-hidden bg-gradient-to-br from-transparent to-white/[0.02]">
                        {/* Header Area */}
                        <div className="absolute top-0 w-full h-24 flex items-center justify-between px-10 border-b border-white/5 bg-black/10 backdrop-blur-sm z-20">
                            <h2 className="text-2xl font-light text-white tracking-tight flex items-center gap-3">
                                <span className="opacity-40 font-mono text-sm uppercase mr-2">//</span>
                                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                            </h2>
                            {flash?.message && (
                                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono tracking-wide flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    {flash.message}
                                </motion.div>
                            )}
                        </div>

                        {/* Scrollable Content */}
                        <div className="h-full overflow-y-auto overflow-x-hidden p-10 pt-32 pb-20 custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="max-w-4xl mx-auto"
                                >
                                    {activeTab === 'about' && (
                                        <div className="grid grid-cols-1 gap-8">
                                            {/* Profile Image Input */}
                                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 transition-colors group">
                                                <label className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 block group-focus-within:text-white transition-colors">Profile Image</label>
                                                <div className="flex items-center gap-6">
                                                    {about?.image && !aboutData.image && (
                                                        <img src={about.image} alt="Current" className="w-20 h-20 rounded-full object-cover border border-white/10" />
                                                    )}
                                                    <input
                                                        type="file"
                                                        onChange={e => setAboutData('image', e.target.files[0])}
                                                        className="block w-full text-sm text-slate-500
                                                          file:mr-4 file:py-2 file:px-4
                                                          file:rounded-full file:border-0
                                                          file:text-xs file:font-semibold
                                                          file:bg-white/10 file:text-white
                                                          hover:file:bg-white/20
                                                          transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 transition-colors group">
                                                <label className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 block group-focus-within:text-white transition-colors">Curriculum Vitae</label>
                                                <div className="flex items-center gap-6">
                                                    {about?.cv && (
                                                        <a href={about.cv} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full hover:bg-emerald-500/20 transition-all">View Current CV</a>
                                                    )}
                                                    <input
                                                        type="file"
                                                        onChange={e => setAboutData('cv', e.target.files[0])}
                                                        accept=".pdf,.doc,.docx"
                                                        className="block w-full text-sm text-slate-500
                                                          file:mr-4 file:py-2 file:px-4
                                                          file:rounded-full file:border-0
                                                          file:text-xs file:font-semibold
                                                          file:bg-white/10 file:text-white
                                                          hover:file:bg-white/20
                                                          transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors group">
                                                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2 block group-focus-within:text-white transition-colors">Email Address</label>
                                                    <input
                                                        className="w-full bg-transparent border-0 text-white font-medium p-0 focus:ring-0 placeholder:text-white/10"
                                                        value={aboutData.email}
                                                        onChange={e => setAboutData('email', e.target.value)}
                                                        placeholder="email@example.com"
                                                    />
                                                </div>
                                                <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors group">
                                                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2 block group-focus-within:text-white transition-colors">LinkedIn URL</label>
                                                    <input
                                                        className="w-full bg-transparent border-0 text-white font-medium p-0 focus:ring-0 placeholder:text-white/10"
                                                        value={aboutData.linkedin}
                                                        onChange={e => setAboutData('linkedin', e.target.value)}
                                                        placeholder="https://linkedin.com/..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors group">
                                                <label className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 block group-focus-within:text-white transition-colors">Biography</label>
                                                <textarea
                                                    className="w-full h-48 bg-transparent border-0 text-xl font-light text-white/80 focus:ring-0 resize-none p-0 leading-relaxed placeholder:text-white/10"
                                                    value={aboutData.bio}
                                                    onChange={e => setAboutData('bio', e.target.value)}
                                                    placeholder="Enter your story..."
                                                ></textarea>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="flex-1 p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/50 text-xl font-serif italic">i</div>
                                                    <div className="flex-1">
                                                        <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1 block">Current Status</label>
                                                        <input
                                                            className="w-full bg-transparent border-0 text-white font-medium p-0 focus:ring-0 placeholder:text-white/10"
                                                            value={aboutData.status}
                                                            onChange={e => setAboutData('status', e.target.value)}
                                                            placeholder="e.g. Open to work"
                                                        />
                                                    </div>
                                                </div>
                                                <button onClick={submitAbout} className="h-24 w-24 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'education' && (
                                        <div className="space-y-8">
                                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                                                <form onSubmit={submitEdu} className="grid grid-cols-2 gap-6">
                                                    <div className="col-span-2 md:col-span-1 space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30">Degree</label>
                                                        <input className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={eduData.degree} onChange={e => setEduData('degree', e.target.value)} />
                                                    </div>
                                                    <div className="col-span-2 md:col-span-1 space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30">Institution</label>
                                                        <input className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={eduData.school} onChange={e => setEduData('school', e.target.value)} />
                                                    </div>
                                                    <input placeholder="2020 - 2024" className="bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={eduData.period} onChange={e => setEduData('period', e.target.value)} />
                                                    <input placeholder="Major/Specialty" className="bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={eduData.specialty} onChange={e => setEduData('specialty', e.target.value)} />
                                                    <div className="col-span-2 flex gap-4 mt-2">
                                                        <button className="flex-1 bg-white text-black py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors">
                                                            {editingEdu ? 'Update Entry' : 'Add Entry'}
                                                        </button>
                                                        {editingEdu && (
                                                            <button type="button" onClick={() => { setEditingEdu(null); resetEdu(); }} className="px-6 bg-white/10 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/20 transition-colors">Cancel</button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                {education.map(e => (
                                                    <div key={e.id} className="group relative p-6 bg-transparent border-b border-white/10 hover:bg-white/[0.02] transition-colors flex justify-between items-center">
                                                        <div>
                                                            <div className="text-xl font-light text-white">{e.degree}</div>
                                                            <div className="text-sm text-white/40 mt-1 font-mono">{e.school} <span className="mx-2 text-white/10">|</span> {e.period}</div>
                                                        </div>
                                                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => startEditEdu(e)} className="text-white/40 hover:text-white text-xs uppercase tracking-widest">Edit</button>
                                                            <button onClick={() => handleDelete('admin.education.delete', e.id)} className="text-red-400 hover:text-red-300 text-xs uppercase tracking-widest">Delete</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'skills' && (
                                        <div className="space-y-10">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {skills.map(s => (
                                                    <div key={s.id} className="relative p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all group aspect-square flex flex-col justify-between">
                                                        <div className="flex justify-between items-start">
                                                            <div className="text-[10px] uppercase text-white/20 tracking-wider truncate max-w-[70%]">{s.category}</div>
                                                            <div className={`text-[8px] px-1.5 py-0.5 rounded border ${s.type === 'soft' ? 'border-purple-500/30 text-purple-300' : 'border-blue-500/30 text-blue-300'}`}>{s.type === 'soft' ? 'SOFT' : 'TECH'}</div>
                                                        </div>
                                                        <div className="text-lg font-medium text-white/90">{s.name}</div>
                                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                            <button onClick={() => startEditSkill(s)} className="p-1.5 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg">
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                            </button>
                                                            <button onClick={() => handleDelete('admin.skills.delete', s.id)} className="p-1.5 text-white/40 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg">✕</button>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Add New Skill Card */}
                                                <div className="aspect-square rounded-2xl border border-dashed border-white/10 hover:border-white/30 transition-all flex flex-col p-4 gap-2 justify-center">

                                                    {/* Skill Type Toggles */}
                                                    <div className="flex gap-2 mb-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSkillData('type', 'technical')}
                                                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${skillData.type === 'technical' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                                        >
                                                            Technical
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setSkillData('type', 'soft')}
                                                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${skillData.type === 'soft' ? 'bg-purple-500 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                                                        >
                                                            Soft
                                                        </button>
                                                    </div>

                                                    <form onSubmit={submitSkill} className="flex flex-col gap-3 h-full">

                                                        {skillData.type === 'technical' ? (
                                                            <>
                                                                {/* Category Selection/Creation */}
                                                                <div className="relative group">
                                                                    <input
                                                                        className="w-full bg-transparent border-0 border-b border-white/20 text-xs p-0 pb-2 text-white placeholder:text-white/20 focus:ring-0 focus:border-white"
                                                                        placeholder="Category (Select or Type)"
                                                                        value={skillData.category}
                                                                        onChange={e => setSkillData('category', e.target.value)}
                                                                        list="category-options"
                                                                    />
                                                                    <datalist id="category-options">
                                                                        {[...new Set(skills.filter(s => s.type === 'technical').map(s => s.category))].map(cat => (
                                                                            <option key={cat} value={cat} />
                                                                        ))}
                                                                    </datalist>
                                                                    <label className="text-[8px] text-white/30 uppercase tracking-widest mt-1 block">Category</label>
                                                                </div>

                                                                {/* Technical Skill Name */}
                                                                <div className="mt-auto">
                                                                    <input
                                                                        className="w-full bg-transparent border-0 border-b border-white/20 text-sm p-0 pb-2 text-white placeholder:text-white/20 focus:ring-0 focus:border-white"
                                                                        placeholder="Skill Name (e.g. React)"
                                                                        value={skillData.name}
                                                                        onChange={e => setSkillData('name', e.target.value)}
                                                                    />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {/* Soft Skill Input (No Category Visible) */}
                                                                <div className="my-auto">
                                                                    <input
                                                                        className="w-full bg-transparent border-0 border-b border-purple-500/50 text-xl font-light text-white placeholder:text-white/20 focus:ring-0 focus:border-purple-400 text-center"
                                                                        placeholder="Soft Skill Title"
                                                                        value={skillData.name}
                                                                        onChange={e => {
                                                                            setSkillData(data => ({
                                                                                ...data,
                                                                                name: e.target.value,
                                                                                category: 'Soft Skills' // Auto-set category
                                                                            }));
                                                                        }}
                                                                    />
                                                                    <div className="text-center text-[8px] text-purple-300/50 uppercase tracking-widest mt-2">Personal Quality</div>
                                                                </div>
                                                            </>
                                                        )}

                                                        <button className={`mt-auto w-full py-2 rounded-lg text-xs font-bold uppercase transition-all ${skillData.type === 'technical' ? 'bg-white/10 hover:bg-white text-white hover:text-black' : 'bg-purple-500/20 hover:bg-purple-500 text-purple-200 hover:text-white'}`}>
                                                            {editingSkill ? 'Update' : 'Add'} {skillData.type === 'technical' ? 'Tech' : 'Skill'}
                                                        </button>
                                                        {editingSkill && (
                                                            <button type="button" onClick={() => { setEditingSkill(null); resetSkill(); }} className="w-full py-2 rounded-lg text-[10px] font-bold uppercase bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 transition-all">Cancel</button>
                                                        )}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'technologies' && (
                                        <div className="space-y-8">
                                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">New Technology</h3>
                                                <form onSubmit={submitTech} className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <input
                                                            className="bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20"
                                                            placeholder="Tech Name (e.g. React)"
                                                            value={techData.name}
                                                            onChange={e => setTechData('name', e.target.value)}
                                                        />
                                                        <input
                                                            className="bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20"
                                                            placeholder="Brand Color (Hex: #FF2D20)"
                                                            value={techData.color}
                                                            onChange={e => setTechData('color', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-1 relative group">
                                                            <div className="absolute inset-0 bg-white/5 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-xs uppercase tracking-widest text-white/40 pointer-events-none group-hover:border-white/50 group-hover:text-white/70 transition-all">
                                                                {techData.icon ? techData.icon.name : 'Upload SVG/Icon'}
                                                            </div>
                                                            <input
                                                                type="file"
                                                                className="w-full h-12 opacity-0 cursor-pointer"
                                                                onChange={e => setTechData('icon', e.target.files[0])}
                                                            />
                                                        </div>
                                                        <button className="w-32 h-12 bg-white text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                                                            {editingTech ? 'Update' : 'Add'}
                                                        </button>
                                                        {editingTech && (
                                                            <button type="button" onClick={() => { setEditingTech(null); resetTech(); }} className="px-4 h-12 bg-white/10 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all">Cancel</button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {technologies.map(t => (
                                                    <div key={t.id} className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center gap-4 group">
                                                        <div className="w-12 h-12 flex items-center justify-center">
                                                            <img src={t.icon} alt={t.name} className="w-full h-full object-contain" />
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-lg font-bold text-white">{t.name}</div>
                                                            <div className="text-[10px] font-mono text-white/30 uppercase mt-1">{t.color || 'No Color'}</div>
                                                        </div>
                                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                            <button onClick={() => startEditTech(t)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/40 hover:bg-white hover:text-black transition-all">
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                            </button>
                                                            <button onClick={() => handleDelete('admin.technologies.delete', t.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">✕</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Placeholder for other tabs */}
                                    {activeTab === 'internships' && (
                                        <div className="space-y-8">
                                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                                                <form onSubmit={submitInternship} className="space-y-6">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <button type="button" onClick={() => setInternshipData('type', 'work')} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${internshipData.type === 'work' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>Work</button>
                                                        <button type="button" onClick={() => setInternshipData('type', 'internship')} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${internshipData.type === 'internship' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>Internship</button>
                                                        <button type="button" onClick={() => setInternshipData('type', 'freelance')} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${internshipData.type === 'freelance' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>Freelance</button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                <label className="text-[10px] uppercase tracking-widest text-white/30">Company / Title</label>
                                                                {internshipData.logo && <span className="text-[10px] text-emerald-400">Logo Selected</span>}
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden group hover:border-white/30 transition-colors">
                                                                    {internshipData.logo ? (
                                                                        <img src={URL.createObjectURL(internshipData.logo)} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <IconBriefcase className="w-5 h-5 text-white/20" />
                                                                    )}
                                                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setInternshipData('logo', e.target.files[0])} accept="image/*" />
                                                                </div>
                                                                <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={internshipData.title} onChange={e => setInternshipData('title', e.target.value)} placeholder="e.g. Google or Project Alpha" />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] uppercase tracking-widest text-white/30">Position</label>
                                                            <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={internshipData.role} onChange={e => setInternshipData('role', e.target.value)} placeholder="e.g. Senior Developer" />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] uppercase tracking-widest text-white/30">Start Date</label>
                                                            <input required type="date" className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={internshipData.start_date} onChange={e => setInternshipData('start_date', e.target.value)} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <label className="text-[10px] uppercase tracking-widest text-white/30">End Date</label>
                                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                                    <div className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${!internshipData.end_date ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/50'}`}>
                                                                        {!internshipData.end_date && <svg className="w-2 h-2 text-black" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L4.5 8L9.5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                                    </div>
                                                                    <input
                                                                        type="checkbox"
                                                                        className="hidden"
                                                                        checked={!internshipData.end_date}
                                                                        onChange={(e) => {
                                                                            // If checking: clear date (Currently)
                                                                            // If unchecking: set to today's date so it unchecks and allows editing
                                                                            setInternshipData('end_date', e.target.checked ? '' : new Date().toISOString().split('T')[0]);
                                                                        }}
                                                                    />
                                                                    <span className={`text-[10px] uppercase tracking-widest transition-colors ${!internshipData.end_date ? 'text-white' : 'text-white/30 group-hover:text-white/50'}`}>Currently</span>
                                                                </label>
                                                            </div>
                                                            <input
                                                                type="date"
                                                                className={`w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20 transition-opacity ${!internshipData.end_date ? 'opacity-50' : ''}`}
                                                                value={internshipData.end_date}
                                                                onChange={e => setInternshipData('end_date', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30">Missions (One per line)</label>
                                                        <textarea required className="w-full h-32 bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20 resize-none" value={internshipData.missions} onChange={e => setInternshipData('missions', e.target.value)} placeholder="- Develop feature X&#10;- Optimize database Y" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30">Technologies (Comma separated)</label>
                                                        <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={internshipData.techs} onChange={e => setInternshipData('techs', e.target.value)} placeholder="React, Laravel, Docker" />
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <button className="flex-1 bg-white text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                                                            {editingInternship ? 'Update Experience' : 'Publish Experience'}
                                                        </button>
                                                        {editingInternship && (
                                                            <button type="button" onClick={() => { setEditingInternship(null); resetInternship(); }} className="px-8 bg-white/10 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/20 transition-colors">Cancel</button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="space-y-4">
                                                {internships.map(item => (
                                                    <div key={item.id} className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                        <div className="flex items-start gap-4">
                                                            {/* Logo Display Logic */}
                                                            <div className="mt-1 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                                                {item.logo ? (
                                                                    <img src={item.logo} alt={item.title} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <IconBriefcase className={`w-4 h-4 ${item.type === 'work' ? 'text-emerald-400' : item.type === 'internship' ? 'text-blue-400' : 'text-amber-400'}`} />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="flex items-baseline gap-3">
                                                                    <span className="text-lg font-bold text-white">{item.title}</span>
                                                                    <span className="text-xs font-mono text-white/40 uppercase">{item.role}</span>
                                                                </div>
                                                                <div className="text-xs text-white/30 mt-1 font-mono tracking-wide">
                                                                    {item.start_date} — {item.end_date || 'Present'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded bg-white/5 text-white/40 border border-white/5">{item.type}</span>
                                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                                <button onClick={() => startEditInternship(item)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/40 hover:bg-white hover:text-black transition-all">
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                </button>
                                                                <button onClick={() => handleDelete('admin.internships.delete', item.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">✕</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'projects' && (
                                        <div className="space-y-8">
                                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                                                <form onSubmit={submitProject} className="space-y-6">

                                                    {/* 1. Cover Image */}
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30 flex justify-between">
                                                            Cover Image
                                                            {projectData.image && <span className="text-emerald-400">Selected</span>}
                                                        </label>
                                                        <label className="block w-full h-48 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white/50 transition-all group overflow-hidden relative">
                                                            {projectData.image ? (
                                                                <img src={URL.createObjectURL(projectData.image)} className="w-full h-full object-cover absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <IconApps className="w-8 h-8 text-white/20 group-hover:text-white/50 transition-colors" />
                                                                    <span className="text-xs uppercase font-bold text-white/40">Upload Cover</span>
                                                                </div>
                                                            )}
                                                            <input type="file" className="hidden" onChange={e => setProjectData('image', e.target.files[0])} accept="image/*" />
                                                        </label>
                                                        {usePage().props.errors?.image && <span className="text-red-400 text-xs">{usePage().props.errors.image}</span>}
                                                    </div>

                                                    {/* 2. Title & Date */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] uppercase tracking-widest text-white/30">Project Title</label>
                                                            <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={projectData.name} onChange={e => setProjectData('name', e.target.value)} placeholder="e.g. Portfolio V2" />
                                                            {usePage().props.errors?.name && <span className="text-red-400 text-xs">{usePage().props.errors.name}</span>}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] uppercase tracking-widest text-white/30">Completion Date</label>
                                                            <input type="date" className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={projectData.completion_date} onChange={e => setProjectData('completion_date', e.target.value)} />
                                                        </div>
                                                    </div>

                                                    {/* 3. Description (Required) */}
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30">Short Description</label>
                                                        <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={projectData.description} onChange={e => setProjectData('description', e.target.value)} placeholder="Brief summary of the project..." />
                                                    </div>

                                                    {/* 4. Technologies */}
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30">Technologies / Stack Details</label>
                                                        <textarea required className="w-full h-24 bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20 resize-none" value={projectData.techs} onChange={e => setProjectData('techs', e.target.value)} placeholder="Describe technologies used, one per line or as paragraphs..." />
                                                    </div>

                                                    {/* 5. Objectives/Tasks */}
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30">Objectives / Tasks (One per line)</label>
                                                        <textarea className="w-full h-32 bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20 resize-none" value={projectData.objectives} onChange={e => setProjectData('objectives', e.target.value)} placeholder="- Build responsive UI&#10;- Integrate API" />
                                                    </div>

                                                    {/* 6. Simulation (Video/Image) */}
                                                    <div className="p-6 rounded-xl bg-white/[0.03] border border-white/5 space-y-4">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30 block mb-2">Project Simulation / Demo</label>

                                                        {/* Type Toggle */}
                                                        <div className="flex gap-2 mb-4">
                                                            <button type="button" onClick={() => setProjectData('simulation_type', 'image')} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${projectData.simulation_type === 'image' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>Image</button>
                                                            <button type="button" onClick={() => setProjectData('simulation_type', 'video')} className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${projectData.simulation_type === 'video' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>Video (Max 6min)</button>
                                                        </div>

                                                        <div className="space-y-4">
                                                            {projectData.simulation_type === 'image' ? (
                                                                <div className="space-y-4">
                                                                    {/* Image Gallery Preview Grid */}
                                                                    {projectData.simulation && projectData.simulation.length > 0 && (
                                                                        <div className="grid grid-cols-3 gap-3">
                                                                            {Array.from(projectData.simulation).map((file, i) => (
                                                                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group bg-white/5 border border-white/10">
                                                                                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            const currentFiles = Array.from(projectData.simulation);
                                                                                            const newFiles = currentFiles.filter((_, index) => index !== i);
                                                                                            setProjectData('simulation', newFiles.length > 0 ? newFiles : null);
                                                                                        }}
                                                                                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                                                    >
                                                                                        ✕
                                                                                    </button>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}

                                                                    {/* Add Button */}
                                                                    {(!projectData.simulation || projectData.simulation.length < 5) && (
                                                                        <label className="block w-full h-12 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 hover:border-white/40 transition-all text-white/30 hover:text-white">
                                                                            <span className="text-lg font-bold">+</span>
                                                                            <span className="text-[10px] uppercase font-bold tracking-widest">{projectData.simulation && projectData.simulation.length > 0 ? 'Add Another Image' : 'Select First Image'}</span>
                                                                            <input
                                                                                type="file"
                                                                                className="hidden"
                                                                                accept="image/*"
                                                                                onChange={e => {
                                                                                    if (e.target.files && e.target.files[0]) {
                                                                                        const currentFiles = projectData.simulation ? Array.from(projectData.simulation) : [];
                                                                                        if (currentFiles.length >= 5) return;

                                                                                        // Append new file
                                                                                        const newArr = [...currentFiles, e.target.files[0]];
                                                                                        setProjectData('simulation', newArr);
                                                                                    }
                                                                                    e.target.value = null;
                                                                                }}
                                                                            />
                                                                        </label>
                                                                    )}

                                                                    <p className="text-[10px] text-white/30 uppercase tracking-widest text-center">
                                                                        {(projectData.simulation?.length || 0)} / 5 Images Selected (Min 3)
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <label className="block w-full h-48 rounded-xl bg-black/20 border border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all relative overflow-hidden group">
                                                                    {projectData.simulation && projectData.simulation instanceof File ? (
                                                                        <div className="text-center">
                                                                            <IconCode className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                                                                            <span className="text-emerald-400 text-xs font-bold uppercase block mb-1">Video Selected</span>
                                                                            <span className="text-white/40 text-[10px]">{projectData.simulation.name}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-center text-white/30">
                                                                            <IconCode className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                                            <span className="block text-xs uppercase font-bold mb-1">Upload Video</span>
                                                                            <span className="text-[9px]">Max 500MB</span>
                                                                        </div>
                                                                    )}
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="video/*"
                                                                        onChange={e => setProjectData('simulation', e.target.files[0])}
                                                                    />
                                                                </label>
                                                            )}
                                                            {usePage().props.errors?.simulation && <span className="text-red-400 text-xs text-center block mt-2">{usePage().props.errors.simulation}</span>}
                                                        </div>
                                                    </div>

                                                    {/* Hidden Fields for required attributes if needed, or we rely on defaults/new inputs */}
                                                    <input type="hidden" value={projectData.tag} />
                                                    <input type="hidden" value={projectData.role} />

                                                    <div className="flex gap-4">
                                                        <button className="flex-1 bg-white text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                                                            {editingProject ? 'Apply Changes' : 'Launch Project'}
                                                        </button>
                                                        {editingProject && (
                                                            <button type="button" onClick={() => { setEditingProject(null); resetProject(); }} className="px-8 bg-white/10 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/20 transition-colors">Cancel</button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>

                                            {/* Existing Projects List */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {projects.map(p => (
                                                    <div key={p.id} className="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/[0.05] transition-all flex flex-col">
                                                        <div className="aspect-video bg-black/50 relative">
                                                            {p.image ? <img src={p.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" /> : <div className="w-full h-full flex items-center justify-center text-white/20 bg-white/5">No Cover</div>}
                                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all z-20">
                                                                <button onClick={() => startEditProject(p)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-black backdrop-blur-md transition-all">
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                </button>
                                                                <button onClick={() => handleDelete('admin.projects.delete', p.id)} className="w-8 h-8 bg-red-500/80 text-white rounded-full flex items-center justify-center transition-all hover:bg-red-600">✕</button>
                                                            </div>

                                                            {/* Type Indicator */}
                                                            {p.simulation_type === 'video' && (
                                                                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 rounded flex items-center gap-1 backdrop-blur-sm">
                                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                                    <span className="text-[8px] font-bold uppercase text-white">Video</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="p-6 flex flex-col flex-1">
                                                            <h4 className="text-xl font-bold text-white mb-2">{p.name}</h4>
                                                            <p className="text-sm text-white/60 line-clamp-2 mb-4">{p.description}</p>

                                                            <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                                                                <span className="text-xs font-mono text-white/30">{p.completion_date || 'No Date'}</span>
                                                                <a href={p.link || '#'} target="_blank" className="text-xs text-white/50 hover:text-white transition-colors">Details &rarr;</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'certifications' && (
                                        <div className="space-y-8">
                                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                                                <form onSubmit={submitCert} className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                <label className="text-[10px] uppercase tracking-widest text-white/30">Certification Image/Doc</label>
                                                                {certData.image && <span className="text-[10px] text-emerald-400">File Selected</span>}
                                                            </div>
                                                            <div className="flex gap-4 items-center">
                                                                <label className="w-24 h-24 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white/50 transition-all group overflow-hidden relative">
                                                                    {certData.image ? (
                                                                        certData.image.type === 'application/pdf' ? (
                                                                            <div className="flex flex-col items-center justify-center text-red-400">
                                                                                <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                                                                <span className="text-[8px] font-bold uppercase">PDF DOC</span>
                                                                            </div>
                                                                        ) : (
                                                                            <img src={URL.createObjectURL(certData.image)} className="w-full h-full object-cover absolute inset-0" />
                                                                        )
                                                                    ) : (
                                                                        <>
                                                                            <IconAward className="w-6 h-6 text-white/20 group-hover:text-white/80 transition-colors mb-2" />
                                                                            <span className="text-[8px] uppercase tracking-widest text-white/30">Upload</span>
                                                                        </>
                                                                    )}
                                                                    <input type="file" className="hidden" onChange={e => setCertData('image', e.target.files[0])} accept="image/*,.pdf" />
                                                                </label>
                                                                <div className="flex-1 space-y-2">
                                                                    <label className="text-[10px] uppercase tracking-widest text-white/30">Title</label>
                                                                    <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={certData.title} onChange={e => setCertData('title', e.target.value)} placeholder="e.g. Google UX Design" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] uppercase tracking-widest text-white/30">Issuer / Organization</label>
                                                                <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={certData.org} onChange={e => setCertData('org', e.target.value)} placeholder="e.g. Coursera / Google" />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] uppercase tracking-widest text-white/30">Date / Year</label>
                                                                    <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={certData.date} onChange={e => setCertData('date', e.target.value)} placeholder="2024" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="text-[10px] uppercase tracking-widest text-white/30">Credential URL</label>
                                                                    <input className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={certData.link} onChange={e => setCertData('link', e.target.value)} placeholder="https://..." />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <button className="flex-1 bg-white text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                                                            {editingCert ? 'Update Credential' : 'Add Credential'}
                                                        </button>
                                                        {editingCert && (
                                                            <button type="button" onClick={() => { setEditingCert(null); resetCert(); }} className="px-8 bg-white/10 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/20 transition-colors">Cancel</button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {certifications.map(cert => (
                                                    <div key={cert.id} className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all flex gap-6 items-center">
                                                        <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                                            {cert.image ? (
                                                                cert.image.toLowerCase().endsWith('.pdf') ? (
                                                                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                                ) : (
                                                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                                                                )
                                                            ) : (
                                                                <IconAward className="w-6 h-6 text-white/20" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-lg font-bold text-white truncate">{cert.title}</h4>
                                                            <div className="text-xs font-mono text-white/40 uppercase mt-1">{cert.org} • {cert.date}</div>
                                                            {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-400 hover:underline mt-2 inline-block">View Credential &rarr;</a>}
                                                        </div>
                                                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                            <button onClick={() => startEditCert(cert)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/40 hover:bg-white hover:text-black transition-all">
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                            </button>
                                                            <button onClick={() => handleDelete('admin.certifications.delete', cert.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">✕</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'additional' && (
                                        <div className="space-y-8">
                                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                                                <form onSubmit={submitAdditional} className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] uppercase tracking-widest text-white/30">Title</label>
                                                            <input required className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={additionalData.title} onChange={e => setAdditionalData('title', e.target.value)} placeholder="e.g. Volunteer Work" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] uppercase tracking-widest text-white/30">Type / Icon Code</label>
                                                            <input className="w-full bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20" value={additionalData.icon} onChange={e => setAdditionalData('icon', e.target.value)} placeholder="e.g. Activity" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest text-white/30">Description</label>
                                                        <textarea className="w-full h-32 bg-white/5 border-0 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-white/20 resize-none" value={additionalData.description} onChange={e => setAdditionalData('description', e.target.value)} placeholder="Describe the experience..." />
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button className="flex-1 bg-white text-black py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                                                            {editingAdditional ? 'Update Experience' : 'Add Experience'}
                                                        </button>
                                                        {editingAdditional && (
                                                            <button type="button" onClick={() => { setEditingAdditional(null); resetAdditional(); }} className="px-8 bg-white/10 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/20 transition-colors">Cancel</button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {additionalExp.map(item => (
                                                    <div key={item.id} className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all flex flex-col gap-4">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                                                <div className="text-[10px] font-mono text-white/30 uppercase mt-1">{item.icon || 'General'}</div>
                                                            </div>
                                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                                <button onClick={() => startEditAdditional(item)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/40 hover:bg-white hover:text-black transition-all">
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                </button>
                                                                <button onClick={() => handleDelete('admin.additional.delete', item.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">✕</button>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-white/60 line-clamp-3">{item.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
            `}</style>
        </div>
    );
}
