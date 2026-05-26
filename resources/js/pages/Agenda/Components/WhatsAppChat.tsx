import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { SharedData } from '@/types';
import { 
    ArrowLeft, Send, Check, CheckCheck, Paperclip, 
    MoreVertical, Megaphone, Plus 
} from 'lucide-react';
import { getInitials, cn } from '@/lib/utils';
import axios from 'axios';

// ─── Types ───────────────────────────────────────

interface Message {
    id: string | number;
    content: {
        text?: string;
        body?: string;
        attachments?: any[];
        banner_image?: string;
        title?: string;
        type_label?: string;
    };
    read_at?: string | null;
    type: string;
    created_at_human: string;
    created_at: string;
    is_me: boolean;
    sender: {
        name: string;
        role?: string;
        avatar?: string;
    };
    is_optimistic?: boolean;
}

interface Channel {
    id: string;
    title: string;
    type: 'broadcast' | 'communication' | 'direct';
    permissions: {
        can_send: boolean;
        is_speaker: boolean;
    };
    target_id?: number | string;
    target_user?: {
        id: number;
        name: string;
        avatar?: string;
    } | null;
}

interface Props {
    channel: Channel;
    messages: {
        data: Message[];
        links: any[];
    };
}

// ─── Component ────────────────────────────────────

