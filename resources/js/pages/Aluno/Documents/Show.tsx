import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import documents from '@/routes/aluno/documents/index';

interface IssuedDocument {
    id: number;
    uuid: string;
    content_snapshot: string;
    template: { title: string };
    created_at: string;
}

interface Props {
    document: IssuedDocument;
}

export default function Show({ document }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Aluno',
            href: '/aluno/dashboard',
        },
        {
            title: 'Documentos',
            href: documents.index.url(),
        },
        {
            title: document.template?.title || 'Visualizar',
            href: '#',
        },
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Documento - ${document.uuid}`} />

            <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto w-full print:p-0">
                <div className="flex items-center justify-between print:hidden">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={documents.index.url()}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Visualizar Documento</h1>
                            <p className="text-muted-foreground">
                                ID: <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{document.uuid}</span>
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

                {/* Print Container */}
                <div className="bg-white text-black p-8 rounded-xl border shadow-sm print:shadow-none print:border-none print:fixed print:top-0 print:left-0 print:w-full print:h-full print:z-[9999] print:bg-white print:m-0 print:rounded-none overflow-visible">
                    <div
                        dangerouslySetInnerHTML={{ __html: document.content_snapshot }}
                        className="document-content print-content"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
