import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from '@/lib/utils';

export function DottedSurfaceDemo() {
    return (
        <div className="relative w-full h-[600px] bg-white dark:bg-black overflow-hidden border border-neutral-200 dark:border-white/10 rounded-2xl">
            <DottedSurface className="size-full opacity-60">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                        aria-hidden="true"
                        className={cn(
                            'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
                            'bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_50%)]',
                            'blur-[30px]',
                        )}
                    />
                    <h1 className="font-mono text-4xl font-semibold text-black dark:text-white relative z-10 transition-colors duration-500">
                        Dotted Surface
                    </h1>
                </div>
            </DottedSurface>
        </div>
    );
}

export default DottedSurfaceDemo;
