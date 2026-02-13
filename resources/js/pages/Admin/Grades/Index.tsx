import admin from '@/routes/admin/index';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Séries / Anos',
        href: '/admin/grades',
    },
];

interface EducationLevel {
    id: number;
    name: string;
}

interface Grade {
    id: number;
    name: string;
    education_level_id: number;
    education_level: EducationLevel;
}

interface Props {
    grades: Grade[];
}

export default function Index({ grades }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Séries / Anos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Séries / Anos</h1>
                    <Link
                        href={admin.grades.create.url()}
                        className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        <Plus className="h-4 w-4" />
                        Nova Série
                    </Link>
                </div>

                {/* Mobile View (Cards) */}
                <div className="grid gap-4 sm:hidden overflow-y-auto">
                    {grades.map((grade) => (
                        <Card key={grade.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {grade.name}
                                </CardTitle>
                                <Badge variant="outline">
                                    {grade.education_level?.name}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-end gap-2 mt-4">
                                    <Link
                                        href={admin.grades.edit.url(grade.id)}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={admin.grades.destroy.url(grade.id)}
                                        method="delete"
                                        as="button"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-red-100 hover:text-red-600 h-9 w-9"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Desktop View (Table) */}
                <div className="hidden sm:block flex-1 overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Nível de Ensino
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                            {grades.map((grade) => (
                                <tr key={grade.id}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{grade.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        <Badge variant="outline">
                                            {grade.education_level?.name}
                                        </Badge>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={admin.grades.edit.url(grade.id)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={admin.grades.destroy.url(grade.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </AppLayout>
    );
}
