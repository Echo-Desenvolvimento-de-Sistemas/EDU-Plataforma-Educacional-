import admin from '@/routes/admin';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface EducationLevel {
    id: number;
    name: string;
}

interface Grade {
    id: number;
    name: string;
    education_level_id: number;
}

interface Props {
    grade: Grade;
    educationLevels: EducationLevel[];
}

export default function Edit({ grade, educationLevels }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Séries / Anos',
            href: '/admin/grades',
        },
        {
            title: 'Editar Série',
            href: `/admin/grades/${grade.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: grade.name,
        education_level_id: grade.education_level_id.toString(),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(admin.grades.update.url(grade.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Série / Ano" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-2xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Editar Série / Ano</h2>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Nome (Ex: 1º Ano)</Label>
                            <Input
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <Label htmlFor="education_level_id">Nível de Ensino</Label>
                            <Select value={data.education_level_id} onValueChange={(value) => setData('education_level_id', value)}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Selecione o nível de ensino" />
                                </SelectTrigger>
                                <SelectContent>
                                    {educationLevels.map((level) => (
                                        <SelectItem key={level.id} value={level.id.toString()}>
                                            {level.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.education_level_id} />
                        </div>

                        <div className="flex items-center justify-end">
                            <Button className="ml-4" disabled={processing}>
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
