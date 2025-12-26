import admin from '@/routes/admin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash2, Plus, Search, Power, Eye, Printer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from '@/hooks/use-debounce';
import AppLogo from '@/components/app-logo';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Responsáveis',
        href: '/admin/guardians',
    },
];

interface Guardian {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    active: boolean;
}

interface Props {
    guardians: {
        data: Guardian[];
        links: any[];
    };
    filters: {
        search?: string;
    };
}

export default function Index({ guardians, filters }: Props) {
    const { settings } = usePage().props as any;
    const [search, setSearch] = useState(filters.search || '');
    const [viewingGuardian, setViewingGuardian] = useState<any>(null);
    const [loadingGuardian, setLoadingGuardian] = useState(false);
    const debouncedSearch = useDebounce(search, 300);

    const handleViewGuardian = (id: number) => {
        setLoadingGuardian(true);
        // Assuming there isn't a dedicated show endpoint returning pure JSON easily without inertia, 
        // we might need to rely on the data we already have or use a specific endpoint.
        // For now, let's use the object from the list if it has enough info, or fetch if needed.
        // Since the list might be paginated and lean, fetching is safer for full details (like related students).
        // Let's assume a show endpoint exists or we use the item from list + separate fetch for details if needed.
        // Since I don't see a clear "show" route in "admin.guardians", I'll try to find it in the list first, 
        // or just use the basic info. If `guardians.data` has everything, we can just find it.
        const guardian = guardians.data.find(g => g.id === id);
        if (guardian) {
            setViewingGuardian(guardian);
            setLoadingGuardian(false);
        } else {
            setLoadingGuardian(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        router.get(
            admin.guardians.index.url(),
            { search: debouncedSearch },
            { preserveState: true, replace: true }
        );
    }, [debouncedSearch]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Responsáveis" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4 print:hidden">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Responsáveis</h1>
                    <Link
                        href={admin.guardians.create.url()}
                        className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Responsável
                    </Link>
                </div>

                {/* Search Filter */}
                <div className="w-full sm:max-w-md">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Buscar por nome, CPF ou email..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Mobile View (Cards) */}
                <div className="grid gap-4 sm:hidden overflow-y-auto">
                    {guardians.data.map((guardian) => (
                        <Card key={guardian.id} className={guardian.active ? '' : 'opacity-60'}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {guardian.name}
                                </CardTitle>
                                <Badge variant={guardian.active ? 'secondary' : 'destructive'}>
                                    {guardian.active ? 'Ativo' : 'Inativo'}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Email: {guardian.email || '-'}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    CPF: {guardian.cpf}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={admin.guardians.toggleStatus.url(guardian.id)}
                                        method="patch"
                                        as="button"
                                        preserveScroll
                                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 ${guardian.active ? 'text-green-600' : 'text-gray-400'}`}
                                    >
                                        <Power className="h-4 w-4" />
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleViewGuardian(guardian.id)}
                                        disabled={loadingGuardian}
                                        title="Visualizar Ficha"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Link
                                        href={admin.guardians.edit.url(guardian.id)}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 text-indigo-600 hover:text-indigo-900"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={admin.guardians.destroy.url(guardian.id)}
                                        method="delete"
                                        as="button"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-red-100 hover:text-red-600 h-9 w-9"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Desktop View (Table) */}
                <div className="hidden sm:block flex-1 overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    CPF
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Telefone
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                            {guardians.data.map((guardian) => (
                                <tr key={guardian.id} className={guardian.active ? '' : 'bg-gray-50 dark:bg-gray-800/50'}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{guardian.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{guardian.email || '-'}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{guardian.cpf}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{guardian.phone || '-'}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <Badge variant={guardian.active ? 'secondary' : 'destructive'}>
                                            {guardian.active ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={admin.guardians.toggleStatus.url(guardian.id)}
                                                method="patch"
                                                as="button"
                                                preserveScroll
                                                title={guardian.active ? 'Desativar' : 'Ativar'}
                                                className={`transition-colors p-2 ${guardian.active ? 'text-green-600 hover:text-green-900' : 'text-gray-400 hover:text-gray-600'}`}
                                            >
                                                <Power className="h-4 w-4" />
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleViewGuardian(guardian.id)}
                                                disabled={loadingGuardian}
                                                title="Visualizar Ficha"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Link
                                                href={admin.guardians.edit.url(guardian.id)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-2"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={admin.guardians.destroy.url(guardian.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* View Guardian Modal */}
                <Dialog open={!!viewingGuardian} onOpenChange={(open) => !open && setViewingGuardian(null)}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:hidden dark:bg-gray-900 dark:text-gray-100">
                        <DialogHeader className="print:hidden flex flex-row items-center justify-between">
                            <DialogTitle>Ficha do Responsável</DialogTitle>
                            <DialogDescription className="sr-only">Detalhes do Responsável</DialogDescription>
                            <Button variant="outline" size="sm" onClick={handlePrint} className="ml-auto">
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir
                            </Button>
                        </DialogHeader>

                        {viewingGuardian && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Nome Completo</label>
                                        <div className="text-lg font-bold">{viewingGuardian.name}</div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">CPF</label>
                                        <div className="text-lg">{viewingGuardian.cpf}</div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <div className="text-lg">{viewingGuardian.email || '-'}</div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Telefone/WhatsApp</label>
                                        <div className="text-lg">{viewingGuardian.phone || '-'}</div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <Badge variant={viewingGuardian.active ? 'secondary' : 'destructive'}>
                                                {viewingGuardian.active ? 'Ativo' : 'Inativo'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter className="sm:justify-between print:hidden">
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* DEDICATED PRINT VIEW */}
            {viewingGuardian && (
                <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:z-[9999] print:h-screen print:w-screen print:overflow-visible">
                    <div className="print:p-8">
                        {/* Print Header - With Logo and School Info */}
                        <div className="flex items-center gap-4 mb-6 border-b-2 border-black pb-4">
                            <div className="w-24 h-24 flex items-center justify-center shrink-0">
                                <AppLogo className="w-full h-full text-black" />
                            </div>
                            <div className="flex-1 text-center">
                                <h1 className="text-2xl font-bold uppercase">{settings?.school_name || settings?.app_name || 'Centro Educacional Rosa de Sharon'}</h1>
                                <p className="text-sm text-gray-600">Educação Infantil e Ensino Fundamental</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {settings?.school_address || 'Endereço não configurado'}
                                    {(settings?.school_city || settings?.school_state) && ` - ${settings?.school_city || ''}/${settings?.school_state || ''}`}
                                    {settings?.school_cep && ` - CEP: ${settings?.school_cep}`}
                                    {settings?.school_phone && ` - Tel: ${settings?.school_phone}`}
                                </p>
                            </div>
                            <div className="w-24 shrink-0 text-right">
                                <div className="border border-black p-2 text-center">
                                    <p className="text-[10px] uppercase font-bold">Registro Nº</p>
                                    <p className="text-lg font-bold">{viewingGuardian.id.toString().padStart(4, '0')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold uppercase bg-gray-200 py-1 print:bg-gray-200 print:text-black">Ficha Cadastral do Responsável</h2>
                        </div>

                        <div className="space-y-6 text-sm print:text-xs">
                            {/* 1. Dados Pessoais */}
                            <section className="print:break-inside-avoid relative">
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 print:text-black print:bg-gray-200 print:p-1 print:uppercase print:text-sm print:mb-2 print:border print:border-gray-300">
                                    Dados Pessoais e Contato
                                </h3>

                                <div className="grid grid-cols-2 gap-y-2 print:gap-y-0.5 gap-x-4">
                                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5 col-span-2">
                                        <span className="font-bold mr-2 print:w-24">Nome Completo:</span>
                                        <span className="uppercase">{viewingGuardian.name}</span>
                                    </div>

                                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                                        <span className="font-bold mr-2 print:w-24">CPF:</span>
                                        <span>{viewingGuardian.cpf}</span>
                                    </div>
                                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5">
                                        <span className="font-bold mr-2 print:w-24">Telefone:</span>
                                        <span>{viewingGuardian.phone || '-'}</span>
                                    </div>

                                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5 col-span-2">
                                        <span className="font-bold mr-2 print:w-24">Email:</span>
                                        <span>{viewingGuardian.email || '-'}</span>
                                    </div>
                                    <div className="print:flex print:border-b print:border-dotted print:border-gray-300 print:pb-0.5 col-span-2">
                                        <span className="font-bold mr-2 print:w-24">Status no Sistema:</span>
                                        <span>{viewingGuardian.active ? 'ATIVO' : 'INATIVO'}</span>
                                    </div>
                                </div>
                            </section>

                            <div className="mt-8 pt-8 border-t border-gray-300 text-center text-xs text-gray-500">
                                <p className="mb-8">Declaro que as informações acima são verdadeiras.</p>
                                <div className="w-1/2 mx-auto border-t border-black pt-2">
                                    Assinatura do Responsável
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between mt-8 text-[10px] text-gray-400">
                            <span>Sistema de Gestão Escolar - Rosa de Sharon</span>
                            <span>Impresso em: {new Date().toLocaleString('pt-BR')}</span>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
