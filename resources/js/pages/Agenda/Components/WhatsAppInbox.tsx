import React, { useState, useMemo } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { SharedData } from '@/types';
import { cn, getInitials } from '@/lib/utils';
import { useAppearance } from '@/hooks/use-appearance';
import {
    Search, X, ArrowLeft, MoreVertical, MessageCircle, Moon, Sun,
    LayoutDashboard, Check, CheckCheck, Megaphone, Volume2, Plus
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────

interface ChannelInfo {
    id: string;
    title: string;
    type: string;
    icon?: string;
    unread_count: number;
}

interface MessagePreview {
    id: string | number;
    content: {
        text?: string;
        body?: string;
    };
    created_at_date: string;
    is_me: boolean;
    is_read: boolean;
}

interface ChannelPreview {
    channel: ChannelInfo;
    lastMessage: MessagePreview | null;
}

interface Props {
    messages: {
        data: ChannelPreview[];
        links: any[];
    };
    channels: ChannelInfo[];
    totalUnread: number;
}

// ─── Component ──────────────────────────────────────

export default function WhatsAppInbox({ messages: initialMessages, channels, totalUnread }: Props) {
    const { auth, settings: rawSettings } = usePage<SharedData>().props;
    const settings = rawSettings as Record<string, string>;
    const primaryColor = settings?.primary_color || '#d658f9';
    const logoURL = settings?.logo_light_url || settings?.logo_url || '/images/logo-light.png';
    const logoDarkURL = settings?.logo_dark_url || settings?.logo_url || '/images/logo-dark.png';
    
    // Fixed useAppearance hook usage
    const { appearance, updateAppearance } = useAppearance();
    const isDark = appearance === 'dark' || (appearance === 'system' && (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches));
    const toggleAppearance = () => updateAppearance(isDark ? 'light' : 'dark');

    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
    const [isSearching, setIsSearching] = useState(false);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    }, []);

    const channelPreviews = useMemo(() => {
        let filtered = initialMessages.data;
        if (activeTab === 'unread') {
            filtered = filtered.filter(p => (p.channel.unread_count || 0) > 0);
        }
        if (searchTerm.trim()) {
            filtered = filtered.filter(p => 
                p.channel.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    }, [initialMessages.data, activeTab, searchTerm]);

    return (
        <div className="flex flex-col h-screen bg-[#f8f9fa] dark:bg-[#0b0e11] font-sans selection:bg-purple-100 dark:selection:bg-purple-900/40">
            <style dangerouslySetInnerHTML={{ __html: `
                [data-slot="sidebar-wrapper"] > [data-slot="sidebar"] { display: none !important; }
                [data-slot="sidebar-inset"] { margin: 0 !important; padding: 0 !important; background: transparent !important; }
                header.flex.h-16 { display: none !important; }
            ` }} />
            
            <Head title="Agenda" />

            {/* ─── Premium Modern Header ─── */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-6 py-8 relative overflow-hidden transition-all duration-500 border-b border-gray-100 dark:border-gray-800">
                {/* Decorative Blob */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full opacity-10 blur-3xl transition-colors duration-1000" style={{ backgroundColor: primaryColor }} />
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => router.get('/dashboard')}
                                className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:scale-110 active:scale-95 transition-all"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                                    {greeting}, <span style={{ color: primaryColor }}>{auth.user.name.split(' ')[0]}!</span>
                                </h1>
                                <p className="text-[13px] font-medium text-gray-400 mt-0.5">Sua agenda escolar organizada.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button 
                                onClick={toggleAppearance}
                                className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:scale-105 transition-all"
                            >
                                {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-400" />}
                            </button>
                            <button className="p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-400 hover:scale-105 transition-all">
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats & Tabs */}
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setActiveTab('all')}
                            className={cn(
                                "px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all shadow-sm flex items-center gap-2",
                                activeTab === 'all' 
                                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-gray-200 dark:shadow-none" 
                                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
                            )}
                        >
                            Conversas
                            <span className="opacity-40 font-medium">({initialMessages.data.length})</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('unread')}
                            className={cn(
                                "px-5 py-2.5 rounded-2xl text-[13px] font-bold transition-all shadow-sm flex items-center gap-2",
                                activeTab === 'unread' 
                                    ? "text-white shadow-lg" 
                                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
                            )}
                            style={activeTab === 'unread' ? { backgroundColor: primaryColor, boxShadow: `${primaryColor}40 0 10px 0` } : {}}
                        >
                            Não lidas
                            {totalUnread > 0 && (
                                <span className={cn(
                                    "h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center text-[10px] bg-white",
                                    activeTab === 'unread' ? "text-gray-900" : "text-white"
                                )} style={activeTab !== 'unread' ? { backgroundColor: primaryColor } : {}}>
                                    {totalUnread}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── Search Bar ─── */}
            <div className="px-6 py-4 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm z-10 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Pesquisar mensagens..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-gray-800/80 border-none rounded-2xl py-3 pl-11 pr-4 text-[14px] placeholder:text-gray-400 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* ─── Chat List ─── */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 premium-scrollbar z-0">
                {channelPreviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                        <MessageCircle className="h-16 w-16 mb-4 stroke-1" />
                        <p className="text-sm font-medium">Nenhuma conversa encontrada</p>
                    </div>
                ) : (
                    channelPreviews.map(({ channel, lastMessage }) => {
                        const hasUnread = channel.unread_count > 0;
                        return (
                            <Link 
                                key={channel.id}
                                href={`/agenda/channels/${channel.id}`}
                                className="group block p-4 rounded-[28px] hover:bg-white dark:hover:bg-gray-800 transition-all active:scale-[0.98] border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Avatar with logo fallback */}
                                    <div className="relative">
                                        <div className="h-16 w-16 rounded-3xl bg-gray-100 dark:bg-gray-700 overflow-hidden shadow-sm shadow-black/5 flex items-center justify-center transition-transform group-hover:scale-105">
                                            {channel.icon ? (
                                                <img src={channel.icon} alt="" className="h-full w-full object-cover" />
                                            ) : (
                                                <>
                                                    <img src={logoURL} alt="" className="h-2/3 w-2/3 object-contain dark:hidden" />
                                                    <img src={logoDarkURL} alt="" className="h-2/3 w-2/3 object-contain hidden dark:block" />
                                                </>
                                            )}
                                        </div>
                                        {hasUnread && (
                                            <div 
                                                className="absolute -top-1 -right-1 h-6 w-6 rounded-full text-white text-[10px] font-black flex items-center justify-center border-4 border-[#f8f9fa] dark:border-[#0b0e11] shadow-lg animate-in zoom-in"
                                                style={{ backgroundColor: primaryColor }}
                                            >
                                                {channel.unread_count}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <h3 className="text-[15px] font-bold text-gray-900 dark:text-gray-100 truncate flex items-center gap-2">
                                                {channel.title}
                                                {channel.type === 'broadcast' && <Megaphone className="h-3 w-3 text-gray-400" />}
                                            </h3>
                                            <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap">
                                                {lastMessage?.created_at_date || ''}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <p className={cn(
                                                "text-[13px] truncate",
                                                hasUnread ? "text-gray-800 dark:text-gray-200 font-bold" : "text-gray-400"
                                            )}>
                                                {lastMessage ? (
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        {lastMessage.is_me && (
                                                            lastMessage.is_read ? <CheckCheck className="h-3.5 w-3.5" style={{ color: primaryColor }} /> : <Check className="h-3.5 w-3.5 text-gray-400" />
                                                        )}
                                                        {lastMessage.content.text || lastMessage.content.body}
                                                    </span>
                                                ) : (
                                                    <span className="italic font-medium opacity-50">Nenhuma mensagem ainda</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>

            {/* ─── Floating Action ─── */}
            <div className="fixed bottom-8 right-8 z-50">
                <button 
                    className="h-16 w-16 rounded-[28px] flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-90 transition-all animate-in slide-in-from-bottom-8 duration-500"
                    style={{ 
                        backgroundColor: primaryColor,
                        boxShadow: `${primaryColor}40 0 16px 0`
                    }}
                >
                    <Plus className="h-8 w-8" />
                </button>
            </div>
        </div>
    );
}
