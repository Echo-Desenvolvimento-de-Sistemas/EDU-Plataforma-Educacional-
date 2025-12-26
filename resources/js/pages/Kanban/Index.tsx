import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { KanbanBoard } from '@/types/kanban';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Kanban, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Meus Quadros',
        href: '/kanban',
    },
];

export default function KanbanIndex({ boards }: { boards: KanbanBoard[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meus Quadros" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Meus Quadros de Projetos</h1>
                        <p className="text-sm text-muted-foreground">Acesse os quadros e gerencie suas tarefas.</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {boards.map((board) => (
                        <Link key={board.id} href={`/kanban/${board.id}`}>
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {board.name}
                                    </CardTitle>
                                    <Kanban className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground line-clamp-2 min-h-[40px]">
                                        {board.description || 'Sem descrição'}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <span className="font-semibold text-primary mr-1 capitalize">{board.permission || 'view'}</span>
                                            acesso
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                    {boards.length === 0 && (
                        <div className="col-span-full py-10 text-center text-muted-foreground">
                            Você ainda não participa de nenhum quadro.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
