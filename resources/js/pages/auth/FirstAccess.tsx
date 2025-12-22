import { useForm, Head } from '@inertiajs/react';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

export default function FirstAccess({ user }: { user: any }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: user.phone || '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/first-access');
    };

    return (
        <AuthCardLayout
            title="Primeiro Acesso"
            description="Bem-vindo(a)! Para garantir a segurança da sua conta e receber notificações importantes, confirme seu celular e defina uma senha."
        >
            <Head title="Configuração Inicial" />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="phone">Celular (WhatsApp)</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="(DDD) 99999-9999"
                        required
                        autoFocus
                    />
                    <InputError message={errors.phone} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Nova Senha</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirmar Nova Senha</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <Button className="w-full" disabled={processing}>
                    Salvar e Continuar
                </Button>
            </form>
        </AuthCardLayout>
    );
}
