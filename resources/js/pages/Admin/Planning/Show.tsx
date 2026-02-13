import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useForm, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import admin from '@/routes/admin/index';

export default function Show({ plan }: { plan: any }) {
    const { data, setData, post, processing, errors } = useForm({
        comment: '',
    });

    const [rejectOpen, setRejectOpen] = useState(false);

    const handleApprove = () => {
        if (confirm('Aprovar este planejamento?')) {
            router.post(admin.planning.approve.url({ lessonPlan: plan.id }));
        }
    };

    const handleRequestChanges = () => {
        post(admin.planning.requestChanges.url({ lessonPlan: plan.id }), {
            onSuccess: () => setRejectOpen(false)
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Supervisão', href: '/admin/planning' },
                { title: 'Revisão', href: '' },
            ]}
        >
            <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={admin.planning.index.url()}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">{plan.topic}</h1>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{plan.user.name}</span>
                                <span>•</span>
                                <span>{plan.class_room.name}</span>
                                <span>•</span>
                                <span>{plan.subject.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {plan.status === 'SUBMITTED' && (
                            <>
                                <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Solicitar Alterações
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Solicitar Alterações</DialogTitle>
                                            <DialogDescription>
                                                Descreva o que precisa ser ajustado no planejamento.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-2">
                                            <Label>Comentário</Label>
                                            <Textarea
                                                value={data.comment}
                                                onChange={e => setData('comment', e.target.value)}
                                                placeholder="Ex: O objetivo não está claro..."
                                            />
                                            {errors.comment && <span className="text-red-500 text-xs">{errors.comment}</span>}
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setRejectOpen(false)}>Cancelar</Button>
                                            <Button variant="destructive" onClick={handleRequestChanges} disabled={processing}>Confirmar</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button className="bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Aprovar
                                </Button>
                            </>
                        )}
                        <Badge variant="outline" className="text-lg px-4 py-1">
                            {plan.status === 'APPROVED' ? 'Aprovado' :
                                plan.status === 'REQUEST_CHANGES' ? 'Correção Solicitada' :
                                    plan.status === 'SUBMITTED' ? 'Em Análise' : 'Rascunho'}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Detalhes da Aula</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-1">Metodologia</h3>
                                    <p className="text-sm text-slate-700 whitespace-pre-line">{plan.methodology || 'Não informado.'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold mb-1">Recursos</h3>
                                        <p className="text-sm text-slate-700 whitespace-pre-line">{plan.resources || 'Não informado.'}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Avaliação</h3>
                                        <p className="text-sm text-slate-700 whitespace-pre-line">{plan.evaluation || 'Não informado.'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Habilidades BNCC</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {plan.bncc_skills.map((skill: any) => (
                                        <div key={skill.id} className="flex gap-3 p-3 bg-muted/50 rounded border">
                                            <Badge variant="outline" className="h-fit font-mono">{skill.code}</Badge>
                                            <div>
                                                <p className="text-sm">{skill.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {plan.bncc_skills.length === 0 && <p className="text-muted-foreground text-sm">Nenhuma habilidade vinculada.</p>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações Gerais</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground block">Data Início</span>
                                    <span className="font-medium">{format(new Date(plan.start_date), 'dd/MM/yyyy')}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block">Data Fim</span>
                                    <span className="font-medium">{format(new Date(plan.end_date), 'dd/MM/yyyy')}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block">Criado em</span>
                                    <span className="font-medium">{format(new Date(plan.created_at), 'dd/MM/yyyy HH:mm')}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {plan.feedbacks && plan.feedbacks.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Histórico de Correções</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {plan.feedbacks.map((fb: any) => (
                                        <div key={fb.id} className="p-3 bg-red-50 border border-red-100 rounded text-sm">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-semibold text-red-800">{fb.user.name}</span>
                                                <span className="text-xs text-red-600">{format(new Date(fb.created_at), 'dd/MM HH:mm')}</span>
                                            </div>
                                            <p className="text-red-700">{fb.comment}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
