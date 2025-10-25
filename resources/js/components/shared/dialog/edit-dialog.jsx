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
import { ChevronRight } from "lucide-react";
import SelectField from "../form/select-field";

export default function EditDialog({
    open,
    onOpenChange,
    data,
    onSave,
    fields = [],
    title = "Edit Data",
    description = "Ubah informasi di bawah ini. Klik simpan untuk menyimpan perubahan.",
}) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (data) setFormData(data);
    }, [data]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (onSave) onSave(formData);
        onOpenChange(false);
    };

    const renderField = (field) => {
        const { name, label, type = 'text', options } = field;
        const value = formData[name] || "";

        switch (type) {
            case 'select':
                return (
                    <SelectField
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        icon={ChevronRight}
                        placeholder={field.placeholder || ""}
                        value={formData[field.name] || ""}
                        options={field.options}
                        onChange={(value) => handleChange(field.name, value)}
                        error={!formData[name] ? 'Wajib dipilih' : ''}
                    />
                );

            case 'number':
            case 'email':
            case 'text':
            default:
                return (
                    <InputField
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        icon={ChevronRight}
                        type={field.type || "text"}
                        placeholder={field.placeholder || ""}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="text-primary-hijauTua">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {fields.map(renderField)}
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        className="text-primary-hijauTua hover:text-primary-hijauTua"
                        onClick={() => onOpenChange(false)}
                    >
                        Batal
                    </Button>
                    <Button className="bg-primary-hijauTua hover:bg-primary-hijauTua/85" onClick={handleSubmit}>Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
