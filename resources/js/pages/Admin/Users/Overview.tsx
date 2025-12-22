import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { UserCog, GraduationCap, Users, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Gerenciar Usuários',
        href: '/admin/users',
    },
];

const cards = [
    {
        title: 'Administradores',
        icon: UserCog,
        href: '/admin/users?role=admin',
        description: 'Gerencie os administradores do sistema.',
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
        title: 'Secretaria',
        icon: School,
        href: '/admin/users?role=secretaria',
        description: 'Gerencie os funcionários da secretaria.',
        color: 'text-purple-500',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
        title: 'Professores',
        icon: GraduationCap,
        href: '/admin/users?role=professor',
        description: 'Gerencie os professores e suas alocações.',
        color: 'text-green-500',
        bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
        title: 'Alunos',
        icon: Users,
        href: '/admin/users?role=aluno',
        description: 'Gerencie os alunos matriculados.',
        color: 'text-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
    },
];

export default function Overview() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gerenciar Usuários" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-5xl">
                    <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Selecione o tipo de usuário
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {cards.map((card, index) => (
                            <Link key={index} href={card.href} className="block transition-transform hover:scale-[1.02]">
                                <Card className="h-full border-sidebar-border/70 shadow-sm hover:shadow-md dark:border-sidebar-border dark:bg-sidebar-accent/10">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                        <div className={`p-3 rounded-full ${card.bg}`}>
                                            <card.icon className={`h-8 w-8 ${card.color}`} />
                                        </div>
                                        <CardTitle className="text-xl font-bold">{card.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mt-2">{card.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
