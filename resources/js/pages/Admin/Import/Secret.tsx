import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormEventHandler } from 'react';

const breadcrumbs = [
    {
        title: 'Importação Secreta',
        href: '/admin/secret-data-import',
    },
];

export default function Secret() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        json_data: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/secret-data-import', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Secret Import" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Importar Dados (JSON)</CardTitle>
                            <CardDescription>
                                Cole o JSON abaixo para importar Alunos e Responsáveis.
                                <br />
                                Estrutura esperada: Array de objetos contendo `student`, `guardian`, e `address`.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Textarea
                                        id="json_data"
                                        className="min-h-[400px] font-mono text-xs"
                                        value={data.json_data}
                                        onChange={(e) => setData('json_data', e.target.value)}
                                        placeholder='[{"student": {...}, "guardian": {...}}]'
                                    />
                                    {errors.json_data && (
                                        <p className="mt-2 text-sm text-red-600">{errors.json_data}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>
                                        {processing ? 'Processando...' : 'Importar Dados'}
                                    </Button>

                                    {wasSuccessful && (
                                        <p className="text-sm text-green-600">
                                            Importação realizada com sucesso!
                                        </p>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
