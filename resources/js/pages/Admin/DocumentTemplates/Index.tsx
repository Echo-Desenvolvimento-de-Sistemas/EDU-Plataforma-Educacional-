import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react'; // Import router
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Plus, Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import admin from '@/routes/admin/index';

interface DocumentTemplate {
    id: number;
    title: string;
    type: string;
    is_active: boolean;
    created_at: string;
}

interface Props {
    templates: DocumentTemplate[];
}

export default function Index({ templates }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Modelos de Documento',
            href: admin.documentTemplates.index.url(),
        },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este modelo?')) {
            router.delete(admin.documentTemplates.destroy.url(id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modelos de Documento" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Modelos de Documento</h1>
                        <p className="text-muted-foreground">
                            Gerencie os modelos utilizados para gerar documentos acadêmicos.
                        </p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                        <Link href={admin.documentTemplates.create.url()}>
                            <Plus className="h-4 w-4 mr-2" />
                            Novo Modelo
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Modelos Cadastrados</CardTitle>
                        <CardDescription>Lista de todos os modelos disponíveis no sistema.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Título</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {templates.length > 0 ? (
                                        templates.map((template) => (
                                            <TableRow key={template.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                                        {template.title}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{template.type}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {template.is_active ? (
                                                        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                                                            <CheckCircle className="h-3 w-3 mr-1" /> Ativo
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary">
                                                            <XCircle className="h-3 w-3 mr-1" /> Inativo
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link href={admin.documentTemplates.edit.url(template.id)}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:text-destructive/90"
                                                            onClick={() => handleDelete(template.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                                Nenhum modelo encontrado.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
