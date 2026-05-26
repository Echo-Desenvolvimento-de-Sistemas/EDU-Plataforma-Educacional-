import React, { useState, useEffect, useMemo, useRef } from 'react';
import { cn, getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    Search, ArrowLeft, Send, Paperclip, MoreVertical, Info, 
    Image as ImageIcon, Heart, Smile, Camera, Mic, Sparkles, MessageCircle,
    Loader2, LayoutDashboard, Calendar, PlusSquare, ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

interface InstagramDirectViewProps {
    conversations: any[];
    selectedConversation: any | null;
    onSelectConversation: (convo: any) => void;
    chatMessages: any[];
    isLoadingChat: boolean;
    replyText: string;
    onReplyTextChange: (text: string) => void;
    onSendReply: (e: React.FormEvent) => void;
    isSending: boolean;
    auth: any;
    onRefresh: () => void;
    isRefreshing: boolean;
    onOpenCompose: () => void;
}

export const InstagramDirectView: React.FC<InstagramDirectViewProps> = ({
    conversations,
    selectedConversation,
    onSelectConversation,
    chatMessages,
    isLoadingChat,
    replyText,
    onReplyTextChange,
    onSendReply,
    isSending,
    auth,
    onRefresh,
    isRefreshing,
    onOpenCompose,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showMobileList, setShowMobileList] = useState(true);
    const chatBottomRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filteredConversations = useMemo(() => {
        if (!searchTerm.trim()) return conversations;
        const term = searchTerm.toLowerCase();
        return conversations.filter(c => 
            c.channel?.title?.toLowerCase().includes(term) ||
            c.lastMessage?.sender?.name?.toLowerCase().includes(term) ||
            (c.lastMessage?.content?.text || '').toLowerCase().includes(term)
        );
    }, [conversations, searchTerm]);

    const comunicados = useMemo(() => {
        return conversations.filter(c => 
            c.lastMessage?.type === 'comunicado' || 
            (c.channel?.title && c.channel.title.toLowerCase().includes('comunicado'))
        );
    }, [conversations]);

    useEffect(() => {
        if (selectedConversation) {
            setShowMobileList(false);
            setTimeout(() => {
                chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            setShowMobileList(true);
        }
    }, [selectedConversation, chatMessages.length]);

    const handleSelect = (convo: any) => {
        onSelectConversation(convo);
    };

    const handleBack = () => {
        setShowMobileList(true);
    };

    return (
        <div className="flex h-screen w-full bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100 overflow-hidden">
            {/* Sidebar (Conversations List) */}
            <div className={cn(
                "w-full md:w-[350px] lg:w-[400px] flex flex-col border-r border-gray-100 dark:border-gray-800 transition-all duration-300",
                !showMobileList && "hidden md:flex"
            )}>
                {/* Header */}
                <div className="p-5 flex flex-col gap-5 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 cursor-pointer group">
                             <h1 className="text-xl font-bold tracking-tight">
                                {(auth.user?.name || 'Usuário').split(' ')[0]}
                             </h1>
                             <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-1">
                            <Link href="/dashboard">
                                <Button size="icon" variant="ghost" className="rounded-full h-9 w-9">
                                    <LayoutDashboard className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/events">
                                <Button size="icon" variant="ghost" className="rounded-full h-9 w-9">
                                    <Calendar className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button size="icon" variant="ghost" className="rounded-full h-9 w-9" onClick={onOpenCompose}>
                                <PlusSquare className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors">
                            <Search className="h-4 w-4" />
                        </div>
                        <Input 
                            placeholder="Pesquisar" 
                            className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl pl-10 h-9 text-sm focus:ring-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Stories (Comunicados) */}
                    {comunicados.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto premium-scrollbar pb-2 mask-linear-right -mx-2 px-2 shrink-0">
                            {comunicados.map((convo) => (
                                <div 
                                    key={`story-${convo.channel?.id || Math.random()}`}
                                    onClick={() => handleSelect(convo)}
                                    className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                                >
                                    <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 transition-transform group-active:scale-90">
                                        <div className="p-[2.5px] rounded-full bg-white dark:bg-black">
                                            <Avatar className="h-14 w-14 ring-2 ring-transparent">
                                                <AvatarImage src={convo.channel?.icon} />
                                                <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-xs">
                                                    {getInitials(convo.channel?.title || 'C')}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-medium max-w-[64px] truncate opacity-80">
                                        {(convo.channel?.title || '...').split(' ')[0]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto premium-scrollbar border-t border-gray-100 dark:border-gray-800">
                    <div className="px-5 py-2">
                        <span className="text-sm font-bold tracking-tight">Mensagens</span>
                    </div>
                    {filteredConversations.length > 0 ? (
                        <div className="flex flex-col">
                            {filteredConversations.map((convo) => {
                                const isActive = selectedConversation?.channel?.id === convo.channel?.id && 
                                               selectedConversation?.channel?.target_id === convo.channel?.target_id;
                                const lastMsg = convo.lastMessage;
                                
                                return (
                                    <div 
                                        key={`${convo.channel?.id}-${convo.channel?.target_id}`}
                                        onClick={() => handleSelect(convo)}
                                        className={cn(
                                            "flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors relative",
                                            isActive ? "bg-gray-50 dark:bg-gray-900/50" : "hover:bg-gray-50 dark:hover:bg-gray-900/40"
                                        )}
                                    >
                                        <div className="relative shrink-0">
                                            <Avatar className={cn(
                                                "h-14 w-14 border border-gray-100 dark:border-gray-800",
                                                convo.channel?.unread_count > 0 && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-black"
                                            )}>
                                                <AvatarImage src={convo.channel?.icon} />
                                                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-500 font-bold">
                                                    {getInitials(convo.channel?.title || 'M')}
                                                </AvatarFallback>
                                            </Avatar>
                                            {convo.channel?.unread_count > 0 && (
                                                <div className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 bg-blue-500 rounded-full border-2 border-white dark:border-black shrink-0" />
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className={cn(
                                                    "text-sm truncate",
                                                    convo.channel?.unread_count > 0 ? "font-bold" : "font-medium"
                                                )}>
                                                    {convo.channel?.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                                                <p className={cn(
                                                    "text-sm truncate opacity-60",
                                                    convo.channel?.unread_count > 0 ? "font-bold text-gray-900 dark:text-gray-100 opacity-100" : ""
                                                )}>
                                                    {lastMsg?.content?.text || lastMsg?.content?.body || 'Inicie uma conversa'}
                                                </p>
                                                <span className="shrink-0 text-[11px] opacity-40">•</span>
                                                <span className="shrink-0 text-[11px] opacity-40 font-medium whitespace-nowrap">
                                                    {lastMsg?.created_at_date || ''}
                                                </span>
                                            </div>
                                        </div>
                                        {isActive && (
                                            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-blue-500" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-10 opacity-40 grayscale text-center">
                            <MessageCircle className="h-10 w-10 mb-2" />
                            <p className="text-sm font-medium">Nenhuma mensagem encontrada</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={cn(
                "flex-1 flex flex-col bg-white dark:bg-black transition-all",
                showMobileList && "hidden md:flex"
            )}>
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-[75px] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-5 shrink-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl z-20">
                            <div className="flex items-center gap-3 min-w-0">
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="md:hidden rounded-full mr-1 -ml-2"
                                    onClick={handleBack}
                                >
                                    <ArrowLeft className="h-6 w-6" />
                                </Button>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={selectedConversation.channel?.icon} />
                                    <AvatarFallback>{getInitials(selectedConversation.channel?.title || 'M')}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col min-w-0">
                                    <h2 className="text-sm font-bold truncate leading-tight">
                                        {selectedConversation.channel?.title}
                                    </h2>
                                    <span className="text-[11px] text-emerald-500 font-bold tracking-tight animate-pulse">
                                        Ativo agora
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button size="icon" variant="ghost" className="rounded-full">
                                    <Camera className="h-6 w-6" />
                                </Button>
                                <Button size="icon" variant="ghost" className="rounded-full">
                                    <Info className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-3 premium-scrollbar">
                            {isLoadingChat ? (
                                <div className="flex flex-col items-center justify-center h-full opacity-40">
                                    <Loader2 className="h-6 w-6 animate-spin mb-2" />
                                    <span className="text-xs font-medium">Carregando mensagens...</span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1.5">
                                    {chatMessages.map((msg, i) => {
                                        const isMyMessage = msg.is_me;
                                        const showAvatar = !isMyMessage && (i === 0 || chatMessages[i-1]?.is_me);
                                        const nextIsSame = i < chatMessages.length - 1 && chatMessages[i+1]?.is_me === isMyMessage;

                                        return (
                                            <div 
                                                key={msg.id} 
                                                className={cn(
                                                    "flex w-full group",
                                                    isMyMessage ? "justify-end" : "justify-start"
                                                )}
                                            >
                                                {!isMyMessage && (
                                                    <div className="w-8 shrink-0 mr-2 self-end">
                                                        {showAvatar && (
                                                            <Avatar className="h-7 w-7">
                                                                <AvatarImage src={msg.sender?.avatar} />
                                                                <AvatarFallback>{getInitials(msg.sender?.name || 'U')}</AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="flex flex-col max-w-[75%] md:max-w-[60%]">
                                                    <div
                                                        className={cn(
                                                            "px-4 py-2.5 text-sm transition-all duration-300",
                                                            isMyMessage 
                                                                ? "bg-blue-600 text-white" 
                                                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                                                            "rounded-3xl",
                                                            isMyMessage 
                                                                ? (nextIsSame ? "rounded-br-lg" : "") 
                                                                : (nextIsSame ? "rounded-bl-lg" : "")
                                                        )}
                                                    >
                                                        {msg.content?.text || msg.content?.body}
                                                    </div>
                                                    {!nextIsSame && (
                                                        <span className={cn(
                                                            "text-[10px] opacity-40 font-medium px-1 mt-1",
                                                            isMyMessage ? "text-right" : "text-left"
                                                        )}>
                                                            {msg.created_at}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={chatBottomRef} className="pt-2" />
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 shrink-0">
                            <form 
                                onSubmit={onSendReply}
                                className="relative flex items-center bg-transparent border border-gray-200 dark:border-gray-800 rounded-[26px] min-h-[44px] px-4 group focus-within:border-gray-400 dark:focus-within:border-gray-600 transition-all"
                            >
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full -ml-2 text-gray-500 hover:text-blue-500" type="button">
                                    <Smile className="h-6 w-6" />
                                </Button>
                                <Input 
                                    placeholder="Enviar mensagem..."
                                    className="flex-1 border-none bg-transparent h-10 text-sm focus:ring-0 px-2"
                                    value={replyText}
                                    onChange={(e) => onReplyTextChange(e.target.value)}
                                    disabled={isSending}
                                />
                                <div className="flex items-center gap-2">
                                    {replyText.trim() ? (
                                        <button 
                                            type="submit" 
                                            disabled={isSending}
                                            className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors px-2 disabled:opacity-50"
                                        >
                                            Enviar
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                             <button type="button" className="hover:text-blue-500 transition-colors">
                                                <Mic className="h-5 w-5" />
                                             </button>
                                             <button type="button" className="hover:text-blue-500 transition-colors" onClick={() => fileInputRef.current?.click()}>
                                                <ImageIcon className="h-5 w-5" />
                                             </button>
                                             <button type="button" className="hover:text-blue-500 transition-colors">
                                                <Heart className="h-5 w-5" />
                                             </button>
                                        </div>
                                    )}
                                </div>
                                <input type="file" className="hidden" ref={fileInputRef} />
                            </form>
                        </div>
                    </>
                ) : (
                    /* Initial Empty State */
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                        <div className="w-20 h-20 rounded-full border border-gray-900 dark:border-white flex items-center justify-center mb-4">
                             <MessageCircle className="h-10 w-10" />
                        </div>
                        <h2 className="text-xl font-bold mb-1 tracking-tight">Tuas mensagens</h2>
                        <p className="text-sm opacity-60 max-w-xs mb-6 px-10">
                            Envia fotos e mensagens privadas a um amigo ou grupo.
                        </p>
                        <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold px-6" onClick={onOpenCompose}>
                            Enviar mensagem
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
