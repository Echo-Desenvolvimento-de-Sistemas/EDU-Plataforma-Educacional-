import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';
import { motion } from 'framer-motion';

export default function LandingHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <AppLogo className="h-12 w-auto" />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="/#funcionalidades" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Funcionalidades</a>
                    <a href="/#detalhes" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Módulos</a>
                    <a href="/#problemas" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Dores</a>
                    <a href="/#precos" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Preços</a>
                    <a href="/#faq" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">FAQ</a>
                </nav>

                <div className="flex items-center gap-4">
                    <a href="#contato" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block">
                        Contato
                    </a>
                    <Link href="/demo-access">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                            Testar grátis
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
