import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';

interface GradingPeriod {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    status: 'open' | 'closed';
}

interface AcademicYear {
    id: number;
    year: string;
    start_date: string;
    end_date: string;
    status: string;
    grading_periods: GradingPeriod[];
}

export default function Edit({ academicYear }: { academicYear: AcademicYear }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Anos Letivos', href: '/admin/academic-years' }, // Fixed path
        { title: 'Editar', href: `/admin/academic-years/${academicYear.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        year: academicYear.year,
        start_date: academicYear.start_date,
        end_date: academicYear.end_date,
        status: academicYear.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Using static path instead of generated helper to avoid reference errors
        put(`/admin/academic-years/${academicYear.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Ano Letivo" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-2xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Editar Ano Letivo</h2>

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
                            <Button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white" disabled={processing}>
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="mx-auto w-full max-w-2xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Períodos Avaliativos (Bimestres)</h3>

                    <div className="space-y-4 mb-6">
                        {academicYear.grading_periods && academicYear.grading_periods.length > 0 ? (
                            <div className="border rounded-md divide-y dark:divide-gray-700">
                                {academicYear.grading_periods.map((period) => (
                                    <div key={period.id} className="flex items-center justify-between p-3">
                                        <div>
                                            <p className="font-medium text-sm">{period.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(period.start_date).toLocaleDateString()} - {new Date(period.end_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/admin/grading-periods/${period.id}`}
                                            method="delete"
                                            as="button"
                                            className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">Nenhum período cadastrado.</p>
                        )}
                    </div>

                    <Separator className="my-4" />

                    <h4 className="text-sm font-medium mb-3">Adicionar Novo Período</h4>
                    <AddGradingPeriodForm academicYearId={academicYear.id} />
                </div>
            </div>
        </AppLayout>
    );
}



function AddGradingPeriodForm({ academicYearId }: { academicYearId: number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        start_date: '',
        end_date: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/academic-years/${academicYearId}/grading-periods`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="grid gap-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800/50">
            <div>
                <Label htmlFor="gp_name">Nome (Ex: 1º Bimestre)</Label>
                <Input
                    id="gp_name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    placeholder="1º Bimestre"
                    className="mt-1"
                    required
                />
                <InputError message={errors.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="gp_start">Início</Label>
                    <Input
                        id="gp_start"
                        type="date"
                        value={data.start_date}
                        onChange={e => setData('start_date', e.target.value)}
                        className="mt-1"
                        required
                    />
                    <InputError message={errors.start_date} />
                </div>
                <div>
                    <Label htmlFor="gp_end">Fim</Label>
                    <Input
                        id="gp_end"
                        type="date"
                        value={data.end_date}
                        onChange={e => setData('end_date', e.target.value)}
                        className="mt-1"
                        required
                    />
                    <InputError message={errors.end_date} />
                </div>
            </div>
            <Button disabled={processing} size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">Adicionar Período</Button>
        </form>
    );
}
