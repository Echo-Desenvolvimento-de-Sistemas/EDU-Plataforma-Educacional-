import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes/index';
import { store } from '@/routes/login/index';
import { request } from '@/routes/password/index';
import { Form, Head } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    return (
        <AuthLayout
            title="Entre na sua conta"
            description="Digite seu e-mail e senha abaixo para entrar"
        >
            <Head title="Entrar" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className={cn("flex flex-col gap-6", isShaking && "animate-shake")}
            >
                {({ processing, errors }) => (
                    <LoginFormContent 
                        processing={processing} 
                        errors={errors} 
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        canResetPassword={canResetPassword}
                        canRegister={canRegister}
                        onShake={() => {
                            setIsShaking(true);
                            setTimeout(() => setIsShaking(false), 500);
                        }}
                    />
                )}
            </Form>

            {
                status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )
            }
        </AuthLayout >
    );
}

function LoginFormContent({ 
    processing, 
    errors, 
    showPassword, 
    setShowPassword, 
    canResetPassword, 
    canRegister,
    onShake
}: any) {
    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            onShake();
            
            // Show only the first error in a unique toast to avoid duplicates
            const firstError = Object.values(errors)[0] as string;
            toast.error(firstError, {
                id: 'login-error', // Unique ID prevents multiple toasts
                description: 'Por favor, verifique os campos e tente novamente.',
            });
        }
    }, [errors, onShake]);

    return (
        <>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email, CPF ou Usuário</Label>
                    <Input
                        id="email"
                        type="text"
                        name="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="username"
                        placeholder="Seu login"
                    />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                        {canResetPassword && (
                            <TextLink
                                href={request()}
                                className="ml-auto text-sm"
                                tabIndex={5}
                            >
                                Esqueceu a senha?
                            </TextLink>
                        )}
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            placeholder="Senha"
                            className="pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">
                                {showPassword ? 'Ocultar senha' : 'Exibir senha'}
                            </span>
                        </Button>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="remember"
                        name="remember"
                        tabIndex={3}
                    />
                    <Label htmlFor="remember">Lembrar-me</Label>
                </div>

                <Button
                    type="submit"
                    className="mt-4 w-full"
                    tabIndex={4}
                    disabled={processing}
                    data-test="login-button"
                >
                    {processing && <Spinner />}
                    Entrar
                </Button>
            </div>

            {canRegister && (
                <div className="text-center text-sm text-muted-foreground">
                    Não tem uma conta?{' '}
                    <TextLink href={register()} tabIndex={5}>
                        Cadastre-se
                    </TextLink>
                </div>
            )}
        </>
    );
}
