import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';

export default function LandingFooter() {
    return (
        <footer className="py-20 bg-slate-900 text-slate-300 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <AppLogo className="h-10 w-auto mb-6 brightness-0 invert" />
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            O EDU é uma solução completa da <strong>Echo Desenvolvimento de Software</strong> para transformar a gestão educacional através da tecnologia e gamificação.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">
                                <span className="sr-only">Instagram</span>
                                <div className="w-4 h-4 bg-slate-400 rounded-sm" />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500 transition-colors cursor-pointer">
                                <span className="sr-only">LinkedIn</span>
                                <div className="w-4 h-4 bg-slate-400 rounded-sm" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Soluções</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#detalhes" className="hover:text-indigo-400 transition-colors">Secretaria Digital</a></li>
                            <li><a href="#detalhes" className="hover:text-indigo-400 transition-colors">Portal do Professor</a></li>
                            <li><a href="#detalhes" className="hover:text-indigo-400 transition-colors">App do Aluno</a></li>
                            <li><a href="#detalhes" className="hover:text-indigo-400 transition-colors">Gamificação</a></li>
                            <li><a href="#detalhes" className="hover:text-indigo-400 transition-colors">Financeiro</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Institucional</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="https://echo.dev.br" target="_blank" className="hover:text-indigo-400 transition-colors">Sobre a Echo</a></li>
                            <li><a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
                            <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacidade</Link></li>
                            <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Termos de Uso</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Suporte</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="mailto:contato@echo.dev.br" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                contato@echo.dev.br
                            </a></li>
                            <li><a href="tel:8781022142" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                87 8102-2142
                            </a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Central de Ajuda</a></li>
                            <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentação</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} Echo Desenvolvimento de Software. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
