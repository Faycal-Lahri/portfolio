import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.post'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
            <Head title="Admin Login" />
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
                
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Zone Sécurisée
                    </h1>
                    <p className="text-white/40 text-sm">Entrez votre code d'accès pour continuer</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-center text-xl tracking-widest focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-white/10"
                            placeholder="••••••••"
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <p className="mt-2 text-red-400 text-xs text-center">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 group/btn"
                    >
                        <span>Déverrouiller</span>
                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <a href="/" className="text-white/20 hover:text-white/40 text-xs transition-colors">
                        Retour au site
                    </a>
                </div>
            </div>
        </div>
    );
}
