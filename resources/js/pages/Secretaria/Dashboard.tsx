import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Secretaria',
        href: '/secretaria/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Secretaria" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full items-center justify-center bg-blue-50 dark:bg-blue-900/20">
                            <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Gestão de Alunos</span>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full items-center justify-center bg-green-50 dark:bg-green-900/20">
                            <span className="text-lg font-semibold text-green-700 dark:text-green-300">Gestão de Professores</span>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex h-full items-center justify-center bg-purple-50 dark:bg-purple-900/20">
                            <span className="text-lg font-semibold text-purple-700 dark:text-purple-300">Relatórios</span>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Bem-vindo à Secretaria</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Aqui você pode gerenciar todos os aspectos administrativos da escola.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
