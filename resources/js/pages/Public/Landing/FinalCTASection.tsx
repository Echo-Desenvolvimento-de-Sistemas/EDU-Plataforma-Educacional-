import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Headset, Zap } from 'lucide-react';

export default function FinalCTASection() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-600 p-12 md:p-16 text-center shadow-2xl shadow-sky-500/20"
                >
                    {/* Decorative blurs */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-36 -mt-36 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-700/30 rounded-full -ml-36 -mb-36 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Pronto para transformar a gestão da sua escola?
                        </h2>
                        <p className="text-lg text-sky-100 mb-10 max-w-xl mx-auto leading-relaxed">
                            Agende uma demonstração gratuita e descubra como o EDU pode
                            simplificar sua rotina em menos de 30 minutos.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                            <a href="#contato">
                                <Button
                                    size="lg"
                                    className="h-14 px-10 text-base bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                >
                                    Falar com Consultor
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </a>
                            <a href="https://wa.me/558781022142" target="_blank" rel="noopener noreferrer">
                                <Button
                                    size="lg"
                                    variant="ghost"
                                    className="h-14 px-10 text-white hover:bg-white/10 rounded-full font-bold cursor-pointer"
                                >
                                    <Headset className="w-5 h-5 mr-2" />
                                    Conversar no WhatsApp
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sky-200 text-sm">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                <span>Implementação em 48h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Headset className="w-4 h-4" />
                                <span>Suporte incluso</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                <span>Sem taxa de adesão</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
