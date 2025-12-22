import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, GraduationCap } from 'lucide-react';

interface Student {
    id: number;
    name: string;
    grade?: { name: string };
    class_room?: { name: string };
}

interface Props {
    students: Student[];
}

export default function Dashboard({ students }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/responsavel/dashboard' }]}>
            <Head title="Dashboard Responsável" />
            <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">Painel do Responsável</h1>
                    <p className="text-muted-foreground">Acompanhe a vida escolar dos seus filhos.</p>
                </div>

                {students.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6 text-center text-muted-foreground">
                            Nenhum estudante vinculado ao seu perfil ainda.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {students.map((student) => (
                            <Card key={student.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-bold">
                                        {student.name}
                                    </CardTitle>
                                    <User className="h-5 w-5 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                        <GraduationCap className="h-4 w-4" />
                                        <span>
                                            {student.class_room?.grade?.name} {' - '} {student.class_room?.name || 'Sem Turma'}
                                        </span>
                                    </div>
                                    {/* Future buttons for grades/attendance */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" size="sm" className="w-full" disabled>
                                            Boletim (Em breve)
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
