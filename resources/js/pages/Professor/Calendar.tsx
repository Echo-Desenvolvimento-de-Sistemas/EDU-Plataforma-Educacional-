import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Painel', href: '/professor/dashboard' },
    { title: 'Calendário', href: '/professor/calendar' },
];

export default function Calendar() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendário Escolar" />
            <div className="p-8 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Calendário Escolar</h1>
                <div className="bg-card p-8 rounded-xl border shadow-sm flex items-center justify-center h-96">
                    <p className="text-muted-foreground">Módulo de calendário em desenvolvimento...</p>
                </div>
            </div>
        </AppLayout>
    );
}
