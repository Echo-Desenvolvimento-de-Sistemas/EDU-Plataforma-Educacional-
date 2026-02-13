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

interface Grade {
    id: number;
    name: string;
}

interface AcademicYear {
    id: number;
    year: string;
}

interface ClassRoom {
    id: number;
    name: string;
    grade_id: number;
    academic_year_id: number;
    shift: string;
}

interface Props {
    classRoom: ClassRoom;
    grades: Grade[];
    academicYears: AcademicYear[];
}

export default function Edit({ classRoom, grades, academicYears }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Turmas',
            href: '/admin/class-rooms',
        },
        {
            title: 'Editar Turma',
            href: `/admin/class-rooms/${classRoom.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: classRoom.name,
        grade_id: classRoom.grade_id.toString(),
        academic_year_id: classRoom.academic_year_id.toString(),
        shift: classRoom.shift,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(admin.classRooms.update.url(classRoom.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Turma" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-2xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Editar Turma</h2>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Nome (Ex: 1º Ano A)</Label>
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
                            <Label htmlFor="grade_id">Série / Ano</Label>
                            <Select value={data.grade_id} onValueChange={(value) => setData('grade_id', value)}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Selecione a série" />
                                </SelectTrigger>
                                <SelectContent>
                                    {grades.map((grade) => (
                                        <SelectItem key={grade.id} value={grade.id.toString()}>
                                            {grade.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.grade_id} />
                        </div>

                        <div>
                            <Label htmlFor="academic_year_id">Ano Letivo</Label>
                            <Select value={data.academic_year_id} onValueChange={(value) => setData('academic_year_id', value)}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Selecione o ano letivo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {academicYears.map((year) => (
                                        <SelectItem key={year.id} value={year.id.toString()}>
                                            {year.year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.academic_year_id} />
                        </div>

                        <div>
                            <Label htmlFor="shift">Turno</Label>
                            <Select value={data.shift} onValueChange={(value) => setData('shift', value)}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Selecione o turno" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="matutino">Matutino</SelectItem>
                                    <SelectItem value="vespertino">Vespertino</SelectItem>
                                    <SelectItem value="noturno">Noturno</SelectItem>
                                    <SelectItem value="integral">Integral</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError className="mt-2" message={errors.shift} />
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
