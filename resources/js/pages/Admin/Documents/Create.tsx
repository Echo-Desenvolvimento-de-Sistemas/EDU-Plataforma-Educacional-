import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react'; // Import useForm
import { Button } from '@/components/ui/button'; // Import Button
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import Card components
import { Label } from '@/components/ui/label'; // Import Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select components
import admin from '@/routes/admin/index'; // Import admin routes
import { ArrowLeft, CheckCircle, Printer } from 'lucide-react'; // Import icons

interface Student {
    id: number;
    name: string;
    cpf: string;
}

interface DocumentTemplate {
    id: number;
    title: string;
    type: string;
}

interface Props {
    students: Student[];
    templates: DocumentTemplate[];
}

export default function Create({ students, templates }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        template_id: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Documentos Emitidos',
            href: admin.documents.index.url(),
        },
        {
            title: 'Emitir Novo',
            href: '#',
        },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.documents.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Emitir Novo Documento" />

            <div className="flex flex-col gap-6 p-4 max-w-3xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={admin.documents.index.url()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Emitir Novo Documento</h1>
                        <p className="text-muted-foreground">
                            Selecione o aluno e o modelo para gerar o documento.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Dados da Emissão</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">

                            <div className="space-y-2">
                                <Label htmlFor="student_id">Aluno</Label>
                                <Select
                                    value={data.student_id}
                                    onValueChange={(val) => setData('student_id', val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o aluno..." />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">
                                        {students.map((student) => (
                                            <SelectItem key={student.id} value={student.id.toString()}>
                                                {student.name} ({student.cpf || 'Sem CPF'})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.student_id && <span className="text-sm text-red-500">{errors.student_id}</span>}
                                <p className="text-xs text-muted-foreground">
                                    Selecione o aluno para quem o documento será emitido.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="template_id">Modelo de Documento</Label>
                                <Select
                                    value={data.template_id}
                                    onValueChange={(val) => setData('template_id', val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o modelo..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {templates.map((template) => (
                                            <SelectItem key={template.id} value={template.id.toString()}>
                                                {template.title} ({template.type})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.template_id && <span className="text-sm text-red-500">{errors.template_id}</span>}
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                    <Printer className="h-4 w-4 mr-2" />
                                    Gerar e Emitir
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
