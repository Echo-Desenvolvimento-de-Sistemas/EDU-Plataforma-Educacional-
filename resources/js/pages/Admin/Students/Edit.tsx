import admin from '@/routes/admin';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface User {
    id: number;
    email: string;
    username: string;
}

interface Guardian {
    id: number;
    name: string;
    cpf: string;
}

interface StudentAddress {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zone: string;
    phone_contact: string;
}

interface StudentHealth {
    blood_type: string;
    allergies: string;
    food_restrictions: string;
    continuous_meds: string;
    has_disability: boolean;
    disability_details: string;
    cid: string;
    health_plan: string;
    health_unit: string;
    vaccination_updated: boolean;
}

interface Student {
    id: number;
    name: string;
    social_name: string;
    photo_path: string;
    sex: string;
    color_race: string;
    nationality: string;
    place_of_birth: string;
    state_of_birth: string;
    birth_date: string;
    cpf: string;
    rg: string;
    rg_issuer: string;
    rg_state: string;
    rg_date: string;
    birth_cert_model: string;
    birth_cert_number: string;
    nis: string;
    mother_name: string;
    father_name: string;
    parents_marital_status: string;
    enrollment_date: string;
    status: string;
    origin_school: string;
    observations: string;
    class_room_id: number;
    exit_authorization: boolean;
    transport_info: string;
    guardians: Guardian[];
    address: StudentAddress;
    health: StudentHealth;
    user?: User;
}

interface ClassRoom {
    id: number;
    name: string;
}

interface DocumentTemplate {
    id: number;
    title: string;
    type: string;
}

interface IssuedDocument {
    id: number;
    uuid: string;
    created_at: string;
    template: DocumentTemplate;
    content_snapshot: string;
}

interface Props {
    student: Student;
    classRooms: ClassRoom[];
    guardians: Guardian[];
    templates: DocumentTemplate[];
    issuedDocuments: IssuedDocument[];
}

