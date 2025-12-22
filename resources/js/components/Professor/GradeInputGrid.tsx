import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface StudentGrade {
    id: number;
    name: string;
    grade: number | string; // string for empty state
    originalGrade?: number | string; // to track changes
}

interface Props {
    students: StudentGrade[];
    maxGrade: number;
    onGradeChange: (studentId: number, grade: number | string) => void;
}

export function GradeInputGrid({ students, maxGrade, onGradeChange }: Props) {
    // We keep a local state for optimistic UI and input management
    const [localStudents, setLocalStudents] = useState<StudentGrade[]>(students);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        setLocalStudents(students);
    }, [students]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
            e.preventDefault();
            if (index < students.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleChange = (index: number, value: string) => {
        const newStudents = [...localStudents];

        // Validation logic
        let isValid = true;
        const numValue = parseFloat(value);

        if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > maxGrade)) {
            isValid = false;
        }

        newStudents[index] = { ...newStudents[index], grade: value };
        setLocalStudents(newStudents);

        if (isValid) {
            onGradeChange(newStudents[index].id, value);
        }
    };

    return (
        <Card className="border-0 shadow-none sm:border sm:shadow-sm">
            <CardContent className="p-0">
                <div className="grid grid-cols-[3fr_1fr] sm:grid-cols-[4fr_1fr] gap-0 text-sm font-medium border-b bg-muted/40 p-2 text-muted-foreground uppercase tracking-wider">
                    <div className="pl-2">Nome do Aluno</div>
                    <div className="text-center">Nota (0-{maxGrade})</div>
                </div>

                <div className="divide-y">
                    {localStudents.map((student, index) => {
                        const numGrade = parseFloat(String(student.grade));
                        const isInvalid = student.grade !== '' && (isNaN(numGrade) || numGrade < 0 || numGrade > maxGrade);
                        const isDanger = !isInvalid && student.grade !== '' && numGrade < (maxGrade * 0.6); // Red if < 60%

                        return (
                            <div key={student.id} className="grid grid-cols-[3fr_1fr] sm:grid-cols-[4fr_1fr] items-center p-2 hover:bg-muted/10 transition-colors">
                                <div className="flex items-center gap-3 pl-2 overflow-hidden">
                                    <Avatar className="h-8 w-8 hidden sm:block">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} />
                                        <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="truncate py-2">{student.name}</span>
                                </div>
                                <div className="px-1">
                                    <Input
                                        ref={el => { inputRefs.current[index] = el; }}
                                        value={student.grade}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className={cn(
                                            "text-center font-mono h-10 text-lg sm:h-9 sm:text-base transition-colors",
                                            isInvalid && "border-red-500 bg-red-50 text-red-900 focus-visible:ring-red-500",
                                            isDanger && !isInvalid && "text-red-600 font-bold"
                                        )}
                                        placeholder="-"
                                        type="number"
                                        min="0"
                                        max={maxGrade}
                                        step="0.1"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
