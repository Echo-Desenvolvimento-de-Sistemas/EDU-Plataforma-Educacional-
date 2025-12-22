import { Link } from '@inertiajs/react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

interface Props {
    activity: {
        id: number;
        title: string;
        description: string | null;
        deadline: string | null;
        class_room?: {
            name: string;
        };
        attempts_count?: number; // For student view if needed to show status
    };
    role: 'professor' | 'student';
}

export default function ActivityCard({ activity, role }: Props) {
    const isStudent = role === 'student';
    const href = isStudent
        ? `/aluno/activities/${activity.id}/play`
        : `/professor/activities/${activity.id}`;

    return (
        <Link
            href={href}
            className="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
        >
            {/* Progress bar placeholder - can be dynamic later */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
                <div className="h-full bg-indigo-500 w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                        <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                    {activity.deadline && (
                        <span className="text-xs font-medium px-2 py-1 bg-amber-50 text-amber-700 rounded-md border border-amber-100 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(activity.deadline).toLocaleDateString()}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                    {activity.title}
                </h3>

                {activity.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {activity.description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        {activity.class_room && (
                            <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-medium">
                                {activity.class_room.name}
                            </span>
                        )}
                    </div>

                    <span className="text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                        {isStudent ? 'Iniciar' : 'Detalhes'} &rarr;
                    </span>
                </div>
            </div>
        </Link>
    );
}
