import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Shield, School, GraduationCap, Users, User, ArrowRight } from 'lucide-react';

interface ManualIndexProps {
    role: string;
}

export default function ManualIndex({ role }: ManualIndexProps) {
    const defaultTab = ['admin', 'secretaria', 'professor', 'aluno', 'responsavel'].includes(role) ? role : 'intro';

    return (
        <AppLayout breadcrumbs={[{ title: 'Manual do Usuário', href: '/manual' }]}>
            <Head title="Manual do Usuário" />

            <div className="flex bg-muted/40 p-4 md:p-6 min-h-screen">
                <main className="mx-auto w-full max-w-5xl space-y-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">Manual do Usuário - Edu</h1>
                        <p className="text-muted-foreground">
                            Guia passo a passo completo para utilização da plataforma.
                        </p>
                    </div>

                    <Tabs defaultValue={defaultTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
                            <TabsTrigger value="intro">Introdução</TabsTrigger>
                            <TabsTrigger value="admin" className={role !== 'admin' ? 'hidden lg:flex' : ''} disabled={role !== 'admin'}>Admin</TabsTrigger>
                            <TabsTrigger value="secretaria" className={role !== 'secretaria' && role !== 'admin' ? 'hidden lg:flex' : ''} disabled={role !== 'secretaria' && role !== 'admin'}>Secretaria</TabsTrigger>
                            <TabsTrigger value="professor" className={role !== 'professor' && role !== 'admin' ? 'hidden lg:flex' : ''} disabled={role !== 'professor' && role !== 'admin'}>Professor</TabsTrigger>
                            <TabsTrigger value="aluno" className={role !== 'aluno' && role !== 'admin' ? 'hidden lg:flex' : ''} disabled={role !== 'aluno' && role !== 'admin' && role !== 'responsavel'}>Aluno</TabsTrigger>
                            <TabsTrigger value="responsavel" className={role !== 'responsavel' && role !== 'admin' ? 'hidden lg:flex' : ''} disabled={role !== 'responsavel' && role !== 'admin'}>Responsável</TabsTrigger>
                        </TabsList>

                        {/* INTRODUCTION */}
                        <TabsContent value="intro" className="space-y-4 mt-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-6 w-6 text-primary" />
                                        <CardTitle>Bem-vindo à Plataforma Edu</CardTitle>
                                    </div>
                                    <CardDescription>Visão geral e primeiros passos.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p>Este sistema conecta toda a comunidade escolar. Abaixo, identifique seu perfil para entender suas permissões:</p>

                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                                            <div className="flex items-center gap-2 mb-2 font-semibold text-red-600">
                                                <Shield className="h-5 w-5" /> Admin
                                            </div>
                                            <p className="text-sm text-muted-foreground">Responsável por configurar o sistema, criar anos letivos, turmas e gerenciar todos os usuários.</p>
                                        </div>
                                        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                                            <div className="flex items-center gap-2 mb-2 font-semibold text-blue-600">
                                                <School className="h-5 w-5" /> Secretaria
                                            </div>
                                            <p className="text-sm text-muted-foreground">Realiza matrículas, emite documentos oficiais, valida históricos e gerencia a vida acadêmica dos alunos.</p>
                                        </div>
                                        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                                            <div className="flex items-center gap-2 mb-2 font-semibold text-green-600">
                                                <GraduationCap className="h-5 w-5" /> Professor
                                            </div>
                                            <p className="text-sm text-muted-foreground">Lança frequências, notas, cria atividades, e acompanha o desempenho das turmas.</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Dica de Navegação</h4>
                                        <p className="text-sm">Utilize as abas acima para navegar diretamente para o manual específico do seu perfil.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ADMIN CONTENT */}
                        <TabsContent value="admin" className="space-y-4 mt-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-6 w-6 text-red-500" />
                                        <CardTitle>Guia do Administrador</CardTitle>
                                    </div>
                                    <CardDescription>Passo a passo para gestão completa da instituição.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="setup-inicial">
                                            <AccordionTrigger>1. Configuração Inicial (Obrigatório)</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>Antes de qualquer cadastro, siga esta ordem para garantir o funcionamento do sistema:</p>
                                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                                    <li>Vá para <strong>Recursos > Anos Letivos</strong> e crie o ano corrente (ex: "2024"). Marque como "Aberto".</li>
                                                    <li>Em <strong>Recursos > Níveis de Ensino</strong>, cadastre os ciclos (ex: Fundamental I, Médio).</li>
                                                    <li>Em <strong>Recursos > Disciplinas</strong>, cadastre todas as matérias da escola.</li>
                                                    <li>Em <strong>Recursos > Cursos</strong>, crie os cursos e vincule as disciplinas à grade curricular.</li>
                                                    <li>Finalmente, em <strong>Recursos > Turmas</strong>, crie as salas de aula vinculando-as a um Ano Letivo e Curso.</li>
                                                </ol>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="gestao-usuarios">
                                            <AccordionTrigger>2. Gestão de Usuários</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>Para adicionar funcionários ou outros admins:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    <li>Acesse <strong>Usuários</strong> no menu lateral.</li>
                                                    <li>Clique em "Novo Usuário".</li>
                                                    <li>Preencha Nome, E-mail e defina a <strong>Função (Role)</strong>.</li>
                                                    <li>Uma senha provisória será gerada ou definida por você.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="ensalamento">
                                            <AccordionTrigger>3. Ensalamento (Grade Horária)</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>Para definir os horários das aulas:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    <li>Acesse <strong>Ensalamento</strong>.</li>
                                                    <li>Selecione a Turma desejada.</li>
                                                    <li>Arraste as disciplinas disponíveis para os slots de horário da semana.</li>
                                                    <li>Isso permitirá que o sistema controle a frequência corretamente por aula.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="whatsapp">
                                            <AccordionTrigger>4. Integração WhatsApp</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>Conecte o sistema para enviar avisos automáticos:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    <li>Vá em <strong>Configurações > WhatsApp</strong>.</li>
                                                    <li>Clique em "Conectar" e escaneie o QR Code.</li>
                                                    <li>Status "Conectado" indica que o sistema pode enviar mensagens de cobrança e avisos.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* SECRETARIA CONTENT */}
                        <TabsContent value="secretaria" className="space-y-4 mt-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <School className="h-6 w-6 text-blue-500" />
                                        <CardTitle>Guia da Secretaria</CardTitle>
                                    </div>
                                    <CardDescription>Processos de matrícula e documentação.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="matriculas">
                                            <AccordionTrigger>Matrícula de Novos Alunos</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                                    <li>Acesse <strong>Pré-Matrículas</strong> para ver candidatos vindos do site.</li>
                                                    <li>Clique em "Analisar" para ver os dados.</li>
                                                    <li>Se aprovado, clique em "Efetivar Matrícula". O sistema criará o Aluno e o Responsável automaticamente.</li>
                                                    <li>Para matrículas manuais, vá em <strong>Alunos > Novo Aluno</strong>.</li>
                                                </ol>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="documentos">
                                            <AccordionTrigger>Emissão de Documentos</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>Gere Atestados, Históricos e Declarações:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    <li>Vá em <strong>Alunos</strong> e busque o aluno desejado.</li>
                                                    <li>Clique no ícone de "Documentos" no registro do aluno.</li>
                                                    <li>Selecione o modelo (ex: Atestado de Matrícula).</li>
                                                    <li>O PDF será gerado com assinatura digital verificável via QR Code.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="lote">
                                            <AccordionTrigger>Matrícula em Lote</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>Para rematricular vários alunos de um ano para o outro:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    <li>Acesse <strong>Matrícula em Lote</strong>.</li>
                                                    <li>Selecione a turma de origem (ex: 1º Ano A - 2024).</li>
                                                    <li>Selecione a turma de destino (ex: 2º Ano A - 2025).</li>
                                                    <li>Marque os alunos e clique em "Processar".</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* PROFESSOR CONTENT */}
                        <TabsContent value="professor" className="space-y-4 mt-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="h-6 w-6 text-green-500" />
                                        <CardTitle>Painel do Professor</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="chamada">
                                            <AccordionTrigger>Como realizar a Chamada</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                                    <li>No Dashboard, clique na Turma desejada.</li>
                                                    <li>Selecione a aba <strong>Chamada</strong>.</li>
                                                    <li>Verifique a data selecionada (por padrão, hoje).</li>
                                                    <li>O sistema traz todos como "Presente". Clique apenas nos alunos ausentes para marcar "Falta".</li>
                                                    <li>Clique em "Salvar Chamada".</li>
                                                </ol>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="notas">
                                            <AccordionTrigger>Lançamento de Notas e Avaliações</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>O sistema funciona baseado em Avaliações (Provas, Trabalhos):</p>
                                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                                    <li>Na visualização da Turma, vá para a aba <strong>Notas</strong>.</li>
                                                    <li>Clique em <strong>+ Nova Avaliação</strong>.</li>
                                                    <li>Defina o Nome (ex: Prova 1), Data e Peso.</li>
                                                    <li>Uma coluna nova aparecerá na grade. Digite a nota de cada aluno e pressione Enter ou Tab para salvar automaticamente.</li>
                                                    <li>A média final é recalculada a cada nota inserida.</li>
                                                </ol>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="banco-questoes">
                                            <AccordionTrigger>Banco de Questões e Atividades</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>Crie provas online para os alunos:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    <li>Vá em <strong>Banco de Questões</strong> > <strong>Nova Questão</strong>.</li>
                                                    <li>Cadastre perguntas de Múltipla Escolha ou Dissertativas.</li>
                                                    <li>Depois, vá em <strong>Atividades</strong> > <strong>Nova Atividade</strong>.</li>
                                                    <li>Selecione as questões do banco e defina a data de entrega.</li>
                                                    <li>Os alunos responderão pelo portal deles e a correção automática (para múltipla escolha) será aplicada.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* ALUNO/PAIS CONTENT */}
                        <TabsContent value="aluno" className="space-y-4 mt-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <User className="h-6 w-6 text-yellow-500" />
                                        <CardTitle>Manual do Aluno</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="boletim">
                                            <AccordionTrigger>Acessando Boletim e Faltas</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>No seu Painel Principal:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    <li>Clique em <strong>Boletim</strong> para ver suas notas detalhadas por disciplina.</li>
                                                    <li>Clique em <strong>Frequência</strong> para ver o total de faltas por matéria.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value="atividades">
                                            <AccordionTrigger>Realizando Atividades Online</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                                    <li>No menu lateral, clique em <strong>Atividades</strong>.</li>
                                                    <li>Atividades pendentes aparecerão com o botão "Iniciar".</li>
                                                    <li>Responda as questões dentro do prazo.</li>
                                                    <li>Ao finalizar, clique em <strong>Enviar Respostas</strong>.</li>
                                                </ol>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="responsavel" className="space-y-4 mt-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-6 w-6 text-purple-500" />
                                        <CardTitle>Manual do Responsável</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="acompanhamento">
                                            <AccordionTrigger>Acompanhamento Escolar</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-2">
                                                <p>Ao fazer login:</p>
                                                <ul className="list-disc list-inside ml-2">
                                                    <li>Você verá o card de cada filho vinculado ao seu CPF.</li>
                                                    <li>Clique no nome do aluno para expandir as informações de <strong>Notas</strong>, <strong>Faltas</strong> e <strong>Ocorrências</strong>.</li>
                                                    <li>Use a <strong>Agenda Digital</strong> para ver comunicados enviados pela escola.</li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </main>
            </div>
        </AppLayout>
    );
}
