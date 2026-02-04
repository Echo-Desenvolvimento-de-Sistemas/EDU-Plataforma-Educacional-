import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Download, FileJson } from 'lucide-react';

export default function GamificationTest() {

    const handleDownload = () => {
        window.location.href = '/admin/gamification/test/export';
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Gamificação', href: '/admin/gamification/test' },
                { title: 'Exportar Dados', href: '/admin/gamification/test' },
            ]}
        >
            <Head title="Exportar para Gamificação" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileJson className="h-6 w-6 text-blue-500" />
                                Exportar Dados para Migração
                            </CardTitle>
                            <CardDescription>
                                Gere um arquivo JSON contendo todos os Usuários, Turmas e Matrículas do sistema Edu.
                                <br />
                                Envie este arquivo para o desenvolvedor do sistema de Gamificação para importar os dados de uma só vez.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-800">
                                <strong>Nota:</strong> Essa ação fará o download de um arquivo <code>.json</code>. O tempo de geração depende da quantidade de alunos.
                            </div>

                            <Button onClick={handleDownload} className="w-full md:w-auto text-lg py-6 px-8">
                                <Download className="mr-2 h-5 w-5" />
                                Baixar Arquivo de Migração
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
