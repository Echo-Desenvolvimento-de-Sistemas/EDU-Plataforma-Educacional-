import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, Circle, ChevronRight, ChevronLeft, BookOpen, Shield, School, GraduationCap, User, Users, Trophy, Sparkles } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface SubTask {
    id: string;
    label: string;
    detail?: string;
}

interface Step {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    tasks: SubTask[];
    tip?: string;
}

interface ManualIndexProps {
    role: string;
}

// ─── Learning Path Data ──────────────────────────────────────────────────────

const learningPaths: Record<string, Step[]> = {
    admin: [
        {
            id: 'setup',
            title: 'Configuração Inicial',
            icon: <Sparkles className="h-5 w-5" />,
            description: 'Configure a base do sistema antes de cadastrar qualquer usuário. A ordem abaixo é importante para garantir que tudo funcione corretamente.',
            tip: 'Siga esta ordem rigorosamente — cada item depende do anterior.',
            tasks: [
                { id: 'a1', label: 'Criar o Ano Letivo atual', detail: 'Vá em Recursos → Anos Letivos e crie o ano (ex: "2024"). Marque como "Aberto".' },
                { id: 'a2', label: 'Cadastrar Níveis de Ensino', detail: 'Em Recursos → Níveis de Ensino, adicione os ciclos (Fundamental I, Médio, etc.).' },
                { id: 'a3', label: 'Cadastrar Disciplinas', detail: 'Em Recursos → Disciplinas, liste todas as matérias da escola.' },
                { id: 'a4', label: 'Criar Cursos e Grades Curriculares', detail: 'Em Recursos → Cursos, crie os cursos e vincule as disciplinas.' },
                { id: 'a5', label: 'Criar Turmas', detail: 'Em Recursos → Turmas, crie as salas e vincule a um Ano Letivo e Curso.' },
            ],
        },
        {
            id: 'users',
            title: 'Gestão de Usuários',
            icon: <Shield className="h-5 w-5" />,
            description: 'Gerencie os funcionários, professores e outros administradores do sistema.',
            tasks: [
                { id: 'b1', label: 'Acessar o menu Usuários', detail: 'Clique em "Usuários" no menu lateral esquerdo.' },
                { id: 'b2', label: 'Criar um novo usuário', detail: 'Clique em "Novo Usuário", preencha Nome, E-mail e defina a Função (Role).' },
                { id: 'b3', label: 'Verificar a senha provisória', detail: 'Uma senha provisória será gerada. O usuário deverá trocá-la no primeiro acesso.' },
                { id: 'b4', label: 'Ativar/desativar usuários quando necessário', detail: 'Use o botão de status na tabela de usuários.' },
            ],
        },
        {
            id: 'ensalamento',
            title: 'Grade Horária (Ensalamento)',
            icon: <School className="h-5 w-5" />,
            description: 'Defina os horários de cada disciplina por turma. Isso é necessário para o controle correto de frequência.',
            tip: 'Sem o ensalamento, a chamada por aula não funcionará corretamente.',
            tasks: [
                { id: 'c1', label: 'Acessar Ensalamento no menu', detail: 'Clique em "Ensalamento" no menu lateral.' },
                { id: 'c2', label: 'Selecionar uma turma', detail: 'Escolha a turma que deseja configurar.' },
                { id: 'c3', label: 'Alocar disciplinas nos slots', detail: 'Arraste as disciplinas disponíveis para os horários da semana.' },
                { id: 'c4', label: 'Repetir para todas as turmas', detail: 'Cada turma precisa ter seu horário configurado individualmente.' },
            ],
        },
        {
            id: 'students',
            title: 'Matrículas e Alunos',
            icon: <Users className="h-5 w-5" />,
            description: 'Gerencie as matrículas de alunos novos e rematrículas anuais.',
            tasks: [
                { id: 'd1', label: 'Verificar pré-matrículas pendentes', detail: 'Acesse Pré-Matrículas para ver inscrições vindas do site.' },
                { id: 'd2', label: 'Efetivar ou cadastrar alunos', detail: 'Clique em "Efetivar Matrícula" ou vá em Alunos → Novo Aluno para cadastro manual.' },
                { id: 'd3', label: 'Vincular Responsável ao Aluno', detail: 'No perfil do aluno, vá na aba Responsáveis e vincule o CPF do responsável.' },
                { id: 'd4', label: 'Usar Matrícula em Lote para rematrículas', detail: 'Em Matrícula em Lote, selecione turma de origem e destino para promover vários alunos.' },
            ],
        },
        {
            id: 'whatsapp',
            title: 'Integração e Relatórios',
            icon: <Trophy className="h-5 w-5" />,
            description: 'Conecte o WhatsApp para comunicações automáticas e acompanhe os relatórios do sistema.',
            tasks: [
                { id: 'e1', label: 'Conectar o WhatsApp', detail: 'Vá em Configurações → WhatsApp, clique em "Conectar" e escaneie o QR Code.' },
                { id: 'e2', label: 'Verificar status "Conectado"', detail: 'O status deve mudar para verde após o escaneamento.' },
                { id: 'e3', label: 'Acompanhar relatório de frequência', detail: 'Em Frequência → Relatório, filtre por turma e período.' },
                { id: 'e4', label: 'Visualizar desempenho por disciplina', detail: 'Acesse Desempenho por Disciplina para identificar turmas com baixo rendimento.' },
            ],
        },
    ],

    secretaria: [
        {
            id: 'matriculas',
            title: 'Matrículas de Novos Alunos',
            icon: <School className="h-5 w-5" />,
            description: 'Gerencie o processo completo de matrícula, desde a análise de pré-inscrições até o cadastro manual.',
            tasks: [
                { id: 'sa1', label: 'Verificar Pré-Matrículas pendentes', detail: 'Acesse Pré-Matrículas para ver candidatos vindos do site da escola.' },
                { id: 'sa2', label: 'Analisar os dados do candidato', detail: 'Clique em "Analisar" para ver as informações detalhadas.' },
                { id: 'sa3', label: 'Efetivar a matrícula', detail: 'Se aprovado, clique em "Efetivar Matrícula". O sistema cria Aluno e Responsável automaticamente.' },
                { id: 'sa4', label: 'Realizar matrícula manual quando necessário', detail: 'Vá em Alunos → Novo Aluno para cadastro sem pré-inscrição.' },
            ],
        },
        {
            id: 'documentos',
            title: 'Emissão de Documentos',
            icon: <BookOpen className="h-5 w-5" />,
            description: 'Emita atestados, históricos e declarações com assinatura digital verificável.',
            tip: 'Todos os documentos possuem QR Code para verificação de autenticidade.',
            tasks: [
                { id: 'sb1', label: 'Localizar o aluno em Alunos', detail: 'Use a busca por nome ou matrícula.' },
                { id: 'sb2', label: 'Acessar os documentos do aluno', detail: 'Clique no ícone de "Documentos" no registro.' },
                { id: 'sb3', label: 'Selecionar o modelo do documento', detail: 'Escolha entre Atestado de Matrícula, Histórico Escolar, Declaração, etc.' },
                { id: 'sb4', label: 'Gerar e baixar o PDF', detail: 'O PDF inclui assinatura digital com QR Code verificável.' },
            ],
        },
        {
            id: 'lote',
            title: 'Matrícula em Lote',
            icon: <Users className="h-5 w-5" />,
            description: 'Promova vários alunos de uma turma para outra de forma rápida ao início de cada ano letivo.',
            tasks: [
                { id: 'sc1', label: 'Acessar Matrícula em Lote', detail: 'Clique em "Matrícula em Lote" no menu lateral.' },
                { id: 'sc2', label: 'Selecionar a turma de origem', detail: 'Ex: "1º Ano A - 2024".' },
                { id: 'sc3', label: 'Selecionar a turma de destino', detail: 'Ex: "2º Ano A - 2025".' },
                { id: 'sc4', label: 'Marcar os alunos e processar', detail: 'Selecione os alunos aprovados e clique em "Processar".' },
            ],
        },
    ],

    professor: [
        {
            id: 'chamada',
            title: 'Realizar a Chamada',
            icon: <GraduationCap className="h-5 w-5" />,
            description: 'Registre a frequência dos alunos diariamente. O sistema já marca todos como presentes por padrão.',
            tip: 'Salve a chamada antes de sair da página. Não há salvamento automático.',
            tasks: [
                { id: 'pa1', label: 'Acessar o Dashboard e clicar na Turma', detail: 'No seu painel, selecione a turma desejada.' },
                { id: 'pa2', label: 'Ir para a aba Chamada', detail: 'Clique na aba "Chamada" dentro da turma.' },
                { id: 'pa3', label: 'Verificar a data (padrão: hoje)', detail: 'Altere a data se for uma chamada retroativa.' },
                { id: 'pa4', label: 'Marcar apenas os ausentes como "Falta"', detail: 'Clique no nome do aluno ausente para alternar para "Falta".' },
                { id: 'pa5', label: 'Clicar em "Salvar Chamada"', detail: 'Confirme o salvamento no botão ao final da lista.' },
            ],
        },
        {
            id: 'notas',
            title: 'Lançamento de Notas',
            icon: <BookOpen className="h-5 w-5" />,
            description: 'Crie avaliações e lance as notas em uma grade editável. A média é calculada automaticamente.',
            tasks: [
                { id: 'pb1', label: 'Na turma, acessar a aba Notas', detail: 'Clique em "Notas" dentro da visualização da turma.' },
                { id: 'pb2', label: 'Criar uma Nova Avaliação', detail: 'Clique em "+ Nova Avaliação" e defina Nome, Data e Peso.' },
                { id: 'pb3', label: 'Digitar as notas na grade', detail: 'Uma coluna nova aparece. Digite a nota de cada aluno.' },
                { id: 'pb4', label: 'Pressionar Enter ou Tab para salvar', detail: 'Cada nota é salva individualmente ao navegar para o próximo campo.' },
            ],
        },
        {
            id: 'atividades',
            title: 'Banco de Questões e Atividades',
            icon: <Trophy className="h-5 w-5" />,
            description: 'Crie provas e atividades online que os alunos responderão diretamente no sistema.',
            tasks: [
                { id: 'pc1', label: 'Acessar Banco de Questões', detail: 'Clique em "Banco de Questões" no menu lateral.' },
                { id: 'pc2', label: 'Criar questões de múltipla escolha ou dissertativas', detail: 'Clique em "+ Nova Questão" e preencha o enunciado e opções.' },
                { id: 'pc3', label: 'Crear uma Atividade com as questões', detail: 'Em Atividades → Nova Atividade, selecione questões do banco e defina a data de entrega.' },
                { id: 'pc4', label: 'Corrigir automaticamente (múltipla escolha)', detail: 'Após o prazo, a correção automática é aplicada. Dissertativas precisam de correção manual.' },
            ],
        },
    ],

    aluno: [
        {
            id: 'boletim',
            title: 'Boletim e Frequência',
            icon: <User className="h-5 w-5" />,
            description: 'Acompanhe suas notas e frequência em tempo real.',
            tasks: [
                { id: 'aa1', label: 'Acessar o Painel Principal', detail: 'Ao fazer login, você já estará no seu painel.' },
                { id: 'aa2', label: 'Clicar em "Boletim"', detail: 'Visualize suas notas por disciplina e bimestre.' },
                { id: 'aa3', label: 'Verificar suas Faltas em "Frequência"', detail: 'Veja o total de faltas por matéria e o percentual de presença.' },
            ],
        },
        {
            id: 'atividades',
            title: 'Atividades Online',
            icon: <BookOpen className="h-5 w-5" />,
            description: 'Realize as atividades e provas enviadas pelos professores diretamente pelo sistema.',
            tip: 'Fique de olho no prazo de entrega de cada atividade!',
            tasks: [
                { id: 'ab1', label: 'Acessar "Atividades" no menu lateral', detail: 'Clique em Atividades para ver todas as tarefas.' },
                { id: 'ab2', label: 'Iniciar uma atividade pendente', detail: 'Atividades com o botão "Iniciar" ainda podem ser respondidas.' },
                { id: 'ab3', label: 'Responder as questões', detail: 'Para múltipla escolha, clique na alternativa correta. Dissertativas têm campo de texto.' },
                { id: 'ab4', label: 'Clicar em "Enviar Respostas"', detail: 'Ao finalizar, envie antes do prazo. Não é possível editar após o envio.' },
            ],
        },
    ],

    responsavel: [
        {
            id: 'acompanhamento',
            title: 'Acompanhamento Escolar',
            icon: <Users className="h-5 w-5" />,
            description: 'Acompanhe o desempenho, faltas e comunicados dos seus filhos.',
            tasks: [
                { id: 'ra1', label: 'Fazer login com seu CPF e senha', detail: 'Use o e-mail e senha cadastrados pela secretaria.' },
                { id: 'ra2', label: 'Ver o card de cada filho vinculado', detail: 'Cada filho aparecerá como um card no painel.' },
                { id: 'ra3', label: 'Expandir as informações do aluno', detail: 'Clique no nome para ver Notas, Faltas e Ocorrências.' },
                { id: 'ra4', label: 'Verificar communicados na Agenda Digital', detail: 'Acesse a Agenda para ver avisos e comunicados da escola.' },
            ],
        },
    ],
};

