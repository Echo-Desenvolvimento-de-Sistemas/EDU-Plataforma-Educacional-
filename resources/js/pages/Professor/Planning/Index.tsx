import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BookOpen, Calendar, Plus } from 'lucide-react';
import professor from '@/routes/professor';

export default function Index({ plans }: { plans: any[] }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'bg-green-100 text-green-800 hover:bg-green-100';
            case 'REQUEST_CHANGES': return 'bg-red-100 text-red-800 hover:bg-red-100';
            case 'SUBMITTED': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
            default: return 'bg-slate-100 text-slate-800 hover:bg-slate-100';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'Aprovado';
            case 'REQUEST_CHANGES': return 'Correção Solicitada';
            case 'SUBMITTED': return 'Em Análise';
            default: return 'Rascunho';
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Planejamento', href: '/professor/planning' },
            ]}
        >
            <div className="flex flex-col gap-6 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Planejamento Pedagógico</h1>
                        <p className="text-muted-foreground">Gerencie seus planos de aula semanais (Semanários).</p>
                    </div>
                    <Button asChild>
                        <Link href={professor.planning.create.url()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Novo Planejamento
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Meus Planos</CardTitle>
                        <CardDescription>
                            Listagem de todos os planos de aula cadastrados.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tema</TableHead>
                                    <TableHead>Turma / Disciplina</TableHead>
                                    <TableHead>Período</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {plans.map((plan) => (
                                    <TableRow key={plan.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                {plan.topic}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">{plan.class_room?.name}</span>
                                                <span className="text-xs text-muted-foreground">{plan.subject?.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {format(new Date(plan.start_date), 'dd/MM', { locale: ptBR })} - {format(new Date(plan.end_date), 'dd/MM', { locale: ptBR })}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={getStatusColor(plan.status)}>
                                                {getStatusLabel(plan.status)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={professor.planning.edit.url({ planning: plan.id })}>
                                                        <BookOpen className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                {plan.status === 'DRAFT' && (
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" asChild>
                                                        <Link href={professor.planning.destroy.url({ planning: plan.id })} method="delete" as="button">
                                                            <Plus className="h-4 w-4 rotate-45" />
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {plans.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            Nenhum planejamento encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
