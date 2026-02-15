import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-black text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mb-8">
                <Link href="/">
                    <ApplicationLogo className="w-24 h-24 fill-current text-white/90" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden sm:rounded-2xl relative z-10 transition-all duration-300 hover:bg-white/10">
                {children}
            </div>
        </div>
    );
}
