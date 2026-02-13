import StudentRegistrationCard from '@/components/student-registration-card';
import AppLogo from '@/components/app-logo';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import secretaria from '@/routes/secretaria/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, Plus, Trash2, Eye, Printer, School } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface Address {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    zone: string;
    phone_contact: string;
}

interface Health {
    allergies: string;
    medications: string;
    conditions: string;
    blood_type: string;
    food_restrictions: string;
    has_disability: boolean;
    disability_details: string;
    vaccination_updated: boolean;
}

interface Guardian {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    pivot: {
        kinship: string;
        is_financial_responsible: boolean;
        is_pedagogic_responsible: boolean;
        resides_with: boolean;
    };
}

interface Student {
    id: number;
    name: string;
    social_name?: string;
    cpf: string;
    rg?: string;
    rg_issuer?: string;
    rg_state?: string;
    rg_date?: string;
    birth_date: string;
    sex?: string;
    color_race?: string;
    nationality?: string;
    place_of_birth?: string;
    state_of_birth?: string;
    birth_cert_model?: string;
    birth_cert_number?: string;
    birth_cert_old_info?: any;
    nis?: string;
    mother_name?: string;
    father_name?: string;
    parents_marital_status?: string;
    origin_school?: string;
    transport_info?: string;
    authorized_pickups?: string[];
    exit_authorization?: boolean;
    observations?: string;
    address?: Address;
    health?: Health;
    guardians?: Guardian[];
}

interface PreRegistration {
    id: number;
    token: string;
    student_name: string;
    status: 'pending' | 'completed';
    created_at: string;
    creator: { name: string };
    type: 'new' | 'renewal';
    target_class?: { name: string };
    student?: Student;
}

interface ClassRoom {
    id: number;
    name: string;
}

interface Props {
    preRegistrations: PreRegistration[];
    classRooms: ClassRoom[];
    students: Student[];
}

