import React, { useState } from 'react';
import { Paperclip, Check, CheckCheck, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MessageCardProps {
    message: {
        id: number;
        title?: string;
        body: string;
        type: string;
        type_label: string; // New field
        visual_context: string;
        metadata: any;
        actions?: { type: string; label: string; data: any; style: string }[];
        created_at_human: string;
        created_at: string;
        is_me: boolean;
        sender: {
            name: string;
            role?: string;
            avatar?: string;
        };
        read_at: string | null;
    };
}

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const borderColor = message.visual_context || '#e2e8f0';
    const isTruncated = message.body.length > 200 && !isExpanded;

    return (
        <div className={`flex ${message.is_me ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`flex gap-3 max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[500px] ${message.is_me ? 'flex-row-reverse' : 'flex-row'}`}
            >
                {/* Avatar (Left/Right) */}
                {!message.is_me && (
                    <div className="flex-shrink-0">
                        {message.sender.avatar ? (
                            <img src={message.sender.avatar} alt={message.sender.name} className="w-10 h-10 rounded-full border border-gray-200" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold border border-gray-300">
                                {message.sender.name.charAt(0)}
                            </div>
                        )}
                    </div>
                )}

                {/* Card Container */}
                <div
                    className={`flex-1 rounded-2xl shadow-sm border bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden relative`}
                    style={{ borderTopColor: message.visual_context, borderTopWidth: '4px' }}
                >
                    {/* A. Header */}
                    <div className="flex items-start justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 gap-2">
                        <div className="flex flex-col min-w-0 items-start gap-1">
                            <span className="font-bold text-sm text-gray-900 dark:text-gray-100 leading-tight truncate">
                                {message.is_me ? 'Você' : message.sender.name}
                            </span>
                            {!message.is_me && message.sender.role && (
                                <span className="text-[10px] uppercase tracking-wide font-medium text-gray-500 leading-none">
                                    {message.sender.role}
                                </span>
                            )}
                            <span
                                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap mt-0.5"
                                style={{ backgroundColor: message.visual_context }}
                            >
                                {message.type_label || message.type}
                            </span>
                        </div>
                        <div className="flex items-center pt-0.5">
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                                {message.created_at_human}
                            </span>
                        </div>
                    </div>

                    {/* B. Media (Banner) */}
                    {message.metadata?.banner_image && (
                        <div className="w-full bg-gray-50 border-b border-gray-100 dark:border-gray-700/50">
                            <img
                                src={message.metadata.banner_image}
                                alt="Banner"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    )}

                    {/* C. Body */}
                    <div className="p-4 space-y-2">
                        {message.title && (
                            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 leading-snug">
                                {message.title}
                            </h3>
                        )}

                        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {isTruncated ? `${message.body.substring(0, 200)}...` : message.body}
                        </div>

                        {message.body.length > 200 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 mt-1 focus:outline-none"
                            >
                                {isExpanded ? 'Ler menos' : 'Ver mais'}
                            </button>
                        )}
                    </div>

                    {/* D. Attachments */}
                    {message.metadata?.attachments && message.metadata.attachments.length > 0 && (
                        <div className="px-4 pb-3 space-y-2">
                            {message.metadata.attachments.map((file: any, index: number) => (
                                <a
                                    key={index}
                                    href={file.url}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer group"
                                >
                                    <div className="p-2 rounded bg-white dark:bg-gray-600 text-blue-500 shadow-sm group-hover:text-blue-600">
                                        <FileText size={16} />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate group-hover:underline decoration-blue-500/50">{file.name}</p>
                                        <p className="text-[10px] text-gray-500">{file.size}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* E. Actions */}
                    {message.actions && message.actions.length > 0 && (
                        <div className="px-4 pb-4 pt-2">
                            {message.actions.map((action, idx) => (
                                <Button
                                    key={idx}
                                    className="w-full shadow-sm font-semibold rounded-lg"
                                    // Normally you'd map styles here. For now, using inline or Tailwind classes.
                                    variant={action.style === 'outline' ? 'outline' : 'default'}
                                    style={{
                                        backgroundColor: action.style === 'primary' ? message.visual_context : undefined,
                                        borderColor: action.style === 'primary' ? message.visual_context : undefined,
                                    }}
                                    onClick={() => {
                                        if (action.type === 'LINK' && action.data) {
                                            window.open(action.data, '_blank');
                                        } else {
                                            console.log('Action Clicked', action);
                                        }
                                    }}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    )}

                    {/* F. Footer Status */}
                    <div className="px-3 pb-2 flex justify-end">
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                            {message.is_me && (
                                <span className={message.read_at ? 'text-blue-500' : 'text-gray-400'}>
                                    {message.read_at ? <CheckCheck size={14} /> : <Check size={14} />}
                                </span>
                            )}
                            {/* Time is already in header, but user requirement "Ícone discreto de Lido no canto inferior direito" */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
