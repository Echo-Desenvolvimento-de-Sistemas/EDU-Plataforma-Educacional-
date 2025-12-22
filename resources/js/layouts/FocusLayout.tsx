import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function FocusLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Minimal Header */}
            <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-indigo-600 tracking-tight">FocusMode</span>
                </div>

                <Link
                    href="/aluno/dashboard"
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                    title="Sair da prova"
                    as="button"
                >
                    <X className="w-5 h-5" />
                </Link>
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col justify-center">
                {children}
            </main>
        </div>
    );
}
