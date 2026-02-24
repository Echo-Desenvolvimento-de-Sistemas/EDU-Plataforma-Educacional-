import clsx from 'clsx';
import { Check, Circle } from 'lucide-react';

interface Props {
    option: {
        id: number;
        label: string;
    };
    isSelected: boolean;
    onSelect: () => void;
    disabled?: boolean;
}

export default function OptionButton({ option, isSelected, onSelect, disabled }: Props) {
    return (
        <button
            onClick={onSelect}
            disabled={disabled}
            className={clsx(
                "w-full text-left p-6 rounded-xl border-2 transition-all duration-200 relative overflow-hidden group",
                isSelected
                    ? "border-primary bg-primary/10 shadow-md ring-2 ring-indigo-200 ring-offset-2"
                    : "border-gray-200 bg-white hover:border-primary/40 hover:bg-gray-50 hover:shadow-sm",
                disabled && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className="flex items-center gap-4">
                <div className={clsx(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    isSelected ? "border-primary bg-primary" : "border-gray-300 group-hover:border-indigo-400"
                )}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>

                <span className={clsx(
                    "text-lg font-medium",
                    isSelected ? "text-primary" : "text-gray-700"
                )}>
                    {option.label}
                </span>
            </div>
        </button>
    );
}
