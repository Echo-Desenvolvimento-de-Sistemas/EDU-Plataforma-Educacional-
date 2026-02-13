import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { BookOpen, Calendar, CheckCircle, Eye, Filter, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import admin from '@/routes/admin';

export default function Index({ plans, filters }: { plans: any, filters: any }) {
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

    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    admin.planning.index.url(),
                    { ...filters, search: search },
                    { preserveState: true, replace: true }
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleFilterChange = (status: string) => {
        router.get(admin.planning.index.url(), { ...filters, status }, { preserveState: true });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Supervisão Pedagógica', href: '/admin/planning' },
            ]}
        >
            <div className="flex flex-col gap-6 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Supervisão de Planejamentos</h1>
                        <p className="text-muted-foreground">Analise e aprove os planejamentos enviados pelos professores.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por tema ou professor..."
                            className="pl-8 w-[300px]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Filter className="h-4 w-4 text-muted-foreground ml-2" />
                    <Select value={filters.status || ''} onValueChange={handleFilterChange}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filtrar por Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SUBMITTED">Em Análise</SelectItem>
                            <SelectItem value="APPROVED">Aprovados</SelectItem>
                            <SelectItem value="REQUEST_CHANGES">Correção Solicitada</SelectItem>
                            <SelectItem value="DRAFT">Rascunho</SelectItem>
                        </SelectContent>
                    </Select>
                    {(filters.status || filters.search) && (
                        <Button variant="ghost" onClick={() => router.get(admin.planning.index.url())}>
                            Limpar
                        </Button>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Planejamentos Recentes</CardTitle>
                        <CardDescription>
                            Listagem de planejamentos aguardando revisão.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Professor</TableHead>
                                    <TableHead>Tema</TableHead>
                                    <TableHead>Turma / Disciplina</TableHead>
                                    <TableHead>Período</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {plans.data.map((plan: any) => (
                                    <TableRow key={plan.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">{plan.user?.name}</span>
                                                <span className="text-xs text-muted-foreground">{plan.user?.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {plan.topic}
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
                                                {format(new Date(plan.start_date), 'dd/MM')} - {format(new Date(plan.end_date), 'dd/MM')}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={getStatusColor(plan.status)}>
                                                {getStatusLabel(plan.status)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={admin.planning.show.url({ lessonPlan: plan.id })}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Revisar
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {plans.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
