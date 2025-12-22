import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import FocusLayout from '@/layouts/FocusLayout';
import OptionButton from '@/components/Activity/OptionButton';
import { ChevronRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';

interface Question {
    id: number;
    statement: string;
    type: string;
    options: { id: number; label: string }[];
}

interface Exam {
    id: number;
    title: string;
    questions: Question[];
}

interface Props {
    exam: {
        data: Exam;
    };
}

export default function PlayerIndex({ exam }: Props) {
    const { questions } = exam.data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [result, setResult] = useState({ score: 0, max_score: 0, redirect: '' });

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleSelectOption = (optionId: number) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: optionId
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowConfirmModal(true);
        }
    };

    const confirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/aluno/activities/${exam.data.id}/submit`, {
                answers
            });

            setResult(response.data);
            setShowConfirmModal(false);
            setShowResultModal(true);

            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao enviar a prova. Tente novamente.');
            setIsSubmitting(false);
        }
    };

    const handleFinish = () => {
        if (result.redirect) {
            window.location.href = result.redirect;
        } else {
            router.visit('/aluno/dashboard');
        }
    };

    return (
        <FocusLayout>
            <Head title={exam.data.title} />

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                    <span className="text-sm font-bold text-indigo-500 uppercase tracking-wider mb-2 block">
                        Questão {currentQuestionIndex + 1} de {questions.length}
                    </span>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
                        {currentQuestion.statement}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map(option => (
                            <OptionButton
                                key={option.id}
                                option={option}
                                isSelected={answers[currentQuestion.id] === option.id}
                                onSelect={() => handleSelectOption(option.id)}
                            />
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id] || isSubmitting}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
                >
                    {isLastQuestion ? (
                        <>
                            Finalizar Prova <CheckCircle2 className="w-6 h-6" />
                        </>
                    ) : (
                        <>
                            Próxima Questão <ChevronRight className="w-6 h-6" />
                        </>
                    )}
                </button>
            </div>
            {/* Confirmation Modal */}
            <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Finalizar Prova?</DialogTitle>
                        <DialogDescription>
                            Confira suas respostas abaixo antes de realizar a entrega final.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 my-4 max-h-[60vh] overflow-y-auto pr-2">
                        {questions.map((q, idx) => {
                            const answeredId = answers[q.id];
                            const selectedOption = q.options.find(o => o.id === answeredId);

                            return (
                                <div key={q.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Questão {idx + 1}</span>
                                        {answeredId ? (
                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Respondida
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-full flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> Pendente
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-900 font-medium mb-2 line-clamp-2">{q.statement}</p>
                                    <div className="text-sm text-gray-600 pl-3 border-l-2 border-gray-200">
                                        {selectedOption ? (
                                            <span>Selecionado: <span className="font-semibold text-indigo-600">{selectedOption.label}</span></span>
                                        ) : (
                                            <span className="italic text-gray-400">Nenhuma opção selecionada</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setCurrentQuestionIndex(idx);
                                            setShowConfirmModal(false);
                                        }}
                                        className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                                    >
                                        Revisar esta questão
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <DialogFooter>
                        <button
                            onClick={() => setShowConfirmModal(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                        >
                            Revisar
                        </button>
                        <button
                            onClick={confirmSubmit}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 flex items-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            Entregar Prova
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Result Modal */}
            <Dialog open={showResultModal} onOpenChange={() => { }}>
                <DialogContent className="sm:max-w-md text-center">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Prova Finalizada!</DialogTitle>
                        <DialogDescription className="text-center">
                            Sua pontuação foi calculada.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-8">
                        <div className="text-6xl font-black text-indigo-600 mb-2">
                            {result.score}
                            <span className="text-2xl text-gray-400 font-medium">/{result.max_score}</span>
                        </div>
                        <p className="text-gray-500">Pontos</p>
                    </div>

                    <DialogFooter className="sm:justify-center">
                        <button
                            onClick={handleFinish}
                            className="w-full px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                        >
                            Voltar ao Painel
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </FocusLayout>
    );
}
