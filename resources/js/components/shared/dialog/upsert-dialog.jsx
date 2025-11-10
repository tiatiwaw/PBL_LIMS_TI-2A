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
import InputField from "../form/input-field";
import SelectField from "../form/select-field";
import { ChevronRight } from "lucide-react";

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

    useEffect(() => {
        if (open) {
            const initialData = fields.reduce((acc, field) => {
                acc[field.name] = data
                    ? data[field.name] ?? ""
                    : field.defaultValue ?? "";
                return acc;
            }, {});
            setFormData(initialData);
        }
    }, [data, fields, open]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            await onSave(formData);
            onOpenChange(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderField = (field) => {
        const value = formData[field.name] ?? "";

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

                <div className="grid gap-4 py-4">{fields.map(renderField)}</div>

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
