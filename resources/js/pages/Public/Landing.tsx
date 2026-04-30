import { Head } from '@inertiajs/react';
import HeroSection from './Landing/HeroSection';
import TrustBar from './Landing/TrustBar';
import PainPointsSection from './Landing/PainPointsSection';
import ProductShowcaseSection from './Landing/ProductShowcaseSection';
import ModuleDetailsSection from './Landing/ModuleDetailsSection';
import DifferentialsSection from './Landing/DifferentialsSection';
import FAQSection from './Landing/FAQSection';
import PricingSection from './Landing/PricingSection';
import ContactSection from './Landing/ContactSection';
import FinalCTASection from './Landing/FinalCTASection';
import LandingFooter from './Landing/LandingFooter';
import FloatingCTA from './Landing/FloatingCTA';
import LandingHeader from './Landing/LandingHeader';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-500/20 selection:text-sky-900 overflow-x-hidden">
            <Head>
                <title>EDU — Gestão Escolar Inteligente e Gamificada</title>
                <meta name="description" content="Aumente a eficiência da sua escola com a plataforma que unifica gestão e engajamento. Unifique secretaria, professores e alunos em um só lugar." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "EDU Plataforma Educacional",
                        "operatingSystem": "Web",
                        "applicationCategory": "EducationalApplication",
                        "description": "Sistema de Gestão Escolar completo para automatizar sua secretaria, capacitar seus professores e conectar escola e família.",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "BRL"
                        }
                    }
                    `}
                </script>
            </Head>

            <LandingHeader />

            <main>
                <HeroSection />
                <TrustBar />
                <PainPointsSection />
                <ProductShowcaseSection />
                <ModuleDetailsSection />
                <DifferentialsSection />
                <FAQSection />
                <PricingSection />
                <ContactSection />
                <FinalCTASection />
            </main>

            <LandingFooter />
            <FloatingCTA />
        </div>
    );
}
