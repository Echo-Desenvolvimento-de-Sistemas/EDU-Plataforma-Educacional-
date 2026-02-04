import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';
import { usePage } from '@inertiajs/react';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    // Use passed user prop, but fallback to auth stats if it matches current user
    // We need to cast auth to any because gamification prop is not in the base User type yet (it's in Auth interface)
    const { auth } = usePage<any>().props;
    const stats = auth.user.id === user.id ? auth.gamification : null;

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
                {stats && (
                    <div className="mt-1 flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                        <span className="flex items-center gap-1">
                            🏆 Nível {stats.level}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span>{stats.points} XP</span>
                    </div>
                )}
            </div>
        </>
    );
}
