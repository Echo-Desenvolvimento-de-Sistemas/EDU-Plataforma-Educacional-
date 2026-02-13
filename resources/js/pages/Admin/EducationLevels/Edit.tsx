import admin from '@/routes/admin';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface EducationLevel {
    id: number;
    name: string;
    description: string;
}

interface Props {
    educationLevel: EducationLevel;
}

export default function Edit({ educationLevel }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Níveis de Ensino',
            href: '/admin/education-levels',
        },
        {
            title: 'Editar Nível',
            href: `/admin/education-levels/${educationLevel.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: educationLevel.name,
        description: educationLevel.description || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(admin.educationLevels.update.url(educationLevel.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Nível de Ensino" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-2xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Editar Nível de Ensino</h2>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Nome (Ex: Ensino Médio)</Label>
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
                            <Label htmlFor="description">Descrição (Opcional)</Label>
                            <Textarea
                                id="description"
                                className="mt-1 block w-full"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.description} />
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
