import { Head, useForm, router, usePage, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidEther from '@/Components/LiquidEther';

// Luxury Minimalist Icons
const IconApps = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconUser = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconBook = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const IconCode = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const IconBriefcase = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const IconGlobe = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const IconAward = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
const IconCpu = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
const IconSearch = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

const SidebarItem = ({ active, icon, label, onClick, num }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative"
    >
        {active && (
            <motion.div
                layoutId="slidingNavPill"
                className="absolute inset-0 bg-[#1d1d1f] rounded-xl shadow-md"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
        )}
        <span className={`text-[9px] font-mono tracking-widest relative z-10 transition-colors duration-300 ${active ? 'text-white/70' : 'text-neutral-500 group-hover:text-neutral-800'}`}>{num}</span>
        <div className={`relative z-10 p-1 transition-colors duration-300 ${active ? 'text-white' : 'text-neutral-600 group-hover:text-[#1d1d1f]'}`}>
            {icon}
        </div>
        <span className={`text-xs font-mono uppercase tracking-widest font-semibold relative z-10 transition-colors duration-300 ${active ? 'text-white' : 'text-neutral-600 group-hover:text-[#1d1d1f]'}`}>{label}</span>
    </button>
);

const FormField = ({ label, children }) => (
    <div className="flex flex-col gap-1.5 relative w-full">
        <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase pl-1">{label}</label>
        {children}
    </div>
);

// Apple-style Popup Sheet Modal
const ModalSheet = ({ isOpen, onClose, title, children }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Frosted dark overlay */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                
                {/* Modal card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="relative bg-white rounded-[2rem] border border-neutral-200 shadow-2xl p-8 max-w-2xl w-full z-10 flex flex-col gap-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
                >
                    <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-[#1d1d1f] font-bold">{title}</h3>
                        <button onClick={onClose} className="w-8 h-8 rounded-full border border-neutral-200 hover:bg-neutral-50 transition-colors flex items-center justify-center text-xs text-neutral-400 hover:text-black">
                            ✕
                        </button>
                    </div>
                    {children}
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default function Dashboard({ auth, about, education, skills, technologies, projects, internships, certifications, additionalExp }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('about');
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [skillTypeFilter, setSkillTypeFilter] = useState('all');
    const [skillCategoryFilter, setSkillCategoryFilter] = useState('all');

    // Modals visibility states
    const [isEduModalOpen, setIsEduModalOpen] = useState(false);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isTechModalOpen, setIsTechModalOpen] = useState(false);
    const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
    const [isCertModalOpen, setIsCertModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);

    // Editing targets states
    const [editingEdu, setEditingEdu] = useState(null);
    const [editingSkill, setEditingSkill] = useState(null);
    const [editingTech, setEditingTech] = useState(null);
    const [editingInternship, setEditingInternship] = useState(null);
    const [editingCert, setEditingCert] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [editingAdditional, setEditingAdditional] = useState(null);

    // Clear search on tab change
    useEffect(() => {
        setSearchQuery('');
        setSkillTypeFilter('all');
        setSkillCategoryFilter('all');
    }, [activeTab]);

    useEffect(() => {
        if (skillTypeFilter === 'soft') {
            setSkillCategoryFilter('all');
        }
    }, [skillTypeFilter]);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 500);
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

    const { data: techData, setData: setTechData, post: postTech, reset: resetTech } = useForm({
        name: '',
        icon: null,
        color: ''
    });

    const { data: internshipData, setData: setInternshipData, post: postInternship, reset: resetInternship } = useForm({
        type: 'internship',
        title: '',
        logo: null,
        role: '',
        start_date: '',
        end_date: '',
        missions: '',
        techs: ''
    });

    const { data: certData, setData: setCertData, post: postCert, reset: resetCert } = useForm({
        title: '',
        org: '',
        date: '',
        link: '',
        image: null
    });

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

    const { data: additionalData, setData: setAdditionalData, post: postAdditional, reset: resetAdditional } = useForm({
        title: '',
        type: '',
        description: '',
        icon: ''
    });

    const submitAbout = (e) => {
        e.preventDefault();
        postAbout(route('admin.about.update'), { forceFormData: true });
    };

    const submitProject = (e) => {
        e.preventDefault();
        const url = editingProject ? route('admin.projects.update', editingProject.id) : route('admin.projects.store');
        postProject(url, {
            onSuccess: () => {
                resetProject();
                setEditingProject(null);
                setIsProjectModalOpen(false);
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
                setIsEduModalOpen(false);
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
                setIsSkillModalOpen(false);
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
                setIsTechModalOpen(false);
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
                setIsInternshipModalOpen(false);
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
                setIsCertModalOpen(false);
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
                setIsAdditionalModalOpen(false);
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
        setIsEduModalOpen(true);
    };

    const startEditSkill = (s) => {
        setEditingSkill(s);
        setSkillData({
            category: s.category,
            name: s.name,
            type: s.type
        });
        setIsSkillModalOpen(true);
    };

    const startEditTech = (t) => {
        setEditingTech(t);
        setTechData({
            name: t.name,
            icon: null,
            color: t.color || ''
        });
        setIsTechModalOpen(true);
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
        setIsInternshipModalOpen(true);
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
        setIsCertModalOpen(true);
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
        setIsProjectModalOpen(true);
    };

    const startEditAdditional = (a) => {
        setEditingAdditional(a);
        setAdditionalData({
            title: a.title,
            type: a.type || '',
            description: a.description || '',
            icon: a.icon || ''
        });
        setIsAdditionalModalOpen(true);
    };

    const handleDelete = (routeName, id) => {
        if (confirm('Verify deletion action: confirm to delete.')) {
            router.delete(route(routeName, id));
        }
    };

    // Client-side filtering logic
    const filteredEducation = education.filter(e => 
        e.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.description && e.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filteredSkills = skills.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              s.category.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;

        if (skillTypeFilter !== 'all' && s.type !== skillTypeFilter) return false;

        if (skillTypeFilter !== 'soft' && skillCategoryFilter !== 'all' && s.category !== skillCategoryFilter) return false;

        return true;
    });

    const technicalCategories = [...new Set(
        skills
            .filter(s => s.type === 'technical')
            .map(s => s.category)
    )];

    const filteredTechnologies = technologies.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(p.techs) && p.techs.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const filteredInternships = internships.filter(i => 
        i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(i.techs) && i.techs.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (Array.isArray(i.missions) && i.missions.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const filteredCertifications = certifications.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.org.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAdditional = additionalExp.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.description && a.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (a.icon && a.icon.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const tabVariants = {
        hidden: { opacity: 0, scale: 0.99, filter: "blur(4px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, scale: 1.01, filter: "blur(4px)", transition: { duration: 0.2 } }
    };

    const inputClasses = "w-full bg-neutral-50 border border-neutral-200 hover:border-neutral-300 focus:border-black focus:bg-white rounded-xl px-4 py-2.5 text-neutral-800 focus:outline-none focus:ring-0 transition-all duration-300 text-sm focus:shadow-[0_0_15px_rgba(0,0,0,0.02)] placeholder:text-neutral-300";
    
    const textareaClasses = "w-full bg-neutral-50 border border-neutral-200 hover:border-neutral-300 focus:border-black focus:bg-white rounded-xl px-4 py-2.5 text-neutral-800 focus:outline-none focus:ring-0 transition-all duration-300 text-sm focus:shadow-[0_0_15px_rgba(0,0,0,0.02)] placeholder:text-neutral-300 resize-none";

    const editBtnClasses = "bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 text-neutral-600 hover:text-[#1d1d1f] transition-all text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm";
    
    const deleteBtnClasses = "bg-transparent border border-neutral-100 hover:bg-red-500/5 hover:border-red-500/25 text-neutral-300 hover:text-red-500 transition-all text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-lg";

    const primaryActionBtn = "px-6 py-2.5 bg-[#1d1d1f] hover:bg-black text-white font-mono uppercase tracking-widest text-[9px] font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5";

    return (
        <div className="h-screen w-screen bg-[#f5f5f7] text-[#1d1d1f] overflow-hidden relative selection:bg-black/10 font-sans">
            <Head title="Admin Deck" />

            {/* Apple style light fluid WebGL background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <LiquidEther
                    colors={['#ffffff', '#fafafa', '#f5f5f7']}
                    mouseForce={15}
                    cursorSize={90}
                    force={0.7}
                    isViscous={false}
                    iterationsPoisson={14}
                    resolution={0.35}
                    autoDemo={true}
                    autoSpeed={0.06}
                />
            </div>

            {/* Full-Screen Workspace */}
            <div className="relative z-10 w-full h-full flex overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,0.06)]">
                {/* Left Sidebar */}
                <div className="w-[280px] h-full flex flex-col bg-[#fcfcfd] border-r border-neutral-200/60 p-6 shrink-0 z-10">
                    <div className="mb-10 pl-2">
                        <span className="text-[10px] font-mono tracking-[0.35em] text-neutral-500 uppercase font-semibold">// DECK_CONSOLE</span>
                    </div>

                    <nav className="flex flex-col gap-1.5 flex-grow">
                        <SidebarItem onClick={() => setActiveTab('about')} active={activeTab === 'about'} icon={<IconUser className="w-4.5 h-4.5" />} label="Identity" num="01" />
                        <SidebarItem onClick={() => setActiveTab('education')} active={activeTab === 'education'} icon={<IconBook className="w-4.5 h-4.5" />} label="Knowledge" num="02" />
                        <SidebarItem onClick={() => setActiveTab('skills')} active={activeTab === 'skills'} icon={<IconApps className="w-4.5 h-4.5" />} label="Arsenal" num="03" />
                        <SidebarItem onClick={() => setActiveTab('technologies')} active={activeTab === 'technologies'} icon={<IconCpu className="w-4.5 h-4.5" />} label="Technologies" num="04" />
                        <SidebarItem onClick={() => setActiveTab('projects')} active={activeTab === 'projects'} icon={<IconCode className="w-4.5 h-4.5" />} label="Creations" num="05" />
                        <SidebarItem onClick={() => setActiveTab('internships')} active={activeTab === 'internships'} icon={<IconBriefcase className="w-4.5 h-4.5" />} label="Experience" num="06" />
                        <SidebarItem onClick={() => setActiveTab('certifications')} active={activeTab === 'certifications'} icon={<IconAward className="w-4.5 h-4.5" />} label="Credentials" num="07" />
                        <SidebarItem onClick={() => setActiveTab('additional')} active={activeTab === 'additional'} icon={<IconGlobe className="w-4.5 h-4.5" />} label="Extras" num="08" />
                    </nav>

                    {/* Admin logout */}
                    <div className="mt-auto border-t border-neutral-100 pt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-[10px] font-mono font-bold text-neutral-600">FL</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-mono font-semibold text-neutral-800">F. Lahri</span>
                                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Admin</span>
                            </div>
                        </div>
                        <Link 
                            href={route('admin.logout')} 
                            method="post" 
                            as="button" 
                            className="px-3 py-2 rounded-xl border border-neutral-200 hover:border-neutral-800 hover:bg-[#1d1d1f] hover:text-white text-neutral-600 hover:text-black transition-all duration-300 text-[9px] font-mono uppercase tracking-widest font-semibold"
                        >
                            Logout
                        </Link>
                    </div>
                </div>

                {/* Right Workspace View */}
                <div className="flex-grow h-full flex flex-col overflow-hidden bg-white">
                    {/* Header with Search Bar */}
                    <div className="h-20 flex items-center justify-between px-10 border-b border-neutral-200/60 bg-white/50 backdrop-blur-md shrink-0">
                        <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-neutral-800 font-semibold flex items-center gap-2 shrink-0">
                            <span className="text-neutral-400">//</span>
                            {activeTab}
                        </h2>

                        {/* Sticky Search bar (Conditional - only when not on identity Tab) */}
                        {activeTab !== 'about' && (
                            <div className="relative flex-grow max-w-sm mx-10">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <IconSearch className="w-4 h-4 text-neutral-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder={`Filter ${activeTab}...`}
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-neutral-50/50 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-400 focus:bg-white rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-0 text-neutral-800 transition-all font-mono"
                                />
                            </div>
                        )}

                        {flash?.message && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                className="px-4 py-1.5 bg-neutral-50 border border-neutral-200 text-neutral-600 rounded-full text-[10px] font-mono tracking-widest uppercase ml-auto"
                            >
                                {flash.message}
                            </motion.div>
                        )}
                    </div>

                    {/* Scrollable Main Area */}
                    <div className="flex-grow overflow-y-auto p-10 custom-scrollbar bg-[#fafafa]/50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="max-w-4xl mx-auto space-y-12"
                            >
                                {/* Tab Views */}
                                {activeTab === 'about' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Photo */}
                                            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm flex flex-col gap-4">
                                                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block font-semibold">Avatar Photo</span>
                                                <div className="flex items-center gap-4">
                                                    {about?.image && !aboutData.image && (
                                                        <img src={about.image} alt="Avatar" className="w-14 h-14 rounded-full object-cover border border-neutral-200 shadow-sm" />
                                                    )}
                                                    <input 
                                                        type="file" 
                                                        onChange={e => setAboutData('image', e.target.files[0])} 
                                                        className="text-[10px] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-neutral-200 file:bg-neutral-50 file:text-neutral-600 file:font-mono file:uppercase file:tracking-wider hover:file:bg-neutral-100 hover:file:border-neutral-400 file:transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* CV */}
                                            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm flex flex-col gap-4">
                                                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase block font-semibold">CV Document (PDF)</span>
                                                <div className="flex items-center gap-4">
                                                    {about?.cv && (
                                                        <a href={about.cv} target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono uppercase tracking-wider text-neutral-600 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 px-4 py-2 rounded-xl transition-all shadow-sm">View Current</a>
                                                    )}
                                                    <input 
                                                        type="file" 
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={e => setAboutData('cv', e.target.files[0])} 
                                                        className="text-[10px] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-neutral-200 file:bg-neutral-50 file:text-neutral-600 file:font-mono file:uppercase file:tracking-wider hover:file:bg-neutral-100 hover:file:border-neutral-400 file:transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm">
                                                <FormField label="Email Contact Address">
                                                    <input 
                                                        className={inputClasses}
                                                        value={aboutData.email}
                                                        onChange={e => setAboutData('email', e.target.value)}
                                                        placeholder="name@domain.com"
                                                    />
                                                </FormField>
                                            </div>
                                            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm">
                                                <FormField label="LinkedIn Web URL">
                                                    <input 
                                                        className={inputClasses}
                                                        value={aboutData.linkedin}
                                                        onChange={e => setAboutData('linkedin', e.target.value)}
                                                        placeholder="https://linkedin.com/in/..."
                                                    />
                                                </FormField>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm">
                                            <FormField label="Identity Biography Context">
                                                <textarea 
                                                    className={`${textareaClasses} h-40`}
                                                    value={aboutData.bio}
                                                    onChange={e => setAboutData('bio', e.target.value)}
                                                    placeholder="Enter your biography story detail..."
                                                />
                                            </FormField>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 pt-4">
                                            <div className="flex-grow p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm">
                                                <FormField label="Current Status Info">
                                                    <input 
                                                        className={inputClasses}
                                                        value={aboutData.status}
                                                        onChange={e => setAboutData('status', e.target.value)}
                                                        placeholder="e.g. Open to work"
                                                    />
                                                </FormField>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                onClick={submitAbout} 
                                                className="px-8 bg-[#1d1d1f] hover:bg-black text-white font-mono uppercase tracking-widest text-xs font-bold rounded-xl transition-colors h-14 self-end shadow-lg shadow-black/10 shrink-0"
                                            >
                                                Save Settings
                                            </motion.button>
                                        </div>
                                    </div>
                                )}

                                {/* 2. KNOWLEDGE VIEW (Detailed Cards Grid) */}
                                {activeTab === 'education' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">// EDUCATION HISTORY</h3>
                                            <button 
                                                onClick={() => { resetEdu(); setEditingEdu(null); setIsEduModalOpen(true); }}
                                                className={primaryActionBtn}
                                            >
                                                <span>+ Add Entry</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {filteredEducation.map(e => (
                                                <div key={e.id} className="group relative p-6 bg-white border border-neutral-200/80 rounded-2xl hover:border-neutral-300 shadow-sm transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between min-h-[14rem]">
                                                    <div className="space-y-2">
                                                        <div className="text-base font-bold text-[#1d1d1f]">{e.degree}</div>
                                                        <div className="text-xs text-neutral-600 font-mono">{e.school}</div>
                                                        <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{e.period} • {e.specialty}</div>
                                                        {e.description && (
                                                            <div className="text-xs text-neutral-600 pt-3 border-t border-neutral-100 font-light leading-relaxed leading-5">
                                                                {e.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-3 border-t border-neutral-50 mt-4 shrink-0">
                                                        <button onClick={() => startEditEdu(e)} className={editBtnClasses}>Edit</button>
                                                        <button onClick={() => handleDelete('admin.education.delete', e.id)} className={deleteBtnClasses}>Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 3. ARSENAL (SKILLS) VIEW */}
                                {activeTab === 'skills' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">// SKILL MATRIX</h3>
                                            <button 
                                                onClick={() => { resetSkill(); setEditingSkill(null); setIsSkillModalOpen(true); }}
                                                className={primaryActionBtn}
                                            >
                                                <span>+ Add Skill</span>
                                            </button>
                                        </div>

                                        {/* Dynamic Skill Filters */}
                                        <div className="flex flex-col gap-3 pb-4 border-b border-neutral-100 mt-2">
                                            {/* Primary Type Filters */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mr-2">Type:</span>
                                                <button
                                                    onClick={() => setSkillTypeFilter('all')}
                                                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold transition-all border ${
                                                        skillTypeFilter === 'all'
                                                            ? 'bg-[#1d1d1f] text-white border-transparent shadow-sm'
                                                            : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                                    }`}
                                                >
                                                    All
                                                </button>
                                                <button
                                                    onClick={() => setSkillTypeFilter('technical')}
                                                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold transition-all border ${
                                                        skillTypeFilter === 'technical'
                                                            ? 'bg-[#1d1d1f] text-white border-transparent shadow-sm'
                                                            : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                                    }`}
                                                >
                                                    Technical
                                                </button>
                                                <button
                                                    onClick={() => setSkillTypeFilter('soft')}
                                                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold transition-all border ${
                                                        skillTypeFilter === 'soft'
                                                            ? 'bg-[#1d1d1f] text-white border-transparent shadow-sm'
                                                            : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                                    }`}
                                                >
                                                    Soft
                                                </button>
                                            </div>

                                            {/* Secondary Category Filters */}
                                            {skillTypeFilter !== 'soft' && technicalCategories.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100/60">
                                                    <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mr-2">Category:</span>
                                                    <button
                                                        onClick={() => setSkillCategoryFilter('all')}
                                                        className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-wider font-semibold transition-all border ${
                                                            skillCategoryFilter === 'all'
                                                                ? 'bg-neutral-800 text-white border-transparent shadow-sm'
                                                                : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                                        }`}
                                                    >
                                                        All Categories
                                                    </button>
                                                    {technicalCategories.map(cat => (
                                                        <button
                                                            key={cat}
                                                            onClick={() => setSkillCategoryFilter(cat)}
                                                            className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-wider font-semibold transition-all border ${
                                                                skillCategoryFilter === cat
                                                                    ? 'bg-neutral-800 text-white border-transparent shadow-sm'
                                                                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300'
                                                            }`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {filteredSkills.map(s => (
                                                <div key={s.id} className="relative p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-neutral-300 transition-all duration-300 hover:scale-[1.01] group aspect-square flex flex-col justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <span className="text-[9px] font-mono uppercase text-neutral-600 tracking-wider truncate max-w-[60%]">{s.category}</span>
                                                        <span className={`text-[8px] font-mono px-2 py-0.5 rounded-md border ${s.type === 'soft' ? 'border-neutral-300 text-neutral-500 font-semibold' : 'border-[#1d1d1f] text-[#1d1d1f] bg-neutral-50 font-bold'}`}>{s.type === 'soft' ? 'SOFT' : 'TECH'}</span>
                                                    </div>
                                                    <div className="text-lg font-bold text-neutral-800 leading-snug">{s.name}</div>
                                                    
                                                    <div className="flex gap-2 pt-3 border-t border-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button onClick={() => startEditSkill(s)} className="text-[9px] font-mono uppercase text-neutral-500 hover:text-black">[ Edit ]</button>
                                                        <button onClick={() => handleDelete('admin.skills.delete', s.id)} className="text-[9px] font-mono uppercase text-neutral-300 hover:text-red-500 ml-auto">[ Delete ]</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 4. TECHNOLOGIES VIEW */}
                                {activeTab === 'technologies' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">// INTEGRATED TECHNOLOGIES</h3>
                                            <button 
                                                onClick={() => { resetTech(); setEditingTech(null); setIsTechModalOpen(true); }}
                                                className={primaryActionBtn}
                                            >
                                                <span>+ Add Tech</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {filteredTechnologies.map(t => (
                                                <div key={t.id} className="relative p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-neutral-300 transition-all duration-300 hover:scale-[1.01] flex flex-col items-center gap-4 group">
                                                    <div className="w-10 h-10 flex items-center justify-center">
                                                        <img src={t.icon} alt={t.name} className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm font-bold text-neutral-800">{t.name}</div>
                                                        <div className="text-[9px] font-mono text-neutral-600 uppercase mt-0.5">{t.color || 'no color'}</div>
                                                    </div>
                                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button onClick={() => startEditTech(t)} className="p-1.5 text-neutral-400 hover:text-black bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm">
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                        </button>
                                                        <button onClick={() => handleDelete('admin.technologies.delete', t.id)} className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-red-500 bg-neutral-50 border border-neutral-200 rounded-lg text-xs shadow-sm">✕</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 5. CREATIONS (PROJECTS) VIEW */}
                                {activeTab === 'projects' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">// PROJECT ARCHIVE</h3>
                                            <button 
                                                onClick={() => { resetProject(); setEditingProject(null); setIsProjectModalOpen(true); }}
                                                className={primaryActionBtn}
                                            >
                                                <span>+ Add Project</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {filteredProjects.map(p => {
                                                const techsArr = Array.isArray(p.techs) ? p.techs : (typeof p.techs === 'string' ? p.techs.split('\n').filter(Boolean) : []);
                                                const objArr = Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? p.features.split('\n').filter(Boolean) : []);
                                                
                                                return (
                                                    <div key={p.id} className="group relative bg-white border border-neutral-200/80 rounded-3xl overflow-hidden hover:border-neutral-300 shadow-sm transition-all duration-300 hover:scale-[1.01] flex flex-col min-h-[26rem]">
                                                        <div className="aspect-video bg-neutral-100 relative overflow-hidden shrink-0">
                                                            {p.image ? (
                                                                <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-neutral-500 font-mono text-[9px]">NO_COVER_IMAGE</div>
                                                            )}
                                                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                                                <button onClick={() => startEditProject(p)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-neutral-200 text-neutral-500 hover:text-black shadow-sm transition-all">
                                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                </button>
                                                                <button onClick={() => handleDelete('admin.projects.delete', p.id)} className="w-8 h-8 bg-white border border-neutral-200 text-neutral-500 hover:text-red-500 shadow-sm rounded-xl flex items-center justify-center transition-all">✕</button>
                                                            </div>
                                                        </div>
                                                        <div className="p-6 flex flex-col flex-grow justify-between">
                                                            <div className="space-y-3">
                                                                <h4 className="text-base font-bold text-neutral-800">{p.name}</h4>
                                                                <p className="text-xs text-neutral-600 leading-relaxed font-light">{p.description}</p>
                                                                
                                                                {/* Objectives */}
                                                                {objArr.length > 0 && (
                                                                    <div className="space-y-1 mt-2 text-[11px] text-neutral-600 border-t border-neutral-100 pt-2 font-light">
                                                                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">Objectives:</span>
                                                                        {objArr.map((obj, idx) => (
                                                                            <div key={idx} className="flex gap-1.5 items-start pl-1">
                                                                                <span>•</span>
                                                                                <span>{obj}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {/* Tech tags */}
                                                                {techsArr.length > 0 && (
                                                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                                                        {techsArr.map((t, idx) => (
                                                                            <span key={idx} className="bg-neutral-50 border border-neutral-300 text-neutral-700 font-semibold uppercase tracking-wider">{t}</span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-[10px] font-mono mt-4">
                                                                <span className="text-neutral-500">Date: {p.completion_date || 'Ongoing'}</span>
                                                                <a href={p.link || '#'} target="_blank" className="text-neutral-600 hover:text-black transition-colors font-semibold">Url &rarr;</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 6. EXPERIENCES (INTERNSHIPS) VIEW */}
                                {activeTab === 'internships' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">// CHRONOLOGICAL EXPERIENCE</h3>
                                            <button 
                                                onClick={() => { resetInternship(); setEditingInternship(null); setIsInternshipModalOpen(true); }}
                                                className={primaryActionBtn}
                                            >
                                                <span>+ Add Experience</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            {filteredInternships.map(item => {
                                                const missionsArr = Array.isArray(item.missions) ? item.missions : (typeof item.missions === 'string' ? item.missions.split('\n').filter(Boolean) : []);
                                                const techsArr = Array.isArray(item.techs) ? item.techs : (typeof item.techs === 'string' ? item.techs.split(',').map(t => t.trim()).filter(Boolean) : []);
                                                
                                                return (
                                                    <div key={item.id} className="group relative p-6 bg-white border border-neutral-200/80 rounded-3xl hover:border-neutral-300 shadow-sm transition-all duration-300 hover:scale-[1.005] flex flex-col justify-between min-h-[16rem]">
                                                        <div>
                                                            <div className="flex items-start gap-4">
                                                                <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center overflow-hidden shrink-0">
                                                                    {item.logo ? (
                                                                        <img src={item.logo} alt={item.title} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <IconBriefcase className="w-4.5 h-4.5 text-neutral-500" />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-baseline gap-2.5">
                                                                        <span className="text-base font-bold text-neutral-800">{item.title}</span>
                                                                        <span className="text-xs font-mono text-neutral-600">{item.role}</span>
                                                                    </div>
                                                                    <div className="text-[10px] font-mono text-neutral-500 mt-0.5">{item.period}</div>
                                                                </div>
                                                            </div>

                                                            {/* Missions block */}
                                                            {missionsArr.length > 0 && (
                                                                <div className="mt-4 pl-1 space-y-1.5 text-xs text-neutral-700 font-light leading-relaxed border-t border-neutral-100 pt-3">
                                                                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">Missions & achievements:</span>
                                                                    {missionsArr.map((m, idx) => (
                                                                        <div key={idx} className="flex gap-2 items-start pl-1">
                                                                            <span>–</span>
                                                                            <span>{m}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* Tech tags */}
                                                            {techsArr.length > 0 && (
                                                                <div className="flex flex-wrap gap-1.5 pt-3">
                                                                    {techsArr.map((t, idx) => (
                                                                        <span key={idx} className="bg-neutral-50 border border-neutral-300 text-neutral-700 font-semibold uppercase tracking-wider">{t}</span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center justify-between border-t border-neutral-50 pt-4 mt-6 font-mono text-[10px]">
                                                            <span className="uppercase tracking-widest px-2.5 py-0.5 rounded border border-neutral-300 text-neutral-700 text-[8px] bg-neutral-50 font-bold">{item.type}</span>
                                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                <button onClick={() => startEditInternship(item)} className={editBtnClasses}>Edit</button>
                                                                <button onClick={() => handleDelete('admin.internships.delete', item.id)} className={deleteBtnClasses}>Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 7. CREDENTIALS (CERTIFICATIONS) VIEW */}
                                {activeTab === 'certifications' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">// CREDENTIALS LIST</h3>
                                            <button 
                                                onClick={() => { resetCert(); setEditingCert(null); setIsCertModalOpen(true); }}
                                                className={primaryActionBtn}
                                            >
                                                <span>+ Add Certificate</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {filteredCertifications.map(cert => (
                                                <div key={cert.id} className="group relative p-5 bg-white border border-neutral-200/80 rounded-2xl hover:border-neutral-300 shadow-sm transition-all duration-300 hover:scale-[1.01] flex gap-4 items-center h-28">
                                                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                                                        {cert.image ? (
                                                            cert.image.toLowerCase().endsWith('.pdf') ? (
                                                                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                            ) : (
                                                                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                                                            )
                                                        ) : (
                                                            <IconAward className="w-5 h-5 text-neutral-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <h4 className="text-sm font-semibold text-neutral-800 truncate">{cert.title}</h4>
                                                        <div className="text-[10px] font-mono text-neutral-500 uppercase mt-0.5">{cert.org} • {cert.date}</div>
                                                        {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-neutral-600 hover:underline mt-1.5 inline-block">Verify Proof &rarr;</a>}
                                                    </div>
                                                    <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <button onClick={() => startEditCert(cert)} className="p-1.5 text-neutral-400 hover:text-black bg-neutral-50 border border-neutral-200 rounded-lg shadow-sm">
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                        </button>
                                                        <button onClick={() => handleDelete('admin.certifications.delete', cert.id)} className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-red-500 bg-neutral-50 border border-neutral-200 rounded-lg text-xs shadow-sm">✕</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 8. EXTRAS VIEW */}
                                {activeTab === 'additional' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
                                            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">// ADDITIONAL DATA</h3>
                                            <button 
                                                onClick={() => { resetAdditional(); setEditingAdditional(null); setIsAdditionalModalOpen(true); }}
                                                className={primaryActionBtn}
                                            >
                                                <span>+ Add Entry</span>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {filteredAdditional.map(item => (
                                                <div key={item.id} className="group relative p-6 bg-white border border-neutral-200/80 rounded-2xl hover:border-neutral-300 shadow-sm transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between min-h-[12rem]">
                                                    <div className="space-y-2">
                                                        <h4 className="text-sm font-bold text-neutral-800">{item.title}</h4>
                                                        <span className="text-[9px] font-mono text-neutral-500 uppercase mt-0.5 block">{item.icon || 'Category'}</span>
                                                        <p className="text-xs text-neutral-700 leading-relaxed font-light whitespace-pre-line pt-2 border-t border-neutral-50">{item.description}</p>
                                                    </div>
                                                    <div className="flex gap-2.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-3 border-t border-neutral-50 mt-4 shrink-0">
                                                        <button onClick={() => startEditAdditional(item)} className={editBtnClasses}>Edit</button>
                                                        <button onClick={() => handleDelete('admin.additional.delete', item.id)} className={deleteBtnClasses}>Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* MODALS SECTION (POPUP SHEETS) */}

            {/* 1. Education Modal */}
            <ModalSheet isOpen={isEduModalOpen} onClose={() => { setIsEduModalOpen(false); resetEdu(); }} title={editingEdu ? 'Edit Knowledge Entry' : 'New Knowledge Entry'}>
                <form onSubmit={submitEdu} className="space-y-4">
                    <FormField label="Degree Title">
                        <input className={inputClasses} value={eduData.degree} onChange={e => setEduData('degree', e.target.value)} placeholder="e.g. Master of Computer Science" required />
                    </FormField>
                    <FormField label="School / Institution">
                        <input className={inputClasses} value={eduData.school} onChange={e => setEduData('school', e.target.value)} placeholder="e.g. Sorbonne University" required />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Period Range">
                            <input className={inputClasses} value={eduData.period} onChange={e => setEduData('period', e.target.value)} placeholder="e.g. 2022 - 2025" required />
                        </FormField>
                        <FormField label="Major Specialty">
                            <input className={inputClasses} value={eduData.specialty} onChange={e => setEduData('specialty', e.target.value)} placeholder="e.g. AI / Web Dev" required />
                        </FormField>
                    </div>
                    <FormField label="Description Details">
                        <textarea className={textareaClasses} value={eduData.description} onChange={e => setEduData('description', e.target.value)} placeholder="Describe courses, honors, or thesis topic..." rows={3} />
                    </FormField>
                    <button className="w-full bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest font-mono transition-colors shadow-md mt-4">
                        {editingEdu ? 'Save Changes' : 'Publish Entry'}
                    </button>
                </form>
            </ModalSheet>

            {/* 2. Skill Modal */}
            <ModalSheet isOpen={isSkillModalOpen} onClose={() => { setIsSkillModalOpen(false); resetSkill(); }} title={editingSkill ? 'Edit Skill Attribute' : 'New Skill Attribute'}>
                <form onSubmit={submitSkill} className="space-y-4">
                    <div className="flex gap-2 shrink-0 border-b border-neutral-100 pb-3">
                        <button 
                            type="button" 
                            onClick={() => setSkillData('type', 'technical')} 
                            className={`flex-1 py-2 rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${skillData.type === 'technical' ? 'bg-[#1d1d1f] text-white shadow-md' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}
                        >
                            Technical
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setSkillData('type', 'soft')} 
                            className={`flex-1 py-2 rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${skillData.type === 'soft' ? 'bg-[#1d1d1f] text-white shadow-md' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}
                        >
                            Personal / Soft
                        </button>
                    </div>
                    
                    {skillData.type === 'technical' ? (
                        <div className="space-y-4">
                            <FormField label="Arsenal Category">
                                <input
                                    className={inputClasses}
                                    placeholder="e.g. Backend Dev"
                                    value={skillData.category}
                                    onChange={e => setSkillData('category', e.target.value)}
                                    list="categories-modal"
                                />
                                <datalist id="categories-modal">
                                    {[...new Set(skills.filter(s => s.type === 'technical').map(s => s.category))].map(cat => (
                                        <option key={cat} value={cat} />
                                    ))}
                                </datalist>
                            </FormField>
                            <FormField label="Skill Title">
                                <input
                                    className={inputClasses}
                                    placeholder="e.g. NodeJS"
                                    value={skillData.name}
                                    onChange={e => setSkillData('name', e.target.value)}
                                    required
                                />
                            </FormField>
                        </div>
                    ) : (
                        <FormField label="Personal Quality Name">
                            <input
                                className={inputClasses}
                                placeholder="e.g. Autonomy & Rigor"
                                value={skillData.name}
                                onChange={e => {
                                    setSkillData(d => ({
                                        ...d,
                                        name: e.target.value,
                                        category: 'Soft Skills'
                                    }));
                                }}
                                required
                            />
                        </FormField>
                    )}

                    <button className="w-full bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest font-mono transition-colors shadow-md mt-4">
                        {editingSkill ? 'Save Changes' : 'Confirm Skill'}
                    </button>
                </form>
            </ModalSheet>

            {/* 3. Technology Modal */}
            <ModalSheet isOpen={isTechModalOpen} onClose={() => { setIsTechModalOpen(false); resetTech(); }} title={editingTech ? 'Edit Technology Asset' : 'New Technology Asset'}>
                <form onSubmit={submitTech} className="space-y-4">
                    <FormField label="Technology Name">
                        <input className={inputClasses} placeholder="e.g. React" value={techData.name} onChange={e => setTechData('name', e.target.value)} required />
                    </FormField>
                    <FormField label="Brand hex color code">
                        <input className={inputClasses} placeholder="e.g. #61dafb" value={techData.color} onChange={e => setTechData('color', e.target.value)} />
                    </FormField>
                    <FormField label="SVG Vector Icon File">
                        <div className="relative group h-12">
                            <div className="absolute inset-0 bg-neutral-50 rounded-xl border border-dashed border-neutral-200 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-neutral-400 pointer-events-none group-hover:border-neutral-400 group-hover:text-neutral-600 transition-all h-12">
                                {techData.icon ? techData.icon.name : 'Upload New Icon File'}
                            </div>
                            <input type="file" className="w-full h-12 opacity-0 cursor-pointer" onChange={e => setTechData('icon', e.target.files[0])} accept="image/*" />
                        </div>
                    </FormField>
                    <button className="w-full bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest font-mono transition-colors shadow-md mt-4">
                        {editingTech ? 'Save Changes' : 'Confirm Technology'}
                    </button>
                </form>
            </ModalSheet>

            {/* 4. Project Modal */}
            <ModalSheet isOpen={isProjectModalOpen} onClose={() => { setIsProjectModalOpen(false); resetProject(); }} title={editingProject ? 'Edit Creation Work' : 'New Creation Work'}>
                <form onSubmit={submitProject} className="space-y-4">
                    {/* Cover image */}
                    <div className="space-y-1">
                        <label className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase flex justify-between pl-1">
                            Cover Image
                            {projectData.image && <span className="text-neutral-600 font-bold uppercase">Loaded</span>}
                        </label>
                        <label className="block w-full h-36 rounded-xl bg-neutral-50 border border-dashed border-neutral-200 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-100 hover:border-neutral-300 transition-all group overflow-hidden relative">
                            {projectData.image ? (
                                <img src={URL.createObjectURL(projectData.image)} className="w-full h-full object-cover absolute inset-0 opacity-50" />
                            ) : (
                                <div className="flex flex-col items-center gap-1">
                                    <IconApps className="w-5 h-5 text-neutral-300" />
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Upload cover photo</span>
                                </div>
                            )}
                            <input type="file" className="hidden" onChange={e => setProjectData('image', e.target.files[0])} accept="image/*" />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Title">
                            <input required className={inputClasses} value={projectData.name} onChange={e => setProjectData('name', e.target.value)} placeholder="Project Name" />
                        </FormField>
                        <FormField label="Completion Date">
                            <input type="date" className={inputClasses} value={projectData.completion_date} onChange={e => setProjectData('completion_date', e.target.value)} />
                        </FormField>
                    </div>

                    <FormField label="Short tagline description">
                        <input required className={inputClasses} value={projectData.description} onChange={e => setProjectData('description', e.target.value)} placeholder="e.g. Decentralized storage client" />
                    </FormField>

                    <FormField label="Stack details (One per line)">
                        <textarea required className={`${textareaClasses} h-20`} value={projectData.techs} onChange={e => setProjectData('techs', e.target.value)} placeholder="TailwindCSS&#10;React&#10;Vite" />
                    </FormField>

                    <FormField label="Objectives / Features (One per line)">
                        <textarea className={`${textareaClasses} h-24`} value={projectData.objectives} onChange={e => setProjectData('objectives', e.target.value)} placeholder="- Built client panels&#10;- Optimized storage bucket connections" />
                    </FormField>

                    {/* Simulation Selection */}
                    <div className="p-4 rounded-xl bg-neutral-50/50 border border-neutral-200 space-y-3">
                        <label className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block pl-1">Media Demo Simulation</label>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setProjectData('simulation_type', 'image')} className={`flex-1 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase transition-all ${projectData.simulation_type === 'image' ? 'bg-[#1d1d1f] text-white shadow-sm' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}>Images Gallery</button>
                            <button type="button" onClick={() => setProjectData('simulation_type', 'video')} className={`flex-1 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase transition-all ${projectData.simulation_type === 'video' ? 'bg-[#1d1d1f] text-white shadow-sm' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}>Video Clip</button>
                        </div>

                        {projectData.simulation_type === 'image' ? (
                            <div className="space-y-3">
                                {projectData.simulation && projectData.simulation.length > 0 && (
                                    <div className="grid grid-cols-5 gap-2">
                                        {Array.from(projectData.simulation).map((file, i) => (
                                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-white border border-neutral-200 group">
                                                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const curr = Array.from(projectData.simulation);
                                                        const next = curr.filter((_, idx) => idx !== i);
                                                        setProjectData('simulation', next.length > 0 ? next : null);
                                                    }}
                                                    className="absolute inset-0 bg-black/60 text-white rounded-lg flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {(!projectData.simulation || projectData.simulation.length < 5) && (
                                    <label className="block w-full h-10 rounded-xl bg-white border border-dashed border-neutral-300 flex items-center justify-center gap-2 cursor-pointer hover:bg-neutral-50 hover:border-neutral-400 transition-all text-neutral-400 hover:text-black">
                                        <span className="text-[9px] font-mono uppercase tracking-widest">{projectData.simulation && projectData.simulation.length > 0 ? '+ Add Gallery Slide' : 'Add First Gallery Slide'}</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const curr = projectData.simulation ? Array.from(projectData.simulation) : [];
                                                    if (curr.length < 5) {
                                                        setProjectData('simulation', [...curr, e.target.files[0]]);
                                                    }
                                                }
                                                e.target.value = null;
                                            }}
                                        />
                                    </label>
                                )}
                                <p className="text-[8px] font-mono text-neutral-400 text-center uppercase tracking-wider">{(projectData.simulation?.length || 0)} / 5 Slides Selected (Min 3)</p>
                            </div>
                        ) : (
                            <label className="block w-full h-20 rounded-xl bg-white border border-dashed border-neutral-300 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 hover:border-neutral-400 transition-all relative overflow-hidden group">
                                {projectData.simulation && projectData.simulation instanceof File ? (
                                    <div className="text-center font-mono">
                                        <span className="text-[9px] font-semibold text-neutral-800 uppercase block mb-1">✓ Video file selected</span>
                                        <span className="text-[8px] text-neutral-400">{projectData.simulation.name}</span>
                                    </div>
                                ) : (
                                    <div className="text-center text-neutral-400 font-mono">
                                        <span className="block text-[9px] uppercase tracking-widest">Select Video File</span>
                                        <span className="text-[8px]">Max 500MB</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="video/*" onChange={e => setProjectData('simulation', e.target.files[0])} />
                            </label>
                        )}
                    </div>

                    <button className="w-full bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest font-mono transition-colors shadow-md mt-4">
                        {editingProject ? 'Save Changes' : 'Confirm Publish'}
                    </button>
                </form>
            </ModalSheet>

            {/* 5. Internship Modal */}
            <ModalSheet isOpen={isInternshipModalOpen} onClose={() => { setIsInternshipModalOpen(false); resetInternship(); }} title={editingInternship ? 'Edit Experience Log' : 'New Experience Log'}>
                <form onSubmit={submitInternship} className="space-y-4">
                    <div className="flex gap-2 shrink-0 border-b border-neutral-100 pb-3">
                        <button type="button" onClick={() => setInternshipData('type', 'work')} className={`flex-1 py-1.5 rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${internshipData.type === 'work' ? 'bg-[#1d1d1f] text-white shadow-sm' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}>Work</button>
                        <button type="button" onClick={() => setInternshipData('type', 'internship')} className={`flex-1 py-1.5 rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${internshipData.type === 'internship' ? 'bg-[#1d1d1f] text-white shadow-sm' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}>Internship</button>
                        <button type="button" onClick={() => setInternshipData('type', 'freelance')} className={`flex-1 py-1.5 rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${internshipData.type === 'freelance' ? 'bg-[#1d1d1f] text-white shadow-sm' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}>Freelance</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex justify-between pl-1">
                                <label className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Company Name</label>
                                {internshipData.logo && <span className="text-neutral-600 font-bold text-[9px] font-mono uppercase">Selected</span>}
                            </div>
                            <div className="flex gap-2">
                                <div className="relative w-11 h-11 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0 overflow-hidden group hover:border-neutral-300 transition-all">
                                    {internshipData.logo ? (
                                        <img src={URL.createObjectURL(internshipData.logo)} className="w-full h-full object-cover" />
                                    ) : (
                                        <IconBriefcase className="w-4 h-4 text-neutral-300" />
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setInternshipData('logo', e.target.files[0])} accept="image/*" />
                                </div>
                                <input required className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-800 focus:outline-none focus:border-neutral-300 transition-all text-sm focus:bg-white" value={internshipData.title} onChange={e => setInternshipData('title', e.target.value)} placeholder="e.g. Stripe" />
                            </div>
                        </div>
                        <FormField label="Role Title">
                            <input required className={inputClasses} value={internshipData.role} onChange={e => setInternshipData('role', e.target.value)} placeholder="e.g. Software Engineer" />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Start Date">
                            <input required type="date" className={inputClasses} value={internshipData.start_date} onChange={e => setInternshipData('start_date', e.target.value)} />
                        </FormField>
                        <div className="space-y-1">
                            <div className="flex justify-between items-center pl-1">
                                <label className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">End Date</label>
                                <label className="flex items-center gap-1.5 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="rounded border-neutral-300 text-[#1d1d1f] focus:ring-0 w-3.5 h-3.5"
                                        checked={!internshipData.end_date}
                                        onChange={e => setInternshipData('end_date', e.target.checked ? '' : new Date().toISOString().split('T')[0])}
                                    />
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-black">Present</span>
                                </label>
                            </div>
                            <input
                                type="date"
                                disabled={!internshipData.end_date}
                                className={`${inputClasses} ${!internshipData.end_date ? 'opacity-30' : ''}`}
                                value={internshipData.end_date}
                                onChange={e => setInternshipData('end_date', e.target.value)}
                            />
                        </div>
                    </div>

                    <FormField label="Key Tasks (One per line)">
                        <textarea required className={`${textareaClasses} h-24`} value={internshipData.missions} onChange={e => setInternshipData('missions', e.target.value)} placeholder="- Optimized load times&#10;- Integrated payment flows" />
                    </FormField>

                    <FormField label="Technologies (Comma separated)">
                        <input required className={inputClasses} value={internshipData.techs} onChange={e => setInternshipData('techs', e.target.value)} placeholder="TypeScript, React, Golang" />
                    </FormField>

                    <button className="w-full bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest font-mono transition-colors shadow-md mt-4">
                        {editingInternship ? 'Save Changes' : 'Confirm Publish'}
                    </button>
                </form>
            </ModalSheet>

            {/* 6. Certification Modal */}
            <ModalSheet isOpen={isCertModalOpen} onClose={() => { setIsCertModalOpen(false); resetCert(); }} title={editingCert ? 'Edit Certification' : 'New Certification'}>
                <form onSubmit={submitCert} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase flex justify-between pl-1">Document File {certData.image && <span className="text-neutral-500 font-bold uppercase">Ready</span>}</label>
                            <label className="w-full h-24 rounded-xl bg-neutral-50 border border-dashed border-neutral-200 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-100 hover:border-neutral-300 transition-all overflow-hidden relative">
                                {certData.image ? (
                                    certData.image.type === 'application/pdf' ? (
                                        <span className="text-[9px] font-mono text-neutral-500 uppercase">✓ PDF Document</span>
                                    ) : (
                                        <img src={URL.createObjectURL(certData.image)} className="w-full h-full object-cover absolute inset-0 opacity-45" />
                                    )
                                ) : (
                                    <>
                                        <IconAward className="w-5 h-5 text-neutral-300 mb-1" />
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400">Upload badge</span>
                                    </>
                                )}
                                <input type="file" className="hidden" onChange={e => setCertData('image', e.target.files[0])} accept="image/*,.pdf" />
                            </label>
                        </div>
                        <div className="space-y-4">
                            <FormField label="Credential Name">
                                <input required className={inputClasses} value={certData.title} onChange={e => setCertData('title', e.target.value)} placeholder="e.g. AWS Solutions Architect" />
                            </FormField>
                        </div>
                    </div>

                    <FormField label="Issuing Organization">
                        <input required className={inputClasses} value={certData.org} onChange={e => setCertData('org', e.target.value)} placeholder="e.g. Amazon Web Services" />
                    </FormField>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Issue Year">
                            <input required className={inputClasses} value={certData.date} onChange={e => setCertData('date', e.target.value)} placeholder="2024" />
                        </FormField>
                        <FormField label="Verification Link">
                            <input className={inputClasses} value={certData.link} onChange={e => setCertData('link', e.target.value)} placeholder="https://..." />
                        </FormField>
                    </div>

                    <button className="w-full bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest font-mono transition-colors shadow-md mt-4">
                        {editingCert ? 'Save Changes' : 'Confirm Publish'}
                    </button>
                </form>
            </ModalSheet>

            {/* 7. Additional Modal */}
            <ModalSheet isOpen={isAdditionalModalOpen} onClose={() => { setIsAdditionalModalOpen(false); resetAdditional(); }} title={editingAdditional ? 'Edit Extra Attribute' : 'New Extra Attribute'}>
                <form onSubmit={submitAdditional} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Title">
                            <input required className={inputClasses} value={additionalData.title} onChange={e => setAdditionalData('title', e.target.value)} placeholder="e.g. French / English" />
                        </FormField>
                        <FormField label="Category Label">
                            <input className={inputClasses} value={additionalData.icon} onChange={e => setAdditionalData('icon', e.target.value)} placeholder="e.g. Languages" />
                        </FormField>
                    </div>
                    <FormField label="Content details / description">
                        <textarea required className={`${textareaClasses} h-28`} value={additionalData.description} onChange={e => setAdditionalData('description', e.target.value)} placeholder="Enter details..." />
                    </FormField>
                    <button className="w-full bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest font-mono transition-colors shadow-md mt-4">
                        {editingAdditional ? 'Save Changes' : 'Confirm Publish'}
                    </button>
                </form>
            </ModalSheet>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.15); }
            `}</style>
        </div>
    );
}
