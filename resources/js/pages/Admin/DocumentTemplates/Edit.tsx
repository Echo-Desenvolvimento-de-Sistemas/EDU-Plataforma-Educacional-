import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Toggle } from '@/components/ui/toggle';
import admin from '@/routes/admin';

interface DocumentTemplate {
    id: number;
    title: string;
    type: string;
    content: string;
    is_active: boolean;
}

interface Props {
    template?: DocumentTemplate;
}

const AVAILABLE_VARIABLES = [
    { label: 'Nome do Aluno', value: '{{name}}' },
    { label: 'CPF', value: '{{cpf}}' },
    { label: 'Matrícula', value: '{{registration_number}}' },
    { label: 'Data Atual', value: '{{date}}' },
    { label: 'UUID', value: '{{uuid}}' },
    { label: 'Nome da Escola', value: '{{school_name}}' },
    { label: 'Logo da Escola', value: '{{logo_img}}' },
    { label: 'Descrição da Série', value: '{{grade_description}}' },
    { label: 'QR Code', value: '{{qrcode}}' },
    { label: 'Cidade', value: '{{city}}' },
];

export default function Edit({ template }: Props) {
    const isEditing = !!template;

    const { data, setData, post, put, processing, errors } = useForm({
        title: template?.title || '',
        type: template?.type || 'declaration',
        content: template?.content || '',
        is_active: template?.is_active ?? true,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin',
            href: '/admin/dashboard',
        },
        {
            title: 'Modelos de Documento',
            href: admin.documentTemplates.index.url(),
        },
        {
            title: isEditing ? 'Editar' : 'Novo',
            href: '#',
        },
    ];

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
            Placeholder.configure({
                placeholder: 'Escreva o conteúdo do documento aqui...',
            }),
        ],
        content: data.content,
        onUpdate: ({ editor }) => {
            setData('content', editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[400px] p-4 border rounded-md',
            },
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && template) {
            put(admin.documentTemplates.update.url(template.id));
        } else {
            post(admin.documentTemplates.store.url());
        }
    };

    const insertVariable = (variable: string) => {
        editor?.chain().focus().insertContent(` ${variable} `).run();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Editar Modelo' : 'Novo Modelo'} />

            <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={admin.documentTemplates.index.url()}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                {isEditing ? 'Editar Modelo' : 'Novo Modelo'}
                            </h1>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título do Documento</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipo</Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(val) => setData('type', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="declaration">Declaração</SelectItem>
                                            <SelectItem value="history">Histórico</SelectItem>
                                            <SelectItem value="report_card">Boletim</SelectItem>
                                            <SelectItem value="other">Outro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <span className="text-sm text-red-500">{errors.type}</span>}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Modelo Ativo</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <Label className="mb-2 block">Conteúdo do Documento</Label>

                            {/* Toolbar */}
                            <div className="border rounded-t-md p-2 bg-muted/30 flex flex-wrap gap-1 items-center mb-0 border-b-0">
                                <Toggle
                                    size="sm"
                                    pressed={editor?.isActive('bold')}
                                    onPressedChange={() => editor?.chain().focus().toggleBold().run()}
                                >
                                    <Bold className="h-4 w-4" />
                                </Toggle>
                                <Toggle
                                    size="sm"
                                    pressed={editor?.isActive('italic')}
                                    onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
                                >
                                    <Italic className="h-4 w-4" />
                                </Toggle>
                                <Toggle
                                    size="sm"
                                    pressed={editor?.isActive('underline')}
                                    onPressedChange={() => editor?.chain().focus().toggleUnderline().run()}
                                >
                                    <UnderlineIcon className="h-4 w-4" />
                                </Toggle>
                                <div className="w-px h-6 bg-border mx-2" />
                                <Toggle
                                    size="sm"
                                    pressed={editor?.isActive({ textAlign: 'left' })}
                                    onPressedChange={() => editor?.chain().focus().setTextAlign('left').run()}
                                >
                                    <AlignLeft className="h-4 w-4" />
                                </Toggle>
                                <Toggle
                                    size="sm"
                                    pressed={editor?.isActive({ textAlign: 'center' })}
                                    onPressedChange={() => editor?.chain().focus().setTextAlign('center').run()}
                                >
                                    <AlignCenter className="h-4 w-4" />
                                </Toggle>
                                <Toggle
                                    size="sm"
                                    pressed={editor?.isActive({ textAlign: 'right' })}
                                    onPressedChange={() => editor?.chain().focus().setTextAlign('right').run()}
                                >
                                    <AlignRight className="h-4 w-4" />
                                </Toggle>
                                <Toggle
                                    size="sm"
                                    pressed={editor?.isActive({ textAlign: 'justify' })}
                                    onPressedChange={() => editor?.chain().focus().setTextAlign('justify').run()}
                                >
                                    <AlignJustify className="h-4 w-4" />
                                </Toggle>
                            </div>

                            <EditorContent editor={editor} />
                            {errors.content && <span className="text-sm text-red-500">{errors.content}</span>}

                            <div className="mt-4">
                                <Label className="text-xs text-muted-foreground mb-2 block">Variáveis Disponíveis (Clique para inserir)</Label>
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_VARIABLES.map((v) => (
                                        <Button
                                            key={v.value}
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => insertVariable(v.value)}
                                            className="text-xs"
                                        >
                                            {v.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Modelo
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
