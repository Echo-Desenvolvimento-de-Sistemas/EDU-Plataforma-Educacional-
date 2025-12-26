import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Layers, FileText } from 'lucide-react';
import { Head } from '@inertiajs/react';

interface QuestionBank {
    id: number;
    title: string;
    description: string;
    questions_count: number;
    created_at: string;
}

interface Props {
    banks: QuestionBank[];
}

export default function Index({ banks }: Props) {
    const breadcrumbs = [
        { title: 'Bancos de Questões', href: '/professor/question-banks' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bancos de Questões" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center gap-2">
                            <Layers className="w-6 h-6 text-indigo-600" />
                            Meus Bancos de Questões
                        </h2>
                        <Link
                            href="/professor/question-banks/create"
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Novo Banco
                        </Link>
                    </div>

                    {banks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {banks.map(bank => (
                                <Link
                                    key={bank.id}
                                    href={`/professor/question-banks/${bank.id}`}
                                    className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="bg-indigo-50 dark:bg-indigo-900/50 p-3 rounded-lg">
                                                <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                                {new Date(bank.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1">{bank.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[2.5rem]">
                                            {bank.description || "Sem descrição"}
                                        </p>

                                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <FileText className="w-4 h-4" />
                                            <span className="font-medium">{bank.questions_count}</span> questões
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <Layers className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">Nenhum banco encontrado</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Crie seu primeiro banco de questões para começar.</p>
                            <div className="mt-6">
                                <Link
                                    href="/professor/question-banks/create"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Criar Banco
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
