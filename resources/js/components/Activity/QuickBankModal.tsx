import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onBankCreated: (bank: any) => void;
}

export default function QuickBankModal({ isOpen, onClose, onBankCreated }: Props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/professor/question-banks', {
                title,
                description
            }, {
                headers: {
                    'Accept': 'application/json' // Explicitly tell Laravel we want JSON
                }
            });

            if (response.data.success) {
                onBankCreated(response.data.bank);
                setTitle('');
                setDescription('');
            } else {
                setError('Erro inesperado: ' + JSON.stringify(response.data));
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Erro ao criar banco de questões.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Banco de Questões</DialogTitle>
                    <DialogDescription>
                        Crie um novo banco para agrupar as suas questões.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Título
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="Ex: Matemática - 8º Ano (Bimestre 1)"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Descrição (Opcional)
                        </label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-gray-900 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="Breve descrição dos assuntos abordados..."
                        />
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
                            Salvar Banco
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
