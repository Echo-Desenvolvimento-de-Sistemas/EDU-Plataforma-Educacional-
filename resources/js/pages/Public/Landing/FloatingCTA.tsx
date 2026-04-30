import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Zap } from 'lucide-react';

export default function FloatingCTA() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [400, 600], [0, 1]);
    const y = useTransform(scrollY, [400, 600], [100, 0]);

    return (
        <motion.div 
            style={{ opacity, y }}
            className="fixed bottom-8 right-8 z-[60] hidden sm:block"
        >
            <Link href="/demo-access">
                <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-2xl shadow-indigo-500/40 flex items-center gap-2 group transition-all">
                    <Zap className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                    <span>Testar grátis</span>
                </Button>
            </Link>
        </motion.div>
    );
}
