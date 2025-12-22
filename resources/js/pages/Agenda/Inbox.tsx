import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ComposeModal } from '@/pages/Agenda/Components/ComposeModal';
import { cn, getInitials } from '@/lib/utils';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Settings, Search, Moon, Sun, RefreshCcw, Loader2 } from 'lucide-react';

interface Channel {
    id: number;
    name: string;
    icon?: string;
    last_message: string | null;
    last_message_at: string | null;
    unread_count: number;
}

interface AllowedChannel {
    id: number;
    name: string;
}

interface Props {
    channels: Channel[];
    allowedChannels?: AllowedChannel[];
    canConfigure?: boolean;
}

export default function Inbox({ channels, allowedChannels = [], canConfigure = false }: Props) {
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { appearance, updateAppearance } = useAppearance();
    const { settings } = usePage<any>().props;

    const toggleTheme = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');
    };

    const logoLight = settings?.logo_light_url || settings?.logo_url;
    const logoDark = settings?.logo_dark_url || settings?.logo_url;

    const [localChannels, setLocalChannels] = useState(channels);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Sync props with local state
    useEffect(() => {
        setLocalChannels(channels);
    }, [channels]);

    const refreshInbox = async () => {
        try {
            const response = await axios.get(`/agenda/inbox?t=${Date.now()}`, {
                headers: { 'Accept': 'application/json' }
            });
            const newChannels = response.data.channels;

            setLocalChannels(prev => {
                // Optimization: JSON comparison
                if (JSON.stringify(prev) !== JSON.stringify(newChannels)) {
                    return newChannels;
                }
                return prev;
            });
        } catch (error) {
            console.error("Inbox poll failed", error);
        }
    };

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        await refreshInbox();
        setTimeout(() => setIsRefreshing(false), 500);
    };

    // Poll every 5 seconds
    useEffect(() => {
        const interval = setInterval(refreshInbox, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredChannels = localChannels.filter(channel =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-full flex-col bg-background">
            <Head title="Agenda" />

            {/* Standard Background */}
            <div className="fixed inset-0 z-0 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" />

            {/* Header */}
            <div className="sticky top-0 z-20 mx-4 mt-4 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm inset ring-1 ring-white/30 dark:ring-white/5 px-4 py-4 transition-all duration-200">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="p-2 -ml-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-foreground transition-all group">
                            <ArrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                        </Link>
                        {logoLight || logoDark ? (
                            <>
                                <img src={logoLight} alt="Logo" className="h-8 w-auto object-contain dark:hidden" />
                                <img src={logoDark} alt="Logo" className="h-8 w-auto object-contain hidden dark:block" />
                            </>
                        ) : (
                            <h1 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Mensagens</h1>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                            onClick={handleManualRefresh}
                            disabled={isRefreshing}
                        >
                            {isRefreshing ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <RefreshCcw className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                            onClick={toggleTheme}
                        >
                            {appearance === 'dark' ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>
                        {canConfigure && (
                            <Link href="/admin/agenda/settings">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-full h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                                >
                                    <Settings className="h-6 w-6" />
                                </Button>
                            </Link>
                        )}
                        {allowedChannels.length > 0 && (
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full h-10 w-10 text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
                                onClick={() => setIsComposeOpen(true)}
                            >
                                <Plus className="h-7 w-7" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input
                        placeholder="Buscar"
                        className="pl-9 bg-gray-100/50 dark:bg-gray-900/50 border-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 focus-visible:ring-0 h-10 rounded-xl transition-all hover:bg-gray-100 dark:hover:bg-gray-900"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 z-10 mt-4">
                {filteredChannels.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center space-y-3 text-muted-foreground mt-10">
                        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4">
                            <Search className="h-8 w-8 opacity-50 text-gray-500 dark:text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-600 dark:text-gray-400">Nenhum canal encontrado.</p>
                    </div>
                ) : (
                    <div className="space-y-3 pt-2">
                        {filteredChannels.map((channel) => (
                            <Link
                                key={channel.id}
                                href={`/agenda/channels/${channel.id}`}
                                className="group flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 border border-white/40 dark:border-white/5 shadow-sm hover:shadow-md backdrop-blur-md hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {/* Icon / Avatar */}
                                <div className="relative">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-bold border border-white/50 dark:border-gray-600 overflow-hidden">
                                        {channel.icon && (channel.icon.startsWith('http') || channel.icon.startsWith('/')) ? (
                                            <img src={channel.icon} alt="" className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-lg">{getInitials(channel.name)}</span>
                                        )}
                                    </div>
                                    {/* Online/Status Indicator Generic */}
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 border-b border-gray-100 dark:border-gray-700/50 pb-2 group-last:border-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h2 className="font-bold text-base truncate text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white">
                                            {channel.name}
                                        </h2>
                                        {channel.last_message_at && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0 ml-2">
                                                {channel.last_message_at}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center gap-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate flex-1 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200">
                                            {channel.last_message || 'Nenhuma mensagem'}
                                        </p>
                                        {channel.unread_count > 0 && (
                                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-[10px] font-bold text-white shadow-sm">
                                                {channel.unread_count}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <ComposeModal
                isOpen={isComposeOpen}
                onClose={() => setIsComposeOpen(false)}
                channels={allowedChannels}
                submitUrl={canConfigure ? '/admin/agenda/message' : '/professor/agenda/message'}
            />
        </div>
    );
}
