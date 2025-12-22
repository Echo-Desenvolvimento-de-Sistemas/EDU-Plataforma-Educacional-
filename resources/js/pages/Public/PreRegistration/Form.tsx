import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import InputError from '@/components/input-error';
import { User, MapPin, Heart, FileText, Loader2, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
    token: string;
    student_name: string;
    initialData?: any;
    type: 'new' | 'renewal';
}

export default function Form({ token, student_name, initialData, type }: Props) {
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
        cpf: initialData?.cpf || '',
        rg: initialData?.rg || '',
        rg_issuer: initialData?.rg_issuer || '',
        rg_state: initialData?.rg_state || '',
        rg_date: initialData?.rg_date || '',
        mother_name: initialData?.mother_name || '',
        father_name: initialData?.father_name || '',
        parents_marital_status: initialData?.parents_marital_status || '',

        // Address
        address: {
            cep: initialData?.address?.cep || '',
            street: initialData?.address?.street || '',
            number: initialData?.address?.number || '',
            complement: initialData?.address?.complement || '',
            neighborhood: initialData?.address?.neighborhood || '',
            city: initialData?.address?.city || '',
            state: initialData?.address?.state || '',
            zone: initialData?.address?.zone || 'urbana',
            phone_contact: initialData?.address?.phone_contact || '',
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
            vaccination_updated: initialData?.health?.vaccination_updated || false,
        },

        // Guardian
        guardian: {
            name: initialData?.guardian?.name || '',
            cpf: initialData?.guardian?.cpf || '',
            rg: initialData?.guardian?.rg || '',
            phone: initialData?.guardian?.phone || '',
            email: initialData?.guardian?.email || '',
            kinship: initialData?.guardian?.kinship || '',
        },
    });

    const [activeStep, setActiveStep] = useState(0);
    const [loadingCep, setLoadingCep] = useState(false);

    const steps = [
        {
            title: 'Aluno',
            icon: User,
            fields: ['name', 'birth_date', 'sex', 'color_race', 'cpf', 'mother_name', 'place_of_birth', 'state_of_birth']
        },
        {
            title: 'Endereço',
            icon: MapPin,
            fields: ['address.cep', 'address.street', 'address.number', 'address.neighborhood', 'address.city', 'address.state', 'address.zone']
        },
        {
            title: 'Saúde',
            icon: Heart,
            fields: []
        },
        {
            title: 'Responsável',
            icon: FileText,
            fields: ['guardian.name', 'guardian.cpf', 'guardian.phone', 'guardian.kinship']
        },
    ];

    // Effect to handle errors and switch steps
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0];
            const stepIndex = steps.findIndex(step =>
                step.fields.some(field => field === firstErrorField)
            );

            if (stepIndex !== -1) {
                setActiveStep(stepIndex);
            }
            // If the error is not in a specific step (e.g. global), or even if it is, scroll up
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [errors]);

    const nextStep = () => {
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
        window.scrollTo(0, 0);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/pre-matricula/${token}`);
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
                        setData('address', {
                            ...data.address,
                            street: addressData.logradouro,
                            neighborhood: addressData.bairro,
                            city: addressData.localidade,
                            state: addressData.uf,
                            complement: addressData.complemento || data.address.complement,
                        });
                    }
                })
                .catch((err) => console.error('Erro ao buscar CEP:', err))
                .finally(() => setLoadingCep(false));
        }
    }, [data.address.cep]);

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 flex flex-col items-center pt-6 sm:pt-10 pb-10">
            <Head title="Pré-Matrícula" />

            <div className="w-full sm:max-w-4xl px-4">
                <div className="mb-8 text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        {type === 'renewal' ? 'Rematrícula Escolar' : 'Pré-Matrícula Escolar'}
                    </h1>
                    {student_name && (
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            Referência: {student_name}
                        </div>
                    )}
                    <p className="text-muted-foreground">Preencha os dados abaixo para iniciar o processo de matrícula.</p>
                </div>

                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erros encontrados</AlertTitle>
                        <AlertDescription>
                            <p>Por favor, verifique os campos abaixo:</p>
                            <ul className="list-disc pl-4 mt-2 text-sm">
                                {Object.entries(errors).map(([field, message]) => (
                                    <li key={field}>
                                        <span className="font-semibold">{field}:</span> {message}
                                    </li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="relative flex justify-between">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 dark:bg-gray-800" />
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = index === activeStep;
                            const isCompleted = index < activeStep;

                            return (
                                <div key={index} className="flex flex-col items-center bg-gray-50/50 dark:bg-gray-900 px-2">
                                    <div
                                        className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                                            isActive ? "border-primary bg-primary text-primary-foreground scale-110" :
                                                isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-gray-300 bg-white text-gray-400 dark:bg-gray-800 dark:border-gray-700"
                                        )}
                                    >
                                        {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                    </div>
                                    <span className={cn(
                                        "mt-2 text-xs font-medium transition-colors duration-300",
                                        isActive ? "text-primary" : isCompleted ? "text-primary" : "text-gray-400"
                                    )}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <form onSubmit={submit} className="p-6 sm:p-8">
                        {/* Step 1: Aluno */}
                        {activeStep === 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="border-b pb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        Dados do Aluno
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Informe os dados pessoais do aluno conforme a certidão de nascimento.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nome Completo *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            placeholder="Ex: João da Silva"
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="social_name">Nome Social</Label>
                                        <Input
                                            id="social_name"
                                            value={data.social_name}
                                            onChange={(e) => setData('social_name', e.target.value)}
                                            placeholder="Como o aluno prefere ser chamado (opcional)"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="birth_date">Data de Nascimento *</Label>
                                        <Input
                                            id="birth_date"
                                            type="date"
                                            value={data.birth_date}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.birth_date} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sex">Sexo *</Label>
                                        <Select value={data.sex} onValueChange={(value) => setData('sex', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="M">Masculino</SelectItem>
                                                <SelectItem value="F">Feminino</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.sex} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="color_race">Cor / Raça *</Label>
                                        <Select value={data.color_race} onValueChange={(value) => setData('color_race', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Branca">Branca</SelectItem>
                                                <SelectItem value="Preta">Preta</SelectItem>
                                                <SelectItem value="Parda">Parda</SelectItem>
                                                <SelectItem value="Amarela">Amarela</SelectItem>
                                                <SelectItem value="Indígena">Indígena</SelectItem>
                                                <SelectItem value="Não Declarada">Não Declarada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.color_race} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="place_of_birth">Naturalidade (Cidade) *</Label>
                                        <Input
                                            id="place_of_birth"
                                            value={data.place_of_birth}
                                            onChange={(e) => setData('place_of_birth', e.target.value)}
                                            placeholder="Ex: São Paulo"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state_of_birth">UF de Nascimento *</Label>
                                        <Input
                                            id="state_of_birth"
                                            value={data.state_of_birth}
                                            onChange={(e) => setData('state_of_birth', e.target.value)}
                                            placeholder="Ex: SP"
                                            maxLength={2}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="cpf">CPF do Aluno *</Label>
                                        <Input
                                            id="cpf"
                                            value={data.cpf}
                                            onChange={(e) => setData('cpf', e.target.value)}
                                            required
                                            placeholder="000.000.000-00"
                                        />
                                        <p className="text-[0.8rem] text-muted-foreground">O CPF é obrigatório para o cadastro.</p>
                                        <InputError message={errors.cpf} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rg">RG</Label>
                                        <Input
                                            id="rg"
                                            value={data.rg}
                                            onChange={(e) => setData('rg', e.target.value)}
                                            placeholder="Número do RG (opcional)"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rg_issuer">Órgão Emissor</Label>
                                        <Input
                                            id="rg_issuer"
                                            value={data.rg_issuer}
                                            onChange={(e) => setData('rg_issuer', e.target.value)}
                                            placeholder="Ex: SSP, DETRAN"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="rg_state">UF do RG</Label>
                                        <Input
                                            id="rg_state"
                                            value={data.rg_state}
                                            onChange={(e) => setData('rg_state', e.target.value)}
                                            placeholder="Ex: SP, RJ"
                                            maxLength={2}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rg_date">Data de Emissão (RG)</Label>
                                        <Input
                                            id="rg_date"
                                            type="date"
                                            value={data.rg_date}
                                            onChange={(e) => setData('rg_date', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mother_name">Nome da Mãe *</Label>
                                    <Input
                                        id="mother_name"
                                        value={data.mother_name}
                                        onChange={(e) => setData('mother_name', e.target.value)}
                                        required
                                        placeholder="Nome completo da mãe"
                                    />
                                    <InputError message={errors.mother_name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="father_name">Nome do Pai</Label>
                                    <Input
                                        id="father_name"
                                        value={data.father_name}
                                        onChange={(e) => setData('father_name', e.target.value)}
                                        placeholder="Nome completo do pai (opcional)"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Endereço */}
                        {activeStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="border-b pb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        Endereço Residencial
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Digite o CEP para preencher automaticamente o endereço.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="cep">CEP *</Label>
                                        <div className="relative">
                                            <Input
                                                id="cep"
                                                value={data.address.cep}
                                                onChange={(e) => setData('address', { ...data.address, cep: e.target.value })}
                                                required
                                                placeholder="00000-000"
                                                maxLength={9}
                                            />
                                            {loadingCep && (
                                                <div className="absolute right-3 top-2.5">
                                                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                                </div>
                                            )}
                                        </div>
                                        <InputError message={errors['address.cep']} />
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label htmlFor="street">Logradouro *</Label>
                                        <Input
                                            id="street"
                                            value={data.address.street}
                                            onChange={(e) => setData('address', { ...data.address, street: e.target.value })}
                                            required
                                            placeholder="Rua, Avenida, Travessa..."
                                        />
                                        <InputError message={errors['address.street']} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="number">Número *</Label>
                                        <Input
                                            id="number"
                                            value={data.address.number}
                                            onChange={(e) => setData('address', { ...data.address, number: e.target.value })}
                                            required
                                        />
                                        <InputError message={errors['address.number']} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="complement">Complemento</Label>
                                        <Input
                                            id="complement"
                                            value={data.address.complement}
                                            onChange={(e) => setData('address', { ...data.address, complement: e.target.value })}
                                            placeholder="Apto, Bloco, Casa..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="neighborhood">Bairro *</Label>
                                        <Input
                                            id="neighborhood"
                                            value={data.address.neighborhood}
                                            onChange={(e) => setData('address', { ...data.address, neighborhood: e.target.value })}
                                            required
                                        />
                                        <InputError message={errors['address.neighborhood']} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">Cidade *</Label>
                                        <Input
                                            id="city"
                                            value={data.address.city}
                                            onChange={(e) => setData('address', { ...data.address, city: e.target.value })}
                                            required
                                        />
                                        <InputError message={errors['address.city']} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">Estado *</Label>
                                        <Input
                                            id="state"
                                            value={data.address.state}
                                            onChange={(e) => setData('address', { ...data.address, state: e.target.value })}
                                            required
                                            maxLength={2}
                                        />
                                        <InputError message={errors['address.state']} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zone">Zona</Label>
                                        <Select value={data.address.zone} onValueChange={(value) => setData('address', { ...data.address, zone: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="urbana">Urbana</SelectItem>
                                                <SelectItem value="rural">Rural</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors['address.zone']} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Saúde */}
                        {activeStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="border-b pb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <Heart className="h-5 w-5 text-primary" />
                                        Informações de Saúde
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Informe condições de saúde importantes para a escola (Opcional).
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="blood_type">Tipo Sanguíneo</Label>
                                        <Input
                                            id="blood_type"
                                            value={data.health.blood_type}
                                            onChange={(e) => setData('health', { ...data.health, blood_type: e.target.value })}
                                            placeholder="Ex: O+, A-"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 pt-8">
                                        <Checkbox
                                            id="vaccination_updated"
                                            checked={data.health.vaccination_updated}
                                            onCheckedChange={(checked) => setData('health', { ...data.health, vaccination_updated: checked as boolean })}
                                        />
                                        <Label htmlFor="vaccination_updated">Carteira de Vacinação em dia?</Label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="allergies">Alergias</Label>
                                    <Input
                                        id="allergies"
                                        value={data.health.allergies}
                                        onChange={(e) => setData('health', { ...data.health, allergies: e.target.value })}
                                        placeholder="Informe se o aluno tem alergia a medicamentos ou alimentos"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="has_disability"
                                        checked={data.health.has_disability}
                                        onCheckedChange={(checked) => setData('health', { ...data.health, has_disability: checked as boolean })}
                                    />
                                    <Label htmlFor="has_disability">O aluno possui alguma deficiência?</Label>
                                </div>
                                {data.health.has_disability && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor="disability_details">Detalhes da Deficiência</Label>
                                        <Input
                                            id="disability_details"
                                            value={data.health.disability_details}
                                            onChange={(e) => setData('health', { ...data.health, disability_details: e.target.value })}
                                            placeholder="Descreva a deficiência para melhor atendimento"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 4: Responsável */}
                        {activeStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="border-b pb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        Dados do Responsável
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Quem será o principal contato da escola com a família?
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="guardian_name">Nome Completo *</Label>
                                        <Input
                                            id="guardian_name"
                                            value={data.guardian.name}
                                            onChange={(e) => setData('guardian', { ...data.guardian, name: e.target.value })}
                                            required
                                            placeholder="Seu nome completo"
                                        />
                                        <InputError message={errors['guardian.name']} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="guardian_cpf">CPF *</Label>
                                        <Input
                                            id="guardian_cpf"
                                            value={data.guardian.cpf}
                                            onChange={(e) => setData('guardian', { ...data.guardian, cpf: e.target.value })}
                                            required
                                            placeholder="000.000.000-00"
                                        />
                                        <InputError message={errors['guardian.cpf']} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="guardian_phone">Celular (WhatsApp) *</Label>
                                        <Input
                                            id="guardian_phone"
                                            value={data.guardian.phone}
                                            onChange={(e) => setData('guardian', { ...data.guardian, phone: e.target.value })}
                                            required
                                            placeholder="(00) 00000-0000"
                                        />
                                        <p className="text-[0.8rem] text-muted-foreground">Usaremos este número para contato urgente.</p>
                                        <InputError message={errors['guardian.phone']} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="guardian_email">Email</Label>
                                        <Input
                                            id="guardian_email"
                                            type="email"
                                            value={data.guardian.email}
                                            onChange={(e) => setData('guardian', { ...data.guardian, email: e.target.value })}
                                            placeholder="seu@email.com (opcional)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="kinship">Grau de Parentesco *</Label>
                                    <Select value={data.guardian.kinship} onValueChange={(value) => setData('guardian', { ...data.guardian, kinship: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Mãe">Mãe</SelectItem>
                                            <SelectItem value="Pai">Pai</SelectItem>
                                            <SelectItem value="Avô/Avó">Avô/Avó</SelectItem>
                                            <SelectItem value="Tio/Tia">Tio/Tia</SelectItem>
                                            <SelectItem value="Outro">Outro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors['guardian.kinship']} />
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-8 pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={activeStep === 0}
                            >
                                Voltar
                            </Button>

                            {activeStep < steps.length - 1 ? (
                                <Button type="button" onClick={nextStep}>
                                    Próximo
                                </Button>
                            ) : (
                                <Button disabled={processing}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Finalizar Pré-Matrícula
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
