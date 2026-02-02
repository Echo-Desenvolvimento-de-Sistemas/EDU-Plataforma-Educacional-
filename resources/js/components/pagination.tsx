import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 1) return null;

    return (
        <div className="flex flex-wrap justify-center gap-1 mt-6">
            {links.map((link, key) => {
                // Decode HTML entities (like &laquo;, &raquo;)
                const label = link.label
                    .replace('&laquo; Previous', '«')
                    .replace('Next &raquo;', '»')
                    .replace('pagination.previous', '«')
                    .replace('pagination.next', '»');

                return link.url === null ? (
                    <Button
                        key={key}
                        variant="ghost"
                        disabled
                        className="h-8 w-8 p-0 text-gray-400"
                    >
                        <span dangerouslySetInnerHTML={{ __html: label }} />
                    </Button>
                ) : (
                    <Button
                        key={key}
                        asChild
                        variant={link.active ? "default" : "outline"}
                        className={cn("h-8 w-8 p-0", link.active ? "pointer-events-none" : "")}
                    >
                        <Link href={link.url}>
                            <span dangerouslySetInnerHTML={{ __html: label }} />
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
}
