export interface ClassRoom {
    id: number;
    name: string;
    grade_id?: number;
    grade?: {
        id: number;
        name: string;
    };
}

export interface Subject {
    id: number;
    name: string;
}

export interface Student {
    id: number;
    name: string;
    cpf: string;
    email?: string;
    birth_date?: string;
    status: 'active' | 'cancelled' | 'transferred' | 'graduated';
    class_room_id?: number;
    class_room?: ClassRoom;
    photo_path?: string;
}

export interface LessonPlan {
    id: number;
    user_id: number;
    class_room_id: number;
    subject_id: number;
    start_date: string;
    end_date: string;
    topic: string;
    status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REQUEST_CHANGES';
    class_room?: ClassRoom;
    subject?: Subject;
    bncc_skills?: any[];
}

export interface Attendance {
    id: number;
    student_id: number;
    class_diary_id: number;
    status: 'present' | 'absent' | 'late' | 'justified';
    observations?: string;
}
