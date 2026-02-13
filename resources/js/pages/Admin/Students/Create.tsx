import admin from '@/routes/admin/index';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface ClassRoom {
    id: number;
    name: string;
}

interface Props {
    classRooms: ClassRoom[];
}

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
        title: 'Novo Aluno',
        href: '/admin/students/create',
    },
];

export default function Create({ classRooms }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        // Identification
        name: '',
        social_name: '',
        photo_path: '',
        sex: '',
        color_race: '',
        nationality: 'Brasileira',
        place_of_birth: '',
        state_of_birth: '',
        birth_date: '',

        // Docs
        cpf: '',
        rg: '',
        rg_issuer: '',
        rg_state: '',
        rg_date: '',
        birth_cert_model: 'new',
        birth_cert_number: '',
        birth_cert_old_info: [], // Not implemented UI for old yet, keeping simple
        nis: '',

        // Family
        mother_name: '',
        father_name: '',
        parents_marital_status: '',

        // Address
        address: {
            cep: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zone: 'urbana',
            phone_contact: '',
        },

        // Health
        health: {
            blood_type: '',
            allergies: '',
            food_restrictions: '',
            continuous_meds: '',
            has_disability: false,
            disability_details: '',
            cid: '',
            health_plan: '',
            health_unit: '',
            vaccination_updated: false,
        },

        // Academic
        enrollment_date: new Date().toISOString().split('T')[0],
        status: 'active',
        origin_school: '',
        observations: '',
        class_room_id: '',

        // Security
        authorized_pickups: [], // Not implemented UI yet
        exit_authorization: false,
        transport_info: '',
    });

    const handleCepBlur = async () => {
        const cep = data.address.cep.replace(/\D/g, '');
        if (cep.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const addressData = await response.json();

            if (addressData.erro) {
                // Optional: set error state
                return;
            }

            setData(currentData => ({
                ...currentData,
                address: {
                    ...currentData.address,
                    street: addressData.logradouro,
                    neighborhood: addressData.bairro,
                    city: addressData.localidade,
                    state: addressData.uf,
                    complement: addressData.complemento || currentData.address.complement,
                }
            }));
        } catch (error) {
            console.error('Erro ao buscar CEP', error);
        }
    };

    const [activeTab, setActiveTab] = useState('identification');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(admin.students.store.url());
    };

    const tabs = [
        { id: 'identification', label: 'Identificação' },
        { id: 'docs', label: 'Documentos' },
        { id: 'family', label: 'Família' },
        { id: 'address', label: 'Endereço' },
        { id: 'health', label: 'Saúde' },
        { id: 'academic', label: 'Acadêmico' },
        { id: 'security', label: 'Segurança' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Novo Aluno" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-4xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar-accent/10">
                    <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">Novo Aluno</h2>

                    {/* Custom Tabs */}
                    <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800 mb-6 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${activeTab === tab.id
                                    ? 'bg-white text-blue-700 shadow dark:bg-gray-700 dark:text-blue-100'
                                    : 'text-gray-700 hover:bg-white/[0.12] hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="space-y-6">

                        {/* Identificação */}
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

                        {/* Documentos */}
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
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
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
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label htmlFor="cep">CEP *</Label>
                                        <Input
                                            id="cep"
                                            value={data.address.cep}
                                            onChange={(e) => setData('address', { ...data.address, cep: e.target.value })}
                                            onBlur={handleCepBlur}
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

                        {/* Segurança */}
                        {activeTab === 'security' && (
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
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        A lista de pessoas autorizadas a buscar o aluno será gerenciada após a criação do registro, na área de edição.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end pt-6 border-t">
                            <Button className="ml-4" disabled={processing}>
                                Criar Aluno
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout >
    );
}
