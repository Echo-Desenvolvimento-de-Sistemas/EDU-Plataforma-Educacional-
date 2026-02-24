import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, BookOpen, GraduationCap, AlertTriangle, HelpCircle, Trash2, Plus, GripVertical } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Painel', href: '/professor/dashboard' },
    { title: 'Manual', href: '/professor/manual' },
];

export default function Manual() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manual do Sistema" />

            <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 pb-20">

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Manual do Professor</h1>
                    <p className="text-lg text-muted-foreground">
                        Guia completo para explorar todas as funcionalidades do painel acadêmico.
                    </p>
                </div>

                <Tabs defaultValue="dashboard" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent mb-6 gap-2 flex-wrap">
                        <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary/90 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3">
                            Painel Principal
                        </TabsTrigger>
                        <TabsTrigger value="attendance" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary/90 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3">
                            Chamada & Frequência
                        </TabsTrigger>
                        <TabsTrigger value="grades" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary/90 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3">
                            Notas & Avaliações
                        </TabsTrigger>
                        <TabsTrigger value="faq" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary/90 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3">
                            Dúvidas Frequentes
                        </TabsTrigger>
                    </TabsList>

                    {/* Dashboard Guide */}
                    <TabsContent value="dashboard" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-primary" />
                                        Cronograma & Aulas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm text-foreground">
                                    <p>
                                        O <strong>Cronograma do Dia</strong> exibe todas as suas aulas agendadas para hoje.
                                        O cartão destacado no topo (Acompanhamento) mostra a aula que está acontecendo agora ou a próxima da fila.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        <li><strong className="text-primary/90">Agora:</strong> Indica a aula que está em andamento. Clique para ir direto para a chamada.</li>
                                        <li><strong className="text-slate-700">Concluída:</strong> Aulas que já passaram no dia de hoje. Você ainda pode clicar nelas para ajustar a frequência ou conteúdo.</li>
                                        <li><strong className="text-gray-500">Próximas:</strong> Aulas agendadas para mais tarde.</li>
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
                                <CardContent className="space-y-4 text-sm text-foreground">
                                    <p>
                                        Use a barra lateral direita (em telas grandes) ou o menu para navegar rapidamente:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        <li><strong>Minhas Turmas:</strong> Lista completa de todas as disciplinas que você leciona, organizadas por turma.</li>
                                        <li><strong>Calendário:</strong> Visualize feriados, eventos escolares e dias letivos.</li>
                                        <li><strong>Relatórios:</strong> Acesse métricas de desempenho dos seus alunos e turmas.</li>
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
                                        <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 mx-1 text-xs font-bold font-mono border ml-1">P</span>
                                        para alternar para
                                        <span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 mx-1 text-xs font-bold font-mono border ml-1">F</span> (Falta).
                                    </li>
                                    <li>
                                        <strong>Falta Justificada:</strong> Clique novamente para alternar para
                                        <span className="inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 mx-1 text-xs font-bold font-mono border ml-1">FJ</span>.
                                        Isso indica que o aluno faltou, mas apresentou justificativa (abono).
                                    </li>
                                    <li>
                                        <strong>Conteúdo da Aula:</strong> É <span className="text-red-500 font-bold">obrigatório</span> preencher o resumo do que foi ensinado no campo "Conteúdo da Aula".
                                    </li>
                                    <li>
                                        <strong>Finalizar:</strong> Clique em "Confirmar Chamada" para salvar. O sistema registrará a data e hora do lançamento.
                                    </li>
                                </ol>

                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
                                    <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4" /> Dias Anteriores
                                    </h4>
                                    <p className="text-sm text-amber-900">
                                        Esqueceu de lançar? Vá em <strong>Minhas Turmas</strong> -&gt; Selecione a Turma -&gt; Aba <strong>Frequência</strong>. Lá você verá o histórico de todas as aulas e poderá editar qualquer uma delas.
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
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                    Lançamento de Notas (Novo Grid)
                                </CardTitle>
                                <CardDescription>
                                    O sistema agora utiliza uma <strong>tabela dinâmica</strong> (Grid) para facilitar o lançamento de várias avaliações ao mesmo tempo.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 text-sm">

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-base flex items-center gap-2">
                                            <Plus className="w-4 h-4 text-primary" />
                                            1. Criar Avaliação
                                        </h4>
                                        <p className="text-muted-foreground">
                                            Para lançar notas, você primeiro precisa criar a coluna da avaliação na tabela.
                                            Clique no botão <strong>Nova Avaliação</strong> no topo da página.
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                            <li><strong>Nome:</strong> Ex: Prova 1, Trabalho em Grupo.</li>
                                            <li><strong>Data:</strong> Data da realização.</li>
                                            <li><strong>Peso:</strong> Importância da nota na média final.</li>
                                        </ul>
                                        <div className="bg-muted p-3 rounded text-xs border">
                                            <strong>Dica sobre Peso:</strong> Se você usa média aritmética simples, deixe o Peso como 1 em todas. Se uma prova vale o dobro, coloque Peso 2.
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold text-base flex items-center gap-2">
                                            <GripVertical className="w-4 h-4 text-primary" />
                                            2. Lançar no Grid
                                        </h4>
                                        <p className="text-muted-foreground">
                                            A nova avaliação aparecerá como uma coluna na tabela.
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                            <li>Digite a nota e pressione <strong>Enter</strong> ou <strong>Seta para Baixo</strong> para ir para o próximo aluno.</li>
                                            <li>O sistema salva temporariamente enquanto você digita.</li>
                                            <li>Notas abaixo de 60% ficarão vermelhas para alerta.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="border-t pt-6 space-y-4">
                                    <h4 className="font-bold text-base flex items-center gap-2">
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                        Excluir Avaliação
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Errou ao criar? Passe o mouse sobre o <strong>título da coluna</strong> da avaliação na tabela.
                                        Um ícone de menu (três pontinhos) aparecerá. Clique nele e selecione <strong>Excluir Avaliação</strong>.
                                        <br />
                                        <span className="text-red-600 text-xs font-bold">Cuidado: Isso apagará todas as notas lançadas para aquela avaliação.</span>
                                    </p>
                                </div>

                                <div className="bg-primary/10 p-4 rounded-lg flex items-center justify-between border border-primary/20">
                                    <span className="text-primary font-medium">
                                        Não esqueça de clicar em <strong>Salvar Notas</strong> ao finalizar os lançamentos!
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* FAQ Tab */}
                    <TabsContent value="faq" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-green-600" />
                                    Dúvidas Frequentes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Como corrijo uma nota lançada errada?</AccordionTrigger>
                                        <AccordionContent>
                                            Basta clicar novamente na célula da nota na tabela, apagar o valor ou digitar o novo valor e clicar em "Salvar Notas".
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>O sistema calcula a média automaticamente?</AccordionTrigger>
                                        <AccordionContent>
                                            Sim. O sistema utiliza a fórmula de <strong>Média Ponderada</strong> baseada nos pesos que você definiu para cada avaliação. Assim que você lança as notas, a média do aluno é recalculada internamente.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Posso dar nota quebrada (ex: 8.5)?</AccordionTrigger>
                                        <AccordionContent>
                                            Sim, o sistema aceita casas decimais. Utilize ponto ou vírgula conforme a configuração do seu teclado.
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>Como lanço falta para um dia que já passou?</AccordionTrigger>
                                        <AccordionContent>
                                            Vá em <strong>Minhas Turmas</strong>, selecione a turma, clique na aba <strong>Frequência</strong>, encontre a aula na lista de histórico e clique em "Editar".
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-5">
                                        <AccordionTrigger>O que acontece se eu excluir uma avaliação?</AccordionTrigger>
                                        <AccordionContent className="text-red-600">
                                            A avaliação e todas as notas de alunos associadas a ela serão permanentemente removidas do sistema. A média dos alunos será recalculada desconsiderando essa avaliação.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
        </AppLayout>
    );
}
