import { useState, useMemo } from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import QuickQuestionModal from '@/components/Activity/QuickQuestionModal';
import { Plus, Trash2, ArrowLeft, Search, Filter, Calendar, Clock, Settings, ChevronRight, Check, Edit } from 'lucide-react';
import clsx from 'clsx';
import { Head } from '@inertiajs/react';

interface Props {
    classRooms: any[];
    banks: any[];
}

export default function Create({ classRooms, banks }: Props) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        class_room_id: '',
        deadline: '',
        questions: [] as { id: number; points: number }[],
        settings: {
            randomize_order: false,
            show_result_immediately: true
        }
    });

    const [selectedBankId, setSelectedBankId] = useState<number | null>(banks.length > 0 ? banks[0].id : null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        difficulty: null as number | null,
        type: null as string | null
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

    const handleQuestionCreated = () => {
        setIsModalOpen(false);
        setEditingQuestion(null);
        router.reload({ only: ['banks'] });
    };

    // Helper to get questions based on current filters
    const availableQuestions = useMemo(() => {
        if (!selectedBankId) return [];
        const bank = banks.find(b => b.id === selectedBankId);
        if (!bank) return [];

        return bank.questions.filter((q: any) => {
            const matchesSearch = q.statement.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDifficulty = filters.difficulty ? q.difficulty === filters.difficulty : true;
            const matchesType = filters.type ? q.type === filters.type : true;
            return matchesSearch && matchesDifficulty && matchesType;
        });
    }, [selectedBankId, searchTerm, filters, banks]);

    const addQuestion = (questionId: number) => {
        if (!data.questions.find(q => q.id === questionId)) {
            setData('questions', [...data.questions, { id: questionId, points: 1 }]);
        }
    };

    const removeQuestion = (questionId: number) => {
        setData('questions', data.questions.filter(q => q.id !== questionId));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/professor/activities');
    };

    const breadcrumbs = [
        { title: 'Atividades', href: '/professor/activities' },
        { title: 'Nova Atividade', href: '#' }
    ];

    const totalPoints = data.questions.reduce((sum, q) => sum + q.points, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Atividade" />

            {/* Wizard Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 dark:bg-gray-900 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <div className={clsx("flex items-center space-x-2", step >= 1 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400")}>
                                <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2", step >= 1 ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/50" : "border-gray-300")}>1</div>
                                <span className="font-medium">Montagem da Prova</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                            <div className={clsx("flex items-center space-x-2", step >= 2 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400")}>
                                <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2", step >= 2 ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/50" : "border-gray-300")}>2</div>
                                <span className="font-medium">Agendamento</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-500 font-medium">
                                Total: {totalPoints} pts ({data.questions.length} questões)
                            </span>
                            {step === 1 ? (
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={data.questions.length === 0 || !data.title}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center"
                                >
                                    Próxima Etapa <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            ) : (
                                <button
                                    onClick={submit}
                                    disabled={processing}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium flex items-center"
                                >
                                    Finalizar e Agendar <Check className="w-4 h-4 ml-1" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* STEP 1: MONTAGEM */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">
                            {/* Left: Basic Info & Selected Questions (Scrollable) */}
                            <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 flex-shrink-0">
                                    <div className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Título da Atividade (ex: Prova de Matemática - 1º Bimestre)"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                className="block w-full text-xl font-bold border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-0 px-0 bg-transparent text-gray-900 dark:text-white dark:border-gray-700 placeholder-gray-400"
                                                required
                                            />
                                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                        </div>
                                        <textarea
                                            placeholder="Instruções para o aluno (opcional)..."
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            rows={2}
                                            className="block w-full border-0 focus:ring-0 px-0 text-gray-500 bg-transparent resize-none dark:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden dark:bg-gray-900 dark:border-gray-800">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 flex justify-between items-center dark:bg-gray-800/50">
                                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Questões Selecionadas</h3>
                                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-bold dark:bg-indigo-900 dark:text-indigo-300">
                                            {data.questions.length} itens
                                        </span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                        {data.questions.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg m-4 p-8 dark:border-gray-700">
                                                <Plus className="w-12 h-12 mb-2 text-gray-300" />
                                                <p>Selecione questões do banco ao lado para começar.</p>
                                            </div>
                                        ) : (
                                            data.questions.map((q, index) => {
                                                const bankQ = banks.flatMap(b => b.questions).find(bq => bq.id === q.id);
                                                return (
                                                    <div key={q.id} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors group dark:bg-gray-800 dark:border-gray-700">
                                                        <div className="flex flex-col items-center gap-1 pt-1">
                                                            <span className="font-bold text-gray-400 text-sm">#{index + 1}</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-gray-800 text-sm line-clamp-3 mb-2 dark:text-gray-200">{bankQ?.statement}</p>
                                                            <div className="flex gap-2">
                                                                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase font-bold dark:bg-gray-700 dark:text-gray-400">
                                                                    {bankQ?.type === 'MULTIPLE_CHOICE' ? 'Múltipla Escolha' : 'V/F'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <div className="flex items-center gap-1">
                                                                <input
                                                                    type="number"
                                                                    value={q.points}
                                                                    onChange={e => {
                                                                        const updated = [...data.questions];
                                                                        updated[index].points = Number(e.target.value);
                                                                        setData('questions', updated);
                                                                    }}
                                                                    className="w-16 h-8 text-right rounded border-gray-300 text-sm focus:border-indigo-500 text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                                    min="0"
                                                                    step="0.5"
                                                                />
                                                                <span className="text-xs text-gray-500">pts</span>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <button
                                                                    onClick={() => {
                                                                        // Find full question object from banks
                                                                        const fullQuestion = banks.flatMap(b => b.questions).find(bq => bq.id === q.id);
                                                                        if (fullQuestion) {
                                                                            setEditingQuestion(fullQuestion);
                                                                            setSelectedBankId(fullQuestion.question_bank_id); // Ensure correct bank context
                                                                            setIsModalOpen(true);
                                                                        }
                                                                    }}
                                                                    className="text-indigo-400 hover:text-indigo-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    title="Editar questão"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => removeQuestion(q.id)}
                                                                    className="text-red-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    title="Remover questão"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Question Bank Sidebar */}
                            <div className="lg:col-span-4 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col overflow-hidden dark:bg-gray-900 dark:border-gray-800">
                                <div className="p-4 border-b border-gray-200 bg-gray-50 space-y-3 dark:bg-gray-800/50 dark:border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                            <Search className="w-4 h-4" /> Banco de Questões
                                        </h3>
                                        {selectedBankId && (
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100 flex items-center gap-1 font-medium transition-colors dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                                            >
                                                <Plus className="w-3 h-3" /> Nova Questão
                                            </button>
                                        )}
                                    </div>

                                    <select
                                        className="w-full rounded-md border-gray-300 shadow-sm text-sm p-2 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        value={selectedBankId || ''}
                                        onChange={e => setSelectedBankId(Number(e.target.value))}
                                    >
                                        <option value="">Selecione um banco...</option>
                                        {banks.map(b => (
                                            <option key={b.id} value={b.id}>{b.title}</option>
                                        ))}
                                    </select>

                                    <div className="relative">
                                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Buscar questão..."
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                            className="w-full pl-9 rounded-md border-gray-300 text-sm py-2 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <select
                                            className="w-1/2 text-xs rounded border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            onChange={e => setFilters({ ...filters, difficulty: e.target.value ? Number(e.target.value) : null })}
                                        >
                                            <option value="">Dificuldade</option>
                                            <option value="1">Fácil</option>
                                            <option value="2">Médio</option>
                                            <option value="3">Difícil</option>
                                        </select>
                                        <select
                                            className="w-1/2 text-xs rounded border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            onChange={e => setFilters({ ...filters, type: e.target.value || null })}
                                        >
                                            <option value="">Tipo</option>
                                            <option value="MULTIPLE_CHOICE">Múltipla Escolha</option>
                                            <option value="TRUE_FALSE">V/F</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-black/20">
                                    {availableQuestions.map((q: any) => {
                                        const isAdded = data.questions.some(added => added.id === q.id);
                                        return (
                                            <div
                                                key={q.id}
                                                onClick={() => !isAdded && addQuestion(q.id)}
                                                className={clsx(
                                                    "p-3 rounded-lg border bg-white shadow-sm transition-all cursor-pointer text-sm dark:bg-gray-800 dark:border-gray-700",
                                                    isAdded ? "opacity-50 ring-2 ring-indigo-100" : "hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5"
                                                )}
                                            >
                                                <div className="flex justify-between items-start gap-2 mb-2">
                                                    <span className={clsx(
                                                        "text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider",
                                                        q.difficulty === 1 ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                                                            q.difficulty === 2 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" :
                                                                "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                                    )}>
                                                        {q.difficulty === 1 ? 'Fácil' : q.difficulty === 2 ? 'Médio' : 'Difícil'}
                                                    </span>
                                                    {isAdded && <Check className="w-4 h-4 text-indigo-600" />}
                                                </div>
                                                <p className="text-gray-700 line-clamp-3 mb-2 dark:text-gray-300">{q.statement}</p>
                                            </div>
                                        );
                                    })}
                                    {availableQuestions.length === 0 && (
                                        <p className="text-center text-gray-400 text-sm mt-8">Nenhuma questão encontrada.</p>
                                    )}
                                </div>
                            </div>

                            {/* Modal */}
                            {selectedBankId && (
                                <QuickQuestionModal
                                    isOpen={isModalOpen}
                                    onClose={() => {
                                        setIsModalOpen(false);
                                        setEditingQuestion(null);
                                    }}
                                    bankId={selectedBankId}
                                    onQuestionCreated={handleQuestionCreated}
                                    questionToEdit={editingQuestion}
                                />
                            )}
                        </div>
                    )}

                    {/* STEP 2: AGENDAMENTO */}
                    {step === 2 && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-8 dark:bg-gray-900 dark:border-gray-800">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações de Aplicação</h2>
                                    <p className="text-gray-500 mt-2">Defina para quem e quando esta prova estará disponível.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex justify-between items-center dark:bg-indigo-900/20 dark:border-indigo-800">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest dark:text-indigo-400">Resumo</span>
                                            <span className="text-lg font-semibold text-gray-900 dark:text-white">{data.title}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalPoints}</p>
                                            <span className="text-xs text-indigo-600 dark:text-indigo-400">PONTOS TOTAIS</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Turma Alvo</label>
                                        <div className="relative">
                                            <select
                                                value={data.class_room_id}
                                                onChange={e => setData('class_room_id', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 pl-4 pr-10 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                                required
                                            >
                                                <option value="">Selecione uma turma...</option>
                                                {classRooms.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.class_room_id && <p className="text-red-500 text-xs mt-1">{errors.class_room_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Prazo de Entrega (Deadline)</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="datetime-local"
                                                value={data.deadline}
                                                onChange={e => setData('deadline', e.target.value)}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 pl-10 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Os alunos não poderão enviar respostas após esta data.</p>
                                    </div>

                                    <div className="border-t pt-6 dark:border-gray-800">
                                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 dark:text-gray-200">Segurança & Anti-Cola</h4>
                                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-800">
                                            <div>
                                                <h5 className="font-medium text-gray-900 dark:text-white">Embaralhar Questões</h5>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">A ordem das questões será aleatória para cada aluno.</p>
                                            </div>
                                            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                                <input
                                                    type="checkbox"
                                                    name="toggle"
                                                    id="toggle"
                                                    checked={data.settings.randomize_order}
                                                    onChange={e => setData('settings', { ...data.settings, randomize_order: e.target.checked })}
                                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-indigo-600"
                                                    style={{ right: data.settings.randomize_order ? '0' : 'auto', left: data.settings.randomize_order ? 'auto' : '0' }}
                                                />
                                                <label
                                                    htmlFor="toggle"
                                                    className={clsx("toggle-label block overflow-hidden h-6 rounded-full cursor-pointer bg-gray-300", data.settings.randomize_order ? "bg-indigo-600" : "")}
                                                ></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-6">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                                        >
                                            Voltar
                                        </button>
                                        <button
                                            onClick={submit}
                                            disabled={processing}
                                            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform hover:-translate-y-1"
                                        >
                                            Agendar Atividade
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
