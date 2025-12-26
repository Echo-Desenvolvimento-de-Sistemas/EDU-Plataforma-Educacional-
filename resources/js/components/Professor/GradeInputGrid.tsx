import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface Assessment {
    id: number;
    title: string;
    weight: number;
}

interface StudentGrade {
    id: number;
    name: string;
    grades: Record<string, string>; // assessmentId -> grade
    originalGrades: Record<string, string>;
}

interface Props {
    students: StudentGrade[];
    assessments: Assessment[];
    onGradeChange: (studentId: number, assessmentId: string, grade: string) => void;
    onDeleteAssessment: (assessmentId: number) => void;
}

export function GradeInputGrid({ students, assessments, onGradeChange, onDeleteAssessment }: Props) {
    const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    // Helper to get ref key
    const getRefKey = (studentId: number, assessmentId: number) => `${studentId}-${assessmentId}`;

    const handleKeyDown = (e: React.KeyboardEvent, studentIndex: number, assessmentIndex: number) => {
        const currentStudent = students[studentIndex];
        const currentAssessment = assessments[assessmentIndex];

        if (!currentStudent || !currentAssessment) return;

        let nextStudentId: number | undefined;
        let nextAssessmentId: number | undefined;

        if (e.key === 'ArrowDown' || e.key === 'Enter') {
            e.preventDefault();
            if (studentIndex < students.length - 1) {
                nextStudentId = students[studentIndex + 1].id;
                nextAssessmentId = currentAssessment.id;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (studentIndex > 0) {
                nextStudentId = students[studentIndex - 1].id;
                nextAssessmentId = currentAssessment.id;
            }
        }

        if (nextStudentId !== undefined && nextAssessmentId !== undefined) {
            const key = getRefKey(nextStudentId, nextAssessmentId);
            inputRefs.current[key]?.focus();
        }
    };

    const handleChange = (studentId: number, assessmentId: string, value: string) => {
        onGradeChange(studentId, assessmentId, value);
    };

    return (
        <Card className="border-0 shadow-none sm:border sm:shadow-sm overflow-hidden">
            <CardContent className="p-0">
                <div className="overflow-x-auto pb-5">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead className="w-[300px] min-w-[200px]">Estudante</TableHead>
                                {assessments.map(assessment => (
                                    <TableHead key={assessment.id} className="text-center min-w-[140px] align-top bg-muted/40 p-2">
                                        <div className="flex flex-col items-center gap-1 group relative">
                                            <div className="flex items-center justify-center gap-2 w-full">
                                                <span className="font-semibold text-foreground whitespace-nowrap truncate max-w-[100px]" title={assessment.title}>
                                                    {assessment.title}
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-6 w-6 p-0 hover:bg-slate-200 rounded-full" >
                                                            <MoreVertical className="h-3 w-3" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            className="text-red-600 focus:text-red-700 cursor-pointer"
                                                            onClick={() => onDeleteAssessment(assessment.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Excluir Avaliação
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <Badge variant="outline" className="text-xs font-normal">
                                                Peso: {assessment.weight}
                                            </Badge>
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student, sIdx) => {
                                return (
                                    <TableRow key={student.id} className="hover:bg-muted/5">
                                        <TableCell className="font-medium p-2 pl-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 hidden sm:block">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} />
                                                    <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span className="truncate max-w-[180px] sm:max-w-[250px]" title={student.name}>{student.name}</span>
                                            </div>
                                        </TableCell>
                                        {assessments.map((assessment, aIdx) => {
                                            const grade = student.grades[assessment.id] || '';
                                            const numGrade = parseFloat(grade);
                                            const maxScore = 100; // Assumed max
                                            const isInvalid = grade !== '' && (isNaN(numGrade) || numGrade < 0 || numGrade > maxScore);
                                            const isChanged = grade !== (student.originalGrades[assessment.id] || '');
                                            const isDanger = !isInvalid && grade !== '' && numGrade < 60;

                                            return (
                                                <TableCell key={assessment.id} className="p-1.5 text-center">
                                                    <div className="flex justify-center">
                                                        <Input
                                                            ref={el => {
                                                                if (el) inputRefs.current[getRefKey(student.id, assessment.id)] = el;
                                                                else delete inputRefs.current[getRefKey(student.id, assessment.id)];
                                                            }}
                                                            value={grade}
                                                            onChange={(e) => handleChange(student.id, assessment.id.toString(), e.target.value)}
                                                            onKeyDown={(e) => handleKeyDown(e, sIdx, aIdx)}
                                                            className={cn(
                                                                "text-center font-mono h-9 w-20 text-base transition-all",
                                                                isInvalid && "border-red-500 bg-red-50 text-red-900 focus-visible:ring-red-500",
                                                                !isInvalid && isDanger && "text-red-600 font-bold",
                                                                !isInvalid && isChanged && "border-blue-400 bg-blue-50/50"
                                                            )}
                                                            placeholder="-"
                                                            type="number"
                                                            min="0"
                                                            step="0.1"
                                                            lang="en"
                                                        />
                                                    </div>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    {students.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            Nenhum aluno encontrado para os filtros selecionados.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