// ─── Progress Storage Helpers ─────────────────────────────────────────────────

function getStorageKey(role: string, stepId: string) {
    return `manual_progress_${role}_${stepId}`;
}

function loadChecked(role: string, stepId: string): Set<string> {
    try {
        const raw = localStorage.getItem(getStorageKey(role, stepId));
        if (raw) return new Set(JSON.parse(raw));
    } catch { }
    return new Set();
}

function saveChecked(role: string, stepId: string, checked: Set<string>) {
    try {
        localStorage.setItem(getStorageKey(role, stepId), JSON.stringify([...checked]));
    } catch { }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ManualIndex({ role }: ManualIndexProps) {
    const { auth } = usePage<{ auth: { user: { name: string } } }>().props;
    const userName = auth?.user?.name?.split(' ')[0] ?? 'Usuário';

    const steps = learningPaths[role] ?? learningPaths['aluno'];
    const [activeStep, setActiveStep] = useState(0);
    const [checkedMap, setCheckedMap] = useState<Record<string, Set<string>>>({});
    const [animating, setAnimating] = useState(false);

    // Load all progress from localStorage on mount
    useEffect(() => {
        const map: Record<string, Set<string>> = {};
        steps.forEach(s => { map[s.id] = loadChecked(role, s.id); });
        setCheckedMap(map);
    }, [role]);

    // Total progress
    const totalTasks = steps.reduce((acc, s) => acc + s.tasks.length, 0);
    const totalDone = steps.reduce((acc, s) => acc + (checkedMap[s.id]?.size ?? 0), 0);
    const overallPct = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

    const isStepDone = useCallback((step: Step) => {
        const checked = checkedMap[step.id];
        return checked ? checked.size === step.tasks.length : false;
    }, [checkedMap]);

    const toggleTask = (stepId: string, taskId: string) => {
        setCheckedMap(prev => {
            const existing = new Set(prev[stepId] ?? []);
            if (existing.has(taskId)) existing.delete(taskId);
            else existing.add(taskId);
            saveChecked(role, stepId, existing);
            return { ...prev, [stepId]: existing };
        });
    };

    const navigateTo = (idx: number) => {
        if (idx === activeStep || animating) return;
        setAnimating(true);
        setTimeout(() => {
            setActiveStep(idx);
            setAnimating(false);
        }, 180);
    };

    const currentStep = steps[activeStep];
    const currentChecked = checkedMap[currentStep?.id] ?? new Set();
    const stepPct = currentStep ? Math.round((currentChecked.size / currentStep.tasks.length) * 100) : 0;

    const roleLabel: Record<string, string> = {
        admin: 'Administrador', secretaria: 'Secretaria', professor: 'Professor',
        aluno: 'Aluno', responsavel: 'Responsável',
    };
    const roleColors: Record<string, string> = {
        admin: '#ef4444', secretaria: '#3b82f6', professor: '#22c55e',
        aluno: '#f59e0b', responsavel: '#a855f7',
    };
    const accent = roleColors[role] ?? '#6366f1';

    return (
        <AppLayout breadcrumbs={[{ title: 'Manual do Usuário', href: '/manual' }]}>
            <Head title="Manual do Usuário" />

            <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 md:p-6 space-y-6">

                {/* ── Hero ── */}
                <div
                    className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${accent}cc 0%, ${accent}88 60%, ${accent}44 100%)` }}
                >
                    {/* decorative circles */}
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-10 bg-white" />
                    <div className="absolute -bottom-6 -right-20 h-56 w-56 rounded-full opacity-10 bg-white" />

                    <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                            <p className="text-white/80 text-sm font-medium uppercase tracking-wide mb-1">
                                {roleLabel[role] ?? role}
                            </p>
                            <h1 className="text-2xl md:text-3xl font-bold mb-1">
                                Olá, {userName}! 👋
                            </h1>
                            <p className="text-white/80 text-sm md:text-base">
                                {overallPct === 100
                                    ? '🎉 Você concluiu toda a trilha de aprendizado!'
                                    : `Continue sua trilha de aprendizado — ${totalDone} de ${totalTasks} tarefas concluídas.`}
                            </p>
                        </div>
                        <div className="flex-shrink-0 text-center">
                            <div className="relative inline-flex items-center justify-center">
                                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                                    <circle
                                        cx="18" cy="18" r="15.9" fill="none"
                                        stroke="white" strokeWidth="3"
                                        strokeDasharray={`${overallPct} ${100 - overallPct}`}
                                        strokeLinecap="round"
                                        style={{ transition: 'stroke-dasharray 0.6s ease' }}
                                    />
                                </svg>
                                <span className="absolute text-xl font-bold">{overallPct}%</span>
                            </div>
                            <p className="text-white/70 text-xs mt-1">Progresso geral</p>
                        </div>
                    </div>
                </div>

                {/* ── Main Layout ── */}
                <div className="flex flex-col lg:flex-row gap-5">

                    {/* ── Sidebar Stepper ── */}
                    <aside className="lg:w-64 xl:w-72 flex-shrink-0">
                        <div className="rounded-xl border bg-card shadow-sm p-4 space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
                                Sua trilha
                            </p>

                            {steps.map((step, idx) => {
                                const done = isStepDone(step);
                                const active = idx === activeStep;
                                const checked = checkedMap[step.id];
                                const pct = checked ? Math.round((checked.size / step.tasks.length) * 100) : 0;

                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => navigateTo(idx)}
                                        className={`w-full text-left rounded-lg px-3 py-3 flex items-start gap-3 transition-all duration-200 group
                                            ${active
                                                ? 'bg-primary/10 border border-primary/30'
                                                : 'hover:bg-muted border border-transparent'
                                            }`}
                                    >
                                        {/* Status icon */}
                                        <span className="mt-0.5 flex-shrink-0">
                                            {done ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            ) : active ? (
                                                <span
                                                    className="h-5 w-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white"
                                                    style={{ borderColor: accent, backgroundColor: accent }}
                                                >
                                                    {idx + 1}
                                                </span>
                                            ) : (
                                                <span className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                                    {idx + 1}
                                                </span>
                                            )}
                                        </span>

                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-medium truncate ${active ? 'text-primary' : done ? 'text-muted-foreground' : 'text-foreground'}`}>
                                                {step.title}
                                            </p>
                                            {pct > 0 && !done && (
                                                <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{ width: `${pct}%`, backgroundColor: accent }}
                                                    />
                                                </div>
                                            )}
                                            {done && (
                                                <p className="text-xs text-green-600 mt-0.5">Concluído ✓</p>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* ── Step Content ── */}
                    <main className="flex-1 min-w-0">
                        <div
                            className="rounded-xl border bg-card shadow-sm overflow-hidden transition-opacity duration-200"
                            style={{ opacity: animating ? 0 : 1 }}
                        >
                            {/* Step Header */}
                            <div className="p-6 border-b" style={{ background: `linear-gradient(135deg, ${accent}18 0%, transparent 70%)` }}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm flex-shrink-0"
                                            style={{ backgroundColor: accent }}
                                        >
                                            {currentStep?.icon}
                                        </span>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-medium">
                                                Passo {activeStep + 1} de {steps.length}
                                            </p>
                                            <h2 className="text-lg font-bold text-foreground leading-tight">
                                                {currentStep?.title}
                                            </h2>
                                        </div>
                                    </div>
                                    {/* Mini progress */}
                                    <div className="flex-shrink-0 text-right">
                                        <p className="text-2xl font-bold" style={{ color: accent }}>{stepPct}%</p>
                                        <p className="text-xs text-muted-foreground">{currentChecked.size}/{currentStep?.tasks.length} tarefas</p>
                                    </div>
                                </div>

                                {/* Step progress bar */}
                                <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${stepPct}%`, backgroundColor: accent }}
                                    />
                                </div>
                            </div>

                            {/* Step Body */}
                            <div className="p-6 space-y-5">
                                <p className="text-muted-foreground leading-relaxed">
                                    {currentStep?.description}
                                </p>

                                {currentStep?.tip && (
                                    <div className="flex items-start gap-2 p-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10">
                                        <span className="text-amber-500 text-sm mt-0.5">💡</span>
                                        <p className="text-sm text-amber-800 dark:text-amber-300">{currentStep.tip}</p>
                                    </div>
                                )}

                                {/* Task Checklist */}
                                <div className="space-y-3">
                                    {currentStep?.tasks.map((task, tidx) => {
                                        const done = currentChecked.has(task.id);
                                        return (
                                            <button
                                                key={task.id}
                                                onClick={() => toggleTask(currentStep.id, task.id)}
                                                className={`w-full text-left rounded-xl border p-4 flex items-start gap-3 transition-all duration-200
                                                    ${done
                                                        ? 'border-green-200 bg-green-50 dark:border-green-900/40 dark:bg-green-900/10'
                                                        : 'border-border hover:border-primary/40 hover:bg-muted/50'
                                                    }`}
                                            >
                                                <span className="mt-0.5 flex-shrink-0">
                                                    {done
                                                        ? <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                        : <Circle className="h-5 w-5 text-muted-foreground/40" />
                                                    }
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-medium ${done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                                        {tidx + 1}. {task.label}
                                                    </p>
                                                    {task.detail && (
                                                        <p className={`text-xs mt-0.5 leading-relaxed ${done ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>
                                                            {task.detail}
                                                        </p>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Completion badge */}
                                {stepPct === 100 && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl border border-green-200 bg-green-50 dark:border-green-900/40 dark:bg-green-900/10">
                                        <Trophy className="h-6 w-6 text-green-500 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-green-700 dark:text-green-400">Passo concluído! 🎉</p>
                                            {activeStep < steps.length - 1 && (
                                                <p className="text-sm text-green-600 dark:text-green-500">Continue para o próximo passo da trilha.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Footer */}
                            <div className="px-6 py-4 border-t bg-muted/30 flex items-center justify-between gap-3">
                                <button
                                    onClick={() => navigateTo(activeStep - 1)}
                                    disabled={activeStep === 0}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Anterior
                                </button>

                                <span className="text-xs text-muted-foreground hidden sm:block">
                                    {steps.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => navigateTo(i)}
                                            className={`inline-block mx-0.5 h-2 rounded-full transition-all duration-300 ${i === activeStep ? 'w-5' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                                                }`}
                                            style={i === activeStep ? { backgroundColor: accent } : {}}
                                        />
                                    ))}
                                </span>

                                <button
                                    onClick={() => navigateTo(activeStep + 1)}
                                    disabled={activeStep === steps.length - 1}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: accent }}
                                >
                                    Próximo
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}
