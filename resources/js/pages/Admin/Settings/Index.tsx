import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { Save, Download } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Configurações do Sistema',
        href: '/admin/settings',
    },
];

export default function SettingsIndex({ settings }: { settings: Record<string, string> }) {
    const { data, setData, post, processing, errors } = useForm({
        primary_color: settings.primary_color || '#000000',
        secondary_color: settings.secondary_color || '#ffffff',
        email_domain_suffix: settings.email_domain_suffix || 'sistema',
        school_name: settings.school_name || '',
        school_address: settings.school_address || '',
        school_phone: settings.school_phone || '',
        school_email: settings.school_email || '',
        school_city: settings.school_city || '',
        school_state: settings.school_state || '',
        school_cnpj: settings.school_cnpj || '',
        school_cep: settings.school_cep || '',
        logo: null as File | null,
        logo_light: null as File | null,
        logo_dark: null as File | null,
        // Mail
        mail_mailer: settings.mail_mailer || 'smtp',
        mail_host: settings.mail_host || '',
        mail_port: settings.mail_port || '',
        mail_username: settings.mail_username || '',
        mail_password: settings.mail_password || '',
        mail_encryption: settings.mail_encryption || 'tls',
        mail_from_address: settings.mail_from_address || '',
        mail_from_name: settings.mail_from_name || '',
        gamification_url: settings.gamification_url || '',
        gamification_secret: settings.gamification_secret || '',
    });

    const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo_url || null);
    const [logoLightPreview, setLogoLightPreview] = useState<string | null>(settings.logo_light_url || null);
    const [logoDarkPreview, setLogoDarkPreview] = useState<string | null>(settings.logo_dark_url || null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            onSuccess: () => toast.success('Configurações atualizadas com sucesso!'),
            onError: () => toast.error('Erro ao atualizar configurações.'),
        });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'logo_light' | 'logo_dark') => {
        const file = e.target.files?.[0];
        if (file) {
            setData(field, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field === 'logo') setLogoPreview(reader.result as string);
                if (field === 'logo_light') setLogoLightPreview(reader.result as string);
                if (field === 'logo_dark') setLogoDarkPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configurações do Sistema" />

            <form onSubmit={submit} className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Identidade Visual</CardTitle>
                            <CardDescription>Personalize as cores e o logo do sistema.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="logo">Logo Padrão (Legado/Fallback)</Label>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-md border bg-gray-50 dark:bg-gray-800">
                                        {logoPreview ? (
                                            <img src={logoPreview} alt="Prévia da Logo" className="h-16 w-16 object-contain" />
                                        ) : (
                                            <span className="text-xs text-gray-400">Sem Logo</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <Input id="logo" type="file" accept="image/*" onChange={(e) => handleLogoChange(e, 'logo')} className="cursor-pointer" />
                                        <p className="mt-1 text-xs text-muted-foreground">Usada se nenhuma específica for definida.</p>
                                        {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="logo_light">Logo (Tema Claro)</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-md border bg-gray-100">
                                            {logoLightPreview ? (
                                                <img src={logoLightPreview} alt="Prévia Logo Clara" className="h-16 w-16 object-contain" />
                                            ) : (
                                                <span className="text-xs text-gray-400">Vazio</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <Input id="logo_light" type="file" accept="image/*" onChange={(e) => handleLogoChange(e, 'logo_light')} className="cursor-pointer" />
                                            <p className="mt-1 text-xs text-muted-foreground">Use uma versão escura para fundos claros.</p>
                                            {errors.logo_light && <p className="text-sm text-red-500">{errors.logo_light}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="logo_dark">Logo (Tema Escuro)</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-md border bg-gray-900">
                                            {logoDarkPreview ? (
                                                <img src={logoDarkPreview} alt="Prévia Logo Escura" className="h-16 w-16 object-contain" />
                                            ) : (
                                                <span className="text-xs text-gray-400">Vazio</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <Input id="logo_dark" type="file" accept="image/*" onChange={(e) => handleLogoChange(e, 'logo_dark')} className="cursor-pointer" />
                                            <p className="mt-1 text-xs text-muted-foreground">Use uma versão branca para fundos escuros.</p>
                                            {errors.logo_dark && <p className="text-sm text-red-500">{errors.logo_dark}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="primary_color">Cor Primária</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="primary_color"
                                            type="color"
                                            value={data.primary_color}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            className="h-10 w-20 cursor-pointer p-1"
                                        />
                                        <Input
                                            type="text"
                                            value={data.primary_color}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            className="flex-1"
                                            placeholder="#000000"
                                        />
                                    </div>
                                    {errors.primary_color && <p className="text-sm text-red-500">{errors.primary_color}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="secondary_color">Cor Secundária</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="secondary_color"
                                            type="color"
                                            value={data.secondary_color}
                                            onChange={(e) => setData('secondary_color', e.target.value)}
                                            className="h-10 w-20 cursor-pointer p-1"
                                        />
                                        <Input
                                            type="text"
                                            value={data.secondary_color}
                                            onChange={(e) => setData('secondary_color', e.target.value)}
                                            className="flex-1"
                                            placeholder="#ffffff"
                                        />
                                    </div>
                                    {errors.secondary_color && <p className="text-sm text-red-500">{errors.secondary_color}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Visualização</CardTitle>
                            <CardDescription>Prévia de como as cores ficarão no sistema.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-md" style={{ backgroundColor: data.primary_color }}></div>
                                    <span>Cor Primária</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: data.secondary_color }}></div>
                                    <span>Cor Secundária</span>
                                </div>
                                <div className="mt-4">
                                    <Button style={{ backgroundColor: data.primary_color, color: data.secondary_color }} type="button">Botão de Exemplo</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informações da Instituição</CardTitle>
                        <CardDescription>Dados oficiais da escola para documentos e rodapés.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="school_name">Nome da Escola</Label>
                            <Input
                                id="school_name"
                                value={data.school_name}
                                onChange={(e) => setData('school_name', e.target.value)}
                                placeholder="Escola Municipal..."
                            />
                            {errors.school_name && <p className="text-sm text-red-500">{errors.school_name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="school_address">Endereço</Label>
                            <Input
                                id="school_address"
                                value={data.school_address}
                                onChange={(e) => setData('school_address', e.target.value)}
                                placeholder="Rua..."
                            />
                            {errors.school_address && <p className="text-sm text-red-500">{errors.school_address}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="school_city">Cidade</Label>
                            <Input
                                id="school_city"
                                value={data.school_city}
                                onChange={(e) => setData('school_city', e.target.value)}
                                placeholder="Curitiba..."
                            />
                            {errors.school_city && <p className="text-sm text-red-500">{errors.school_city}</p>}
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="school_phone">Telefone</Label>
                                <Input
                                    id="school_phone"
                                    value={data.school_phone}
                                    onChange={(e) => setData('school_phone', e.target.value)}
                                    placeholder="(00) 0000-0000"
                                />
                                {errors.school_phone && <p className="text-sm text-red-500">{errors.school_phone}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="school_email">Email Institucional</Label>
                                <Input
                                    id="school_email"
                                    value={data.school_email}
                                    onChange={(e) => setData('school_email', e.target.value)}
                                    placeholder="contato@escola.com"
                                />
                                {errors.school_email && <p className="text-sm text-red-500">{errors.school_email}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Configurações de E-mail (SMTP)</CardTitle>
                        <CardDescription>Configure o servidor de envio de emails do sistema.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="mail_host">Servidor SMTP (Host)</Label>
                                <Input
                                    id="mail_host"
                                    value={data.mail_host}
                                    onChange={(e) => setData('mail_host', e.target.value)}
                                    placeholder="smtp.exemplo.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mail_port">Porta</Label>
                                <Input
                                    id="mail_port"
                                    value={data.mail_port}
                                    onChange={(e) => setData('mail_port', e.target.value)}
                                    placeholder="587"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="mail_username">Usuário SMTP</Label>
                                <Input
                                    id="mail_username"
                                    value={data.mail_username}
                                    onChange={(e) => setData('mail_username', e.target.value)}
                                    placeholder="email@dominio.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mail_password">Senha SMTP</Label>
                                <Input
                                    id="mail_password"
                                    type="password"
                                    value={data.mail_password}
                                    onChange={(e) => setData('mail_password', e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="mail_encryption">Criptografia</Label>
                                <Input
                                    id="mail_encryption"
                                    value={data.mail_encryption}
                                    onChange={(e) => setData('mail_encryption', e.target.value)}
                                    placeholder="tls"
                                />
                                <p className="text-[0.8rem] text-muted-foreground">Geralmente tls ou ssl.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mail_from_address">E-mail de Remetente</Label>
                                <Input
                                    id="mail_from_address"
                                    value={data.mail_from_address}
                                    onChange={(e) => setData('mail_from_address', e.target.value)}
                                    placeholder="naoresponda@dominio.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mail_from_name">Nome do Remetente</Label>
                                <Input
                                    id="mail_from_name"
                                    value={data.mail_from_name}
                                    onChange={(e) => setData('mail_from_name', e.target.value)}
                                    placeholder="Sistema Escolar"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Configurações de Acesso</CardTitle>
                        <CardDescription>Gerencie como os emails e acessos são gerados automaticamente.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email_domain_suffix">Sufixo de Domínio para Emails</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 font-mono">cpf@&lt;papel&gt;.</span>
                                    <Input
                                        id="email_domain_suffix"
                                        value={data.email_domain_suffix}
                                        onChange={(e) => setData('email_domain_suffix', e.target.value)}
                                        placeholder="sistema"
                                        className="max-w-md"
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Defina o domínio padrão para usuários sem email.<br />
                                    Exemplo: Se o sufixo for <b>{data.email_domain_suffix || 'sistema'}</b>, o email gerado será <code>12345678900@aluno.<b>{data.email_domain_suffix || 'sistema'}</b></code>.
                                </p>
                                {errors.email_domain_suffix && <p className="text-sm text-red-500">{errors.email_domain_suffix}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Links Externos</CardTitle>
                        <CardDescription>Configure links para plataformas externas que aparecerão na sidebar.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="gamification_url">URL da Plataforma de Gamificação</Label>
                                <Input
                                    id="gamification_url"
                                    value={data.gamification_url}
                                    onChange={(e) => setData('gamification_url', e.target.value)}
                                    placeholder="https://exemplo.com/gamificacao"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Link para a plataforma de gamificação que será exibido na sidebar para todos os usuários.
                                </p>
                                {errors.gamification_url && <p className="text-sm text-red-500">{errors.gamification_url}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gamification_secret">Chave Secreta (Token de Integração)</Label>
                                <Input
                                    id="gamification_secret"
                                    type="password"
                                    value={data.gamification_secret}
                                    onChange={(e) => setData('gamification_secret', e.target.value)}
                                    placeholder="sk_..."
                                />
                                <p className="text-sm text-muted-foreground">
                                    Token seguro para autenticação entre os sistemas. Compartilhe apenas com o administrador do sistema de gamificação.
                                </p>
                                {errors.gamification_secret && <p className="text-sm text-red-500">{errors.gamification_secret}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Migração e Integração</CardTitle>
                        <CardDescription>Ferramentas para portabilidade de dados.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium">Exportar Dados para Gamificação</h4>
                                <p className="text-sm text-muted-foreground">Gera um arquivo JSON com usuários, turmas e matrículas.</p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.location.href = '/admin/gamification/test/export'}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Exportar Dados
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={processing} size="lg">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Todas as Configurações
                    </Button>
                </div>
            </form>
        </AppLayout >
    );
}
