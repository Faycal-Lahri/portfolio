import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-white/10 bg-white/5 focus:border-white focus:ring-white rounded-full shadow-sm text-white placeholder-gray-500 ' +
                className
            }
            ref={input}
        />
    );
});
