import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Users, Calendar, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface AcademicYear {
    id: number;
    year: string;
}

interface ClassRoom {
    id: number;
    name: string;
    academic_year: AcademicYear;
    grade: {
        name: string;
        education_level: { name: string };
    };
    students_count?: number; // Optional if loaded
}

interface Props {
    classRooms: ClassRoom[];
    academicYears: AcademicYear[];
    filters: {
        academic_year_id?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secretaria',
        href: '/secretaria/dashboard',
    },
    {
        title: 'Notas e Boletins',
        href: '/secretaria/grades',
    },
];

export default function Index({ classRooms, academicYears, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleYearChange = (value: string) => {
        router.get('/secretaria/grades', { academic_year_id: value }, { preserveState: true });
    };

    const filteredClasses = classRooms.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.grade.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notas e Boletins" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Notas e Boletins</h1>
                        <p className="text-muted-foreground">Selecione uma turma para visualizar as notas e gerar boletins.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-[200px]">
                        <Select defaultValue={filters.academic_year_id} onValueChange={handleYearChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Ano Letivo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos os Anos</SelectItem>
                                {academicYears.map((year) => (
                                    <SelectItem key={year.id} value={year.id.toString()}>
                                        {year.year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar turma..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredClasses.length > 0 ? (
                        filteredClasses.map((cls) => (
                            <Card key={cls.id} className="hover:bg-accent/50 transition-colors">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{cls.name}</CardTitle>
                                        <span className="text-xs font-medium px-2 py-1 rounded bg-secondary text-secondary-foreground">
                                            {cls.academic_year.year}
                                        </span>
                                    </div>
                                    <CardDescription>{cls.grade?.name ?? 'Série N/D'} - {cls.grade?.education_level?.name ?? 'Nível N/D'}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-end mt-4">
                                        <Button asChild size="sm">
                                            <Link href={`/secretaria/grades/${cls.id}`}>
                                                <Users className="mr-2 h-4 w-4" />
                                                Ver Alunos
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            Nenhuma turma encontrada.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
