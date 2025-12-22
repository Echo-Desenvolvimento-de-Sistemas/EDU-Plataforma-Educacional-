import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, ArrowLeft, Printer, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Subject {
    id: number;
    name: string;
}

interface PeriodResult {
    id: number;
    grading_period_id: number;
    subject_id: number;
    grade: string; // decimal string
    subject: Subject;
}

interface GradingPeriod {
    id: number;
    name: string;
}

interface Student {
    id: number;
    name: string;
    registration_number?: string;
}

interface ClassRoom {
    id: number;
    name: string;
    academic_year: { year: string };
    grade: { name: string };
}

interface Props {
    student: Student;
    classRoom: ClassRoom;
    periods: GradingPeriod[];
    results: PeriodResult[];
    schoolName?: string;
    logoUrl?: string;
}

export default function ReportCard({ student, classRoom, periods, results, schoolName = "Edu Escola", logoUrl }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Secretaria',
            href: '/secretaria/dashboard',
        },
        {
            title: 'Notas e Boletins',
            href: '/secretaria/grades',
        },
        {
            title: classRoom.name,
            href: `/secretaria/grades/${classRoom.id}`,
        },
        {
            title: 'Boletim',
            href: '#',
        },
    ];

    // Group results by subject
    const subjectMap = new Map<number, { name: string; grades: Record<number, string> }>();

    results.forEach(result => {
        if (!subjectMap.has(result.subject_id)) {
            subjectMap.set(result.subject_id, {
                name: result.subject.name,
                grades: {}
            });
        }
        subjectMap.get(result.subject_id)!.grades[result.grading_period_id] = parseFloat(result.grade).toFixed(1);
    });

    const subjects = Array.from(subjectMap.values());

    const handlePrint = () => {
        window.print();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Boletim - ${student.name}`} />

            <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto w-full print:p-0">
                <div className="flex items-center justify-between print:hidden">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`/secretaria/grades/${classRoom.id}`}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Boletim Escolar</h1>
                            <p className="text-muted-foreground">
                                Visualização de notas e desempenho.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrint}>
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimir / Salvar PDF
                        </Button>
                    </div>
                </div>

                {/* Print Overlay Wrapper: This div covers everything when printing */}
                <div className="bg-white p-8 rounded-xl border shadow-sm print:shadow-none print:border-none print:fixed print:top-0 print:left-0 print:w-full print:h-full print:z-[9999] print:bg-white print:m-0 print:rounded-none overflow-visible">

                    {/* Header para Impressão */}
                    <div className="hidden print:flex justify-between items-center border-b pb-6 mb-8">
                        <div className="flex items-center gap-4">
                            {logoUrl ? (
                                <img src={logoUrl} alt="Logo" className="max-h-20 w-auto object-contain print-color-adjust-exact" />
                            ) : (
                                <div className="h-16 w-16 bg-black text-white rounded-lg flex items-center justify-center font-bold text-2xl print:bg-black print:text-white print-color-adjust-exact">
                                    {schoolName.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold uppercase tracking-wide">{schoolName}</h1>
                                <p className="text-sm text-gray-600">Sistema de Gestão Escolar</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold">Boletim Escolar</h2>
                            <p className="text-gray-600">Ano Letivo: {classRoom.academic_year.year}</p>
                        </div>
                    </div>

                    {/* Header Visualização Tela */}
                    <div className="print:hidden border-b pb-6 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold uppercase tracking-wide">Edu Escola</h2>
                                <p className="text-sm text-gray-500">Relatório de Desempenho Acadêmico</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{classRoom.academic_year.year}</p>
                            </div>
                        </div>
                    </div>

                    {/* Dados do Aluno */}
                    <div className="mb-8 grid grid-cols-2 gap-4 text-sm p-4 bg-gray-50 rounded-lg border print:bg-transparent print:border-gray-200">
                        <div>
                            <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Aluno</p>
                            <p className="font-bold text-lg">{student.name}</p>
                            <p className="text-gray-500">Matrícula: {student.registration_number || '-'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 uppercase text-xs font-semibold mb-1">Enturmação</p>
                            <p className="font-bold text-lg">{classRoom.name}</p>
                            <p className="text-gray-500">{classRoom.grade.name}</p>
                        </div>
                    </div>

                    {/* Tabela de Notas */}
                    <div className="rounded-md border overflow-hidden print:border-gray-300">
                        <Table>
                            <TableHeader className="bg-gray-50 print:bg-gray-100 print-color-adjust-exact">
                                <TableRow>
                                    <TableHead className="w-[30%] text-black font-bold">Disciplina</TableHead>
                                    {periods.map(period => (
                                        <TableHead key={period.id} className="text-center text-black font-bold">{period.name}</TableHead>
                                    ))}
                                    <TableHead className="text-center text-black font-bold border-l print:border-l print:border-gray-200">Média Final</TableHead>
                                    <TableHead className="text-center text-black font-bold">Resultado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects.length > 0 ? (
                                    subjects.map((subj, index) => {
                                        const grades = Object.values(subj.grades).map(g => parseFloat(g));
                                        const sum = grades.reduce((acc, curr) => acc + curr, 0);
                                        const avg = grades.length > 0 ? (sum / grades.length).toFixed(1) : '-';

                                        const isApproved = avg !== '-' && parseFloat(avg) >= 6.0;

                                        return (
                                            <TableRow key={index} className="print:border-gray-200">
                                                <TableCell className="font-medium text-black">{subj.name}</TableCell>
                                                {periods.map(period => (
                                                    <TableCell key={period.id} className="text-center text-black">
                                                        {subj.grades[period.id] !== undefined ?
                                                            parseFloat(subj.grades[period.id]).toFixed(1)
                                                            : '-'
                                                        }
                                                    </TableCell>
                                                ))}
                                                <TableCell className="text-center font-bold text-black border-l border-gray-100 print:border-gray-200">
                                                    {avg}
                                                </TableCell>
                                                <TableCell className="text-center text-black">
                                                    {avg !== '-' && (
                                                        <span className={`px-2 py-1 rounded text-xs font-bold print:border print:border-black print:px-1 print:py-0 ${isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} print-color-adjust-exact`}>
                                                            {isApproved ? 'APROVADO' : 'REPROVADO'}
                                                        </span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={periods.length + 3} className="h-24 text-center">
                                            Nenhuma nota lançada.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer de Impressão */}
                    <div className="mt-12 pt-8 border-t text-center text-xs text-gray-500 hidden print:flex justify-between items-center">
                        <p>Documento gerado em {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}</p>
                        <p>Edu Escola - Sistema de Gestão Acadêmica</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
