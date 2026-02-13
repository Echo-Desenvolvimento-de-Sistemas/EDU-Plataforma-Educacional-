import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Plus, ExternalLink, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import documents from '@/routes/aluno/documents/index';
import { useState } from 'react';

interface DocumentTemplate {
    id: number;
    title: string;
    type: string;
}

interface IssuedDocument {
    id: number;
    uuid: string;
    template: DocumentTemplate;
    created_at: string;
}

interface Props {
    templates: DocumentTemplate[];
    issuedDocuments: IssuedDocument[];
}

export default function Index({ templates, issuedDocuments }: Props) {
    const [issuingId, setIssuingId] = useState<number | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Aluno',
            href: '/aluno/dashboard',
        },
        {
            title: 'Documentos',
            href: documents.index.url(),
        },
    ];

    const handleGenerate = (templateId: number) => {
        setIssuingId(templateId);
        router.post(documents.store.url(), {
            template_id: templateId
        }, {
            onFinish: () => setIssuingId(null)
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meus Documentos" />

            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Documentos e Declarações</h1>
                    <p className="text-muted-foreground">
                        Emita declarações e visualize seu histórico de documentos.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Emitir Novo Documento */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Emitir Novo Documento</CardTitle>
                            <CardDescription>Selecione o tipo de documento que deseja solicitar.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {templates.length > 0 ? (
                                    templates.map(template => (
                                        <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:text-white">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-primary dark:text-white" />
                                                <span className="font-medium">{template.title}</span>
                                            </div>
                                            <Button
                                                onClick={() => handleGenerate(template.id)}
                                                disabled={issuingId !== null}
                                                size="sm"
                                                className="dark:bg-black dark:text-white dark:hover:bg-black/90"
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Emitir
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">Nenhum modelo disponível no momento.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Histórico */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Histórico de Emissões</CardTitle>
                            <CardDescription>Documentos gerados recentemente.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Documento</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {issuedDocuments.length > 0 ? (
                                            issuedDocuments.map(doc => (
                                                <TableRow key={doc.id}>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{doc.template.title}</span>
                                                            <span className="text-xs text-gray-500">
                                                                Emitido em {new Date(doc.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link href={documents.show.url({ document: doc.id })}>
                                                                <Printer className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                                                    Nenhum documento emitido.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