export default function WhatsAppChat({ channel, messages: initialMessages }: Props) {
    const { auth, settings: rawSettings } = usePage<SharedData>().props;
    const settings = rawSettings as Record<string, string>;
    const primaryColor = settings?.primary_color || '#d658f9';
    const logoURL = settings?.logo_light_url || settings?.logo_url || '/images/logo-light.png';
    const logoDarkURL = settings?.logo_dark_url || settings?.logo_url || '/images/logo-dark.png';
    
    const [messages, setMessages] = useState<Message[]>(initialMessages.data.slice().reverse());
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const pollingRef = useRef<NodeJS.Timeout | null>(null);

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        bottomRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        const reversed = initialMessages.data.slice().reverse();
        setMessages(prev => {
            const optimistic = prev.filter(m => m.is_optimistic);
            const realIds = new Set(reversed.map(m => m.id));
            const stillOptimistic = optimistic.filter(opt => {
                const isMatched = reversed.some(real => 
                    real.is_me && 
                    (real.content.text === opt.content.text || real.content.body === opt.content.text)
                );
                const isStale = (Date.now() - new Date(opt.created_at).getTime()) > 60000;
                return !isMatched && !isStale;
            });
            return [...reversed, ...stillOptimistic];
        });
        if (reversed.length > 0) {
            setTimeout(() => scrollToBottom('auto'), 100);
        }
    }, [initialMessages]);

    const fetchNewMessages = async () => {
        try {
            const pollUrl = `/agenda/channels/${channel.id}/poll?t=${Date.now()}`;
            const response = await axios.get(pollUrl);
            const newMsgs = response.data.data.slice().reverse();
            
            setMessages(prev => {
                const sig = (list: any[]) => list.map(m => `${m.id}-${m.read_at}`).join('|');
                if (sig(prev.filter(m => !m.is_optimistic)) !== sig(newMsgs)) {
                    const optimistic = prev.filter(m => m.is_optimistic);
                    const stillOptimistic = optimistic.filter(opt => {
                        const isMatched = newMsgs.some((real: any) => 
                            real.is_me && 
                            (real.content.text === opt.content.text || real.content.body === opt.content.text)
                        );
                        const isStale = (Date.now() - new Date(opt.created_at).getTime()) > 60000;
                        return !isMatched && !isStale;
                    });
                    return [...newMsgs, ...stillOptimistic];
                }
                return prev;
            });
        } catch (err) {}
    };

    useEffect(() => {
        pollingRef.current = setInterval(fetchNewMessages, 5000);
        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, [channel.id]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const text = newMessage.trim();
        if (!text || sending) return;

        setNewMessage('');
        
        const optimisticMsg: Message = {
            id: `opt-${Date.now()}`,
            content: { text: text },
            created_at_human: 'Agora mesmo',
            created_at: new Date().toISOString(),
            is_me: true,
            read_at: null,
            type: 'text',
            sender: { name: auth.user.name },
            is_optimistic: true
        };
        
        setMessages(prev => [...prev, optimisticMsg]);
        setTimeout(() => scrollToBottom(), 50);

        setSending(true);
        try {
            await axios.post(`/agenda/channels/${channel.id}/reply`, {
                content: { text: text },
                type: 'text'
            });
            fetchNewMessages();
        } catch (err) {
            setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
            setNewMessage(text);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#f8f9fa] dark:bg-[#0b0e11] font-sans overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: `
                [data-slot="sidebar-wrapper"] > [data-slot="sidebar"] { display: none !important; }
                [data-slot="sidebar-inset"] { margin: 0 !important; padding: 0 !important; background: transparent !important; }
                header.flex.h-16 { display: none !important; }
                .chat-pattern {
                    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                }
            ` }} />
            
            <Head title={channel.title} />

            {/* ─── Modern Premium Header ─── */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-4 flex items-center justify-between z-20 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-500">
                <div className="flex items-center gap-3 min-w-0">
                    <Link 
                        href="/agenda/inbox" 
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center shrink-0">
                            {channel.target_user?.avatar ? (
                                <img src={channel.target_user.avatar} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <img src={logoURL} alt="Escola" className="h-2/3 w-2/3 object-contain dark:hidden" />
                            )}
                            <img src={logoDarkURL} alt="Escola" className="h-2/3 w-2/3 object-contain hidden dark:block" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-[15px] font-bold text-gray-900 dark:text-gray-100 leading-none mb-1 truncate">
                                {channel.title}
                            </h3>
                            <div className="flex items-center gap-1.5">
                                <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                                <span className="text-[11px] font-medium text-gray-400">Ativo agora</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* ─── Chat Area ─── */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 premium-scrollbar relative chat-pattern">
                {/* Subtle Background Gradient */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
                     style={{ background: `radial-gradient(circle at 50% 50%, ${primaryColor}, transparent)` }} />

                <div className="flex justify-center relative z-10">
                    <span className="px-4 py-1.5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-[11px] font-bold text-gray-400 border border-gray-100 dark:border-gray-700 uppercase tracking-widest shadow-sm transition-colors duration-500">
                        Hoje
                    </span>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-10", msg.is_me ? "justify-end" : "justify-start")}>
                        <div className={cn(
                            "max-w-[85%] px-5 py-3.5 shadow-sm text-[15px] leading-relaxed relative",
                            msg.is_me
                                ? "rounded-[24px] rounded-tr-[4px] text-white"
                                : "rounded-[24px] rounded-tl-[4px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700/50 transition-colors duration-500",
                            msg.is_optimistic && "opacity-70 scale-[0.98]"
                        )} style={msg.is_me ? { backgroundColor: primaryColor, boxShadow: `${primaryColor}30 0 10px 0` } : {}}>
                            
                            {!msg.is_me && channel.type !== 'direct' && (
                                <span className="block text-[11px] font-bold opacity-60 mb-1" style={{ color: primaryColor }}>
                                    {msg.sender.name}
                                </span>
                            )}

                            <div className="space-y-2">
                                {msg.content.title && (
                                    <h4 className="font-bold text-[16px] drop-shadow-sm leading-tight">
                                        {msg.content.title}
                                    </h4>
                                )}
                                
                                {msg.content.banner_image && (
                                    <div className="rounded-xl overflow-hidden shadow-inner border border-white/10 -mx-1">
                                        <img src={msg.content.banner_image} alt="" className="w-full h-auto object-cover max-h-60" />
                                    </div>
                                )}

                                <p className="whitespace-pre-wrap">{msg.content.text || msg.content.body}</p>

                                {msg.content.attachments && msg.content.attachments.length > 0 && (
                                    <div className="space-y-2 pt-2">
                                        {msg.content.attachments.map((file, i) => (
                                            <a key={i} href={file.url} target="_blank" rel="noreferrer"
                                               className={cn("flex items-center gap-3 p-3 rounded-2xl transition-all border", 
                                                         msg.is_me ? "bg-black/10 border-white/20 hover:bg-black/20" : "bg-gray-50 dark:bg-gray-750 border-gray-100 dark:border-gray-700 hover:bg-gray-100")}>
                                                <div className="p-2 rounded-xl bg-white/20 dark:bg-white/5">
                                                    <Paperclip className="h-4 w-4" />
                                                </div>
                                                <span className="text-xs font-medium truncate flex-1">{file.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-end gap-1.5 mt-2 opacity-70">
                                <span className="text-[10px] font-medium tracking-wide">
                                    {msg.is_optimistic ? 'Enviando...' : msg.created_at_human}
                                </span>
                                {msg.is_me && (
                                    <div className="flex items-center">
                                        {msg.is_optimistic ? (
                                            <div className="h-3 w-3 rounded-full border border-white/30 border-t-white animate-spin" />
                                        ) : msg.read_at ? (
                                            <CheckCheck className="h-4 w-4 text-white/90" />
                                        ) : (
                                            <Check className="h-4 w-4 text-white/60" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* ─── Modern Input Bar ─── */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 pb-8 z-20 border-t border-gray-100 dark:border-gray-800 transition-all duration-500">
                {!channel.permissions.can_send ? (
                    <div className="flex items-center justify-center p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                        <Megaphone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-400 italic">Este canal é somente para avisos.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className="flex items-center gap-3">
                        <button type="button" className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:scale-105 transition-all outline-none">
                            <Plus className="h-6 w-6" />
                        </button>
                        
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-[28px] px-5 py-1 flex items-center shadow-inner border border-transparent focus-within:border-gray-200 dark:focus-within:border-gray-700 transition-all group overflow-hidden">
                            <input
                                type="text"
                                placeholder="Sua mensagem..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 bg-transparent border-none text-[15px] focus:ring-0 outline-none text-gray-900 dark:text-gray-100 py-3 transition-colors"
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="h-14 w-14 rounded-[24px] flex items-center justify-center text-white shadow-lg disabled:opacity-50 disabled:grayscale hover:scale-105 active:scale-95 transition-all shrink-0"
                            style={{ backgroundColor: primaryColor, boxShadow: `${primaryColor}40 0 10px 0` }}
                        >
                            <Send className="h-6 w-6 ml-0.5" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
