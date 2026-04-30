import { Head } from '@inertiajs/react';
import LandingHeader from './Landing/LandingHeader';
import LandingFooter from './Landing/LandingFooter';
import { motion } from 'framer-motion';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900">
            <Head title="Política de Privacidade - EDU" />
            
            <LandingHeader />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-slate max-w-none"
                    >
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Política de Privacidade
                        </h1>
                        
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            A sua privacidade é importante para nós. É política do EDU respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site EDU, e outros sites que possuímos e operamos.
                        </p>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">1. Coleta de Informações</h2>
                            <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>

                            <h2 className="text-2xl font-bold text-slate-900">2. Uso de Dados</h2>
                            <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, os protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>

                            <h2 className="text-2xl font-bold text-slate-900">3. Compartilhamento</h2>
                            <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>

                            <h2 className="text-2xl font-bold text-slate-900">4. Segurança</h2>
                            <p>Empregamos medidas técnicas e organizacionais para garantir a segurança dos dados processados pela nossa plataforma, em conformidade com a LGPD (Lei Geral de Proteção de Dados).</p>
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
