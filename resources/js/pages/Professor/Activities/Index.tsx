import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ActivityCard from '@/components/Activity/ActivityCard';
import { Plus } from 'lucide-react';

interface Props {
    activities: any[];
}

import { Head } from '@inertiajs/react';

export default function Index({ activities }: Props) {
    const breadcrumbs = [
        { title: 'Atividades', href: '/professor/activities' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Atividades" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            Minhas Atividades
                        </h2>
                        <Link
                            href="/professor/activities/create"
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Nova Atividade
                        </Link>
                    </div>

                    {activities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activities.map(activity => (
                                <ActivityCard
                                    key={activity.id}
                                    activity={activity}
                                    role="professor"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Nenhuma atividade criada</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Comece criando sua primeira avaliação ou atividade.</p>
                            <div className="mt-6">
                                <Link
                                    href="/professor/activities/create"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Criar Nova Atividade
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
