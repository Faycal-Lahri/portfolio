export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-6 py-3 bg-black border border-white/10 rounded-full font-semibold text-xs text-white uppercase tracking-widest hover:bg-white hover:text-black focus:bg-white focus:text-black active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
