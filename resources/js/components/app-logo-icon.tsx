import { usePage } from '@inertiajs/react';

export default function AppLogoIcon(props: React.HTMLAttributes<HTMLDivElement>) {
    const { settings } = usePage<any>().props;
    const logoLight = settings?.logo_light_url || settings?.logo_url || '/images/logo-light.png';
    const logoDark = settings?.logo_dark_url || settings?.logo_url || '/images/logo-dark.png';

    return (
        <div {...props}>
            <img
                src={logoLight}
                alt="Logo"
                className="dark:hidden h-full w-auto object-contain"
            />
            <img
                src={logoDark}
                alt="Logo"
                className="hidden dark:block h-full w-auto object-contain"
            />
        </div>
    );
}
