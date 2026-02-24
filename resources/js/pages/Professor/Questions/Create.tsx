import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface Props {
    bank: {
        id: number;
        title: string;
    };
}

export default function Create({ bank }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        question_bank_id: bank.id,
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
    });

    const addOption = () => {
        setData('options', [...data.options, { label: '', is_correct: false }]);
    };

    const removeOption = (index: number) => {
        if (data.options.length <= 2) return;
        const newOptions = [...data.options];
        newOptions.splice(index, 1);
        setData('options', newOptions);
    };

    const updateOption = (index: number, field: string, value: any) => {
        const newOptions = [...data.options];
        // @ts-ignore
        newOptions[index][field] = value;

        // If setting correct answer for MC, unset others (optional UX choice, usually MC has one correct)
        // But for flexibility keeping multiple correct allows "select all that apply" if backend supports.
        // For now, let's keep simple.

        setData('options', newOptions);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/professor/questions');
    };

    const breadcrumbs = [
        { title: 'Bancos de Questões', href: '/professor/question-banks' },
        { title: bank.title, href: `/professor/question-banks/${bank.id}` },
        { title: 'Nova Questão', href: '#' }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nova Questão" />
            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Nova Questão</h2>
                            <p className="text-sm text-gray-500">Adicionando ao banco: {bank.title}</p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Basics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Tipo de Questão</label>
                                    <select
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    >
                                        <option value="MULTIPLE_CHOICE">Múltipla Escolha</option>
                                        <option value="TRUE_FALSE">Verdadeiro ou Falso</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Dificuldade</label>
                                    <select
                                        value={data.difficulty}
                                        onChange={e => setData('difficulty', parseInt(e.target.value))}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    >
                                        <option value={1}>Fácil</option>
                                        <option value={2}>Médio</option>
                                        <option value={3}>Difícil</option>
                                        <option value={4}>Muito Difícil</option>
                                        <option value={5}>Expert</option>
                                    </select>
                                </div>
                            </div>

                            {/* Statement */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Enunciado da Questão</label>
                                <textarea
                                    value={data.statement}
                                    onChange={e => setData('statement', e.target.value)}
                                    rows={4}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    placeholder="Digite a pergunta aqui..."
                                    required
                                />
                                {errors.statement && <p className="mt-1 text-sm text-red-600">{errors.statement}</p>}
                            </div>

                            {/* Metadata */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 dark:bg-gray-700/50 dark:border-gray-600">
                                <h3 className="text-sm font-medium text-gray-900 mb-3 dark:text-white">Metadados (Opcional)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Matéria</label>
                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={e => setData('subject', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            placeholder="Ex: Matemática"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Tópico</label>
                                        <input
                                            type="text"
                                            value={data.topic}
                                            onChange={e => setData('topic', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            placeholder="Ex: Frações"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">Nível</label>
                                        <input
                                            type="text"
                                            value={data.grade_level}
                                            onChange={e => setData('grade_level', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            placeholder="Ex: 6º Ano"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1 dark:text-gray-400">BNCC</label>
                                        <input
                                            type="text"
                                            value={data.bncc_code}
                                            onChange={e => setData('bncc_code', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            placeholder="Ex: EF06MA01"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Options */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alternativas</label>
                                    <button
                                        type="button"
                                        onClick={addOption}
                                        className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 dark:text-primary/80 dark:hover:text-primary/70"
                                    >
                                        <Plus className="w-4 h-4" /> Adicionar Opção
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {data.options.map((option, index) => (
                                        <div key={index} className="flex gap-4 items-start">
                                            <div className="pt-2">
                                                <input
                                                    type="checkbox" // Or radio if strictly one answer
                                                    checked={option.is_correct}
                                                    onChange={e => updateOption(index, 'is_correct', e.target.checked)}
                                                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                                                    title="Marcar como correta"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <input
                                                    type="text"
                                                    value={option.label}
                                                    onChange={e => updateOption(index, 'label', e.target.value)}
                                                    className={`block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white ${option.is_correct ? 'border-green-300 bg-green-50 dark:bg-green-900/30' : 'border-gray-300'}`}
                                                    placeholder={`Opção ${index + 1}`}
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeOption(index)}
                                                className="pt-2 text-gray-400 hover:text-red-600 disabled:opacity-30"
                                                disabled={data.options.length <= 2}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {errors.options && <p className="mt-1 text-sm text-red-600">{errors.options}</p>}
                            </div>

                            {/* Explanation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Explicação / Comentário (Opcional)</label>
                                <textarea
                                    value={data.explanation}
                                    onChange={e => setData('explanation', e.target.value)}
                                    rows={2}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    placeholder="Explique o porquê da resposta correta..."
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 dark:bg-gray-800 dark:border-t dark:border-gray-700">
                            <Link
                                href={`/professor/question-banks/${bank.id}`}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2"
                            >
                                {processing ? 'Salvando...' : 'Salvar Questão'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
