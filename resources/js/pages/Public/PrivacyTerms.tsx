import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
    ArrowLeft,
    Eye,
    FileText,
    GraduationCap,
    HelpCircle,
    Lock,
    Printer,
    Scale,
    School,
    ShieldCheck,
    Info,
    LockKeyhole,
    AlertTriangle,
    RefreshCw,
    FileQuestion,
    Building,
    Briefcase,
    ShieldAlert,
    CheckCircle,
    ChevronRight,
    Mail,
    Calendar,
    Users
} from 'lucide-react';

interface Props {
    settings?: Record<string, string>;
}

export default function PrivacyTerms({ settings }: Props) {
    const schoolName = settings?.school_name || 'Instituição de Ensino';
    const schoolAddress = settings?.school_address || 'Endereço da Instituição';
    const schoolCnpj = settings?.school_cnpj || '00.000.000/0000-00';
    const schoolPhone = settings?.school_phone || '';
    const schoolEmail = settings?.school_email || 'secretaria@suaescola.com.br';
    const schoolCity = settings?.school_city || '';
    const schoolState = settings?.school_state || '';
    const schoolCep = settings?.school_cep || '';

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#f3f6f5] pt-4 pb-12 sm:pt-8 dark:bg-[#0b0f19] print:bg-white print:pt-0 print:pb-0">
            {/* Background glows */}
            <div className="pointer-events-none absolute top-[-100px] right-[-100px] -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-300/10 to-lime-200/10 blur-[100px] print:hidden dark:from-emerald-950/15 dark:to-lime-900/10" />
            <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] -z-10 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-emerald-100/10 to-teal-200/10 blur-[110px] print:hidden dark:from-emerald-950/10 dark:to-teal-900/10" />

            <Head title="Termos de Serviço e Privacidade (LGPD)" />

            <div className="z-10 w-full max-w-4xl px-4 print:px-0">
                {/* Header Actions */}
                <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/40 bg-white/40 px-5 py-3 shadow-sm backdrop-blur-md print:hidden dark:border-slate-800/40 dark:bg-slate-900/30">
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className="text-slate-600 dark:text-slate-400 h-9 gap-1.5 rounded-xl text-xs font-bold hover:text-slate-900 dark:hover:text-slate-100"
                        >
                            <ArrowLeft className="h-4 w-4" /> Voltar
                        </Button>
                    </Link>

                    <div className="flex items-center gap-2.5">
                        <School className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-slate-800 dark:text-slate-200 text-sm font-extrabold tracking-tight">
                            {schoolName}
                        </span>
                    </div>

                    <Button
                        onClick={handlePrint}
                        variant="outline"
                        className="h-9 gap-1.5 rounded-xl border-slate-200 text-xs font-bold hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <Printer className="h-4 w-4" /> Imprimir / PDF
                    </Button>
                </div>

                {/* Main Card with Tabs */}
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.02)] sm:p-10 print:border-none print:p-0 print:shadow-none dark:border-slate-800 dark:bg-slate-900">
                    
                    <Tabs defaultValue="privacidade" className="w-full">
                        {/* Tabs List Navigation */}
                        <TabsList className="mb-8 grid w-full grid-cols-2 rounded-2xl bg-slate-100/80 p-1.5 dark:bg-slate-800/80 print:hidden">
                            <TabsTrigger 
                                value="termos" 
                                className="rounded-xl py-2.5 px-4 font-bold text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100 flex items-center justify-center gap-2 shadow-none border-none"
                            >
                                <FileText className="h-4 w-4 shrink-0" />
                                Termos de Serviço
                            </TabsTrigger>
                            <TabsTrigger 
                                value="privacidade"
                                className="rounded-xl py-2.5 px-4 font-bold text-sm transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100 flex items-center justify-center gap-2 shadow-none border-none"
                            >
                                <ShieldCheck className="h-4 w-4 shrink-0" />
                                Política de Privacidade (LGPD)
                            </TabsTrigger>
                        </TabsList>

                        {/* ============================================================== */}
                        {/* TAB 1: TERMOS DE SERVIÇO */}
                        {/* ============================================================== */}
                        <TabsContent value="termos" className="outline-none focus:outline-none">
                            <div className="mx-auto mb-10 max-w-2xl text-center print:mb-6">
                                <div className="mb-4 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-600 print:hidden dark:bg-emerald-950/30 dark:text-emerald-400">
                                    <FileText className="h-8 w-8" />
                                </div>
                                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
                                    Termos de Serviço da Plataforma
                                </h1>
                                <p className="mt-2 text-xs text-slate-400 sm:text-sm dark:text-slate-500">
                                    Regulamentação de uso, responsabilidades e limitações civis do software de apoio escolar.
                                </p>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                                
                                {/* Info Banner */}
                                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4.5 text-xs leading-relaxed text-blue-700 sm:text-sm dark:border-blue-950/40 dark:bg-blue-950/20 dark:text-blue-400 flex gap-3 items-start">
                                    <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-450 mt-0.5" />
                                    <div>
                                        <strong>Informação Importante de Segurança Jurídica:</strong> Este sistema educacional é desenvolvido, licenciado e mantido pela empresa <strong>Echo Desenvolvimento de Sistemas</strong>. Ao utilizar a plataforma Restrita, você celebra um contrato de uso que isenta a licenciadora Echo de qualquer responsabilidade educacional, civil ou de conteúdo inserido pela instituição contratante (<strong>{schoolName}</strong>).
                                    </div>
                                </div>

                                {/* Section 1 */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            1. Objeto, Licenciamento e Aceite
                                        </h2>
                                    </div>
                                    <p className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7">
                                        Estes Termos regulam a licença de uso do software disponibilizado aos responsáveis legais, alunos, professores e colaboradores do <strong>{schoolName}</strong>. A propriedade intelectual do sistema e todos os direitos autorais correlatos pertencem exclusivamente à <strong>Echo Desenvolvimento de Sistemas</strong>. A licença de uso é concedida a título precário, não exclusivo e intransferível, exclusivamente para fins de apoio pedagógico e administrativo escolar.
                                    </p>
                                </section>

                                {/* Section 2 */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <LockKeyhole className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            2. Condições de Acesso, Credenciais e Logs
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-2">
                                        <p>
                                            As contas de acesso e credenciais de segurança (login e senha) são geradas de forma a garantir a individualização do acesso.
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>As credenciais são de uso <strong>confidencial e intransferível</strong> do usuário registrado.</li>
                                            <li>O usuário é o único responsável pela guarda e sigilo de suas senhas, isentando a <strong>Echo Desenvolvimento de Sistemas</strong> de qualquer responsabilidade por acessos fraudulentos decorrentes do compartilhamento de dados de acesso.</li>
                                            <li>O sistema armazena logs automáticos de login (incluindo IP e carimbo de data/hora) para auditorias de segurança e prevenção a acessos não autorizados.</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 3 */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Users className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            3. Limitação de Responsabilidade da Licenciadora (Echo)
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-2">
                                        <p>
                                            A plataforma funciona como um canal de suporte digital em formato White Label. Por esse motivo, as partes declaram ciência de que:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>A <strong>Echo Desenvolvimento de Sistemas</strong> não possui qualquer gerência sobre a relação contratual educacional entre o <strong>{schoolName}</strong> e os responsáveis/alunos.</li>
                                            <li>A inserção de informações acadêmicas, frequências, notas, boletins, comunicados, assim como a gestão financeira e cobrança, são de inteira responsabilidade do colégio controlador. A Echo não se responsabiliza por eventuais erros de digitação ou inconsistências de dados imputados pela secretaria ou docentes.</li>
                                            <li>A <strong>Echo</strong> não se responsabiliza por decisões pedagógicas, reprovações, suspensões ou condutas disciplinares adotadas pela coordenação escolar.</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 4 */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <RefreshCw className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            4. Disponibilidade do Sistema e Manutenções
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-2">
                                        <p>
                                            A <strong>Echo</strong> busca manter a plataforma operacional com altos índices de disponibilidade (uptime), contudo, manutenções técnicas se fazem necessárias:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>A licenciadora poderá indisponibilizar temporariamente o sistema para atualizações críticas de segurança e melhorias de infraestrutura, priorizando a execução em períodos noturnos ou de finais de semana.</li>
                                            <li>A <strong>Echo</strong> não se responsabiliza por quedas de conexão decorrentes de falhas na internet do próprio usuário ou de interrupções generalizadas de provedores de telecomunicação de terceiros.</li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 5 */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Building className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            5. Propriedade Intelectual
                                        </h2>
                                    </div>
                                    <p className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7">
                                        O desenho da interface, as marcas associadas ao sistema, as ferramentas de gamificação, as rotinas de banco de dados e os códigos-fonte da plataforma são propriedade protegida da <strong>Echo Desenvolvimento de Sistemas</strong>. É estritamente proibida qualquer tentativa de cópia, engenharia reversa, alteração de código ou uso comercial da ferramenta fora da relação contratual de ensino estabelecida com o <strong>{schoolName}</strong>.
                                    </p>
                                </section>

                                {/* Section 6 */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Scale className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            6. Vigência, Suspensão de Acesso e Rescisão
                                        </h2>
                                    </div>
                                    <p className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7">
                                        Estes Termos regulam o uso da plataforma digital durante todo o período letivo em que o aluno ou responsável mantiver vínculo com a instituição de ensino. Em caso de conduta inadequada de segurança cibernética (como tentativas de invasão do sistema) ou uso difamatório das ferramentas internas de comunicação, a instituição de ensino ou a licenciadora <strong>Echo</strong> poderão suspender imediatamente o login do usuário, aplicando as regras de bloqueio pertinentes.
                                    </p>
                                </section>

                                {/* Section 7 */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Calendar className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            7. Atualizações das Condições de Uso
                                        </h2>
                                    </div>
                                    <p className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7">
                                        Estes Termos poderão sofrer alterações visando acompanhar melhorias no sistema. A <strong>Echo</strong> e o <strong>{schoolName}</strong> disponibilizarão comunicados sobre revisões relevantes na própria interface do sistema. O uso contínuo das ferramentas de software após a publicação de novos termos interpretará sua concordância.
                                    </p>
                                </section>

                                {/* Print Disclaimer */}
                                <div className="hidden print:block pt-12 text-center text-xs text-slate-400">
                                    <p>© 2026 Echo Desenvolvimento de Sistemas. Todos os direitos reservados.</p>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ============================================================== */}
                        {/* TAB 2: POLÍTICA DE PRIVACIDADE (LGPD) */}
                        {/* ============================================================== */}
                        <TabsContent value="privacidade" className="outline-none focus:outline-none">
                            <div className="mx-auto mb-10 max-w-2xl text-center print:mb-6">
                                <div className="mb-4 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-600 print:hidden dark:bg-emerald-950/30 dark:text-emerald-400">
                                    <ShieldCheck className="h-8 w-8" />
                                </div>
                                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
                                    Política de Privacidade e Proteção de Dados (LGPD)
                                </h1>
                                <p className="mt-2 text-xs text-slate-400 sm:text-sm dark:text-slate-500">
                                    Transparência sobre o tratamento de dados pessoais realizado pela escola na qualidade de Controladora e pela Echo na qualidade de Operadora.
                                </p>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                                
                                {/* Resumo de Consentimento */}
                                <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4.5 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
                                    <strong>Resumo da Política:</strong> Este documento regulamenta como a instituição de ensino trata dados pessoais coletados no processo escolar. Sob o Artigo 14 e as bases legais gerais da LGPD, os dados necessários à prestação dos serviços educacionais são tratados de forma segura. A empresa <strong>Echo Desenvolvimento de Sistemas</strong> atua na qualidade de <strong>Operadora</strong> técnica das informações no banco de dados, sob instruções exclusivas do colégio contratante.
                                </div>

                                {/* Section 1: Controlador e DPO */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Building className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            1. Identificação do Controlador, Operadora e Contatos LGPD
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0.5 sm:pl-7">
                                        {/* Controlador Box */}
                                        <div className="rounded-2xl border border-slate-100 bg-slate-50/20 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                                            <h3 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Controlador dos Dados</h3>
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{schoolName}</p>
                                            {schoolCnpj && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">CNPJ: {schoolCnpj}</p>}
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Endereço: {schoolAddress} {schoolCity && ` - ${schoolCity}/${schoolState}`}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Contato: {schoolEmail}</p>
                                        </div>
                                        {/* Operadora Box */}
                                        <div className="rounded-2xl border border-slate-100 bg-slate-50/20 p-4 dark:border-slate-800 dark:bg-slate-900/40 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Operadora Tecnológica</h3>
                                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Echo Desenvolvimento de Sistemas</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Desenvolvedora e provedora da infraestrutura de software.</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Encarregado (DPO): Comitê de Privacidade Echo</p>
                                            </div>
                                            <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                <Mail className="h-4 w-4" />
                                                <span>contato@echo.dev</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Tabela de Dados e Justificativa de Saúde */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <FileText className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            2. Coleta Proporcional e Justificada de Dados Pessoais
                                        </h2>
                                    </div>
                                    <div className="pl-0.5 sm:pl-7 space-y-4">
                                        <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed">
                                            Dividimos as informações coletadas para demonstrar a estrita proporcionalidade do tratamento no ambiente escolar:
                                        </p>
                                        
                                        {/* Table of Data Categories */}
                                        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
                                            <table className="min-w-full text-xs text-left">
                                                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-550 dark:text-slate-400 uppercase font-bold border-b border-slate-100 dark:border-slate-800">
                                                    <tr>
                                                        <th className="px-4 py-3">Categoria de Dado</th>
                                                        <th className="px-4 py-3">Exemplos</th>
                                                        <th className="px-4 py-3">Obrigatoriedade</th>
                                                        <th className="px-4 py-3">Justificativa Legal</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-350 bg-white dark:bg-slate-900/20">
                                                    <tr>
                                                        <td className="px-4 py-3 font-bold text-slate-850 dark:text-slate-100">Dados do Aluno (Gerais)</td>
                                                        <td className="px-4 py-3">Nome, Data Nascimento, CPF, Sexo, Filiação.</td>
                                                        <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold">Obrigatório</td>
                                                        <td className="px-4 py-3">Execução de Contrato e Cumprimento de Obrigação Legal (MEC/INEP).</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 font-bold text-slate-850 dark:text-slate-100">Dados do Aluno (Secundários)</td>
                                                        <td className="px-4 py-3">Nome Social, RG (Emissor/Data), Nacionalidade.</td>
                                                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">Facultativo</td>
                                                        <td className="px-4 py-3">Facilitar a identificação civil e respeito à diversidade.</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 font-bold text-slate-850 dark:text-slate-100">Dados do Responsável</td>
                                                        <td className="px-4 py-3">Nome, CPF, Parentesco, Celular/WhatsApp.</td>
                                                        <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold">Obrigatório</td>
                                                        <td className="px-4 py-3">Execução de Contrato (Gestão de Cobrança e Responsabilidade Escolar).</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 font-bold text-slate-850 dark:text-slate-100">Dados de Saúde Básicos</td>
                                                        <td className="px-4 py-3">Tipo sanguíneo, vacinação em dia, restrições alimentares.</td>
                                                        <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold">Obrigatório</td>
                                                        <td className="px-4 py-3">Tutela de Saúde física e segurança imediata na escola.</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-4 py-3 font-bold text-slate-850 dark:text-slate-100">Dados Médicos Específicos</td>
                                                        <td className="px-4 py-3">CID (Código de Doença), laudos de deficiências graves.</td>
                                                        <td className="px-4 py-3 text-blue-600 dark:text-blue-450 font-bold">Restrito/Caso a caso</td>
                                                        <td className="px-4 py-3">Apenas sob demanda para adaptação de acessibilidade e segurança.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Sensitive Data and CID disclaimer */}
                                        <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 text-xs leading-relaxed text-amber-800 dark:border-amber-950/30 dark:bg-amber-950/20 dark:text-amber-450 flex gap-2">
                                            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
                                            <div>
                                                <strong>Diretriz de Coleta de Dados Sensíveis e CID:</strong> 
                                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                                    <li>O <strong>{schoolName}</strong> e a plataforma <strong>não solicitam</strong> o CID (Código Internacional de Doenças) como regra geral. Informações de diagnósticos ou laudos específicos de saúde só deverão ser compartilhadas pelos responsáveis quando estritamente necessárias para a disponibilização de Acessibilidade Escolar, Atendimento Educacional Especializado (AEE), suporte individual de emergência ou em cumprimento de obrigação legal.</li>
                                                    <li>Dados de saúde secundários e não obrigatórios não são impeditivos para a matrícula.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 3: Finalidades e Bases Legais */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Scale className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            3. Finalidades e Bases Legais do Tratamento
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-3">
                                        <p>
                                            O tratamento de dados pessoais da comunidade escolar é embasado nas seguintes finalidades e hipóteses autorizativas da LGPD:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>
                                                <strong>Execução do Contrato de Prestação de Serviços de Ensino (Art. 7º, V)</strong>: Viabilizar a pré-matrícula, efetivação da matrícula, emissão de boletos, cobrança financeira de mensalidades e controle de acesso físico.
                                            </li>
                                            <li>
                                                <strong>Cumprimento de Obrigação Legal ou Regulatória (Art. 7º, II)</strong>: Emissão de boletins acadêmicos, controle de frequência presencial obrigatória por lei, histórico escolar do estudante e remessa obrigatória de informações para o Censo Escolar/INEP.
                                            </li>
                                            <li>
                                                <strong>Tutela de Saúde (Art. 7º, VIII e Art. 11, II, "f")</strong>: Conhecimento de restrições alimentares severas e medicamentos em uso contínuo para atuação rápida da escola em caso de urgências médicas internas.
                                            </li>
                                            <li>
                                                <strong>Legítimo Interesse da Escola (Art. 7º, IX)</strong>: Envio de comunicações operacionais necessárias, segurança interna das salas de aula e melhorias na experiência de navegação acadêmica.
                                            </li>
                                            <li>
                                                <strong>Consentimento (Art. 7º, I e Art. 14)</strong>: Utilizado de forma opcional para atividades acessórias adicionais, como uso de fotos coletivas do estudante em redes sociais oficiais com finalidade meramente jornalística e institucional. Este consentimento é facultativo e pode ser cancelado a qualquer tempo pelo e-mail da secretaria.
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 4: Menores de Idade */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Lock className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            4. Tratamento de Dados de Crianças e Adolescentes
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-2">
                                        <p>
                                            O tratamento de dados pessoais de menores de 18 anos realiza-se prezando pelo <strong>melhor interesse do estudante</strong> (Art. 14, caput da LGPD).
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>
                                                <strong>Crianças (menores de 12 anos)</strong>: O preenchimento da pré-matrícula e do termo de consentimento por pelo menos um dos pais ou responsável legal fornece a concordância para que a escola realize o tratamento dos dados pessoais em prol do desenvolvimento escolar do menor.
                                            </li>
                                            <li>
                                                <strong>Adolescentes (entre 12 e 18 anos)</strong>: O tratamento de seus dados decorre diretamente da execução do contrato de ensino e cumprimento de obrigação regulatória federal, não dependendo de consentimento específico para a prestação do serviço pedagógico básico contratado, conforme recomendação e parecer técnico da ANPD.
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 5: Compartilhamento com Operadores */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Users className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            5. Compartilhamento de Dados com Parceiros e Operadores
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-2">
                                        <p>
                                            Os dados pessoais coletados não são comercializados ou alugados. Para viabilizar a infraestrutura de TI e comunicação digital, os dados são compartilhados com as seguintes categorias de operadores parceiros:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li><strong>Provedores de Infraestrutura e Armazenamento em Nuvem (Cloud Hosting)</strong>: Hospedagem segura de nosso banco de dados, protegida por firewalls e restrições de tráfego.</li>
                                            <li><strong>Gateways de Comunicação Digital e Mensageria (WhatsApp/SMS)</strong>: Envio automático de informativos e convites escolares essenciais e comunicados oficiais do colégio.</li>
                                            <li><strong>Órgãos Públicos e Ministério da Educação (MEC)</strong>: Envio de registros exigidos por lei para a validação de diplomas e realização do Censo Escolar.</li>
                                        </ul>
                                        <p>
                                            Todos os operadores externos estão vinculados por contratos com obrigações expressas de proteção de dados, segurança cibernética e restrição de uso de dados pessoais fora dos propósitos acordados com a instituição.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 6: Direitos do Titular (Art. 18) e Canal DPO */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <HelpCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            6. Direitos dos Titulares e Procedimento de Solicitação
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-3">
                                        <p>
                                            Conforme garantido pelo Art. 18 da LGPD, os responsáveis legais (representando a si ou aos estudantes menores) podem requerer: confirmação de tratamento, acesso facilitado, retificação de dados incorretos, anonimização, exclusão de dados não obrigatórios e portabilidade.
                                        </p>
                                        
                                        {/* Steps list */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                            <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-3.5 dark:border-slate-800 dark:bg-slate-900/40">
                                                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-xs uppercase mb-1">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px]">1</span>
                                                    Abertura
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                    Envie e-mail detalhando seu pedido para a escola em <strong>{schoolEmail}</strong> com assunto "LGPD".
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-3.5 dark:border-slate-800 dark:bg-slate-900/40">
                                                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-xs uppercase mb-1">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px]">2</span>
                                                    Validação
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                    Para evitar vazamento a terceiros, a escola solicitará confirmação de identidade por cópia de documento oficial do responsável.
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-slate-100 bg-slate-50/20 p-3.5 dark:border-slate-800 dark:bg-slate-900/40">
                                                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-xs uppercase mb-1">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px]">3</span>
                                                    Resposta
                                                </div>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                                    O comitê escolar analisará o pedido e enviará a resposta final em até <strong>15 dias corridos</strong>, conforme a lei.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 7: Retenção e Descarte */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Scale className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            7. Prazos de Retenção e Políticas de Descarte de Dados
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-2">
                                        <p>
                                            Não mantemos informações arquivadas por mais tempo do que o necessário. Adotamos as seguintes diretrizes específicas de descarte:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-2">
                                            <li>
                                                <strong>Dossiê Acadêmico do Aluno (Frequência, Histórico, Notas)</strong>: Conservação permanente e de longo prazo por determinação regulatória e obrigatória do Ministério da Educação (MEC).
                                            </li>
                                            <li>
                                                <strong>Dados de Saúde do Aluno (Alergias, Contatos Médicos)</strong>: Excluídos ou completamente anonimizados em até 12 meses após a rescisão contratual e encerramento do ano letivo de saída do estudante.
                                            </li>
                                            <li>
                                                <strong>Logs de Segurança e Autenticação Ciberespacial</strong>: Retidos por no mínimo 6 meses conforme preconizado pelo Marco Civil da Internet (Lei 12.965/2014) e depois excluídos.
                                            </li>
                                            <li>
                                                <strong>Dados de Cadastro e Cobrança Financeira</strong>: Conservados pelo prazo de 5 anos após a rescisão do contrato escolar, prazo necessário para defesa de eventuais direitos em juízo ou cumprimento de obrigações tributárias e fiscais.
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 8: Segurança e Incidentes */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <LockKeyhole className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            8. Segurança da Informação, Controle de Acesso e Incidentes
                                        </h2>
                                    </div>
                                    <div className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7 space-y-3">
                                        <p>
                                            Adotamos medidas técnicas e administrativas sólidas para proteger os dados pessoais de acessos não autorizados ou destruições acidentais:
                                        </p>
                                        
                                        {/* Security Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                                            <div className="border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/30 rounded-xl p-3 text-center">
                                                <ShieldCheck className="h-5 w-5 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                                                <h4 className="font-bold text-slate-900 dark:text-slate-200 text-xs">Criptografia</h4>
                                                <p className="text-[10px] text-slate-500 mt-0.5">SSL/TLS para comunicações seguras.</p>
                                            </div>
                                            <div className="border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/30 rounded-xl p-3 text-center">
                                                <Users className="h-5 w-5 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                                                <h4 className="font-bold text-slate-900 dark:text-slate-200 text-xs">Controle de Perfil</h4>
                                                <p className="text-[10px] text-slate-500 mt-0.5">Acesso restrito conforme a função.</p>
                                            </div>
                                            <div className="border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/30 rounded-xl p-3 text-center">
                                                <FileText className="h-5 w-5 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                                                <h4 className="font-bold text-slate-900 dark:text-slate-200 text-xs">Auditoria (Logs)</h4>
                                                <p className="text-[10px] text-slate-500 mt-0.5">Logs de acessos e modificações.</p>
                                            </div>
                                            <div className="border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/30 rounded-xl p-3 text-center">
                                                <RefreshCw className="h-5 w-5 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                                                <h4 className="font-bold text-slate-900 dark:text-slate-200 text-xs">Backup Diário</h4>
                                                <p className="text-[10px] text-slate-500 mt-0.5">Backup diário redundante.</p>
                                            </div>
                                        </div>

                                        <p className="mt-2">
                                            <strong>Compromisso em Incidentes:</strong> Caso ocorra algum incidente relevante de segurança da informação no software (como invasões cibernéticas ou vazamentos de dados confirmados) que represente risco relevante para os estudantes ou responsáveis, a <strong>Echo Desenvolvimento de Sistemas</strong>, na qualidade de operadora de tecnologia, notificará imediatamente o <strong>{schoolName}</strong> (controlador) para que este adote as medidas de comunicação cabíveis junto à ANPD e aos responsáveis legais atingidos, nos termos do Artigo 48 da LGPD.
                                        </p>
                                    </div>
                                </section>

                                {/* Section 9: WhatsApp e Credenciais */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <Mail className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            9. WhatsApp, Agenda Digital e Comunicações Eletrônicas
                                        </h2>
                                    </div>
                                    <p className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7">
                                        Os canais digitais do colégio (Agenda Digital embutida, SMS e WhatsApp institucional) serão utilizados de forma estrita para avisos burocráticos, envio de convites e circulares administrativas inerentes ao serviço de ensino. A instituição adota cuidados para não transitar dados médicos detalhados ou laudos sensíveis por canais de mensagens informais, utilizando a plataforma restrita para o envio de documentos dessa categoria.
                                    </p>
                                </section>

                                {/* Section 10: Atualizações */}
                                <section className="space-y-3 pt-2">
                                    <div className="text-slate-800 dark:text-slate-200 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-2 font-bold">
                                        <RefreshCw className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 print:text-black" />
                                        <h2 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
                                            10. Atualizações desta Política
                                        </h2>
                                    </div>
                                    <p className="text-slate-650 dark:text-slate-300 pl-0.5 text-sm leading-relaxed sm:pl-7">
                                        Esta Política de Privacidade poderá passar por atualizações pontuais para refletir melhorias no sistema educacional digital ou para adequação a regulamentos complementares emitidos pela ANPD. Modificações que resultem em alterações substanciais no tratamento de dados pessoais de menores serão avisadas aos responsáveis legais no primeiro acesso subsequente para sua ciência e conhecimento.
                                    </p>
                                </section>

                                {/* Print Disclaimer */}
                                <div className="hidden print:block pt-12 text-center text-xs text-slate-400">
                                    <p>© 2026 Echo Desenvolvimento de Sistemas. Operadora sob instruções de {schoolName}.</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
