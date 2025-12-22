import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
    isValid: boolean;
    message?: string;
    document?: {
        uuid: string;
        student_name: string;
        document_type: string;
        issued_at: string;
        content_snapshot?: string;
    };
}

export default function Validate({ isValid, message, document }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Head title="Validação de Documento" />

            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader className={`text-center py-8 rounded-t-lg ${isValid ? 'bg-green-50' : 'bg-red-50'} print:hidden`}>
                    <div className="flex justify-center mb-4">
                        {isValid ? (
                            <CheckCircle className="h-16 w-16 text-green-600" />
                        ) : (
                            <XCircle className="h-16 w-16 text-red-600" />
                        )}
                    </div>
                    <CardTitle className={`text-2xl font-bold ${isValid ? 'text-green-700' : 'text-red-700'}`}>
                        {isValid ? 'DOCUMENTO VÁLIDO' : 'DOCUMENTO INVÁLIDO'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-8 pb-8 space-y-4">
                    {isValid && document ? (
                        <>
                            <div className="text-center mb-6">
                                <p className="text-gray-600 dark:text-gray-400 font-medium">
                                    Este documento foi emitido oficialmente pelo sistema Edu Escola.
                                </p>
                            </div>

                            <div className="space-y-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md text-left">
                                <div className="border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Aluno</span>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{document.student_name}</p>
                                </div>
                                <div className="border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Tipo de Documento</span>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{document.document_type}</p>
                                </div>
                                <div className="border-b border-gray-100 dark:border-gray-700 pb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Data de Emissão</span>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{document.issued_at}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-gray-400 uppercase">Código de Verificação</span>
                                    <p className="font-mono text-sm break-all text-gray-900 dark:text-gray-100">{document.uuid}</p>
                                </div>
                            </div>

                            <div className="mt-6 text-center text-xs text-gray-400 print:hidden">
                                <p>A autenticidade deste documento pode ser verificada a qualquer momento através deste link.</p>
                            </div>

                            {/* DOCUMENT PREVIEW */}
                            {document.content_snapshot && (
                                <div className="mt-8 border-t pt-8">
                                    <div className="flex justify-end mb-4 print:hidden">
                                        <button
                                            onClick={() => {
                                                const printWindow = window.open('', '_blank');
                                                if (printWindow && document.content_snapshot) {
                                                    printWindow.document.write(`
                                                        <html>
                                                            <head>
                                                                <title>${document.student_name} - ${document.document_type}</title>
                                                                <style>
                                                                    body { 
                                                                        font-family: 'Times New Roman', Times, serif; 
                                                                        margin: 0;
                                                                        padding: 2cm;
                                                                    }
                                                                    img { max-width: 100%; }
                                                                    @media print {
                                                                        @page { margin: 0; }
                                                                        body { padding: 2cm; }
                                                                    }
                                                                </style>
                                                            </head>
                                                            <body>
                                                                ${document.content_snapshot}
                                                                <script>
                                                                    window.onload = function() { 
                                                                        setTimeout(() => { window.print(); }, 500); 
                                                                    }
                                                                </script>
                                                            </body>
                                                        </html>
                                                    `);
                                                    printWindow.document.close();
                                                }
                                            }}
                                            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 flex items-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                            Imprimir Documento
                                        </button>
                                    </div>
                                    <div
                                        className="document-preview border p-8 bg-white text-black shadow-sm print:shadow-none print:border-0"
                                        dangerouslySetInnerHTML={{ __html: document.content_snapshot }}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-700 text-lg">
                                {message || 'O código informado não corresponde a nenhum documento válido em nossa base de dados.'}
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                Se acredita que isso é um erro, entre em contato com a secretaria da escola.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
