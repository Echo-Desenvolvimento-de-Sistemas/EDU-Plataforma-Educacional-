import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, MapPin, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Props {
    className?: string;
    classData: {
        id: number;
        name: string;
        subject: string;
        room: string;
        time: string;
        grade: string;
    };
}

export function DashboardCard({ className, classData }: Props) {
    return (
        <Card className={`overflow-hidden border-2 border-blue-600/20 ${className}`}>
            <CardHeader className="bg-blue-600/5 pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 block">
                            Próxima Aula
                        </span>
                        <CardTitle className="text-2xl font-bold">{classData.grade}</CardTitle>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center text-muted-foreground text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {classData.time}
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">{classData.subject}</h3>
                        <p className="text-sm text-muted-foreground">{classData.name}</p>
                    </div>

                    {/* Room Removed as per user request (no real data) */}
                </div>
            </CardContent>
            <CardFooter className="bg-muted/30 pt-4">
                <Button asChild size="lg" className="w-[80%] mx-auto font-bold shadow-md bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/professor/classes/${classData.id}/attendance/create`}>
                        <BookOpen className="w-5 h-5 mr-2" />
                        Iniciar Chamada
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
