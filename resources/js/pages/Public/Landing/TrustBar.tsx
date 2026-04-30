import { motion } from 'framer-motion';

const schools = [
    "Gestão Financeira", "Secretaria Digital", "Portal do Aluno", "Gamificação Escolar", 
    "Diário de Classe", "BNCC Integrada", "Agenda Digital", "Ranking & Prêmios"
];

export default function TrustBar() {
    return (
        <div className="py-12 bg-white border-y border-slate-50 overflow-hidden">
            <div className="container mx-auto px-6 mb-6">
                <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    O que você encontra no EDU
                </p>
            </div>
            <div className="flex relative">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="flex gap-16 whitespace-nowrap items-center"
                >
                    {[...schools, ...schools].map((name, i) => (
                        <span key={i} className="text-xl md:text-2xl font-bold text-slate-200 hover:text-sky-500 transition-colors cursor-default" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {name}
                        </span>
                    ))}
                </motion.div>
                {/* Gradient overlays for the fade effect */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            </div>
        </div>
    );
}
