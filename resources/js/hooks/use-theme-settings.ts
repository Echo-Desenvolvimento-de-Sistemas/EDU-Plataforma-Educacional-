import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export function useThemeSettings() {
    const { settings } = usePage<any>().props;

    useEffect(() => {
        if (settings?.primary_color) {
            document.documentElement.style.setProperty('--primary', settings.primary_color);
            document.documentElement.style.setProperty('--sidebar-primary', settings.primary_color);
        }
        if (settings?.secondary_color) {
            document.documentElement.style.setProperty('--secondary', settings.secondary_color);
        }
    }, [settings]);
}
