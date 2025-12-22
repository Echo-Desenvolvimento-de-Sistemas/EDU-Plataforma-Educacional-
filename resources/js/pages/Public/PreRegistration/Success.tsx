import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function Success() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
            <Head title="Pré-Matrícula Realizada" />

            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Pré-Matrícula Realizada!
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Os dados foram enviados com sucesso. A secretaria entrará em contato para confirmar a matrícula.
                </p>

                <Link href="/">
                    <Button className="w-full">
                        Voltar ao Início
                    </Button>
                </Link>
            </div>
        </div>
    );
}
