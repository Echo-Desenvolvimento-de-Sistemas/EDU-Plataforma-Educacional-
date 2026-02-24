import { useState } from 'react';
import { useForm } from '@inertiajs/react'; // Although we might use axios manually to avoid page reload if useForm forces it
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Props {
    bankId: number;
    isOpen: boolean;
    onClose: () => void;
    onQuestionCreated: (question: any) => void;
    questionToEdit?: any;
}

export default function QuickQuestionModal({ bankId, isOpen, onClose, onQuestionCreated, questionToEdit = null }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    interface Option {
        id?: number;
        label: string;
        is_correct: boolean;
    }

    interface QuestionData {
        id: number | null;
        question_bank_id: number;
        statement: string;
        type: string;
        difficulty: number;
        explanation: string;
        subject: string;
        topic: string;
        grade_level: string;
        bncc_code: string;
        options: Option[];
    }

    // Initial state
    const initialState: QuestionData = {
        id: null,
        question_bank_id: bankId,
        statement: '',
        type: 'MULTIPLE_CHOICE',
        difficulty: 1,
        explanation: '',
        subject: '',
        topic: '',
        grade_level: '',
        bncc_code: '',
        options: [
            { label: '', is_correct: false },
            { label: '', is_correct: false }
        ]
    };

    const [data, setData] = useState<QuestionData>(initialState);

    // Load data when questionToEdit changes
    if (questionToEdit && data.id !== questionToEdit.id) {
        setData({
            ...initialState,
            ...questionToEdit,
            // Ensure options have correct structure
            options: (questionToEdit.options || []).map((o: any) => ({
                id: o.id,
                label: o.label,
                is_correct: !!o.is_correct
            }))
        });
    }

    // Reset if modal opens without questionToEdit (Create mode)
    if (isOpen && !questionToEdit && data.id) {
        setData(initialState);
    }

    const updateData = (field: string, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const addOption = () => {
        setData(prev => ({
            ...prev,
            options: [...prev.options, { label: '', is_correct: false }]
        }));
    };

    const removeOption = (index: number) => {
        if (data.options.length <= 2) return;
        setData(prev => {
            const newOptions = [...prev.options];
            newOptions.splice(index, 1);
            return { ...prev, options: newOptions };
        });
    };

    const updateOption = (index: number, field: string, value: any) => {
        setData(prev => {
            const newOptions = [...prev.options];
            // @ts-ignore
            newOptions[index][field] = value;
            return { ...prev, options: newOptions };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let response;
            // @ts-ignore
            if (data.id) {
                // Update
                // @ts-ignore
                response = await axios.put(`/professor/questions/${data.id}`, {
                    ...data,
                    question_bank_id: bankId
                });
            } else {
                // Create
                response = await axios.post('/professor/questions', {
                    ...data,
                    question_bank_id: bankId
                });
            }

            if (response.data.success) {
                onQuestionCreated(response.data.question);
                onClose();
                if (!questionToEdit) {
                    setData({ ...initialState, question_bank_id: bankId });
                }
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Erro ao salvar questão.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{questionToEdit ? 'Editar Questão' : 'Nova Questão Rápida'}</DialogTitle>
                    <DialogDescription>
                        {questionToEdit
                            ? 'Atualize os dados da questão abaixo.'
                            : 'Preencha os dados abaixo para criar uma nova questão e adicioná-la imediatamente ao banco selecionado.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Tipo de Questão</label>
                            <select
                                value={data.type}
                                onChange={e => updateData('type', e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            >
                                <option value="MULTIPLE_CHOICE">Múltipla Escolha</option>
                                <option value="TRUE_FALSE">Verdadeiro ou Falso</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Dificuldade</label>
                            <select
                                value={data.difficulty}
                                onChange={e => updateData('difficulty', parseInt(e.target.value))}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            >
                                <option value={1}>Fácil</option>
                                <option value={2}>Médio</option>
                                <option value={3}>Difícil</option>
                                <option value={4}>Muito Difícil</option>
                                <option value={5}>Expert</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Enunciado</label>
                        <textarea
                            value={data.statement}
                            onChange={e => updateData('statement', e.target.value)}
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="Digite a pergunta..."
                            required
                        />
                    </div>

                    <div className="border rounded-md p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <details className="group" open={!!(data.subject || data.topic || data.grade_level || data.bncc_code)}>
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-gray-700 dark:text-gray-300">
                                <span>Mais Detalhes (Opcional)</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="text-gray-600 mt-3 group-open:animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Matéria / Disciplina</label>
                                    <input
                                        type="text"
                                        value={data.subject || ''}
                                        onChange={e => updateData('subject', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="Ex: Matemática"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Assunto / Tópico</label>
                                    <input
                                        type="text"
                                        value={data.topic || ''}
                                        onChange={e => updateData('topic', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="Ex: Álgebra"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Nível de Ensino</label>
                                    <input
                                        type="text"
                                        value={data.grade_level || ''}
                                        onChange={e => updateData('grade_level', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="Ex: 8º Ano"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Código BNCC</label>
                                    <input
                                        type="text"
                                        value={data.bncc_code || ''}
                                        onChange={e => updateData('bncc_code', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="Ex: EF08MA01"
                                    />
                                </div>
                            </div>
                        </details>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alternativas</label>
                            <button
                                type="button"
                                onClick={addOption}
                                className="text-xs text-primary flex items-center gap-1 font-medium"
                            >
                                <Plus className="w-3 h-3" /> Adicionar
                            </button>
                        </div>

                        <div className="space-y-2">
                            {data.options.map((option, index) => (
                                <div key={index} className="flex gap-2 items-start">
                                    <div className="pt-2">
                                        <input
                                            type="checkbox"
                                            checked={option.is_correct}
                                            onChange={e => updateOption(index, 'is_correct', e.target.checked)}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            title="Correta"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <input
                                            type="text"
                                            value={option.label}
                                            onChange={e => updateOption(index, 'label', e.target.value)}
                                            className={`block w-full rounded-md shadow-sm text-sm p-2 border ${option.is_correct
                                                ? 'border-green-300 bg-green-50 text-green-900 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300 placeholder-green-300'
                                                : 'border-gray-300 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder-gray-400'
                                                }`}
                                            placeholder={`Opção ${index + 1}`}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="pt-2 text-gray-400 hover:text-red-600 disabled:opacity-30 transition-colors"
                                        disabled={data.options.length <= 2}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {questionToEdit ? 'Atualizar Questão' : 'Salvar Questão'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
