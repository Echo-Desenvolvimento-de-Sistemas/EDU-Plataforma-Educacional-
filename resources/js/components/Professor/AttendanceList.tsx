import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AttendanceStatus, StudentAttendance } from "../Attendance/AttendanceTable";
import { Check, X, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    students: StudentAttendance[];
    onStatusChange: (studentId: number, status: AttendanceStatus) => void;
    readOnly?: boolean;
}

export function AttendanceList({ students, onStatusChange, readOnly = false }: Props) {

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    const getStatusColor = (status: AttendanceStatus) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:border-green-300';
            case 'absent': return 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200 hover:border-red-300';
            case 'justified': return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200 hover:border-yellow-300';
            case 'late': return 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 hover:border-orange-300';
            default: return 'bg-secondary text-secondary-foreground';
        }
    };

    const handleToggle = (student: StudentAttendance) => {
        if (readOnly) return;

        // Cycle: Present -> Absent -> Justified -> Present
        let nextStatus: AttendanceStatus = 'present';
        if (student.status === 'present') nextStatus = 'absent';
        else if (student.status === 'absent') nextStatus = 'justified';
        else if (student.status === 'justified') nextStatus = 'present';

        onStatusChange(student.id, nextStatus);
    };

    return (
        <div className="space-y-3 pb-24">
            {students.map((student) => (
                <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-card border rounded-xl shadow-sm transition-all active:scale-[0.99]"
                    onClick={() => handleToggle(student)}
                >
                    <div className="flex items-center gap-3 overflow-hidden">
                        <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} />
                            <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col min-w-0">
                            <span className="font-semibold truncate text-sm sm:text-base">
                                {student.name}
                            </span>
                            {/* Warning Icon for "At-Risk" students (mock logic: if name starts with A - just for demo) */}
                            {student.name.startsWith('A') && (
                                <span className="text-[10px] text-red-500 font-medium flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Atenção: Faltas
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="lg"
                        className={cn(
                            "h-12 w-16 rounded-lg border-2 transition-all duration-200 relative",
                            getStatusColor(student.status)
                        )}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent double trigger
                            handleToggle(student);
                        }}
                    >
                        {student.status === 'present' && <span className="font-bold text-lg">P</span>}
                        {student.status === 'absent' && <span className="font-bold text-lg">F</span>}
                        {student.status === 'justified' && <span className="font-bold text-lg">J</span>}

                        {/* Status Indicator Icon */}
                        {student.status === 'present' && <Check className="absolute right-1 top-1 w-3 h-3 opacity-50" />}
                        {student.status === 'absent' && <X className="absolute right-1 top-1 w-3 h-3 opacity-50" />}

                    </Button>
                </div>
            ))}
        </div>
    );
}
