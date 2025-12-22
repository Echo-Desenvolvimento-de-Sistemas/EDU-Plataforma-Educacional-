import { usePage } from '@inertiajs/react';

export default function AppLogo({ className }: { className?: string }) {
    const { settings } = usePage<any>().props;

    const logoLight = settings?.logo_light_url || settings?.logo_url || '/images/logo-light.png';
    const logoDark = settings?.logo_dark_url || settings?.logo_url || '/images/logo-dark.png';

    return (
        <div className={`relative flex items-center justify-start w-full ${className}`}>
            <img
                src={logoLight}
                alt="Logo"
                className="dark:hidden w-full h-auto object-contain max-h-20"
            />
            <img
                src={logoDark}
                alt="Logo"
                className="hidden dark:block w-full h-auto object-contain max-h-20"
            />
        </div>
    );
}
