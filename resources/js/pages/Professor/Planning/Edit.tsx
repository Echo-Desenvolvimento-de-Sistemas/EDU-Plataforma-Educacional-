import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BnccSelector } from '@/components/Pedagogical/BnccSelector';
import { useForm, usePage } from '@inertiajs/react';
import { AlertCircle, Save, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import professor from '@/routes/professor';

export default function Edit({ plan, classes, subjects }: any) {
    const { auth } = usePage().props as any;
    // Mock data if not provided (for development without full backend wiring yet)
    // Ideally these come from props. 
    // Since I don't have the backend creating these props yet in Controller `create` method, 
    // I would need to update Controller to pass classes/subjects.
    // For now, let's assume specific fields or simple text inputs.

    const { data, setData, post, put, processing, errors } = useForm({
        class_room_id: plan?.class_room_id || '',
        subject_id: plan?.subject_id || '',
        start_date: plan?.start_date || '',
        end_date: plan?.end_date || '',
        topic: plan?.topic || '',
        methodology: plan?.methodology || '',
        resources: plan?.resources || '',
        evaluation: plan?.evaluation || '',
        bncc_skills: plan?.bncc_skills?.map((s: any) => s.id) || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (plan) {
            put(professor.planning.update.url({ planning: plan.id }));
        } else {
            post(professor.planning.store.url());
        }
    };

    const submitForReview = () => {
        if (confirm('Deseja enviar para aprovação? O plano não poderá ser editado até a análise.')) {
            post(professor.planning.submit.url({ plan: plan.id }));
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Planejamento', href: '/professor/planning' }, { title: plan ? 'Editar' : 'Novo', href: '' }]}>
            <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {plan ? `Editar Planejamento: ${plan.topic}` : 'Novo Planejamento'}
                        </h1>
                        <p className="text-muted-foreground">Preencha os detalhes da sua aula.</p>
                    </div>
                    {plan && (
                        <div className="flex items-center gap-2">
                            <Badge variant={plan.status === 'APPROVED' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                                {plan.status}
                            </Badge>
                        </div>
                    )}
                </div>

                {plan?.status === 'REQUEST_CHANGES' && plan.feedbacks?.length > 0 && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Correção Solicitada</AlertTitle>
                        <AlertDescription>
                            {plan.feedbacks[plan.feedbacks.length - 1].comment}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Básicas</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Turma</Label>
                                <Select
                                    value={data.class_room_id?.toString()}
                                    onValueChange={value => setData('class_room_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a Turma" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((cls: any) => (
                                            <SelectItem key={cls.id} value={cls.id.toString()}>
                                                {cls.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.class_room_id && <span className="text-red-500 text-xs">{errors.class_room_id}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label>Disciplina</Label>
                                <Select
                                    value={data.subject_id?.toString()}
                                    onValueChange={value => setData('subject_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a Disciplina" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((sub: any) => (
                                            <SelectItem key={sub.id} value={sub.id.toString()}>
                                                {sub.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.subject_id && <span className="text-red-500 text-xs">{errors.subject_id}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label>Data Início</Label>
                                <Input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} />
                                {errors.start_date && <span className="text-red-500 text-xs">{errors.start_date}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label>Data Fim</Label>
                                <Input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} />
                                {errors.end_date && <span className="text-red-500 text-xs">{errors.end_date}</span>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Conteúdo Pedagógico</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Tema da Aula / Unidade Temática</Label>
                                <Input value={data.topic} onChange={e => setData('topic', e.target.value)} placeholder="Ex: Operações Básicas com Naturais" />
                                {errors.topic && <span className="text-red-500 text-xs">{errors.topic}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Habilidades BNCC</Label>
                                <BnccSelector
                                    selectedIds={data.bncc_skills}
                                    onChange={ids => setData('bncc_skills', ids)}
                                    component={subjects.find((s: any) => s.id.toString() === data.subject_id?.toString())?.name}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Metodologia (O que será feito?)</Label>
                                <Textarea
                                    value={data.methodology}
                                    onChange={e => setData('methodology', e.target.value)}
                                    placeholder="Descreva passo a passo como será a aula..."
                                    className="min-h-[120px]"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Recursos Didáticos</Label>
                                    <Textarea
                                        value={data.resources}
                                        onChange={e => setData('resources', e.target.value)}
                                        placeholder="Livro didático pág 20, Datashow, etc..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Avaliação</Label>
                                    <Textarea
                                        value={data.evaluation}
                                        onChange={e => setData('evaluation', e.target.value)}
                                        placeholder="Observação da participação, lista de exercícios..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="submit" disabled={processing} className="w-32">
                            <Save className="mr-2 h-4 w-4" />
                            Salvar
                        </Button>

                        {plan && plan.status !== 'APPROVED' && plan.status !== 'SUBMITTED' && (
                            <Button type="button" variant="secondary" onClick={submitForReview} className="bg-green-600 hover:bg-green-700 text-white">
                                <Send className="mr-2 h-4 w-4" />
                                Enviar para Revisão
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
