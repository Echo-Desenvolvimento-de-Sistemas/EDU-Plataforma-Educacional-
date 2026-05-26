import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Head, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    Check,
    Edit2,
    FileText,
    Heart,
    Loader2,
    MapPin,
    School,
    Send,
    ShieldCheck,
    User,
} from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

interface Props {
    token: string;
    student_name: string;
    initialData?: any;
    type: 'new' | 'renewal';
}

// Mask helper functions
const maskCPF = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

const maskCEP = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
};

const maskPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 10) {
        return digits
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    } else {
        return digits
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    }
};

const AIAvatar = () => (
    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/50 bg-gradient-to-tr from-emerald-400 via-green-400 to-lime-300 p-[1.5px] shadow-[0_4px_12px_rgba(16,185,129,0.25)]">
        <img
            src="/images/maria.jpg"
            alt="MarIA"
            className="h-full w-full rounded-full bg-white object-cover"
        />
    </div>
);

const UserAvatar = () => (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500 uppercase dark:bg-slate-700 dark:text-slate-400">
        Você
    </div>
);

export default function Form({
    token,
    student_name,
    initialData,
    type,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        // Student
        name: initialData?.name || '',
        social_name: initialData?.social_name || '',
        sex: initialData?.sex || '',
        color_race: initialData?.color_race || '',
        nationality: initialData?.nationality || 'Brasileira',
        place_of_birth: initialData?.place_of_birth || '',
        state_of_birth: initialData?.state_of_birth || '',
        birth_date: initialData?.birth_date || '',
        cpf: initialData?.cpf ? maskCPF(initialData.cpf) : '',
        rg: initialData?.rg || '',
        rg_issuer: initialData?.rg_issuer || '',
        rg_state: initialData?.rg_state || '',
        rg_date: initialData?.rg_date || '',
        mother_name: initialData?.mother_name || '',
        father_name: initialData?.father_name || '',
        parents_marital_status: initialData?.parents_marital_status || '',

        // Address
        address: {
            cep: initialData?.address?.cep
                ? maskCEP(initialData.address.cep)
                : '',
            street: initialData?.address?.street || '',
            number: initialData?.address?.number || '',
            complement: initialData?.address?.complement || '',
            neighborhood: initialData?.address?.neighborhood || '',
            city: initialData?.address?.city || '',
            state: initialData?.address?.state || '',
            zone: initialData?.address?.zone || 'urbana',
            phone_contact: initialData?.address?.phone_contact
                ? maskPhone(initialData.address.phone_contact)
                : '',
        },

        // Health
        health: {
            blood_type: initialData?.health?.blood_type || '',
            allergies: initialData?.health?.allergies || '',
            food_restrictions: initialData?.health?.food_restrictions || '',
            continuous_meds: initialData?.health?.continuous_meds || '',
            has_disability: initialData?.health?.has_disability || false,
            disability_details: initialData?.health?.disability_details || '',
            cid: initialData?.health?.cid || '',
            health_plan: initialData?.health?.health_plan || '',
            health_unit: initialData?.health?.health_unit || '',
            vaccination_updated:
                initialData?.health?.vaccination_updated || false,
        },

        // Guardian
        guardian: {
            name: initialData?.guardian?.name || '',
            cpf: initialData?.guardian?.cpf
                ? maskCPF(initialData.guardian.cpf)
                : '',
            rg: initialData?.guardian?.rg || '',
            phone: initialData?.guardian?.phone
                ? maskPhone(initialData.guardian.phone)
                : '',
            email: initialData?.guardian?.email || '',
            kinship: initialData?.guardian?.kinship || '',
        },
        accepted_lgpd: false,
    });

    const [activeStep, setActiveStep] = useState(0);
    const [loadingCep, setLoadingCep] = useState(false);
    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Force light mode for the pre-registration pages
    useEffect(() => {
        const htmlEl = document.documentElement;
        const hasDark = htmlEl.classList.contains('dark');

        htmlEl.classList.remove('dark');
        const originalBg = htmlEl.style.backgroundColor;
        htmlEl.style.backgroundColor = '#f3f6f5';

        return () => {
            if (hasDark) {
                htmlEl.classList.add('dark');
            }
            htmlEl.style.backgroundColor = originalBg;
        };
    }, []);

    // Scroll chat to bottom on step changes without moving browser window
    useEffect(() => {
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }, 100);
    }, [activeStep]);

    const questions = [
        {
            title: 'Qual é o nome completo do aluno?',
            subtitle:
                'Se aplicável, você também pode informar o nome social no campo secundário.',
            section: 'Aluno',
            fields: ['name', 'social_name'],
        },
        {
            title: 'Qual é a data de nascimento, o sexo e a cor/raça do aluno?',
            subtitle: 'Preencha estes três dados obrigatórios.',
            section: 'Aluno',
            fields: ['birth_date', 'sex', 'color_race'],
        },
        {
            title: 'Qual é a naturalidade (cidade e estado) onde o aluno nasceu?',
            subtitle: "Exemplo: Cidade 'São Paulo' e UF 'SP'.",
            section: 'Aluno',
            fields: ['place_of_birth', 'state_of_birth'],
        },
        {
            title: 'Qual é o CPF do aluno?',
            subtitle:
                'O CPF do estudante é necessário para o registro escolar oficial.',
            section: 'Aluno',
            fields: ['cpf'],
        },
        {
            title: 'Gostaria de informar o RG do aluno?',
            subtitle:
                'Estes campos são opcionais. Caso não tenha, pode clicar em Próximo.',
            section: 'Aluno',
            fields: ['rg', 'rg_issuer', 'rg_state', 'rg_date'],
        },
        {
            title: 'Quais os nomes da mãe e do pai do aluno?',
            subtitle: 'O nome da mãe é obrigatório. O nome do pai é opcional.',
            section: 'Aluno',
            fields: ['mother_name', 'father_name'],
        },
        {
            title: 'Qual é o CEP da residência do aluno?',
            subtitle: 'O CEP buscará o endereço completo de forma automática.',
            section: 'Endereço',
            fields: ['address.cep'],
        },
        {
            title: 'Confirme a rua e informe o número e complemento:',
            subtitle: 'O número da casa ou apartamento é obrigatório.',
            section: 'Endereço',
            fields: ['address.street', 'address.number', 'address.complement'],
        },
        {
            title: 'Confirme o Bairro, Cidade, Estado e a Zona Residencial:',
            subtitle: 'Selecione se reside em zona urbana ou rural.',
            section: 'Endereço',
            fields: [
                'address.neighborhood',
                'address.city',
                'address.state',
                'address.zone',
            ],
        },
        {
            title: 'Sobre a saúde: qual o tipo sanguíneo e a situação vacinal?',
            subtitle:
                'Estes dados ajudam a escola nos atendimentos rápidos (opcionais).',
            section: 'Saúde',
            fields: ['health.blood_type', 'health.vaccination_updated'],
        },
        {
            title: 'O aluno possui alergias ou alguma deficiência diagnosticada?',
            subtitle:
                'Descreva caso necessite de suporte ou cuidados adicionais.',
            section: 'Saúde',
            fields: [
                'health.allergies',
                'health.has_disability',
                'health.disability_details',
            ],
        },
        {
            title: 'Quem será o responsável legal pelo aluno?',
            subtitle:
                'Insira o nome completo e selecione o grau de parentesco.',
            section: 'Responsável',
            fields: ['guardian.name', 'guardian.kinship'],
        },
        {
            title: 'Insira o CPF do responsável legal:',
            subtitle:
                'Necessário para a validação dos documentos e assinatura do contrato.',
            section: 'Responsável',
            fields: ['guardian.cpf'],
        },
        {
            title: 'Quais são os contatos do responsável?',
            subtitle: 'Celular/WhatsApp (obrigatório) e E-mail (opcional).',
            section: 'Responsável',
            fields: ['guardian.phone', 'guardian.email'],
        },
        {
            title: 'Perfeito! Tudo preenchido. Vamos revisar os dados?',
            subtitle: 'Revise com cuidado antes de concluir sua pré-matrícula.',
            section: 'Revisão',
            fields: [],
        },
    ];

    // Handle backend errors
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0];
            const stepIndex = questions.findIndex((q) =>
                q.fields.some((field) => field === firstErrorField),
            );

            if (stepIndex !== -1) {
                setActiveStep(stepIndex);
            }
        }
    }, [errors]);

    const handleFieldChange = (field: string, value: any) => {
        if (localErrors[field]) {
            const updated = { ...localErrors };
            delete updated[field];
            setLocalErrors(updated);
        }

        let finalValue = value;
        if (field === 'cpf') finalValue = maskCPF(value);
        if (field === 'guardian.cpf') finalValue = maskCPF(value);
        if (field === 'address.cep') finalValue = maskCEP(value);
        if (field === 'guardian.phone') finalValue = maskPhone(value);

        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setData((prev: any) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: finalValue,
                },
            }));
        } else {
            setData((prev: any) => ({
                ...prev,
                [field]: finalValue,
            }));
        }
    };

    const validateStep = (stepIndex: number): boolean => {
        const errorsTemp: Record<string, string> = {};

        if (stepIndex === 0) {
            if (!data.name.trim())
                errorsTemp.name = 'O nome completo é obrigatório.';
        }
        if (stepIndex === 1) {
            if (!data.birth_date)
                errorsTemp.birth_date = 'A data de nascimento é obrigatória.';
            if (!data.sex) errorsTemp.sex = 'O sexo é obrigatório.';
            if (!data.color_race)
                errorsTemp.color_race = 'A cor/raça é obrigatória.';
        }
        if (stepIndex === 2) {
            if (!data.place_of_birth.trim())
                errorsTemp.place_of_birth =
                    'A naturalidade (cidade) é obrigatória.';
            if (!data.state_of_birth.trim()) {
                errorsTemp.state_of_birth =
                    'O estado de nascimento é obrigatório.';
            } else if (data.state_of_birth.trim().length !== 2) {
                errorsTemp.state_of_birth = 'Use a sigla de 2 letras (ex: SP).';
            }
        }
        if (stepIndex === 3) {
            if (!data.cpf) {
                errorsTemp.cpf = 'O CPF do aluno é obrigatório.';
            } else {
                const cpfClean = data.cpf.replace(/\D/g, '');
                if (cpfClean.length !== 11) {
                    errorsTemp.cpf = 'O CPF deve ter 11 dígitos.';
                }
            }
        }
        if (stepIndex === 5) {
            if (!data.mother_name.trim())
                errorsTemp.mother_name = 'O nome da mãe é obrigatório.';
        }
        if (stepIndex === 6) {
            if (!data.address.cep) {
                errorsTemp['address.cep'] = 'O CEP é obrigatório.';
            } else {
                const cepClean = data.address.cep.replace(/\D/g, '');
                if (cepClean.length !== 8) {
                    errorsTemp['address.cep'] = 'O CEP deve ter 8 dígitos.';
                }
            }
        }
        if (stepIndex === 7) {
            if (!data.address.street.trim())
                errorsTemp['address.street'] = 'O logradouro é obrigatório.';
            if (!data.address.number.trim())
                errorsTemp['address.number'] = 'O número é obrigatório.';
        }
        if (stepIndex === 8) {
            if (!data.address.neighborhood.trim())
                errorsTemp['address.neighborhood'] = 'O bairro é obrigatório.';
            if (!data.address.city.trim())
                errorsTemp['address.city'] = 'A cidade é obrigatória.';
            if (!data.address.state.trim()) {
                errorsTemp['address.state'] = 'O estado é obrigatório.';
            } else if (data.address.state.trim().length !== 2) {
                errorsTemp['address.state'] = 'Use a sigla de 2 letras.';
            }
            if (!data.address.zone)
                errorsTemp['address.zone'] = 'Selecione a zona.';
        }
        if (stepIndex === 11) {
            if (!data.guardian.name.trim())
                errorsTemp['guardian.name'] =
                    'O nome do responsável é obrigatório.';
            if (!data.guardian.kinship)
                errorsTemp['guardian.kinship'] =
                    'O grau de parentesco é obrigatório.';
        }
        if (stepIndex === 12) {
            if (!data.guardian.cpf) {
                errorsTemp['guardian.cpf'] = 'O CPF é obrigatório.';
            } else {
                const cpfClean = data.guardian.cpf.replace(/\D/g, '');
                if (cpfClean.length !== 11) {
                    errorsTemp['guardian.cpf'] =
                        'O CPF deve conter 11 dígitos.';
                }
            }
        }
        if (stepIndex === 13) {
            if (!data.guardian.phone) {
                errorsTemp['guardian.phone'] = 'O celular é obrigatório.';
            } else {
                const phoneClean = data.guardian.phone.replace(/\D/g, '');
                if (phoneClean.length < 10 || phoneClean.length > 11) {
                    errorsTemp['guardian.phone'] =
                        'O telefone/celular é inválido.';
                }
            }
        }

        setLocalErrors(errorsTemp);
        return Object.keys(errorsTemp).length === 0;
    };

    const nextStep = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prev) => Math.min(prev + 1, questions.length - 1));
        }
    };

    const prevStep = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            nextStep();
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        let isValid = true;
        for (let i = 0; i < questions.length - 1; i++) {
            if (!validateStep(i)) {
                isValid = false;
                setActiveStep(i);
                break;
            }
        }

        if (isValid && acceptedTerms && data.accepted_lgpd) {
            post(`/pre-matricula/${token}`);
        }
    };

    // ViaCEP Integration
    useEffect(() => {
        const cep = data.address.cep.replace(/\D/g, '');
        if (cep.length === 8) {
            setLoadingCep(true);
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => res.json())
                .then((addressData) => {
                    if (!addressData.erro) {
                        setData((prev: any) => ({
                            ...prev,
                            address: {
                                ...prev.address,
                                street: addressData.logradouro,
                                neighborhood: addressData.bairro,
                                city: addressData.localidade,
                                state: addressData.uf,
                                complement:
                                    addressData.complemento ||
                                    prev.address.complement,
                            },
                        }));

                        setLocalErrors((prev) => {
                            const updated = { ...prev };
                            delete updated['address.cep'];
                            delete updated['address.street'];
                            delete updated['address.neighborhood'];
                            delete updated['address.city'];
                            delete updated['address.state'];
                            return updated;
                        });
                    }
                })
                .catch((err) => console.error('Erro ao buscar CEP:', err))
                .finally(() => setLoadingCep(false));
        }
    }, [data.address.cep]);

    // Format user-facing responses for chat summary
    const getAnswerSummary = (index: number) => {
        switch (index) {
            case 0:
                return (
                    data.name +
                    (data.social_name ? ` (${data.social_name})` : '')
                );
            case 1:
                return `Nascido em ${data.birth_date} | Sexo: ${data.sex === 'M' ? 'Masc' : 'Fem'} | Cor/Raça: ${data.color_race}`;
            case 2:
                return `${data.place_of_birth} - ${data.state_of_birth}`;
            case 3:
                return `CPF: ${data.cpf}`;
            case 4:
                return data.rg
                    ? `RG: ${data.rg} ${data.rg_issuer ? `(${data.rg_issuer}/${data.rg_state})` : ''}`
                    : 'Não informado';
            case 5:
                return (
                    `Mãe: ${data.mother_name}` +
                    (data.father_name ? ` | Pai: ${data.father_name}` : '')
                );
            case 6:
                return `CEP: ${data.address.cep}`;
            case 7:
                return (
                    `${data.address.street}, Nº ${data.address.number}` +
                    (data.address.complement
                        ? ` (${data.address.complement})`
                        : '')
                );
            case 8:
                return `Bairro: ${data.address.neighborhood} | Cidade: ${data.address.city}/${data.address.state} | Zona: ${data.address.zone}`;
            case 9:
                return `Sangue: ${data.health.blood_type || 'Não informado'} | Vacina em dia: ${data.health.vaccination_updated ? 'Sim' : 'Não'}`;
            case 10:
                return (
                    (data.health.allergies
                        ? `Alergias: ${data.health.allergies}`
                        : 'Sem Alergias') +
                    ' | ' +
                    (data.health.has_disability
                        ? `Deficiência: Sim (${data.health.disability_details})`
                        : 'Sem Deficiências')
                );
            case 11:
                return `${data.guardian.name} (${data.guardian.kinship})`;
            case 12:
                return `CPF: ${data.guardian.cpf}`;
            case 13:
                return (
                    `Tel: ${data.guardian.phone}` +
                    (data.guardian.email
                        ? ` | E-mail: ${data.guardian.email}`
                        : '')
                );
            default:
                return '';
        }
    };

    const progressPercent = (activeStep / (questions.length - 1)) * 100;

    if (pageLoading) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f3f6f5] dark:bg-[#0b0f19]">
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes loader-progress {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .animate-progress {
                        animation: loader-progress 1.5s infinite linear;
                    }
                `}} />
                {/* Soft, beautiful green-lime gradient glows */}
                <div className="pointer-events-none absolute top-[-100px] right-[-100px] -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-300/20 to-lime-200/20 blur-[100px] dark:from-emerald-950/15 dark:to-lime-900/10" />
                <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] -z-10 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-emerald-100/15 to-teal-200/20 blur-[110px] dark:from-emerald-950/10 dark:to-teal-900/10" />
                
                <div className="flex flex-col items-center space-y-6 px-4 animate-in fade-in duration-500">
                    {/* Animated Pulsing Icon Wrapper */}
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/50 bg-white/80 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/85 animate-pulse">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/10 to-lime-500/10 animate-ping opacity-70" style={{ animationDuration: '2s' }} />
                        <School className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    
                    {/* Text and small loader */}
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                            {type === 'renewal' ? 'Carregando Rematrícula...' : 'Carregando Pré-Matrícula...'}
                        </h1>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                            Preparando o ambiente de pré-matrícula da MarIA
                        </p>
                        
                        {/* Progress line */}
                        <div className="relative mt-4 h-1.5 w-32 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-500 to-lime-400 animate-progress" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#f3f6f5] pt-2 pb-8 sm:pt-6 dark:bg-[#0b0f19]">
            {/* Soft, beautiful green-lime gradient glows from ThinkAI reference */}
            <div className="pointer-events-none absolute top-[-100px] right-[-100px] -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-300/20 to-lime-200/20 blur-[100px] dark:from-emerald-950/15 dark:to-lime-900/10" />
            <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] -z-10 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-emerald-100/15 to-teal-200/20 blur-[110px] dark:from-emerald-950/10 dark:to-teal-900/10" />

            <Head title="Pré-Matrícula Conversacional" />

            <div className="z-10 w-full px-4 sm:max-w-2xl">
                {/* Header (Clean, minimalist like ThinkAI top bar) */}
                <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/40 bg-white/40 px-5 py-3 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-900/30">
                    <div className="flex items-center gap-2.5">
                        <School className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-slate-850 text-sm font-bold tracking-tight dark:text-slate-100">
                            {type === 'renewal'
                                ? 'Rematrícula'
                                : 'Pré-Matrícula'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {student_name && (
                            <span className="rounded-full bg-emerald-100/50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                                {student_name}
                            </span>
                        )}
                        <div className="dark:text-slate-350 flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 dark:bg-slate-800">
                            A
                        </div>
                    </div>
                </div>

                {/* Main Conversational Canvas */}
                <form
                    onSubmit={submit}
                    className="flex min-h-[500px] flex-col bg-transparent transition-all sm:min-h-[600px]"
                >
                    {/* Chat Log (Scrollable history and inline active form) */}
                    <div
                        ref={chatContainerRef}
                        className="scrollbar-thin max-h-[620px] flex-1 space-y-6 overflow-y-auto pr-1 pb-4 sm:max-h-[720px]"
                    >
                        {/* Welcome bubble */}
                        <div className="flex items-start gap-3">
                            <AIAvatar />
                            <div className="max-w-[85%] rounded-3xl rounded-tl-none border border-slate-100/50 bg-white px-5 py-4 text-[14px] leading-relaxed text-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.015)] dark:border-slate-800/50 dark:bg-slate-800 dark:text-slate-300">
                                Olá! Sou a MarIA, a assistente digital do
                                colégio Educx. Vou te guiar passo a passo para
                                preencher a pré-matrícula de forma simples e
                                integrada.
                            </div>
                        </div>

                        {/* Conversational Questions and Answers Loop */}
                        {questions
                            .slice(0, activeStep + 1)
                            .map((question, index) => {
                                const isCompleted = index < activeStep;
                                const isActive = index === activeStep;

                                return (
                                    <div key={index} className="space-y-4">
                                        {/* Assistant's Question */}
                                        <div className="flex animate-in items-start gap-3 duration-300 fade-in slide-in-from-left-4">
                                            <AIAvatar />
                                            <div className="max-w-[85%] rounded-3xl rounded-tl-none border border-slate-100/50 bg-white px-5 py-4 text-[14px] text-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.015)] dark:border-slate-800/50 dark:bg-slate-800 dark:text-slate-200">
                                                <p className="mb-1 text-[9px] font-extrabold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                                                    {question.section}
                                                </p>
                                                <p className="text-slate-850 leading-relaxed font-semibold dark:text-slate-100">
                                                    {question.title}
                                                </p>
                                                {question.subtitle && (
                                                    <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                                                        {question.subtitle}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* If completed, show user answer bubble */}
                                        {isCompleted && (
                                            <div className="ml-auto flex max-w-[85%] animate-in items-start justify-end gap-3 duration-300 fade-in slide-in-from-right-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setActiveStep(index)
                                                        }
                                                        className="dark:hover:bg-slate-750 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200/50 bg-white text-slate-400 shadow-sm transition-all hover:bg-slate-50 hover:text-emerald-500 dark:border-slate-700/50 dark:bg-slate-800"
                                                        title="Editar esta resposta"
                                                    >
                                                        <Edit2 className="h-3 w-3" />
                                                    </button>
                                                    <div className="text-slate-850 rounded-3xl rounded-tr-none border border-slate-200/20 bg-slate-100/90 px-5 py-3.5 text-sm font-medium shadow-sm dark:border-slate-700/20 dark:bg-slate-800/80 dark:text-slate-200">
                                                        {getAnswerSummary(
                                                            index,
                                                        )}
                                                    </div>
                                                </div>
                                                <UserAvatar />
                                            </div>
                                        )}

                                        {/* If active, show inline form controls */}
                                        {isActive && (
                                            <div className="ml-11 max-w-[85%] animate-in space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] duration-300 fade-in slide-in-from-top-3 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
                                                <div className="space-y-4">
                                                    {activeStep === 0 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="name"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Nome
                                                                    Completo *
                                                                </Label>
                                                                <Input
                                                                    id="name"
                                                                    value={
                                                                        data.name
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'name',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    autoFocus
                                                                    required
                                                                    placeholder="Ex: João da Silva"
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors.name ||
                                                                            errors.name) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors.name ||
                                                                        errors.name
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="social_name"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Nome Social
                                                                </Label>
                                                                <Input
                                                                    id="social_name"
                                                                    value={
                                                                        data.social_name
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'social_name',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    placeholder="Opcional"
                                                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 1 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="birth_date"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Nascimento *
                                                                </Label>
                                                                <Input
                                                                    id="birth_date"
                                                                    type="date"
                                                                    value={
                                                                        data.birth_date
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'birth_date',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    required
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors.birth_date ||
                                                                            errors.birth_date) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors.birth_date ||
                                                                        errors.birth_date
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="sex"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Sexo *
                                                                </Label>
                                                                <Select
                                                                    value={
                                                                        data.sex
                                                                    }
                                                                    onValueChange={(
                                                                        value,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'sex',
                                                                            value,
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={cn(
                                                                            'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:border-emerald-500 focus:ring-emerald-500/20',
                                                                            (localErrors.sex ||
                                                                                errors.sex) &&
                                                                                'border-red-400 bg-red-50/10',
                                                                        )}
                                                                    >
                                                                        <SelectValue placeholder="Selecione" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="M">
                                                                            Masculino
                                                                        </SelectItem>
                                                                        <SelectItem value="F">
                                                                            Feminino
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <InputError
                                                                    message={
                                                                        localErrors.sex ||
                                                                        errors.sex
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="color_race"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Cor / Raça *
                                                                </Label>
                                                                <Select
                                                                    value={
                                                                        data.color_race
                                                                    }
                                                                    onValueChange={(
                                                                        value,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'color_race',
                                                                            value,
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={cn(
                                                                            'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:border-emerald-500 focus:ring-emerald-500/20',
                                                                            (localErrors.color_race ||
                                                                                errors.color_race) &&
                                                                                'border-red-400 bg-red-50/10',
                                                                        )}
                                                                    >
                                                                        <SelectValue placeholder="Selecione" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Branca">
                                                                            Branca
                                                                        </SelectItem>
                                                                        <SelectItem value="Preta">
                                                                            Preta
                                                                        </SelectItem>
                                                                        <SelectItem value="Parda">
                                                                            Parda
                                                                        </SelectItem>
                                                                        <SelectItem value="Amarela">
                                                                            Amarela
                                                                        </SelectItem>
                                                                        <SelectItem value="Indígena">
                                                                            Indígena
                                                                        </SelectItem>
                                                                        <SelectItem value="Não Declarada">
                                                                            Não
                                                                            Declarada
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <InputError
                                                                    message={
                                                                        localErrors.color_race ||
                                                                        errors.color_race
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 2 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="place_of_birth"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Cidade Natal
                                                                    *
                                                                </Label>
                                                                <Input
                                                                    id="place_of_birth"
                                                                    value={
                                                                        data.place_of_birth
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'place_of_birth',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    placeholder="Ex: São Paulo"
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors.place_of_birth ||
                                                                            errors.place_of_birth) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors.place_of_birth ||
                                                                        errors.place_of_birth
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="state_of_birth"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    UF Natal *
                                                                </Label>
                                                                <Input
                                                                    id="state_of_birth"
                                                                    value={
                                                                        data.state_of_birth
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'state_of_birth',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    maxLength={
                                                                        2
                                                                    }
                                                                    placeholder="Ex: SP"
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 uppercase focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors.state_of_birth ||
                                                                            errors.state_of_birth) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors.state_of_birth ||
                                                                        errors.state_of_birth
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 3 && (
                                                        <div className="space-y-1.5">
                                                            <Label
                                                                htmlFor="cpf"
                                                                className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                            >
                                                                CPF do Aluno *
                                                            </Label>
                                                            <Input
                                                                id="cpf"
                                                                value={data.cpf}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        'cpf',
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                onKeyDown={
                                                                    handleKeyDown
                                                                }
                                                                required
                                                                placeholder="000.000.000-00"
                                                                className={cn(
                                                                    'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                    (localErrors.cpf ||
                                                                        errors.cpf) &&
                                                                        'border-red-400 bg-red-50/10',
                                                                )}
                                                            />
                                                            <InputError
                                                                message={
                                                                    localErrors.cpf ||
                                                                    errors.cpf
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    {activeStep === 4 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="rg"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    RG
                                                                </Label>
                                                                <Input
                                                                    id="rg"
                                                                    value={
                                                                        data.rg
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'rg',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    placeholder="Número"
                                                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <div className="col-span-2 space-y-1.5">
                                                                    <Label
                                                                        htmlFor="rg_issuer"
                                                                        className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                    >
                                                                        Emissor
                                                                    </Label>
                                                                    <Input
                                                                        id="rg_issuer"
                                                                        value={
                                                                            data.rg_issuer
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            handleFieldChange(
                                                                                'rg_issuer',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        onKeyDown={
                                                                            handleKeyDown
                                                                        }
                                                                        placeholder="Ex: SSP"
                                                                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <Label
                                                                        htmlFor="rg_state"
                                                                        className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                    >
                                                                        UF
                                                                    </Label>
                                                                    <Input
                                                                        id="rg_state"
                                                                        value={
                                                                            data.rg_state
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            handleFieldChange(
                                                                                'rg_state',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        onKeyDown={
                                                                            handleKeyDown
                                                                        }
                                                                        maxLength={
                                                                            2
                                                                        }
                                                                        placeholder="SP"
                                                                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 uppercase focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 5 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="mother_name"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Nome da Mãe
                                                                    *
                                                                </Label>
                                                                <Input
                                                                    id="mother_name"
                                                                    value={
                                                                        data.mother_name
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'mother_name',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    placeholder="Nome completo"
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors.mother_name ||
                                                                            errors.mother_name) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors.mother_name ||
                                                                        errors.mother_name
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="father_name"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Nome do Pai
                                                                </Label>
                                                                <Input
                                                                    id="father_name"
                                                                    value={
                                                                        data.father_name
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'father_name',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    placeholder="Nome completo (opcional)"
                                                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 6 && (
                                                        <div className="space-y-1.5">
                                                            <Label
                                                                htmlFor="cep"
                                                                className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                            >
                                                                CEP *
                                                            </Label>
                                                            <div className="relative">
                                                                <Input
                                                                    id="cep"
                                                                    value={
                                                                        data
                                                                            .address
                                                                            .cep
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'address.cep',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    placeholder="00000-000"
                                                                    maxLength={
                                                                        9
                                                                    }
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors[
                                                                            'address.cep'
                                                                        ] ||
                                                                            errors[
                                                                                'address.cep'
                                                                            ]) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                {loadingCep && (
                                                                    <div className="absolute top-3.5 right-3 animate-spin text-emerald-600">
                                                                        <Loader2 className="h-4 w-4" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {data.address
                                                                .street &&
                                                                !loadingCep && (
                                                                    <p className="text-emerald-650 mt-1 flex items-center gap-1 text-[10px] font-semibold dark:text-emerald-400">
                                                                        <Check className="h-3 w-3" />{' '}
                                                                        Endereço
                                                                        localizado
                                                                    </p>
                                                                )}
                                                            <InputError
                                                                message={
                                                                    localErrors[
                                                                        'address.cep'
                                                                    ] ||
                                                                    errors[
                                                                        'address.cep'
                                                                    ]
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    {activeStep === 7 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                            <div className="space-y-1.5 sm:col-span-2">
                                                                <Label
                                                                    htmlFor="street"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Logradouro *
                                                                </Label>
                                                                <Input
                                                                    id="street"
                                                                    value={
                                                                        data
                                                                            .address
                                                                            .street
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'address.street',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    placeholder="Rua, avenida..."
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors[
                                                                            'address.street'
                                                                        ] ||
                                                                            errors[
                                                                                'address.street'
                                                                            ]) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors[
                                                                            'address.street'
                                                                        ] ||
                                                                        errors[
                                                                            'address.street'
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div className="space-y-1.5">
                                                                    <Label
                                                                        htmlFor="number"
                                                                        className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                    >
                                                                        Número *
                                                                    </Label>
                                                                    <Input
                                                                        id="number"
                                                                        value={
                                                                            data
                                                                                .address
                                                                                .number
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            handleFieldChange(
                                                                                'address.number',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        onKeyDown={
                                                                            handleKeyDown
                                                                        }
                                                                        required
                                                                        placeholder="Nº"
                                                                        className={cn(
                                                                            'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                            (localErrors[
                                                                                'address.number'
                                                                            ] ||
                                                                                errors[
                                                                                    'address.number'
                                                                                ]) &&
                                                                                'border-red-400 bg-red-50/10',
                                                                        )}
                                                                    />
                                                                    <InputError
                                                                        message={
                                                                            localErrors[
                                                                                'address.number'
                                                                            ] ||
                                                                            errors[
                                                                                'address.number'
                                                                            ]
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <Label
                                                                        htmlFor="complement"
                                                                        className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                    >
                                                                        Compl.
                                                                    </Label>
                                                                    <Input
                                                                        id="complement"
                                                                        value={
                                                                            data
                                                                                .address
                                                                                .complement
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            handleFieldChange(
                                                                                'address.complement',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        onKeyDown={
                                                                            handleKeyDown
                                                                        }
                                                                        placeholder="Ex: Apto"
                                                                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 8 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                                                            <div className="space-y-1.5 sm:col-span-2">
                                                                <Label
                                                                    htmlFor="neighborhood"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Bairro *
                                                                </Label>
                                                                <Input
                                                                    id="neighborhood"
                                                                    value={
                                                                        data
                                                                            .address
                                                                            .neighborhood
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'address.neighborhood',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    placeholder="Bairro"
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors[
                                                                            'address.neighborhood'
                                                                        ] ||
                                                                            errors[
                                                                                'address.neighborhood'
                                                                            ]) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors[
                                                                            'address.neighborhood'
                                                                        ] ||
                                                                        errors[
                                                                            'address.neighborhood'
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="city"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Cidade *
                                                                </Label>
                                                                <Input
                                                                    id="city"
                                                                    value={
                                                                        data
                                                                            .address
                                                                            .city
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'address.city',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    placeholder="Cidade"
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors[
                                                                            'address.city'
                                                                        ] ||
                                                                            errors[
                                                                                'address.city'
                                                                            ]) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors[
                                                                            'address.city'
                                                                        ] ||
                                                                        errors[
                                                                            'address.city'
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="zone"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Zona *
                                                                </Label>
                                                                <Select
                                                                    value={
                                                                        data
                                                                            .address
                                                                            .zone
                                                                    }
                                                                    onValueChange={(
                                                                        value,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'address.zone',
                                                                            value,
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={cn(
                                                                            'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:border-emerald-500 focus:ring-emerald-500/20',
                                                                            (localErrors[
                                                                                'address.zone'
                                                                            ] ||
                                                                                errors[
                                                                                    'address.zone'
                                                                                ]) &&
                                                                                'border-red-400 bg-red-50/10',
                                                                        )}
                                                                    >
                                                                        <SelectValue placeholder="Selecione" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="urbana">
                                                                            Urbana
                                                                        </SelectItem>
                                                                        <SelectItem value="rural">
                                                                            Rural
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <InputError
                                                                    message={
                                                                        localErrors[
                                                                            'address.zone'
                                                                        ] ||
                                                                        errors[
                                                                            'address.zone'
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 9 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="blood_type"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Tipo
                                                                    Sanguíneo
                                                                </Label>
                                                                <Input
                                                                    id="blood_type"
                                                                    value={
                                                                        data
                                                                            .health
                                                                            .blood_type
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'health.blood_type',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    placeholder="Ex: O+, AB-"
                                                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                />
                                                            </div>
                                                            <div className="flex items-center space-x-3 pt-6">
                                                                <Checkbox
                                                                    id="vaccination_updated"
                                                                    checked={
                                                                        data
                                                                            .health
                                                                            .vaccination_updated
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'health.vaccination_updated',
                                                                            checked as boolean,
                                                                        )
                                                                    }
                                                                    className="border-slate-350 h-5 w-5 rounded accent-emerald-500"
                                                                />
                                                                <Label
                                                                    htmlFor="vaccination_updated"
                                                                    className="cursor-pointer text-[12px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Vacinação em
                                                                    Dia?
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 10 && (
                                                        <div className="space-y-4">
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="allergies"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Alergias
                                                                </Label>
                                                                <Input
                                                                    id="allergies"
                                                                    value={
                                                                        data
                                                                            .health
                                                                            .allergies
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'health.allergies',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    placeholder="Descreva ou deixe em branco"
                                                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                />
                                                            </div>
                                                            <div className="space-y-3 rounded-2xl border bg-slate-50/50 p-4 dark:bg-slate-800/40">
                                                                <div className="flex items-center space-x-3">
                                                                    <Checkbox
                                                                        id="has_disability"
                                                                        checked={
                                                                            data
                                                                                .health
                                                                                .has_disability
                                                                        }
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) =>
                                                                            handleFieldChange(
                                                                                'health.has_disability',
                                                                                checked as boolean,
                                                                            )
                                                                        }
                                                                        className="h-5 w-5"
                                                                    />
                                                                    <Label
                                                                        htmlFor="has_disability"
                                                                        className="text-slate-650 cursor-pointer text-xs font-bold tracking-wider uppercase dark:text-slate-400"
                                                                    >
                                                                        Estudante
                                                                        possui
                                                                        deficiência?
                                                                    </Label>
                                                                </div>
                                                                {data.health
                                                                    .has_disability && (
                                                                    <div className="animate-in space-y-1.5 pt-1 duration-200 fade-in">
                                                                        <Label
                                                                            htmlFor="disability_details"
                                                                            className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                        >
                                                                            Detalhes
                                                                            /
                                                                            CID
                                                                        </Label>
                                                                        <Input
                                                                            id="disability_details"
                                                                            value={
                                                                                data
                                                                                    .health
                                                                                    .disability_details
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                handleFieldChange(
                                                                                    'health.disability_details',
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            onKeyDown={
                                                                                handleKeyDown
                                                                            }
                                                                            placeholder="Descreva detalhes"
                                                                            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 11 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            {((data.mother_name &&
                                                                data.mother_name.trim()) ||
                                                                (data.father_name &&
                                                                    data.father_name.trim())) && (
                                                                <div className="col-span-1 mb-1 sm:col-span-2">
                                                                    <p className="mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                                                        Selecionar
                                                                        dos
                                                                        dados do
                                                                        aluno:
                                                                    </p>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {data.mother_name &&
                                                                            data.mother_name.trim() && (
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        handleFieldChange(
                                                                                            'guardian.name',
                                                                                            data.mother_name,
                                                                                        );
                                                                                        handleFieldChange(
                                                                                            'guardian.kinship',
                                                                                            'Mãe',
                                                                                        );
                                                                                    }}
                                                                                    className={cn(
                                                                                        'flex cursor-pointer items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-xs font-bold shadow-xs transition-all',
                                                                                        data
                                                                                            .guardian
                                                                                            .name ===
                                                                                            data.mother_name &&
                                                                                            data
                                                                                                .guardian
                                                                                                .kinship ===
                                                                                                'Mãe'
                                                                                            ? 'border-emerald-200 bg-emerald-50 font-extrabold text-emerald-700'
                                                                                            : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                                                                                    )}
                                                                                >
                                                                                    👩
                                                                                    Mãe:{' '}
                                                                                    {
                                                                                        data.mother_name.split(
                                                                                            ' ',
                                                                                        )[0]
                                                                                    }
                                                                                </button>
                                                                            )}
                                                                        {data.father_name &&
                                                                            data.father_name.trim() && (
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        handleFieldChange(
                                                                                            'guardian.name',
                                                                                            data.father_name,
                                                                                        );
                                                                                        handleFieldChange(
                                                                                            'guardian.kinship',
                                                                                            'Pai',
                                                                                        );
                                                                                    }}
                                                                                    className={cn(
                                                                                        'flex cursor-pointer items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-xs font-bold shadow-xs transition-all',
                                                                                        data
                                                                                            .guardian
                                                                                            .name ===
                                                                                            data.father_name &&
                                                                                            data
                                                                                                .guardian
                                                                                                .kinship ===
                                                                                                'Pai'
                                                                                            ? 'border-emerald-200 bg-emerald-50 font-extrabold text-emerald-700'
                                                                                            : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                                                                                    )}
                                                                                >
                                                                                    👨
                                                                                    Pai:{' '}
                                                                                    {
                                                                                        data.father_name.split(
                                                                                            ' ',
                                                                                        )[0]
                                                                                    }
                                                                                </button>
                                                                            )}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                handleFieldChange(
                                                                                    'guardian.name',
                                                                                    '',
                                                                                );
                                                                                handleFieldChange(
                                                                                    'guardian.kinship',
                                                                                    '',
                                                                                );
                                                                            }}
                                                                            className={cn(
                                                                                'flex cursor-pointer items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-xs font-bold shadow-xs transition-all',
                                                                                data
                                                                                    .guardian
                                                                                    .name !==
                                                                                    data.mother_name &&
                                                                                    data
                                                                                        .guardian
                                                                                        .name !==
                                                                                        data.father_name
                                                                                    ? 'border-emerald-200 bg-emerald-50 font-extrabold text-emerald-700'
                                                                                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                                                                            )}
                                                                        >
                                                                            👤
                                                                            Outro
                                                                            Responsável
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="guardian_name"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Nome
                                                                    Completo *
                                                                </Label>
                                                                <Input
                                                                    id="guardian_name"
                                                                    value={
                                                                        data
                                                                            .guardian
                                                                            .name
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'guardian.name',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    placeholder="Responsável legal"
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors[
                                                                            'guardian.name'
                                                                        ] ||
                                                                            errors[
                                                                                'guardian.name'
                                                                            ]) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors[
                                                                            'guardian.name'
                                                                        ] ||
                                                                        errors[
                                                                            'guardian.name'
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="kinship"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Parentesco *
                                                                </Label>
                                                                <Select
                                                                    value={
                                                                        data
                                                                            .guardian
                                                                            .kinship
                                                                    }
                                                                    onValueChange={(
                                                                        value,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'guardian.kinship',
                                                                            value,
                                                                        )
                                                                    }
                                                                >
                                                                    <SelectTrigger
                                                                        className={cn(
                                                                            'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:border-emerald-500 focus:ring-emerald-500/20',
                                                                            (localErrors[
                                                                                'guardian.kinship'
                                                                            ] ||
                                                                                errors[
                                                                                    'guardian.kinship'
                                                                                ]) &&
                                                                                'border-red-400 bg-red-50/10',
                                                                        )}
                                                                    >
                                                                        <SelectValue placeholder="Selecione" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Mãe">
                                                                            Mãe
                                                                        </SelectItem>
                                                                        <SelectItem value="Pai">
                                                                            Pai
                                                                        </SelectItem>
                                                                        <SelectItem value="Avô/Avó">
                                                                            Avô/Avó
                                                                        </SelectItem>
                                                                        <SelectItem value="Tio/Tia">
                                                                            Tio/Tia
                                                                        </SelectItem>
                                                                        <SelectItem value="Outro">
                                                                            Outro
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <InputError
                                                                    message={
                                                                        localErrors[
                                                                            'guardian.kinship'
                                                                        ] ||
                                                                        errors[
                                                                            'guardian.kinship'
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 12 && (
                                                        <div className="space-y-1.5">
                                                            <Label
                                                                htmlFor="guardian_cpf"
                                                                className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                            >
                                                                CPF do
                                                                Responsável *
                                                            </Label>
                                                            <Input
                                                                id="guardian_cpf"
                                                                value={
                                                                    data
                                                                        .guardian
                                                                        .cpf
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        'guardian.cpf',
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                onKeyDown={
                                                                    handleKeyDown
                                                                }
                                                                required
                                                                placeholder="000.000.000-00"
                                                                className={cn(
                                                                    'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                    (localErrors[
                                                                        'guardian.cpf'
                                                                    ] ||
                                                                        errors[
                                                                            'guardian.cpf'
                                                                        ]) &&
                                                                        'border-red-400 bg-red-50/10',
                                                                )}
                                                            />
                                                            <InputError
                                                                message={
                                                                    localErrors[
                                                                        'guardian.cpf'
                                                                    ] ||
                                                                    errors[
                                                                        'guardian.cpf'
                                                                    ]
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    {activeStep === 13 && (
                                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="guardian_phone"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    Celular
                                                                    (WhatsApp) *
                                                                </Label>
                                                                <Input
                                                                    id="guardian_phone"
                                                                    value={
                                                                        data
                                                                            .guardian
                                                                            .phone
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'guardian.phone',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    required
                                                                    placeholder="(00) 00000-0000"
                                                                    className={cn(
                                                                        'h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
                                                                        (localErrors[
                                                                            'guardian.phone'
                                                                        ] ||
                                                                            errors[
                                                                                'guardian.phone'
                                                                            ]) &&
                                                                            'border-red-400 bg-red-50/10',
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        localErrors[
                                                                            'guardian.phone'
                                                                        ] ||
                                                                        errors[
                                                                            'guardian.phone'
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label
                                                                    htmlFor="guardian_email"
                                                                    className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                                                >
                                                                    E-mail
                                                                </Label>
                                                                <Input
                                                                    id="guardian_email"
                                                                    type="email"
                                                                    value={
                                                                        data
                                                                            .guardian
                                                                            .email
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleFieldChange(
                                                                            'guardian.email',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    onKeyDown={
                                                                        handleKeyDown
                                                                    }
                                                                    placeholder="seu@email.com"
                                                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeStep === 14 && (
                                                        <div className="space-y-6">
                                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4.5 text-sm dark:bg-slate-900">
                                                                    <h4 className="text-emerald-650 mb-2.5 flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase">
                                                                        <User className="h-3.5 w-3.5" />{' '}
                                                                        Aluno
                                                                    </h4>
                                                                    <p className="font-bold text-slate-800 dark:text-slate-100">
                                                                        {
                                                                            data.name
                                                                        }
                                                                    </p>
                                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                                        {
                                                                            data.cpf
                                                                        }{' '}
                                                                        |{' '}
                                                                        {
                                                                            data.birth_date
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4.5 text-sm dark:bg-slate-900">
                                                                    <h4 className="text-emerald-650 mb-2.5 flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase">
                                                                        <MapPin className="h-3.5 w-3.5" />{' '}
                                                                        Endereço
                                                                    </h4>
                                                                    <p className="font-bold text-slate-800 dark:text-slate-100">
                                                                        {
                                                                            data
                                                                                .address
                                                                                .street
                                                                        }
                                                                        ,{' '}
                                                                        {
                                                                            data
                                                                                .address
                                                                                .number
                                                                        }
                                                                    </p>
                                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                                        CEP:{' '}
                                                                        {
                                                                            data
                                                                                .address
                                                                                .cep
                                                                        }{' '}
                                                                        |{' '}
                                                                        {
                                                                            data
                                                                                .address
                                                                                .city
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4.5 text-sm dark:bg-slate-900">
                                                                    <h4 className="text-emerald-650 mb-2.5 flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase">
                                                                        <Heart className="h-3.5 w-3.5" />{' '}
                                                                        Saúde
                                                                    </h4>
                                                                    <p className="font-bold text-slate-800 dark:text-slate-100">
                                                                        Sangue:{' '}
                                                                        {data
                                                                            .health
                                                                            .blood_type ||
                                                                            'N/A'}
                                                                    </p>
                                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                                        Vacinas:{' '}
                                                                        {data
                                                                            .health
                                                                            .vaccination_updated
                                                                            ? 'Em dia'
                                                                            : 'Pendente'}
                                                                    </p>
                                                                </div>

                                                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4.5 text-sm dark:bg-slate-900">
                                                                    <h4 className="text-emerald-650 mb-2.5 flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase">
                                                                        <FileText className="h-3.5 w-3.5" />{' '}
                                                                        Responsável
                                                                    </h4>
                                                                    <p className="font-bold text-slate-800 dark:text-slate-100">
                                                                        {
                                                                            data
                                                                                .guardian
                                                                                .name
                                                                        }{' '}
                                                                        (
                                                                        {
                                                                            data
                                                                                .guardian
                                                                                .kinship
                                                                        }
                                                                        )
                                                                    </p>
                                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                                        Tel:{' '}
                                                                        {
                                                                            data
                                                                                .guardian
                                                                                .phone
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col gap-3 pt-2">
                                                                <div className="flex items-start space-x-3">
                                                                    <Checkbox
                                                                        id="accept_terms"
                                                                        checked={
                                                                            acceptedTerms
                                                                        }
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) =>
                                                                            setAcceptedTerms(
                                                                                checked as boolean,
                                                                            )
                                                                        }
                                                                        className="mt-0.5 h-5 w-5 accent-emerald-500"
                                                                    />
                                                                    <div className="grid gap-1.5 leading-none">
                                                                        <Label
                                                                            htmlFor="accept_terms"
                                                                            className="cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-200"
                                                                        >
                                                                            Confirmo
                                                                            que
                                                                            revisei
                                                                            e
                                                                            declaro
                                                                            que
                                                                            todas
                                                                            as
                                                                            informações
                                                                            acima
                                                                            são
                                                                            verdadeiras.
                                                                        </Label>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-start space-x-3 border-t border-slate-100/50 pt-2 dark:border-slate-800/50">
                                                                    <Checkbox
                                                                        id="accepted_lgpd"
                                                                        checked={
                                                                            data.accepted_lgpd
                                                                        }
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) =>
                                                                            handleFieldChange(
                                                                                'accepted_lgpd',
                                                                                checked as boolean,
                                                                            )
                                                                        }
                                                                        className="mt-0.5 h-5 w-5 accent-emerald-500"
                                                                    />
                                                                    <div className="grid gap-1.5 leading-none">
                                                                        <Label
                                                                            htmlFor="accepted_lgpd"
                                                                            className="cursor-pointer text-xs leading-relaxed font-bold text-slate-700 dark:text-slate-200"
                                                                        >
                                                                            Estou
                                                                            ciente
                                                                            e
                                                                            concordo
                                                                            com
                                                                            o
                                                                            tratamento
                                                                            dos
                                                                            dados
                                                                            pessoais
                                                                            do
                                                                            aluno
                                                                            e
                                                                            dos
                                                                            responsáveis,
                                                                            conforme
                                                                            a
                                                                            LGPD,
                                                                            conforme
                                                                            detalhado
                                                                            nos{' '}
                                                                            <Dialog>
                                                                                <DialogTrigger
                                                                                    asChild
                                                                                >
                                                                                    <button
                                                                                        type="button"
                                                                                        className="inline cursor-pointer border-0 bg-transparent p-0 font-extrabold text-emerald-600 hover:underline focus:outline-none dark:text-emerald-400"
                                                                                        onClick={(
                                                                                            e,
                                                                                        ) =>
                                                                                            e.stopPropagation()
                                                                                        }
                                                                                    >
                                                                                        Termos
                                                                                        de
                                                                                        Serviço
                                                                                        e
                                                                                        Política
                                                                                        de
                                                                                        Privacidade
                                                                                        (LGPD)
                                                                                    </button>
                                                                                </DialogTrigger>
                                                                                <DialogContent className="border-slate-150 max-h-[80vh] max-w-2xl overflow-y-auto rounded-3xl border bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                                                                                    <DialogHeader>
                                                                                        <DialogTitle className="flex items-center gap-2 text-xl font-extrabold text-slate-900 dark:text-slate-100">
                                                                                            <ShieldCheck className="h-5.5 w-5.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                                                            Termos
                                                                                            de
                                                                                            Serviço
                                                                                            e
                                                                                            Privacidade
                                                                                            (LGPD)
                                                                                        </DialogTitle>
                                                                                        <DialogDescription className="mt-1 text-xs text-slate-400">
                                                                                            Em
                                                                                            conformidade
                                                                                            com
                                                                                            a
                                                                                            Lei
                                                                                            Geral
                                                                                            de
                                                                                            Proteção
                                                                                            de
                                                                                            Dados
                                                                                            (Lei
                                                                                            nº
                                                                                            13.709/2018)
                                                                                        </DialogDescription>
                                                                                    </DialogHeader>

                                                                                    <div className="text-slate-650 dark:text-slate-350 space-y-4 border-t border-slate-100 pt-4 text-xs leading-relaxed sm:text-sm dark:border-slate-800">
                                                                                        <p className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs leading-relaxed font-semibold text-slate-800 dark:border-slate-900 dark:bg-slate-950/40 dark:text-slate-200">
                                                                                            Ao
                                                                                            preencher
                                                                                            esta
                                                                                            pré-matrícula,
                                                                                            você
                                                                                            (responsável
                                                                                            legal)
                                                                                            autoriza
                                                                                            expressamente
                                                                                            o
                                                                                            colégio
                                                                                            Educx
                                                                                            a
                                                                                            tratar
                                                                                            os
                                                                                            dados
                                                                                            pessoais
                                                                                            e
                                                                                            de
                                                                                            saúde
                                                                                            do
                                                                                            estudante
                                                                                            para
                                                                                            fins
                                                                                            de
                                                                                            gestão
                                                                                            acadêmica
                                                                                            e
                                                                                            operacional.
                                                                                        </p>

                                                                                        <div className="space-y-1">
                                                                                            <h4 className="text-slate-850 text-[10px] font-extrabold tracking-wider text-emerald-600 uppercase dark:text-emerald-400 dark:text-slate-200">
                                                                                                1.
                                                                                                Dados
                                                                                                de
                                                                                                Menores
                                                                                                (Art.
                                                                                                14)
                                                                                            </h4>
                                                                                            <p>
                                                                                                O
                                                                                                tratamento
                                                                                                de
                                                                                                dados
                                                                                                pessoais
                                                                                                de
                                                                                                crianças
                                                                                                e
                                                                                                adolescentes
                                                                                                é
                                                                                                feito
                                                                                                no
                                                                                                melhor
                                                                                                interesse
                                                                                                do
                                                                                                menor
                                                                                                e
                                                                                                mediante
                                                                                                este
                                                                                                consentimento
                                                                                                específico
                                                                                                do
                                                                                                responsável.
                                                                                            </p>
                                                                                        </div>

                                                                                        <div className="space-y-1">
                                                                                            <h4 className="text-slate-850 text-[10px] font-extrabold tracking-wider text-emerald-600 uppercase dark:text-emerald-400 dark:text-slate-200">
                                                                                                2.
                                                                                                Dados
                                                                                                de
                                                                                                Saúde
                                                                                                Coletados
                                                                                            </h4>
                                                                                            <p>
                                                                                                Dados
                                                                                                de
                                                                                                saúde
                                                                                                (alergias,
                                                                                                deficiências,
                                                                                                CID,
                                                                                                tipo
                                                                                                sanguíneo,
                                                                                                situação
                                                                                                vacinal)
                                                                                                são
                                                                                                tratados
                                                                                                unicamente
                                                                                                para
                                                                                                salvaguardar
                                                                                                a
                                                                                                integridade
                                                                                                do
                                                                                                aluno
                                                                                                no
                                                                                                ambiente
                                                                                                de
                                                                                                ensino
                                                                                                e
                                                                                                atendimentos
                                                                                                emergenciais.
                                                                                            </p>
                                                                                        </div>

                                                                                        <div className="space-y-1">
                                                                                            <h4 className="text-slate-850 text-[10px] font-extrabold tracking-wider text-emerald-600 uppercase dark:text-emerald-400 dark:text-slate-200">
                                                                                                3.
                                                                                                Finalidade
                                                                                                e
                                                                                                Compartilhamento
                                                                                            </h4>
                                                                                            <p>
                                                                                                Uso
                                                                                                exclusivo
                                                                                                para
                                                                                                matrícula,
                                                                                                enturmação,
                                                                                                registros
                                                                                                acadêmicos,
                                                                                                boletins,
                                                                                                Censo
                                                                                                Escolar/MEC,
                                                                                                faturamento
                                                                                                financeiro
                                                                                                e
                                                                                                comunicação
                                                                                                escolar
                                                                                                (Agenda
                                                                                                Digital).
                                                                                                Não
                                                                                                há
                                                                                                comercialização
                                                                                                de
                                                                                                dados.
                                                                                            </p>
                                                                                        </div>

                                                                                        <div className="space-y-1">
                                                                                            <h4 className="text-slate-850 text-[10px] font-extrabold tracking-wider text-emerald-600 uppercase dark:text-emerald-400 dark:text-slate-200">
                                                                                                4.
                                                                                                Direitos
                                                                                                (Art.
                                                                                                18)
                                                                                            </h4>
                                                                                            <p>
                                                                                                Você
                                                                                                pode
                                                                                                acessar,
                                                                                                corrigir
                                                                                                ou
                                                                                                atualizar
                                                                                                dados
                                                                                                pelo
                                                                                                portal.
                                                                                                A
                                                                                                exclusão
                                                                                                de
                                                                                                registros
                                                                                                acadêmicos
                                                                                                obrigatórios
                                                                                                é
                                                                                                vedada
                                                                                                devido
                                                                                                a
                                                                                                exigências
                                                                                                legais
                                                                                                do
                                                                                                MEC
                                                                                                de
                                                                                                arquivamento
                                                                                                permanente.
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                                                                                        <a
                                                                                            href="/termos-e-privacidade"
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                            className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                                                                                        >
                                                                                            Ver
                                                                                            versão
                                                                                            completa{' '}
                                                                                            <ArrowRight className="h-3 w-3" />
                                                                                        </a>
                                                                                        <DialogClose
                                                                                            asChild
                                                                                        >
                                                                                            <Button
                                                                                                type="button"
                                                                                                className="h-9 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white hover:bg-emerald-500"
                                                                                            >
                                                                                                Entendi
                                                                                                e
                                                                                                Fechar
                                                                                            </Button>
                                                                                        </DialogClose>
                                                                                    </div>
                                                                                </DialogContent>
                                                                            </Dialog>
                                                                            .
                                                                        </Label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Navigation controls inline */}
                                                <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        onClick={prevStep}
                                                        disabled={
                                                            activeStep === 0
                                                        }
                                                        className="h-10 rounded-2xl px-4 text-xs font-bold text-slate-500 hover:text-slate-700"
                                                    >
                                                        Voltar
                                                    </Button>

                                                    <div className="hidden text-center sm:block">
                                                        <span className="text-[10px] font-semibold tracking-wide text-slate-400">
                                                            Pressione{' '}
                                                            <kbd className="rounded border bg-slate-50 px-1.5 py-0.5 font-mono text-[9px] dark:bg-slate-800">
                                                                Enter ↵
                                                            </kbd>{' '}
                                                            para avançar
                                                        </span>
                                                    </div>

                                                    {activeStep <
                                                    questions.length - 1 ? (
                                                        <Button
                                                            type="button"
                                                            onClick={nextStep}
                                                            className="shadow-emerald-650/10 flex h-10 items-center gap-1.5 rounded-2xl bg-emerald-600 px-5 text-xs font-bold text-white shadow-md transition-all hover:bg-emerald-500"
                                                        >
                                                            Avançar{' '}
                                                            <Send className="h-3 w-3" />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            type="submit"
                                                            disabled={
                                                                processing ||
                                                                !acceptedTerms ||
                                                                !data.accepted_lgpd
                                                            }
                                                            className="shadow-emerald-650/10 flex h-10 items-center gap-1.5 rounded-2xl bg-emerald-600 px-5 text-xs font-bold text-white shadow-md transition-all hover:bg-emerald-500 disabled:opacity-50"
                                                        >
                                                            {processing && (
                                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                            )}
                                                            <Check className="h-3.5 w-3.5 stroke-[3px]" />{' '}
                                                            Finalizar
                                                            Pré-Matrícula
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Progress Bar (Thin line, matching light theme aesthetic) */}
                    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-200/50 shadow-inner dark:bg-slate-800/50">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
