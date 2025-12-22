import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, BookOpen, GraduationCap, AlertTriangle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Painel', href: '/professor/dashboard' },
    { title: 'Manual', href: '/professor/manual' },
];

export default function Manual() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manual do Sistema" />

            <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-blue-900">Manual do Professor</h1>
                    <p className="text-lg text-muted-foreground">
                        Guia completo para explorar todas as funcionalidades do painel acadêmico.
                    </p>
                </div>

                <Tabs defaultValue="dashboard" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent mb-6 gap-2">
                        <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-4 py-2">
                            Painel Principal
                        </TabsTrigger>
                        <TabsTrigger value="attendance" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-4 py-2">
                            Chamada & Frequência
                        </TabsTrigger>
                        <TabsTrigger value="grades" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-4 py-2">
                            Notas & Avaliações
                        </TabsTrigger>
                    </TabsList>

                    {/* Dashboard Guide */}
                    <TabsContent value="dashboard" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                        Cronograma & Aulas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm text-muted-foreground">
                                    <p>
                                        O <strong>Cronograma do Dia</strong> exibe todas as suas aulas agendadas para hoje.
                                        O cartão destacado no topo (Acompanhamento) mostra a aula que está acontecendo agora ou a próxima da fila.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong className="text-blue-700">Agora:</strong> Indica a aula que está em andamento.</li>
                                        <li><strong className="text-slate-700">Concluída:</strong> Aulas que já passaram. Você ainda pode clicar nelas para ajustar a frequência.</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-purple-600" />
                                        Acesso Rápido
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm text-muted-foreground">
                                    <p>
                                        Use a barra lateral direita para navegar rapidamente:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Minhas Turmas:</strong> Lista completa de todas as disciplinas que você leciona.</li>
                                        <li><strong>Calendário:</strong> Visualize feriados e dias letivos.</li>
                                        <li><strong>Relatórios:</strong> Acesse métricas de desempenho dos seus alunos.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Attendance Guide */}
                    <TabsContent value="attendance" className="space-y-6">
                        <Card className="border-l-4 border-l-blue-600">
                            <CardHeader>
                                <CardTitle>Lançamento de Frequência</CardTitle>
                                <CardDescription>Como registrar a presença dos alunos diariamente.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ol className="list-decimal pl-5 space-y-4 text-sm text-foreground">
                                    <li>
                                        <strong>Acesse a Aula:</strong> No Painel, clique em "Gerenciar Aula" ou "Ir para chamada" no cartão da aula desejada.
                                    </li>
                                    <li>
                                        <strong>Status Padrão:</strong> Todos os alunos começam com o status
                                        <span className="font-bold text-green-600 mx-1">Presente</span>.
                                    </li>
                                    <li>
                                        <strong>Marcar Ausência:</strong> Clique no botão
                                        <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 mx-1 text-xs font-bold">P</span>
                                        para alternar para
                                        <span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 mx-1 text-xs font-bold">F</span> (Falta).
                                    </li>
                                    <li>
                                        <strong>Falta Justificada:</strong> Clique novamente para alternar para
                                        <span className="inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 mx-1 text-xs font-bold">FJ</span>.
                                        Isso indica que o aluno faltou, mas apresentou justificativa.
                                    </li>
                                    <li>
                                        <strong>Conteúdo da Aula:</strong> É obrigatório preencher o resumo do que foi ensinado no campo "Conteúdo da Aula".
                                    </li>
                                    <li>
                                        <strong>Finalizar:</strong> Clique em "Confirmar Chamada" para salvar.
                                    </li>
                                </ol>

                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
                                    <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4" /> Importante
                                    </h4>
                                    <p className="text-sm text-amber-900">
                                        Você pode alterar a frequência de dias anteriores. Basta acessar a página da turma, clicar na aba "Frequência" e selecionar a aula desejada no histórico.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Grades Guide */}
                    <TabsContent value="grades" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                                    Diário de Classe (Notas)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <p>
                                    O lançamento de notas é feito por bimestre. Siga este fluxo:
                                </p>
                                <div className="grid gap-4 md:grid-cols-3 mt-4">
                                    <div className="bg-card border p-4 rounded-lg">
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Passo 1</span>
                                        <h4 className="font-bold text-lg mb-2">Criar Avaliação</h4>
                                        <p className="text-muted-foreground">
                                            Vá na aba "Gerenciar Avaliações" e clique em "Nova Avaliação". Defina o nome (ex: Prova 1), a data e o valor máximo.
                                        </p>
                                    </div>
                                    <div className="bg-card border p-4 rounded-lg">
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Passo 2</span>
                                        <h4 className="font-bold text-lg mb-2">Lançar Notas</h4>
                                        <p className="text-muted-foreground">
                                            Na aba "Lançamento de Notas (Grid)", uma nova coluna aparecerá. Digite a nota de cada aluno.
                                        </p>
                                    </div>
                                    <div className="bg-card border p-4 rounded-lg">
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Passo 3</span>
                                        <h4 className="font-bold text-lg mb-2">Salvar</h4>
                                        <p className="text-muted-foreground">
                                            Clique em "Salvar Alterações" no topo da tabela. O sistema calcula automaticamente a média parcial.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
