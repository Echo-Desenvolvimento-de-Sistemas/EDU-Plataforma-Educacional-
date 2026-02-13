import admin from '@/routes/admin/index';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Trash2, Plus, Search, Filter, Power } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'Gerenciar Usuários',
        href: '/admin/users',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    active: boolean;
}

interface Props {
    users: {
        data: User[];
        links: any[];
    };
    filters: {
        search?: string;
        role?: string;
    };
}

export default function Index({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || 'all');
    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        router.get(
            '/admin/users',
            { search: debouncedSearch, role: role === 'all' ? undefined : role },
            { preserveState: true, replace: true }
        );
    }, [debouncedSearch, role]);

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
            case 'secretaria': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
            case 'professor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
            case 'aluno': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gerenciar Usuários" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Usuários</h1>
                    <Link
                        href="/admin/users/create"
                        className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Usuário
                    </Link>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Buscar por nome ou email..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-[200px]">
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por função" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as funções</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="secretaria">Secretaria</SelectItem>
                                <SelectItem value="professor">Professor</SelectItem>
                                <SelectItem value="aluno">Aluno</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Mobile View (Cards) */}
                <div className="grid gap-4 sm:hidden overflow-y-auto">
                    {users.data.map((user) => (
                        <Card key={user.id} className={user.active ? '' : 'opacity-60'}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {user.name}
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                                        {user.role}
                                    </Badge>
                                    <Badge variant={user.active ? 'secondary' : 'destructive'}>
                                        {user.active ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">{user.email}</div>
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={`/admin/users/${user.id}/toggle-status`}
                                        method="patch"
                                        as="button"
                                        preserveScroll
                                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 ${user.active ? 'text-green-600' : 'text-gray-400'}`}
                                    >
                                        <Power className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={`/admin/users/${user.id}/edit`}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href={`/admin/users/${user.id}`}
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
                                    Função
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
                            {users.data.map((user) => (
                                <tr key={user.id} className={user.active ? '' : 'bg-gray-50 dark:bg-gray-800/50'}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <Badge variant={user.active ? 'secondary' : 'destructive'}>
                                            {user.active ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/users/${user.id}/toggle-status`}
                                                method="patch"
                                                as="button"
                                                preserveScroll
                                                title={user.active ? 'Desativar' : 'Ativar'}
                                                className={`transition-colors ${user.active ? 'text-green-600 hover:text-green-900' : 'text-gray-400 hover:text-gray-600'}`}
                                            >
                                                <Power className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
            </div>
        </AppLayout>
    );
}