import { FileText, Printer, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Edit({ student, classRooms, guardians, templates, issuedDocuments }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Alunos',
            href: '/admin/students',
        },
        {
            title: 'Editar Aluno',
            href: `/admin/students/${student.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        // ... existing form data ...
        // Identification
        name: student.name,
        social_name: student.social_name || '',
        photo_path: student.photo_path || '',
        sex: student.sex || '',
        color_race: student.color_race || '',
        nationality: student.nationality || 'Brasileira',
        place_of_birth: student.place_of_birth || '',
        state_of_birth: student.state_of_birth || '',
        birth_date: student.birth_date ? student.birth_date.split('T')[0] : '',

        // Docs
        cpf: student.cpf || '',
        rg: student.rg || '',
        rg_issuer: student.rg_issuer || '',
        rg_state: student.rg_state || '',
        rg_date: student.rg_date ? student.rg_date.split('T')[0] : '',
        birth_cert_model: student.birth_cert_model || 'new',
        birth_cert_number: student.birth_cert_number || '',
        birth_cert_old_info: [],
        nis: student.nis || '',

        // Family
        mother_name: student.mother_name || '',
        father_name: student.father_name || '',
        parents_marital_status: student.parents_marital_status || '',

        // Address
        address: {
            cep: student.address?.cep || '',
            street: student.address?.street || '',
            number: student.address?.number || '',
            complement: student.address?.complement || '',
            neighborhood: student.address?.neighborhood || '',
            city: student.address?.city || '',
            state: student.address?.state || '',
            zone: student.address?.zone || 'urbana',
            phone_contact: student.address?.phone_contact || '',
        },

        // Health
        health: {
            blood_type: student.health?.blood_type || '',
            allergies: student.health?.allergies || '',
            food_restrictions: student.health?.food_restrictions || '',
            continuous_meds: student.health?.continuous_meds || '',
            has_disability: student.health?.has_disability || false,
            disability_details: student.health?.disability_details || '',
            cid: student.health?.cid || '',
            health_plan: student.health?.health_plan || '',
            health_unit: student.health?.health_unit || '',
            vaccination_updated: student.health?.vaccination_updated || false,
        },

        // Academic
        enrollment_date: student.enrollment_date ? student.enrollment_date.split('T')[0] : '',
        status: student.status || 'active',
        origin_school: student.origin_school || '',
        observations: student.observations || '',
        class_room_id: student.class_room_id ? student.class_room_id.toString() : '',

        // Security
        authorized_pickups: [],
        exit_authorization: student.exit_authorization || false,
        transport_info: student.transport_info || '',

        // Guardians
        guardian_ids: student.guardians ? student.guardians.map(g => g.id) : [] as number[],
    });

    const [activeTab, setActiveTab] = useState('identification');
    const [selectedGuardianId, setSelectedGuardianId] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);

    const addGuardian = () => {
        if (selectedGuardianId && !data.guardian_ids.includes(Number(selectedGuardianId))) {
            setData('guardian_ids', [...data.guardian_ids, Number(selectedGuardianId)]);
            setSelectedGuardianId('');
        }
    };

    const removeGuardian = (id: number) => {
        setData('guardian_ids', data.guardian_ids.filter(gId => gId !== id));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(admin.students.update.url(student.id));
    };

    const handleGenerateDocument = (templateId: number) => {
        if (confirm('Deseja emitir este documento?')) {
            setIsGenerating(true);
            router.post(admin.students.documents.store.url(student.id), {
                template_id: templateId
            }, {
                onFinish: () => setIsGenerating(false),
                preserveScroll: true,
                onSuccess: () => {
                    // Refresh via Inertia happens automatically
                }
            });
        }
    };

    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(`/admin/students/${student.id}/reset-password`, {
            password: newPassword,
            password_confirmation: newPasswordConfirmation,
        }, {
            onSuccess: () => {
                setIsResetPasswordOpen(false);
                setNewPassword('');
                setNewPasswordConfirmation('');
            }
        });
    };

    const tabs = [
        { id: 'identification', label: 'Identificação' },
        { id: 'docs', label: 'Documentos Pessoais' },
        { id: 'family', label: 'Família' },
        { id: 'address', label: 'Endereço' },
        { id: 'health', label: 'Saúde' },
        { id: 'academic', label: 'Acadêmico' },
        { id: 'documents', label: 'Emissão de Docs' }, // NEW TAB
        { id: 'security', label: 'Segurança / Acesso' },
        { id: 'guardians', label: 'Responsáveis' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Aluno" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-2 sm:p-4">
                <div className="mx-auto w-full max-w-4xl rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm sm:p-6 dark:border-sidebar-border dark:bg-gray-800">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800 sm:mb-6 sm:text-xl dark:text-gray-200">Editar Aluno</h2>

                    {/* Custom Tabs */}
                    <div className="mb-6 flex space-x-1 overflow-x-auto rounded-xl bg-gray-100 p-1 dark:bg-gray-800 pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`min-w-fit flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 sm:py-2.5 ${activeTab === tab.id
                                    ? 'bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-blue-100'
                                    : 'text-gray-700 hover:bg-white/[0.12] hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="space-y-6">

                        {/* ... Existing Tabs Content ... */}
                        {/* IDENTIFICATION */}
                        {activeTab === 'identification' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name">Nome Completo *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div>
                                        <Label htmlFor="social_name">Nome Social</Label>
                                        <Input
                                            id="social_name"
                                            value={data.social_name}
                                            onChange={(e) => setData('social_name', e.target.value)}
                                        />
                                        <InputError message={errors.social_name} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
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
                                    <div>
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
                                    <div>
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
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label htmlFor="nationality">Nacionalidade</Label>
                                        <Input
                                            id="nationality"
                                            value={data.nationality}
                                            onChange={(e) => setData('nationality', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="place_of_birth">Naturalidade (Cidade)</Label>
                                        <Input
                                            id="place_of_birth"
                                            value={data.place_of_birth}
                                            onChange={(e) => setData('place_of_birth', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state_of_birth">UF Nascimento</Label>
                                        <Input
                                            id="state_of_birth"
                                            value={data.state_of_birth}
                                            onChange={(e) => setData('state_of_birth', e.target.value)}
                                            maxLength={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* DOCS */}
                        {activeTab === 'docs' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="cpf">CPF *</Label>
                                        <Input
                                            id="cpf"
                                            value={data.cpf}
                                            onChange={(e) => setData('cpf', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.cpf} />
                                    </div>
                                    <div>
                                        <Label htmlFor="nis">NIS</Label>
                                        <Input
                                            id="nis"
                                            value={data.nis}
                                            onChange={(e) => setData('nis', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                                    <div>
                                        <Label htmlFor="rg">RG</Label>
                                        <Input
                                            id="rg"
                                            value={data.rg}
                                            onChange={(e) => setData('rg', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="rg_issuer">Órgão Emissor</Label>
                                        <Input
                                            id="rg_issuer"
                                            value={data.rg_issuer}
                                            onChange={(e) => setData('rg_issuer', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="rg_state">UF RG</Label>
                                        <Input
                                            id="rg_state"
                                            value={data.rg_state}
                                            onChange={(e) => setData('rg_state', e.target.value)}
                                            maxLength={2}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="rg_date">Data Emissão</Label>
                                        <Input
                                            id="rg_date"
                                            type="date"
                                            value={data.rg_date}
                                            onChange={(e) => setData('rg_date', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="birth_cert_number">Certidão de Nascimento (Matrícula)</Label>
                                    <Input
                                        id="birth_cert_number"
                                        value={data.birth_cert_number}
                                        onChange={(e) => setData('birth_cert_number', e.target.value)}
                                        placeholder="32 dígitos"
                                    />
                                </div>
                            </div>
                        )}

                        {/* DOCUMENTS ISSUE TAB */}
                        {activeTab === 'documents' && (
                            <div className="space-y-6">
                                {/* AVAILABLE TEMPLATES */}
                                <div className="rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-800">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Modelos Disponíveis
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {templates.map((template) => (
                                            <div key={template.id} className="flex flex-col justify-between border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{template.title}</h4>
                                                    <Badge variant="outline" className="mt-1">{template.type}</Badge>
                                                </div>
                                                <Button
                                                    type="button"
                                                    className="mt-4 w-full"
                                                    variant="secondary"
                                                    onClick={() => handleGenerateDocument(template.id)}
                                                    disabled={isGenerating}
                                                >
                                                    <Printer className="h-4 w-4 mr-2" />
                                                    Emitir Documento
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* HISTORY */}
                                <div className="rounded-lg border p-4 shadow-sm bg-gray-50 dark:bg-gray-800">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Histórico de Emissões
                                    </h3>
                                    {issuedDocuments.length > 0 ? (
                                        <div className="space-y-2">
                                            {issuedDocuments.map((doc) => (
                                                <div key={doc.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-md border">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-gray-100">{doc.template.title}</p>
                                                        <p className="text-xs text-gray-500">
                                                            Emitido em: {new Date(doc.created_at).toLocaleString()}
                                                        </p>
                                                        <p className="text-xs text-gray-400 font-mono">UUID: {doc.uuid}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <a href={`/validate-document/${doc.uuid}`} target="_blank" rel="noopener noreferrer">
                                                                Visualizar / Imprimir
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">Nenhum documento emitido para este aluno ainda.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Família */}
                        {activeTab === 'family' && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="mother_name">Nome da Mãe *</Label>
                                    <Input
                                        id="mother_name"
                                        value={data.mother_name}
                                        onChange={(e) => setData('mother_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.mother_name} />
                                </div>
                                <div>
                                    <Label htmlFor="father_name">Nome do Pai</Label>
                                    <Input
                                        id="father_name"
                                        value={data.father_name}
                                        onChange={(e) => setData('father_name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="parents_marital_status">Estado Civil dos Pais</Label>
                                    <Select value={data.parents_marital_status} onValueChange={(value) => setData('parents_marital_status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Casados">Casados</SelectItem>
                                            <SelectItem value="Separados">Separados</SelectItem>
                                            <SelectItem value="Solteiros">Solteiros</SelectItem>
                                            <SelectItem value="Viúvos">Viúvos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {/* Endereço */}
                        {activeTab === 'address' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    <div>
                                        <Label htmlFor="cep">CEP *</Label>
                                        <Input
                                            id="cep"
                                            value={data.address.cep}
                                            onChange={(e) => setData('address', { ...data.address, cep: e.target.value })}
                                            required
                                        />
                                        <InputError message={errors['address.cep']} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Label htmlFor="street">Logradouro *</Label>
                                        <Input
                                            id="street"
                                            value={data.address.street}
                                            onChange={(e) => setData('address', { ...data.address, street: e.target.value })}
                                            required
                                        />
                                        <InputError message={errors['address.street']} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label htmlFor="number">Número *</Label>
                                        <Input
                                            id="number"
                                            value={data.address.number}
                                            onChange={(e) => setData('address', { ...data.address, number: e.target.value })}
                                            required
                                        />
                                        <InputError message={errors['address.number']} />
                                    </div>
                                    <div>
                                        <Label htmlFor="complement">Complemento</Label>
                                        <Input
                                            id="complement"
                                            value={data.address.complement}
                                            onChange={(e) => setData('address', { ...data.address, complement: e.target.value })}
                                        />
                                    </div>
                                    <div>
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
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label htmlFor="city">Cidade *</Label>
                                        <Input
                                            id="city"
                                            value={data.address.city}
                                            onChange={(e) => setData('address', { ...data.address, city: e.target.value })}
                                            required
                                        />
                                        <InputError message={errors['address.city']} />
                                    </div>
                                    <div>
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
                                    <div>
                                        <Label htmlFor="zone">Zona Residencial</Label>
                                        <Select value={data.address.zone} onValueChange={(value) => setData('address', { ...data.address, zone: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="urbana">Urbana</SelectItem>
                                                <SelectItem value="rural">Rural</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="phone_contact">Telefone de Contato (Aluno)</Label>
                                    <Input
                                        id="phone_contact"
                                        value={data.address.phone_contact}
                                        onChange={(e) => setData('address', { ...data.address, phone_contact: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Saúde */}
                        {activeTab === 'health' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="blood_type">Tipo Sanguíneo</Label>
                                        <Input
                                            id="blood_type"
                                            value={data.health.blood_type}
                                            onChange={(e) => setData('health', { ...data.health, blood_type: e.target.value })}
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
                                <div>
                                    <Label htmlFor="allergies">Alergias</Label>
                                    <Textarea
                                        id="allergies"
                                        value={data.health.allergies}
                                        onChange={(e) => setData('health', { ...data.health, allergies: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="food_restrictions">Restrições Alimentares</Label>
                                    <Textarea
                                        id="food_restrictions"
                                        value={data.health.food_restrictions}
                                        onChange={(e) => setData('health', { ...data.health, food_restrictions: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="continuous_meds">Medicamentos de Uso Contínuo</Label>
                                    <Textarea
                                        id="continuous_meds"
                                        value={data.health.continuous_meds}
                                        onChange={(e) => setData('health', { ...data.health, continuous_meds: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="has_disability"
                                        checked={data.health.has_disability}
                                        onCheckedChange={(checked) => setData('health', { ...data.health, has_disability: checked as boolean })}
                                    />
                                    <Label htmlFor="has_disability">Possui Deficiência / Transtorno?</Label>
                                </div>
                                {data.health.has_disability && (
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label htmlFor="disability_details">Qual?</Label>
                                            <Input
                                                id="disability_details"
                                                value={data.health.disability_details}
                                                onChange={(e) => setData('health', { ...data.health, disability_details: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cid">CID (Opcional)</Label>
                                            <Input
                                                id="cid"
                                                value={data.health.cid}
                                                onChange={(e) => setData('health', { ...data.health, cid: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="health_plan">Plano de Saúde</Label>
                                        <Input
                                            id="health_plan"
                                            value={data.health.health_plan}
                                            onChange={(e) => setData('health', { ...data.health, health_plan: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="health_unit">Unidade de Saúde de Preferência</Label>
                                        <Input
                                            id="health_unit"
                                            value={data.health.health_unit}
                                            onChange={(e) => setData('health', { ...data.health, health_unit: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Acadêmico */}
                        {activeTab === 'academic' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="enrollment_date">Data de Matrícula</Label>
                                        <Input
                                            id="enrollment_date"
                                            type="date"
                                            value={data.enrollment_date}
                                            onChange={(e) => setData('enrollment_date', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="status">Situação</Label>
                                        <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Ativo</SelectItem>
                                                <SelectItem value="cancelled">Cancelado</SelectItem>
                                                <SelectItem value="transferred">Transferido</SelectItem>
                                                <SelectItem value="graduated">Formado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="class_room_id">Turma</Label>
                                    <Select value={data.class_room_id} onValueChange={(value) => setData('class_room_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a turma" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classRooms.map((classRoom) => (
                                                <SelectItem key={classRoom.id} value={classRoom.id.toString()}>
                                                    {classRoom.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.class_room_id} />
                                </div>
                                <div>
                                    <Label htmlFor="origin_school">Escola de Origem</Label>
                                    <Input
                                        id="origin_school"
                                        value={data.origin_school}
                                        onChange={(e) => setData('origin_school', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="observations">Observações Gerais</Label>
                                    <Textarea
                                        id="observations"
                                        value={data.observations}
                                        onChange={(e) => setData('observations', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}


                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                {/* Access Control Card */}
                                <div className="rounded-lg border p-4 shadow-sm bg-gray-50 dark:bg-gray-800">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Acesso ao Sistema</h3>
                                    {student.user ? (
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">Acesso Habilitado</p>
                                                <p className="text-sm text-gray-500">Usuário: {student.user.username} ({student.user.email})</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">Este aluno não possui acesso ao sistema.</p>
                                                <p className="text-sm text-gray-500">Crie um usuário para permitir login.</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    if (confirm('Deseja criar um usuário para este aluno?')) {
                                                        router.post(`/admin/students/${student.id}/user`);
                                                    }
                                                }}
                                            >
                                                Criar Acesso
                                            </Button>
                                        </div>
                                    )}

                                    {student.user && (
                                        <div className="mt-4 pt-4 border-t">
                                            <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="destructive" type="button">
                                                        Redefinir Senha
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Redefinir Senha</DialogTitle>
                                                        <DialogDescription>
                                                            Defina uma nova senha para o aluno <b>{student.name}</b>.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <form onSubmit={handleResetPassword}>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="new-password">Nova Senha</Label>
                                                                <Input
                                                                    id="new-password"
                                                                    type="password"
                                                                    value={newPassword}
                                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                                    required
                                                                    minLength={8}
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                                                                <Input
                                                                    id="confirm-password"
                                                                    type="password"
                                                                    value={newPasswordConfirmation}
                                                                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                                                                    required
                                                                    minLength={8}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="submit">Salvar Nova Senha</Button>
                                                        </DialogFooter>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="exit_authorization"
                                            checked={data.exit_authorization}
                                            onCheckedChange={(checked) => setData('exit_authorization', checked as boolean)}
                                        />
                                        <Label htmlFor="exit_authorization">Pode ir embora sozinho?</Label>
                                    </div>
                                    <div>
                                        <Label htmlFor="transport_info">Informações de Transporte (Van, Motorista)</Label>
                                        <Textarea
                                            id="transport_info"
                                            value={data.transport_info}
                                            onChange={(e) => setData('transport_info', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Responsáveis */}
                        {activeTab === 'guardians' && (
                            <div className="space-y-4">
                                <div className="flex gap-2 mb-4">
                                    <Select value={selectedGuardianId} onValueChange={setSelectedGuardianId}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione um responsável" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {guardians.map((guardian) => (
                                                <SelectItem key={guardian.id} value={guardian.id.toString()}>
                                                    {guardian.name} ({guardian.cpf})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button type="button" onClick={addGuardian} variant="secondary">
                                        Adicionar
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {data.guardian_ids.map((id) => {
                                        const guardian = guardians.find(g => g.id === id);
                                        if (!guardian) return null;
                                        return (
                                            <div key={id} className="flex items-center justify-between rounded-md border p-2 bg-gray-50 dark:bg-gray-800">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {guardian.name} ({guardian.cpf})
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeGuardian(id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    Remover
                                                </Button>
                                            </div>
                                        );
                                    })}
                                    {data.guardian_ids.length === 0 && (
                                        <p className="text-sm text-gray-500 italic">Nenhum responsável vinculado.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end pt-6 border-t">
                            <Button className="ml-4" disabled={processing}>
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
