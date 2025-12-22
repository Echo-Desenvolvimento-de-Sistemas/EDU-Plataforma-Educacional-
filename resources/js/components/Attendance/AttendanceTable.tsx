import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Check, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'justified';

export interface StudentAttendance {
    id: number;
    name: string;
    photo_url?: string;
    status: AttendanceStatus;
    observations?: string;
    is_justified?: boolean;
    justification_details?: string;
}

interface Props {
    students: StudentAttendance[];
    onStatusChange: (studentId: number, status: AttendanceStatus) => void;
    onObservationChange: (studentId: number, observation: string) => void;
    readOnly?: boolean;
}

export default function AttendanceTable({ students, onStatusChange, onObservationChange, readOnly = false }: Props) {
    return (
        <div className="rounded-md border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40%] sm:w-[300px]">Aluno</TableHead>
                        <TableHead className="text-center w-[40%] sm:w-auto">Presença</TableHead>
                        <TableHead className="w-[20%] text-right sm:text-left">Obs</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id} className={cn(
                            "transition-colors",
                            student.status === 'absent' && !student.is_justified && "bg-red-50/50 dark:bg-red-950/20"
                        )}>
                            <TableCell className="py-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 sm:h-9 sm:w-9 border-2 border-background shadow-sm">
                                        <AvatarImage src={student.photo_url} alt={student.name} />
                                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm sm:text-base leading-tight">{student.name}</span>
                                        {student.is_justified && (
                                            <div className="flex gap-1 mt-1">
                                                <Badge variant="outline" className="text-[10px] px-1 py-0 border-blue-500 text-blue-600 bg-blue-50">
                                                    Justificado
                                                </Badge>
                                            </div>
                                        )}
                                        {student.status === 'late' && (
                                            <span className="text-xs text-yellow-600 font-medium sm:hidden">Atraso</span>
                                        )}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="p-2 text-center">
                                {readOnly ? (
                                    <StatusBadge status={student.status} isJustified={student.is_justified} />
                                ) : (
                                    student.is_justified ? (
                                        <div className="flex justify-center">
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 border-none px-3 py-1">
                                                <Check className="h-3 w-3 mr-1" />
                                                Presença Efetiva
                                            </Badge>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 sm:gap-4">
                                            <CustomToggle
                                                active={student.status === 'present'}
                                                variant="success"
                                                onClick={() => onStatusChange(student.id, 'present')}
                                                disabled={student.is_justified}
                                            >
                                                P
                                            </CustomToggle>

                                            <CustomToggle
                                                active={student.status === 'absent'}
                                                variant="danger"
                                                onClick={() => onStatusChange(student.id, 'absent')}
                                                disabled={student.is_justified}
                                            >
                                                F
                                            </CustomToggle>
                                        </div>
                                    )
                                )}
                            </TableCell>
                            <TableCell className="text-right sm:text-left">
                                <ObservationPopover
                                    student={student}
                                    onChange={onObservationChange}
                                    readOnly={readOnly}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function CustomToggle({
    active,
    variant,
    children,
    onClick,
    disabled
}: {
    active: boolean;
    variant: 'success' | 'danger';
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}) {
    const baseStyles = "h-10 w-10 sm:h-9 sm:w-9 rounded-full font-bold text-lg sm:text-sm transition-all shadow-sm active:scale-95";
    const variantStyles = variant === 'success'
        ? (active ? "bg-green-500 text-white hover:bg-green-600 ring-2 ring-green-200" : "bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600")
        : (active ? "bg-red-500 text-white hover:bg-red-600 ring-2 ring-red-200" : "bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600");

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(baseStyles, variantStyles, disabled && "opacity-50 cursor-not-allowed")}
        >
            {children}
        </button>
    );
}

function ObservationPopover({
    student,
    onChange,
    readOnly
}: {
    student: StudentAttendance;
    onChange: (id: number, val: string) => void;
    readOnly: boolean;
}) {
    const hasObs = student.observations && student.observations.length > 0;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={hasObs ? "outline" : "ghost"}
                    size="icon"
                    className={cn(
                        "h-8 w-8 sm:h-9 sm:w-9",
                        hasObs && "border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    )}
                >
                    <MessageSquare className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Observações</h4>
                    <p className="text-sm text-muted-foreground">
                        {readOnly ? 'Notas sobre o aluno.' : 'Adicione notas sobre, atrasos ou comportamento.'}
                    </p>
                    {readOnly ? (
                        <div className="p-2 bg-muted rounded-md text-sm min-h-[60px]">
                            {student.observations || 'Nenhuma observação.'}
                        </div>
                    ) : (
                        <Textarea
                            value={student.observations || ''}
                            onChange={(e) => onChange(student.id, e.target.value)}
                            placeholder="Ex: Chegou atrasado, esqueceu material..."
                            className="h-24 resize-none"
                        />
                    )}

                    {student.is_justified && student.justification_details && (
                        <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                            <strong>Justificativa:</strong> {student.justification_details}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

function StatusBadge({ status, isJustified }: { status: AttendanceStatus; isJustified?: boolean }) {
    if (isJustified) {
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Justificado</Badge>;
    }
    switch (status) {
        case 'present':
            return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Presente</Badge>;
        case 'absent':
            return <Badge variant="destructive">Faltou</Badge>;
        case 'late':
            return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Atraso</Badge>;
    }
}
