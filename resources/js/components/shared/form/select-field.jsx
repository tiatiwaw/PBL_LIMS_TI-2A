import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

export default function SelectField({
    id,
    label,
    icon: Icon,
    value,
    onChange,
    error,
    options = [],
    placeholder = 'Pilih opsi',
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-medium text-[#024D60]">
                {label}
            </Label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                )}
                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger
                        id={id}
                        className={`pl-10 h-12 font-semibold text-[#024D60] !border-primary-hijauMuda ${error
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-2'
                            }`}
                        style={{
                            '--tw-ring-color': error ? '#ef4444' : '#2CACAD',
                        }}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value} className="capitalize">
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {error && <p className="text-sm font-semibold text-red-500 mt-1">{error}</p>}
        </div>
    );
}