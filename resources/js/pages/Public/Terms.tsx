import { Head } from '@inertiajs/react';
import LandingHeader from './Landing/LandingHeader';
import LandingFooter from './Landing/LandingFooter';
import { motion } from 'framer-motion';

export default function Terms() {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900">
            <Head title="Termos de Uso - EDU" />
            
            <LandingHeader />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-slate max-w-none"
                    >
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Termos de Uso
                        </h1>
                        
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Ao acessar o site EDU, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.
                        </p>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">1. Licença de Uso</h2>
                            <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site EDU, apenas para visualização transitória pessoal e não comercial.</p>

                            <h2 className="text-2xl font-bold text-slate-900">2. Isenção de Responsabilidade</h2>
                            <p>Os materiais no site da EDU são fornecidos 'como estão'. EDU não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>

                            <h2 className="text-2xl font-bold text-slate-900">3. Limitações</h2>
                            <p>Em nenhum caso o EDU ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em EDU.</p>
                        </section>

                        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-500">
                            Última atualização: {new Date().toLocaleDateString('pt-BR')}
                        </div>
                    </motion.div>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}
