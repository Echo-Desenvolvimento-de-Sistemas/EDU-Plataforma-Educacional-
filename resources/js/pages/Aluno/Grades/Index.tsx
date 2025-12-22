import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/aluno/dashboard' },
    { title: 'Boletim', href: '/aluno/grades' },
];

interface Period {
    id: number;
    name: string;
}

interface Props {
    periods: Period[];
    reportCard: any[];
}

export default function Index({ periods, reportCard }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meu Boletim" />

            <div className="flex flex-col gap-6 p-4 max-w-6xl mx-auto w-full">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Meu Boletim</h1>
                    <p className="text-muted-foreground">Acompanhe suas notas e desempenho por bimestre.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Boletim Escolar</CardTitle>
                        <CardDescription>Notas por disciplina e período avaliativo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Disciplina</TableHead>
                                    {periods.map(period => (
                                        <TableHead key={period.id} className="text-center">
                                            {period.name}
                                        </TableHead>
                                    ))}
                                    <TableHead className="text-center font-bold">Média Final</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportCard.map((row, idx) => {
                                    // Calculate Total/Average loosely for display
                                    // Filter out non-numeric values
                                    const scores = periods.map(p => row['period_' + p.id]).filter(v => v !== '-');
                                    const total = scores.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
                                    // Assuming simple sum for now as per controller logic, or avg if needed.
                                    // If system uses summing points (e.g. 25 per period), then Total is sum.

                                    return (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">{row.subject}</TableCell>
                                            {periods.map(period => (
                                                <TableCell key={period.id} className="text-center">
                                                    <span className={row['period_' + period.id] < 60 && row['period_' + period.id] !== '-' ? 'text-red-600 font-bold' : ''}>
                                                        {row['period_' + period.id]}
                                                    </span>
                                                </TableCell>
                                            ))}
                                            <TableCell className="text-center font-bold">
                                                <Badge variant={total >= 60 ? "default" : "destructive"}>
                                                    {total}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
