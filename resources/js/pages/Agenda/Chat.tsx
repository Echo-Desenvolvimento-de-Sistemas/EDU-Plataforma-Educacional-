import React, { useEffect, useRef, useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Send, Check, CheckCheck, RefreshCcw, Loader2 } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import axios from 'axios';
import { MessageCard } from './Components/MessageCard';

interface Message {
    id: number;
    body: string;
    type: 'TEXT' | 'IMAGE' | 'FILE' | 'POLL';
    metadata: any;
    created_at: string;
    is_me: boolean;
    sender_name: string;
    read_at: string | null;
}

interface Channel {
    id: number;
    name: string;
    icon?: string;
}

interface Props {
    channel: Channel;
    messages: {
        data: Message[];
        links: any[];
    };
}

export default function Chat({ channel, messages: initialMessages }: Props) {
    const [messages, setMessages] = useState(initialMessages.data.slice().reverse());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        setMessages(initialMessages.data.slice().reverse());
    }, [initialMessages]);

    const scrollToBottom = (smooth = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    };

    useEffect(() => {
        if (firstLoad) {
            scrollToBottom(false);
            setFirstLoad(false);
        } else {
            // Optional: only scroll if user was already at bottom or if it's a new message from me
            // For now, let's auto scroll for simplicity on new messages
            scrollToBottom();
        }
    }, [messages]);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshMessages = async () => {
        try {
            const response = await axios.get(`/agenda/channels/${channel.id}/poll?t=${Date.now()}`);
            const newMessages = response.data.data.slice().reverse();

            setMessages(prev => {
                if (!newMessages || newMessages.length === 0) return prev;

                // Deep compare optimization
                const getSignature = (list: any[]) => list.map(m => `${m.id}-${m.read_at || 'null'}`).join('|');

                if (getSignature(prev) !== getSignature(newMessages)) {
                    return newMessages;
                }
                return prev;
            });
        } catch (error) {
            console.error("Poll failed", error);
        }
    };

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        await refreshMessages();
        setTimeout(() => setIsRefreshing(false), 500);
    };

    // Polling every 4 seconds
    useEffect(() => {
        const interval = setInterval(refreshMessages, 4000);
        return () => clearInterval(interval);
    }, [channel.id]);

    useEffect(() => {
        // Mark unread messages as read
        messages.forEach(msg => {
            if (!msg.is_me && !msg.read_at) {
                markAsRead(msg.id);
            }
        });
    }, [messages]);

    const markAsRead = async (id: number) => {
        try {
            await axios.post(`/agenda/messages/${id}/read`);
        } catch (error) {
            console.error('Failed to mark read', error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
            <Head title={channel.name} />

            {/* Standard Background */}
            <div className="fixed inset-0 z-0 bg-gray-50 dark:bg-gray-900" />

            {/* Header */}
            <div className="mx-4 mt-4 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm inset ring-1 ring-white/30 dark:ring-white/5 pt-3 pb-3 px-4 flex items-center gap-2 sticky top-4 z-20">
                <button
                    onClick={() => window.history.back()}
                    className="p-2 -ml-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all group"
                >
                    <ArrowLeft size={24} className="text-gray-700 dark:text-gray-200" />
                </button>

                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 border border-white/50 dark:border-gray-600 overflow-hidden">
                        {channel.icon && (channel.icon.startsWith('http') || channel.icon.startsWith('/')) ? (
                            <img src={channel.icon} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">{getInitials(channel.name)}</span>
                        )}
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate leading-none mb-0.5">{channel.name}</h1>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Toque para ver dados</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleManualRefresh}
                    disabled={isRefreshing}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-all active:scale-95"
                >
                    {isRefreshing ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <RefreshCcw size={20} />
                    )}
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-6 space-y-6 z-10">
                {messages.map((msg) => (
                    // @ts-ignore
                    <MessageCard key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Placeholder */}
            <div className="p-4 bg-transparent safe-area-bottom z-10">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-[2rem] shadow-sm p-2 px-3 flex items-center gap-2 border border-white/20 dark:border-white/5">
                    <input
                        type="text"
                        placeholder="Não é possível responder..."
                        disabled
                        className="flex-1 bg-transparent border-none py-3 px-4 text-sm focus:ring-0 text-gray-500 dark:text-gray-400 placeholder:text-gray-400 dark:placeholder:text-gray-600 italic h-12"
                    />
                    <button disabled className="h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-full shrink-0">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
