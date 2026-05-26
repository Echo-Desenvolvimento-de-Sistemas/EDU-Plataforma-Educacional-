import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, ArrowRight, GraduationCap } from 'lucide-react';
import { useEffect } from 'react';

export default function Success() {
    // Force light mode for the pre-registration pages
    useEffect(() => {
        const hasDark = document.documentElement.classList.contains('dark');
        document.documentElement.classList.remove('dark');
        return () => {
            if (hasDark) {
                document.documentElement.classList.add('dark');
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-50 via-slate-50 to-emerald-50/20 dark:from-gray-900 dark:via-slate-900 dark:to-emerald-950/10 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <Head title="Pré-Matrícula Realizada" />

            <div className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-[0_20px_50px_rgba(16,185,129,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl border border-white/20 dark:border-gray-800/80 p-8 sm:p-10 text-center z-10 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        {/* Outer pulsating ring */}
                        <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping duration-1000 opacity-75" />
                        <div className="relative w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center border border-emerald-500/25">
                            <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400 stroke-[2.5px]" />
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
                    Pré-Matrícula Realizada!
                </h1>

                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                    Os dados foram transmitidos com sucesso. A secretaria escolar analisará o cadastro e entrará em contato para confirmar a conclusão da matrícula.
                </p>

                <div className="space-y-3">
                    <Link href="/" className="block">
                        <Button className="w-full h-11 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-500/10">
                            Voltar ao Início
                        </Button>
                    </Link>
                    
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 pt-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Plataforma Educacional Educx</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
