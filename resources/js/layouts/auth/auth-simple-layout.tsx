import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes/index';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden bg-black">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-0 h-full w-full object-cover opacity-80"
            >
                <source src="/videos/login-bg.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />

            <div className="z-20 w-full max-w-sm rounded-3xl bg-white/90 p-8 shadow-2xl dark:bg-gray-950/90 backdrop-blur-xl border border-white/20 dark:border-gray-800/50">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium hover:scale-105 transition-transform"
                        >
                            <div className="mb-1 flex h-24 w-24 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-24 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
                            <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
