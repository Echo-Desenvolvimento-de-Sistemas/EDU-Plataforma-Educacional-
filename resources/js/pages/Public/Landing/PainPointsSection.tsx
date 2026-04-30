import { motion } from 'framer-motion';
import { FileSpreadsheet, MessageCircleWarning, ClipboardList } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const painPoints = [
    {
        icon: <FileSpreadsheet className="w-8 h-8" />,
        title: 'Dados Espalhados',
        desc: 'Planilhas no Excel, cadernos do professor, fichas na secretaria... Informações críticas fragmentadas em dezenas de lugares diferentes, impossíveis de cruzar.',
        color: 'text-red-500',
        bg: 'bg-red-50',
        border: 'border-red-100',
    },
    {
        icon: <MessageCircleWarning className="w-8 h-8" />,
        title: 'Comunicação Caótica',
        desc: 'Grupos de WhatsApp lotados, recados perdidos, pais sem acesso às informações dos filhos. A comunicação escola-família virou um caos.',
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
    },
    {
        icon: <ClipboardList className="w-8 h-8" />,
        title: 'Burocracia Paralisante',
        desc: 'Horas lançando notas manualmente, chamada em papel, relatórios feitos a mão. Seu time pedagógico gasta mais tempo com burocracia do que com educação.',
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        border: 'border-orange-100',
    },
];

export default function PainPointsSection() {
    return (
        <section id="problemas" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-bold uppercase tracking-widest text-red-400 mb-4 block">
                        O problema que você vive todo dia
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Reconhece alguma dessas dores?
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Se a gestão da sua escola ainda depende de processos manuais, você está perdendo tempo, dinheiro e qualidade pedagógica.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {painPoints.map((pain, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            className={`p-8 rounded-2xl ${pain.bg} border ${pain.border} hover:shadow-lg transition-shadow duration-300 cursor-pointer group`}
                        >
                            <div className={`mb-5 p-3 rounded-xl bg-white w-fit shadow-sm ${pain.color} group-hover:scale-110 transition-transform duration-200`}>
                                {pain.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{pain.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{pain.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16 text-2xl md:text-3xl font-bold text-slate-900"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    E se existisse uma{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                        única solução
                    </span>{' '}
                    para tudo isso?
                </motion.p>
            </div>
        </section>
    );
}