export default function Index({ preRegistrations, classRooms, students }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        student_name: '',
        target_class_id: '',
        student_id: '',
        type: 'new',
    });

    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [viewingItem, setViewingItem] = useState<PreRegistration | null>(null);
    const [deletingItem, setDeletingItem] = useState<PreRegistration | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Using typed route from wayfinder
        post(secretaria.preRegistrations.store.url(), {
            onSuccess: () => reset(),
        });
    };

    const copyToClipboard = (token: string, id: number) => {
        const url = `${window.location.origin}/pre-matricula/${token}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = () => {
        if (deletingItem) {
            router.delete(secretaria.preRegistrations.destroy.url(deletingItem.id), {
                onSuccess: () => setDeletingItem(null),
            });
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString();
    };

    const handlePrint = () => {
        window.print();
    };

    const { settings } = usePage().props as any;

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/secretaria/dashboard' },
                { title: 'Pré-Matrículas', href: '/secretaria/pre-registrations' },
            ]}
        >
            <Head title="Pré-Matrículas" />

            <div className="py-12 print:hidden">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Generator Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Gerar Novo Link</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Tipo de Matrícula</Label>
                                        <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">Aluno Novo</SelectItem>
                                                <SelectItem value="renewal">Rematrícula (Aluno Existente)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                                    </div>

                                    {data.type === 'new' ? (
                                        <div className="space-y-2">
                                            <Label htmlFor="student_name">Nome de Referência (Opcional)</Label>
                                            <Input
                                                id="student_name"
                                                value={data.student_name}
                                                onChange={(e) => setData('student_name', e.target.value)}
                                                placeholder="Ex: Família Silva"
                                            />
                                            {errors.student_name && <p className="text-sm text-red-500">{errors.student_name}</p>}
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <Label htmlFor="student_id">Selecione o Aluno</Label>
                                            <Select value={data.student_id} onValueChange={(value) => setData('student_id', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Busque o aluno..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {students.map((student) => (
                                                        <SelectItem key={student.id} value={String(student.id)}>
                                                            {student.name} ({student.cpf})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.student_id && <p className="text-sm text-red-500">{errors.student_id}</p>}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="target_class_id">Turma de Destino (Opcional)</Label>
                                        <Select value={data.target_class_id} onValueChange={(value) => setData('target_class_id', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a turma" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classRooms.map((classroom) => (
                                                    <SelectItem key={classroom.id} value={String(classroom.id)}>
                                                        {classroom.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.target_class_id && <p className="text-sm text-red-500">{errors.target_class_id}</p>}
                                    </div>
                                </div>

                                <Button type="submit" disabled={processing}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Gerar Link
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* List Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Links Gerados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Referência / Aluno</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Turma Destino</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Criado Por</TableHead>
                                        <TableHead>Data</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {preRegistrations.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">
                                                {item.type === 'renewal' && item.student
                                                    ? item.student.name
                                                    : item.student_name || 'Sem referência'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={item.type === 'new' ? 'default' : 'secondary'}>
                                                    {item.type === 'new' ? 'Novo' : 'Rematrícula'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {item.target_class ? item.target_class.name : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === 'completed' ? 'outline' : 'destructive'} className={item.status === 'completed' ? 'text-green-600 border-green-600' : ''}>
                                                    {item.status === 'pending' ? 'Pendente' : 'Concluído'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{item.creator.name}</TableCell>
                                            <TableCell>{formatDate(item.created_at)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setViewingItem(item)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span className="sr-only">Visualizar</span>
                                                    </Button>

                                                    {item.status === 'pending' && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => copyToClipboard(item.token, item.id)}
                                                        >
                                                            {copiedId === item.id ? (
                                                                <Check className="h-4 w-4 text-green-500" />
                                                            ) : (
                                                                <Copy className="h-4 w-4" />
                                                            )}
                                                            <span className="sr-only">Copiar Link</span>
                                                        </Button>
                                                    )}

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => setDeletingItem(item)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Excluir</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* View Modal */}
                <Dialog open={!!viewingItem} onOpenChange={() => setViewingItem(null)}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:hidden dark:bg-gray-900 dark:text-gray-100">
                        <DialogHeader className="print:hidden flex flex-row items-center justify-between">
                            <DialogTitle>Ficha Cadastral do Aluno</DialogTitle>
                            <DialogDescription className="sr-only">Detalhamento completo dos dados da pré-matrícula</DialogDescription>
                            <Button variant="outline" size="sm" onClick={handlePrint} className="ml-auto">
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir
                            </Button>
                        </DialogHeader>

                        {viewingItem && (
                            <div className="space-y-6 print:hidden">
                                {/* Header Info - Display Only */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                                    <div>
                                        <Label className="text-xs text-gray-500 uppercase">Tipo</Label>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{viewingItem.type === 'new' ? 'Novo Aluno' : 'Rematrícula'}</div>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-500 uppercase">Status</Label>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{viewingItem.status === 'completed' ? 'Concluído' : 'Pendente'}</div>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-500 uppercase">Turma Destino</Label>
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{viewingItem.target_class ? viewingItem.target_class.name : 'Não definida'}</div>
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-500 uppercase">Criado Por</Label>
                                        <div className="border-t border-black pt-2">
                                            <p className="font-bold text-sm">Secretaria / Coordenação</p>
                                        </div>
                                    </div>
                                </div>

                                {viewingItem.student ? (
                                    <StudentRegistrationCard student={viewingItem.student} />
                                ) : (
                                    <div className="text-center py-12 text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed dark:border-gray-700">
                                        <p className="text-lg font-medium">Nenhum dado de aluno vinculado ainda.</p>
                                        <p className="text-sm">O aluno será criado/vinculado quando o formulário for preenchido pelo responsável.</p>
                                    </div>
                                )}

                                {viewingItem.status === 'pending' && (
                                    <div className="pt-6 border-t bg-gray-50 dark:bg-gray-800 p-4 -mx-6 -mb-6 mt-6">
                                        <Label className="text-xs text-gray-500 dark:text-gray-400">Link de Acesso para o Responsável</Label>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Input readOnly value={`${window.location.origin}/pre-matricula/${viewingItem.token}`} className="bg-white dark:bg-gray-900" />
                                            <Button size="icon" variant="outline" onClick={() => copyToClipboard(viewingItem.token, viewingItem.id)}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <DialogFooter className="sm:justify-between print:hidden">
                            {/* Footer content if needed */}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Modal */}
                <Dialog open={!!deletingItem} onOpenChange={() => setDeletingItem(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Excluir Pré-Matrícula</DialogTitle>
                            <DialogDescription>
                                Tem certeza que deseja excluir esta pré-matrícula? Esta ação não pode ser desfeita.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDeletingItem(null)}>Cancelar</Button>
                            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* DEDICATED PRINT VIEW - Completely separate from main layout */}
            {viewingItem && (
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
                                    <p className="text-[10px] uppercase font-bold">Ficha Nº</p>
                                    <p className="text-lg font-bold">{viewingItem.id.toString().padStart(4, '0')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold uppercase bg-gray-200 py-1 print:bg-gray-200 print:text-black">Ficha Cadastral do Aluno</h2>
                        </div>

                        {/* Summary Grid */}
                        <div className="grid grid-cols-4 gap-4 mb-4 text-xs border border-gray-300 p-2">
                            <div>
                                <span className="font-bold block uppercase">Tipo de Matrícula:</span>
                                <span>{viewingItem.type === 'new' ? 'Novo Aluno' : 'Rematrícula'}</span>
                            </div>
                            <div>
                                <span className="font-bold block uppercase">Turma Indicada:</span>
                                <span>{viewingItem.target_class ? viewingItem.target_class.name : 'A definir'}</span>
                            </div>
                            <div>
                                <span className="font-bold block uppercase">Status:</span>
                                <span>{viewingItem.status === 'completed' ? 'Concluído' : 'Pendente'}</span>
                            </div>
                            <div>
                                <span className="font-bold block uppercase">Data Registro:</span>
                                <span>{formatDate(viewingItem.created_at)}</span>
                            </div>
                        </div>

                        {viewingItem.student ? (
                            <StudentRegistrationCard student={viewingItem.student} />
                        ) : (
                            <div className="text-center py-12 text-gray-500 border border-dashed">
                                <p>Nenhum dado de aluno vinculado.</p>
                            </div>
                        )}

                        {/* Missing Documents Checklist */}
                        <div className="mt-6 print:break-inside-avoid">
                            <h3 className="text-sm font-bold uppercase border-b border-black mb-2">Conferência de Documentos (Uso da Secretaria)</h3>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Certidão de Nascimento</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Histórico Escolar / Transferência</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> 2 Fotos 3x4</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Cartão de Vacina Atualizado</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Comprovante de Residência</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> RG e CPF do Responsável</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Cartão do SUS</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Tipo Sanguíneo (Laudo)</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black"></div> Declaração de Quitação</div>
                            </div>
                        </div>

                        {/* Signatures */}
                        <div className="mt-12 grid grid-cols-2 gap-16 print:break-inside-avoid">
                            <div className="text-center pt-8 border-t border-black">
                                <p className="text-xs uppercase font-bold">Assinatura do Responsável</p>
                            </div>
                            <div className="text-center pt-8 border-t border-black">
                                <p className="text-xs uppercase font-bold">Secretaria / Direção</p>
                            </div>
                        </div>

                        <div className="flex justify-between mt-4 text-[10px] text-gray-400">
                            <span>Sistema de Gestão Escolar - Rosa de Sharon</span>
                            <span>Impresso em: {new Date().toLocaleString('pt-BR')}</span>
                        </div>
                    </div>
                </div>
            )}

        </AppLayout >
    );
}
