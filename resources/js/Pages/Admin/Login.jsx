import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
    });
    const [isFocused, setIsFocused] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.post'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-black/10 overflow-hidden relative">
            <Head title="Access Portal" />
            
            {/* Ambient subtle light glow behind the card */}
            <div className="absolute w-[600px] h-[600px] rounded-full bg-white/60 blur-[100px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Clean Apple grid lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-sm p-10 rounded-[2rem] border border-neutral-200/80 bg-white/70 backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.06)] flex flex-col items-stretch text-center ring-1 ring-black/[0.02]"
            >
                {/* Header */}
                <div className="mb-10">
                    <div className="mx-auto w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center bg-white/50 mb-5 shadow-sm">
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <span className="text-[9px] font-mono tracking-[0.4em] text-neutral-400 uppercase block mb-1">Access Gate</span>
                    <h1 className="text-xl font-semibold tracking-tight text-neutral-800">
                        Admin Login
                    </h1>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2 text-left">
                        <label className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase pl-1">Access Key</label>
                        <motion.div
                            animate={{
                                borderColor: isFocused ? '#1d1d1f' : '#e5e5e7',
                                boxShadow: isFocused ? '0 0 20px rgba(0,0,0,0.02)' : '0 0 0px rgba(0,0,0,0)'
                            }}
                            transition={{ duration: 0.3 }}
                            className="rounded-xl border bg-white shadow-inner"
                        >
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="w-full bg-transparent border-0 px-4 py-3.5 text-center text-xl tracking-[0.3em] text-[#1d1d1f] focus:outline-none focus:ring-0 placeholder:text-neutral-200 font-mono"
                                placeholder="••••••••"
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </motion.div>
                        {errors.password && (
                            <motion.p 
                                initial={{ opacity: 0, y: -5 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                className="mt-2 text-red-500 text-xs text-center font-mono tracking-wide"
                            >
                                {errors.password}
                            </motion.p>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#1d1d1f] hover:bg-black text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest font-mono transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center shadow-lg shadow-black/10"
                    >
                        {processing ? 'Verifying...' : 'Authorize'}
                    </motion.button>
                </form>

                <div className="mt-10 pt-6 border-t border-neutral-100">
                    <a href="/" className="text-neutral-400 hover:text-neutral-600 text-[10px] transition-colors font-mono tracking-[0.2em] uppercase">
                        ← Exit Node
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
