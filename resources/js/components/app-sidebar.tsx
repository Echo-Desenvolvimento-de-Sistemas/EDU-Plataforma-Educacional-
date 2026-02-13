import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/index';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, BookOpen, Calendar, Folder, Layers, LayoutGrid, Users, Link as LinkIcon, FileText, Settings2, SquareTerminal, Printer, GraduationCap, TrendingUp, MessageCircle, ChevronDown, Trophy } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Painel',
        href: dashboard(),
        icon: LayoutGrid,
    },
];



import admin from '@/routes/admin';
import secretaria from '@/routes/secretaria';

export function AppSidebar() {
    const user = usePage<SharedData>().props.auth.user;
    const settings = usePage<SharedData>().props.settings as Record<string, string>;
    const gamificationUrl = settings?.gamification_url || '';

    // Build footer items dynamically
    const footerItems: NavItem[] = [
        {
            title: 'Agenda Digital',
            href: '/agenda/inbox',
            icon: MessageCircle,
        },
        {
            title: 'Projetos (Kanban)',
            href: '/kanban',
            icon: Layers,
        },
    ];

    // Add gamification link if URL is configured
    if (gamificationUrl) {
        footerItems.push({
            title: 'Gamificação',
            href: '/gamification/sso',
            icon: Trophy,
            external: true,
        });
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="h-auto px-2 hover:bg-sidebar-accent/50">
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />

                {user.role === 'secretaria' && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Secretaria</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Gerenciar Usuários">
                                    <Link href={secretaria.users.index.url()}>
                                        <Users />
                                        <span>Gerenciar Usuários</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Pré-Matrículas">
                                    <Link href="/secretaria/pre-registrations">
                                        <LinkIcon />
                                        <span>Pré-Matrículas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Notas e Boletins">
                                    <Link href="/secretaria/grades">
                                        <BookOpen />
                                        <span>Notas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Frequência">
                                    <Link href="/secretaria/attendance">
                                        <Calendar />
                                        <span>Frequência</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Calendário Escolar">
                                    <Link href="/events">
                                        <Calendar />
                                        <span>Calendário Escolar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Horários de Aulas">
                                    <Link href="/admin/class-schedules">
                                        <Calendar />
                                        <span>Horários de Aulas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Supervisão Pedagógica">
                                    <Link href="/secretaria/planning">
                                        <FileText />
                                        <span>Supervisão Pedagógica</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Enturmação em Lote">
                                    <Link href="/secretaria/batch-enrollment">
                                        <Users />
                                        <span>Enturmação em Lote</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Agenda Digital">
                                    <Link href="/agenda/inbox">
                                        <MessageCircle />
                                        <span>Agenda Digital</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                )}

                {user.role === 'professor' && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Professor</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Minhas Turmas">
                                    <Link href="/professor/classes">
                                        <Users />
                                        <span>Minhas Turmas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Planejamento">
                                    <Link href="/professor/planning">
                                        <FileText />
                                        <span>Planejamento</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Atividades">
                                    <Link href="/professor/activities">
                                        <SquareTerminal />
                                        <span>Atividades</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Bancos de Questões">
                                    <Link href="/professor/question-banks">
                                        <Layers />
                                        <span>Bancos de Questões</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Relatórios">
                                    <Link href="/professor/reports">
                                        <TrendingUp />
                                        <span>Relatórios</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Notas">
                                    <Link href="/professor/grades">
                                        <BookOpen />
                                        <span>Lançamento de Notas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Calendário Escolar">
                                    <Link href="/events">
                                        <Calendar />
                                        <span>Calendário Escolar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Agenda Digital">
                                    <Link href="/agenda/inbox">
                                        <MessageCircle />
                                        <span>Agenda Digital</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                )}

                {user.role === 'aluno' && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Aluno</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Boletim Escolar">
                                    <Link href="/aluno/grades">
                                        <BookOpen />
                                        <span>Boletim</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Minha Frequência">
                                    <Link href="/aluno/attendance">
                                        <TrendingUp />
                                        <span>Frequência</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Horário das Aulas">
                                    <Link href="/aluno/schedules">
                                        <Calendar />
                                        <span>Horários</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Calendário Escolar">
                                    <Link href="/events">
                                        <Calendar />
                                        <span>Calendário Escolar</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Meus Documentos">
                                    <Link href="/aluno/documents">
                                        <FileText />
                                        <span>Documentos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Agenda Digital">
                                    <Link href="/agenda/inbox">
                                        <MessageCircle />
                                        <span>Agenda Digital</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                )}

                {user.role === 'responsavel' && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Responsável</SidebarGroupLabel>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Agenda Digital">
                                    <Link href="/agenda/inbox">
                                        <MessageCircle />
                                        <span>Agenda Digital</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* More items to come later */}
                        </SidebarMenu>
                    </SidebarGroup>
                )}

                {user.role === 'admin' && (
                    <>
                        <Collapsible asChild defaultOpen={false} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        Secretaria
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Pré-Matrículas">
                                                <Link href="/admin/pre-registrations">
                                                    <LinkIcon />
                                                    <span>Pré-Matrículas</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Alunos">
                                                <Link href={admin.students.index.url()}>
                                                    <Users />
                                                    <span>Alunos</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Responsáveis">
                                                <Link href={admin.guardians.index.url()}>
                                                    <Users />
                                                    <span>Responsáveis</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Emissão de Documentos">
                                                <Link href="/admin/documents">
                                                    <Printer />
                                                    <span>Emissão de Documentos</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>

                        <Collapsible asChild defaultOpen={true} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        Acadêmico & Pedagógico
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Supervisão Pedagógica">
                                                <Link href="/admin/planning">
                                                    <FileText />
                                                    <span>Supervisão Pedagógica</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Notas e Boletins">
                                                <Link href="/admin/student-grades">
                                                    <BookOpen />
                                                    <span>Notas</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Frequência">
                                                <Link href="/admin/attendance">
                                                    <Calendar />
                                                    <span>Frequência</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Turmas">
                                                <Link href={admin.classRooms.index.url()}>
                                                    <Users />
                                                    <span>Turmas</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Ensalamento">
                                                <Link href="/admin/ensalamento">
                                                    <GraduationCap />
                                                    <span>Ensalamento</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Horários de Aulas">
                                                <Link href="/admin/class-schedules">
                                                    <Calendar />
                                                    <span>Horários de Aulas</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Calendário Escolar">
                                                <Link href="/events">
                                                    <Calendar />
                                                    <span>Calendário Escolar</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>

                        <Collapsible asChild defaultOpen={false} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        Estrutura Curricular
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Anos Letivos">
                                                <Link href={admin.academicYears.index.url()}>
                                                    <Calendar />
                                                    <span>Anos Letivos</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Níveis de Ensino">
                                                <Link href={admin.educationLevels.index.url()}>
                                                    <BookOpen />
                                                    <span>Níveis de Ensino</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Séries / Anos">
                                                <Link href={admin.grades.index.url()}>
                                                    <Layers />
                                                    <span>Séries / Anos</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Disciplinas">
                                                <Link href={admin.subjects.index.url()}>
                                                    <Book />
                                                    <span>Disciplinas</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>

                        <Collapsible asChild defaultOpen={false} className="group/collapsible">
                            <SidebarGroup>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        Sistema
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Configurações">
                                                <Link href="/admin/settings">
                                                    <Settings2 />
                                                    <span>Configurações</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Usuários">
                                                <Link href="/admin/users">
                                                    <Users />
                                                    <span>Usuários</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Gerenciar Quadros">
                                                <Link href="/admin/kanban">
                                                    <LayoutGrid />
                                                    <span>Gerenciar Quadros</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild tooltip="Modelos de Documento">
                                                <Link href="/admin/document-templates">
                                                    <FileText />
                                                    <span>Modelos de Documento</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    </>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
