import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Plus, Trash2, Edit, ArrowLeft, GripVertical, Search, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import QuickQuestionModal from '@/components/Activity/QuickQuestionModal';

interface Option {
    id: number;
    label: string;
    is_correct: boolean;
}

interface Question {
    id: number;
    statement: string;
    type: string;
    difficulty: number;
    subject?: string;
    topic?: string;
    grade_level?: string;
    bncc_code?: string;
    options: Option[];
}

interface Props {
    bank: {
        id: number;
        title: string;
        description: string;
    };
    questions: Question[];
}

export default function Show({ bank, questions }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    const breadcrumbs = [
        { title: 'Bancos de Questões', href: '/professor/question-banks' },
        { title: bank.title, href: '#' }
    ];

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir esta questão?')) {
            router.delete(`/professor/questions/${id}`);
        }
    };

    const handleEdit = (question: Question) => {
        setEditingQuestion(question);
        setIsModalOpen(true);
    };

    const handleQuestionSaved = () => {
        setIsModalOpen(false);
        setEditingQuestion(null);
        router.reload();
    };

    const [filters, setFilters] = useState({
        search: '',
        difficulty: '',
        type: ''
    });

    const filteredQuestions = useMemo(() => {
        return questions.filter(q => {
            const matchesSearch = filters.search === '' ||
                q.statement.toLowerCase().includes(filters.search.toLowerCase()) ||
                q.subject?.toLowerCase().includes(filters.search.toLowerCase()) ||
                q.topic?.toLowerCase().includes(filters.search.toLowerCase()) ||
                q.bncc_code?.toLowerCase().includes(filters.search.toLowerCase());

            const matchesDifficulty = filters.difficulty === '' || q.difficulty.toString() === filters.difficulty;
            const matchesType = filters.type === '' || q.type === filters.type;

            return matchesSearch && matchesDifficulty && matchesType;
        });
    }, [questions, filters]);

    const getDifficultyLabel = (val: number) => {
        switch (val) {
            case 1: return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Fácil</span>;
            case 2: return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Médio</span>;
            case 3: return <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Difícil</span>;
            case 4: return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Muito Difícil</span>;
            case 5: return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Expert</span>;
            default: return null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={bank.title} />

            <QuickQuestionModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingQuestion(null);
                }}
                bankId={bank.id}
                onQuestionCreated={handleQuestionSaved}
                questionToEdit={editingQuestion}
            />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/professor/question-banks" className="text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4">
                            <ArrowLeft className="w-4 h-4" /> Voltar
                        </Link>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{bank.title}</h1>
                                <p className="mt-1 text-gray-500">{bank.description}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setEditingQuestion(null);
                                    setIsModalOpen(true);
                                }}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                <Plus className="w-5 h-5" />
                                Adicionar Questão
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar por enunciado, código ou tópico..."
                                    value={filters.search}
                                    onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                    className="pl-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="w-full md:w-48">
                                <select
                                    value={filters.difficulty}
                                    onChange={e => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                >
                                    <option value="">Todas Dificuldades</option>
                                    <option value="1">Fácil</option>
                                    <option value="2">Médio</option>
                                    <option value="3">Difícil</option>
                                </select>
                            </div>
                            <div className="w-full md:w-48">
                                <select
                                    value={filters.type}
                                    onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                >
                                    <option value="">Todos Tipos</option>
                                    <option value="MULTIPLE_CHOICE">Múltipla Escolha</option>
                                    <option value="TRUE_FALSE">V/F</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Questions List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Questões ({filteredQuestions.length})</h3>
                        </div>

                        {filteredQuestions.length > 0 ? (
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredQuestions.map((question, index) => (
                                    <div key={question.id} className="p-6 hover:bg-gray-50 transition-colors group dark:hover:bg-gray-750">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm dark:bg-gray-700 dark:text-gray-300">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                                            {question.type === 'MULTIPLE_CHOICE' ? 'Múltipla Escolha' : 'V/F'}
                                                        </span>
                                                        {getDifficultyLabel(question.difficulty)}
                                                        {question.subject && (
                                                            <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
                                                                {question.subject}
                                                            </span>
                                                        )}
                                                        {question.grade_level && (
                                                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                                                                {question.grade_level}
                                                            </span>
                                                        )}
                                                        {question.bncc_code && (
                                                            <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800" title="BNCC">
                                                                {question.bncc_code}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEdit(question)}
                                                            className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                                            title="Editar"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(question.id)}
                                                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                            title="Excluir"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <h4 className="text-gray-900 font-medium mb-3 dark:text-white text-base">{question.statement}</h4>

                                                <div className="space-y-1">
                                                    {question.options.map(option => (
                                                        <div key={option.id} className={`flex items-center gap-2 text-sm ${option.is_correct ? 'text-green-700 font-medium dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                            <div className={`w-3 h-3 rounded-full border flex-shrink-0 ${option.is_correct ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600'}`}></div>
                                                            <span>{option.label}</span>
                                                            {option.is_correct && <span className="text-xs text-green-600 ml-1 dark:text-green-500">(Correta)</span>}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Meta details footer if exists */}
                                                {question.topic && (
                                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400 flex gap-4">
                                                        <span>Tópico: {question.topic}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                                Nenhuma questão encontrada com os filtros selecionados.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
