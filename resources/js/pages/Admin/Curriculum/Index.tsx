import admin from '@/routes/admin/index';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, Plus, Calendar, BookOpen, Layers, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Estrutura Curricular',
        href: '/admin/curriculum',
    },
];

interface AcademicYear {
    id: number;
    year: string;
    start_date: string;
    end_date: string;
    status: 'open' | 'closed' | 'ended';
}

interface EducationLevel {
    id: number;
    name: string;
    description: string;
}

interface Grade {
    id: number;
    name: string;
    education_level_id: number;
    education_level?: EducationLevel;
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface Props {
    academicYears: AcademicYear[];
    educationLevels: EducationLevel[];
    grades: Grade[];
    subjects: Subject[];
}

export default function Index({ academicYears, educationLevels, grades, subjects }: Props) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open':
                return <Badge className="bg-green-100 text-green-800 border-green-200">Aberto</Badge>;
            case 'closed':
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Fechado</Badge>;
            case 'ended':
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Finalizado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Estrutura Curricular" />
            
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Estrutura Curricular</h1>
                    <p className="text-muted-foreground">Gerencie anos letivos, níveis de ensino, séries e disciplinas em um só lugar.</p>
                </div>

                <Tabs defaultValue="academic-years" className="w-full">
                    <TabsList className="inline-flex h-12 items-center justify-start rounded-xl bg-muted/50 p-1 text-muted-foreground shadow-sm mb-6 w-full sm:w-auto">
                        <TabsTrigger value="academic-years" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400">
                            <Calendar className="mr-2 h-4 w-4" />
                            Anos Letivos
                        </TabsTrigger>
                        <TabsTrigger value="education-levels" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Níveis de Ensino
                        </TabsTrigger>
                        <TabsTrigger value="grades" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400">
                            <Layers className="mr-2 h-4 w-4" />
                            Séries / Anos
                        </TabsTrigger>
                        <TabsTrigger value="subjects" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400">
                            <Book className="mr-2 h-4 w-4" />
                            Disciplinas
                        </TabsTrigger>
                    </TabsList>

                    {/* ACADEMIC YEARS */}
                    <TabsContent value="academic-years">
                        <Card className="border-none shadow-md overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <CardTitle>Anos Letivos</CardTitle>
                                    <CardDescription>Configuração dos calendários e períodos letivos.</CardDescription>
                                </div>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                                    <Link href={admin.academicYears.create.url()}>
                                        <Plus className="mr-2 h-4 w-4" /> Novo Ano Letivo
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Ano</TableHead>
                                            <TableHead>Início</TableHead>
                                            <TableHead>Fim</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {academicYears.length > 0 ? academicYears.map((year) => (
                                            <TableRow key={year.id} className="hover:bg-muted/50 transition-colors">
                                                <TableCell className="font-semibold">{year.year}</TableCell>
                                                <TableCell>{new Date(year.start_date).toLocaleDateString()}</TableCell>
                                                <TableCell>{new Date(year.end_date).toLocaleDateString()}</TableCell>
                                                <TableCell>{getStatusBadge(year.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" asChild title="Editar">
                                                            <Link href={admin.academicYears.edit.url(year.id)}>
                                                                <Edit className="h-4 w-4 text-gray-500 hover:text-blue-600" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="icon" asChild title="Excluir">
                                                            <Link href={admin.academicYears.destroy.url(year.id)} method="delete" as="button">
                                                                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-24 text-center">Nenhum ano letivo cadastrado.</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* EDUCATION LEVELS */}
                    <TabsContent value="education-levels">
                        <Card className="border-none shadow-md overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <CardTitle>Níveis de Ensino</CardTitle>
                                    <CardDescription>Segmentos como Infantil, Fundamental, Médio.</CardDescription>
                                </div>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                                    <Link href={admin.educationLevels.create.url()}>
                                        <Plus className="mr-2 h-4 w-4" /> Novo Nível
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Descrição</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {educationLevels.length > 0 ? educationLevels.map((level) => (
                                            <TableRow key={level.id} className="hover:bg-muted/50 transition-colors">
                                                <TableCell className="font-semibold">{level.name}</TableCell>
                                                <TableCell className="text-muted-foreground">{level.description || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" asChild title="Editar">
                                                            <Link href={admin.educationLevels.edit.url(level.id)}>
                                                                <Edit className="h-4 w-4 text-gray-500 hover:text-blue-600" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="icon" asChild title="Excluir">
                                                            <Link href={admin.educationLevels.destroy.url(level.id)} method="delete" as="button">
                                                                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="h-24 text-center">Nenhum nível de ensino cadastrado.</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* GRADES */}
                    <TabsContent value="grades">
                        <Card className="border-none shadow-md overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <CardTitle>Séries / Anos</CardTitle>
                                    <CardDescription>Etapas vinculadas aos níveis de ensino.</CardDescription>
                                </div>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                                    <Link href={admin.grades.create.url()}>
                                        <Plus className="mr-2 h-4 w-4" /> Nova Série
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Série / Ano</TableHead>
                                            <TableHead>Nível de Ensino</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {grades.length > 0 ? grades.map((grade) => (
                                            <TableRow key={grade.id} className="hover:bg-muted/50 transition-colors">
                                                <TableCell className="font-semibold">{grade.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="font-normal capitalize">
                                                        {grade.education_level?.name}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" asChild title="Editar">
                                                            <Link href={admin.grades.edit.url(grade.id)}>
                                                                <Edit className="h-4 w-4 text-gray-500 hover:text-blue-600" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="icon" asChild title="Excluir">
                                                            <Link href={admin.grades.destroy.url(grade.id)} method="delete" as="button">
                                                                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="h-24 text-center">Nenhuma série cadastrada.</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SUBJECTS */}
                    <TabsContent value="subjects">
                        <Card className="border-none shadow-md overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <CardTitle>Disciplinas</CardTitle>
                                    <CardDescription>Matérias da base curricular (Ex: Português, Matemática).</CardDescription>
                                </div>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                                    <Link href={admin.subjects.create.url()}>
                                        <Plus className="mr-2 h-4 w-4" /> Nova Disciplina
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Código</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {subjects.length > 0 ? subjects.map((subject) => (
                                            <TableRow key={subject.id} className="hover:bg-muted/50 transition-colors">
                                                <TableCell className="font-semibold">{subject.name}</TableCell>
                                                <TableCell className="font-mono text-xs text-muted-foreground">{subject.code || '-'}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" asChild title="Editar">
                                                            <Link href={admin.subjects.edit.url(subject.id)}>
                                                                <Edit className="h-4 w-4 text-gray-500 hover:text-blue-600" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="icon" asChild title="Excluir">
                                                            <Link href={admin.subjects.destroy.url(subject.id)} method="delete" as="button">
                                                                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="h-24 text-center">Nenhuma disciplina cadastrada.</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
