import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import SelectField from "../form/select-field";
import DatePicker from "../form/date-picker";
import InputField from "../form/input-field";
import ButtonField from "../form/button-field";

export default function UpsertDialog({
    open,
    onOpenChange,
    data,
    onSave,
    fields = [],
    title,
    description,
}) {
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getNestedValue = (obj, path) => {
        if (!obj || !path) return undefined;
        const pathArray = path.split('.');
        return pathArray.reduce((current, key) => (current && current[key] !== undefined ? current[key] : undefined), obj);
    };

    useEffect(() => {
        if (open) {
            const initialData = fields.reduce((acc, field) => {
                let initialValue = field.defaultValue ?? "";

                if (data) {
                    if (field.initialValuePath) {
                        initialValue = getNestedValue(data, field.initialValuePath) ?? initialValue;
                    }

                    if (initialValue === (field.defaultValue ?? "") || initialValue === "") {
                        initialValue = data[field.name] ?? data[field.value] ?? initialValue;
                    }
                }

                if (field.type === "date" && initialValue && typeof initialValue === 'string') {
                    initialValue = new Date(initialValue);
                }

               
                if (field.type === "button") {
                    initialValue = field.data || [];
                }

                acc[field.name] = initialValue ?? "";
                return acc;
            }, {});
            setFormData((prev) => {
                if (!prev.role || !Object.keys(prev).length) {
                    return initialData;
                }

                const updatedData = { ...prev };
                fields.forEach(field => {
                    if (field.type === "button") {
                        updatedData[field.name] = field.data || [];
                    }
                });

                return updatedData;
            })
        } else {
            setFormData({});
        }
    }, [data, fields, open]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);

            const dataToSave = { ...formData };

            fields.forEach(field => {
                const formFieldName = field.name;
                const saveKey = field.savePath || formFieldName;

                if (field.type === "date" && dataToSave[formFieldName] instanceof Date) {
                    dataToSave[formFieldName] = dataToSave[formFieldName].toISOString().split('T')[0];
                }

                if (field.type === "button") {
                    dataToSave[formFieldName] = field.data || [];
                }

                if (saveKey !== formFieldName) {
                    dataToSave[formFieldName];
                }
            });

            await onSave(dataToSave);
            onOpenChange(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const visibleFields = fields.filter(field => {
        if (field.showIf) {
            const { field: targetField, value: requiredValue } = field.showIf;
            return formData[targetField] === requiredValue;
        }
        return true;
    });

    const renderField = (field) => {
        const value = formData[field.name] ?? "";

        if (field.type === "button") {
            return (
                <ButtonField
                    key={field.name}
                    id={field.name}
                    title={field.title}
                    label={field.label}
                    data={field.data}
                    onClick={() => field.onClick(field.name, formData)}
                    onRemove={(idToRemove) => field.onRemove(field.name, idToRemove, formData)}
                />
            );
        }

        if (field.type === "select") {
            return (
                <SelectField
                    key={field.name}
                    id={field.name}
                    label={field.label}
                    icon={ChevronRight}
                    placeholder={field.placeholder || ""}
                    value={value}
                    options={field.options}
                    onChange={(val) => handleChange(field.name, val)}
                />
            );
        }

        if (field.type === "date") {
            return (
                <DatePicker
                    key={field.name}
                    id={field.name}
                    label={field.label}
                    placeholder={field.placeholder || "Pilih tanggal"}
                    selected={value}
                    onSelect={(date) => handleChange(field.name, date)}
                />
            );
        }

        return (
            <InputField
                key={field.name}
                id={field.name}
                label={field.label}
                icon={ChevronRight}
                type={field.type || "text"}
                placeholder={field.placeholder || ""}
                value={value}
                onChange={(e) => handleChange(field.name, e.target.value)}
            />
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="text-primary-hijauTua">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">{visibleFields.map(renderField)}</div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        Batal
                    </Button>
                    <Button
                        className="bg-primary-hijauTua hover:bg-primary-hijauTua/85"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}