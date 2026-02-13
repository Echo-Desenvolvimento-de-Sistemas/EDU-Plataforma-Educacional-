import admin from '@/routes/admin/index';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Anos Letivos',
        href: '/admin/academic-years',
    },
    {
        title: 'Novo Ano Letivo',
        href: '/admin/academic-years/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        year: '',
        start_date: '',
        end_date: '',
        status: 'open',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(admin.academicYears.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Novo Ano Letivo" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-2xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Novo Ano Letivo</h2>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="year">Ano (Ex: 2025)</Label>
                            <Input
                                id="year"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.year}
                                onChange={(e) => setData('year', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError className="mt-2" message={errors.year} />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="start_date">Data de Início</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.start_date} />
                            </div>

                            <div>
                                <Label htmlFor="end_date">Data de Término</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.end_date} />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="open">Aberto</SelectItem>
                                    <SelectItem value="closed">Fechado</SelectItem>
                                    <SelectItem value="ended">Encerrado</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.status} />
                        </div>

                        <div className="flex items-center justify-end">
                            <Button className="ml-4" disabled={processing}>
                                Criar Ano Letivo
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
